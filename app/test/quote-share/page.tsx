"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

export default function QuoteSharePage() {
  return (
    <main className="min-h-screen bg-[#fdfcff] text-[#222237]">
      <div className="mx-auto min-h-screen max-w-5xl px-5 pb-40 pt-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between">
          <Link
            href="/test/quote-compare"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-extrabold text-[#c46b8d] shadow-sm ring-1 ring-[#efe1e8]"
          >
            <ArrowLeft size={14} />
            비교 결과
          </Link>

          <p className="text-xs font-black text-[#c46b8d]">
            공유 이미지
          </p>
        </div>

        <section className="mt-5 flex justify-center">
          <ShareImage />
        </section>

        <p className="mt-5 text-center text-xs font-bold leading-5 text-[#8b7d86]">
          아래 이미지를 저장해서 인스타 스토리, 카톡, 스레드에 공유할 수
          있도록 만들 예정이에요.
        </p>
      </div>

      <div className="fixed bottom-[74px] left-0 right-0 z-40 bg-gradient-to-t from-[#fdfcff] via-[#fdfcff] to-transparent px-5 pb-4 pt-8">
        <div className="mx-auto max-w-5xl">
          <button
            onClick={() =>
              alert("이미지 저장 기능은 다음 단계에서 연결할 예정이에요.")
            }
            className="flex h-[56px] w-full items-center justify-center gap-2 rounded-[22px] bg-[#c46b8d] text-[15px] font-black text-white shadow-lg shadow-[#c46b8d]/25 transition active:scale-[0.98]"
          >
            <Download size={18} />
            이미지 저장하기
          </button>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}

function ShareImage() {
  return (
    <article className="w-full max-w-[390px] overflow-hidden rounded-[36px] bg-white shadow-sm ring-1 ring-[#ece8f0]">
      <div className="relative overflow-hidden bg-[#fff9fb] px-6 pb-7 pt-6">
        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#f4dce7]" />
        <div className="absolute -bottom-24 -left-20 h-52 w-52 rounded-full bg-[#f8eef2]" />

        <div className="relative z-10">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-black text-[#c46b8d]">
              DayPic AI Quote
            </p>

            <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-black text-[#c46b8d] shadow-sm ring-1 ring-[#efe1e8]">
              AI 분석 완료
            </span>
          </div>

          <div className="mt-9">
            <h1 className="text-[34px] font-black leading-[1.13] tracking-[-0.065em] text-[#222237]">
              AI가 견적을
              <br />
              분석했어요
            </h1>

            <p className="mt-4 text-sm font-bold leading-6 text-[#6d6876]">
              3개 업체의 견적을 비교하고
              <br />
              확인 필요한 항목을 찾았어요.
            </p>
          </div>

          <div className="mt-7 grid grid-cols-3 gap-2">
            <MiniStat label="비교 업체" value="3개" />
            <MiniStat label="분석 항목" value="28개" />
            <MiniStat label="확인 필요" value="7건" warning />
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <section className="rounded-[28px] bg-[#f8eef2] p-5 ring-1 ring-[#e8c9d8]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black text-[#c46b8d]">
                가장 비교하기 쉬운 견적
              </p>

              <h2 className="mt-2 text-[31px] font-black tracking-[-0.06em] text-[#222237]">
                데이즈
              </h2>

              <p className="mt-1 text-sm font-bold text-[#6d6876]">
                본식스냅 · 서브 · 아이폰
              </p>
            </div>

            <div className="shrink-0 rounded-[20px] bg-white px-4 py-3 text-center shadow-sm">
              <p className="text-[10px] font-bold text-[#8b7d86]">
                확인정보
              </p>
              <p className="mt-1 text-[26px] font-black leading-none text-[#c46b8d]">
                67
              </p>
            </div>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white">
            <div className="h-full w-[67%] rounded-full bg-[#c46b8d]" />
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <MiniStat label="확인됨" value="8개" />
            <MiniStat label="확인필요" value="1개" />
            <MiniStat label="미확인" value="4개" warning />
          </div>
        </section>

        <section className="mt-4 rounded-[28px] bg-white p-5 ring-1 ring-[#ece8f0]">
          <div className="flex items-center gap-2">
            <AlertTriangle size={18} className="text-[#e58a5c]" />
            <p className="text-sm font-black text-[#222237]">
              확인이 필요한 항목
            </p>
          </div>

          <div className="mt-4 space-y-2">
            <NeedRow text="계약서 제공 여부" />
            <NeedRow text="추가 비용 발생 가능성" />
            <NeedRow text="실제 촬영 작가 공개 여부" />
          </div>
        </section>

        <section className="mt-4 rounded-[28px] bg-[#222237] p-5 text-white">
          <div className="flex items-start gap-3">
            <Sparkles size={20} className="mt-0.5 shrink-0 text-[#e5a9bf]" />
            <div>
              <p className="text-sm font-black text-[#e5a9bf]">
                AI 한줄 요약
              </p>
              <p className="mt-2 text-[15px] font-black leading-7">
                가격만 보면 부족해요.
                <br />
                누락 정보까지 같이 봐야 해요.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-5 border-t border-[#ece8f0] pt-5">
          <p className="text-center text-[13px] font-black leading-5 text-[#222237]">
            견적은 받았는데
            <br />
            어디를 선택할지 모르겠다면
          </p>

          <p className="mt-3 text-center text-xs font-black text-[#c46b8d]">
            DayPic AI Quote
          </p>
        </div>
      </div>
    </article>
  );
}

function MiniStat({
  label,
  value,
  warning,
}: {
  label: string;
  value: string;
  warning?: boolean;
}) {
  return (
    <div className="rounded-[18px] bg-white px-2 py-3 text-center shadow-sm ring-1 ring-[#ece8f0]">
      <p className="text-[10px] font-bold text-[#8b7d86]">{label}</p>
      <p
        className={`mt-1 text-[16px] font-black ${
          warning ? "text-[#e58a5c]" : "text-[#222237]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function NeedRow({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-[16px] bg-[#fff3ed] px-3 py-3">
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[#e58a5c]">
        <AlertTriangle size={13} />
      </div>
      <p className="text-xs font-black text-[#4b3f48]">{text}</p>
    </div>
  );
}

function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#ece8f0] bg-white/95 backdrop-blur">
      <div className="mx-auto grid max-w-5xl grid-cols-5 px-2 py-2 text-center text-[11px] font-semibold text-[#aaa0aa]">
        <Link href="/test" className="rounded-2xl py-2">
          <div className="text-lg leading-none">⌂</div>
          <div className="mt-1">홈</div>
        </Link>

        <Link href="/test/quote-add" className="rounded-2xl py-2">
          <div className="text-lg leading-none">＋</div>
          <div className="mt-1">견적추가</div>
        </Link>

        <Link href="/test/quote-box" className="rounded-2xl py-2">
          <div className="text-lg leading-none">▱</div>
          <div className="mt-1">견적함</div>
        </Link>

        <Link href="/artists" className="rounded-2xl py-2">
          <div className="text-lg leading-none">⌕</div>
          <div className="mt-1">찾기</div>
        </Link>

        <Link href="/test/mypage" className="rounded-2xl py-2">
          <div className="text-lg leading-none">○</div>
          <div className="mt-1">마이</div>
        </Link>
      </div>
    </nav>
  );
}