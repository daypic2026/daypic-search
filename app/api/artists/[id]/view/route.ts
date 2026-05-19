import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { findArtistRow } from "@/lib/artist-lookup";
import { serverError } from "@/lib/error-response";
import { captureApiError } from "@/lib/sentry-utils";
import {
  checkRateLimit,
  getClientIp,
  rateLimitedResponse,
  rateLimiters,
} from "@/lib/rate-limit";

export async function POST(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const rl = await checkRateLimit(rateLimiters.view, getClientIp(_req));
    if (!rl.ok) return rateLimitedResponse(rl);

    const { id } = await context.params;
    const row = await findArtistRow(id);

    if (!row) {
      return NextResponse.json(
        { error: "작가를 찾을 수 없어." },
        { status: 404 }
      );
    }

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.rpc(
      "increment_artist_view_count",
      { p_id: row.id }
    );

    if (error) {
      return serverError(
        "POST /api/artists/[id]/view",
        error,
        "조회수 업데이트에 실패했어."
      );
    }

    return NextResponse.json({ ok: true, view_count: data as number });
  } catch (error) {
    captureApiError(error, "POST /api/artists/[id]/view");
    return serverError(
      "POST /api/artists/[id]/view",
      error,
      "조회수 업데이트 중 오류가 발생했어."
    );
  }
}
