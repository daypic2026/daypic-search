"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  RotateCcw,
  Sparkles,
} from "lucide-react";

type QuoteItem = {
  id: string;
  vendorName: string;
  categoryLabel: string;
  price: string;
  completeness: number;
  confirmedCount: number;
  missingCount: number;
  checkCount: number;
  checkItems?: string[];
  memo?: string;
};

type CompareDraft = {
  category?: string;
  quotes?: QuoteItem[];
};

const fallbackQuotes: QuoteItem[] = [
  {
    id: "quote-1",
    vendorName: "데이즈",
    categoryLabel: "본식스냅(서브,아이폰)",
    price: "95만원",
    completeness: 67,
    confirmedCount: 8,
    missingCount: 4,
    checkCount: 1,
    checkItems: ["계약서 제공 여부"],
  },
  {
    id: "quote-2",
    vendorName: "A스냅",
    categoryLabel: "본식스냅",
    price: "85만원",
    completeness: 52,
    confirmedCount: 6,
    missingCount: 5,
    checkCount: 3,
    checkItems: ["추가 비용 여부", "실제 촬영 작가", "원본 제공 기간"],
  },
  {
    id: "quote-3",
    vendorName: "B스냅",
    categoryLabel: "본식스냅",
    price: "120만원",
    completeness: 60,
    confirmedCount: 7,
    missingCount: 4,
    checkCount: 2,
    checkItems: ["출장비 포함 여부", "앨범 포함 여부"],
  },
];

export default function QuoteComparePage() {
  const [compareDraft, setCompareDraft] = useState<CompareDraft | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("quoteCompareDraft");

    if (saved) {
      try {
        setCompareDraft(JSON.parse(saved));
      } catch {
        setCompareDraft(null);
      }
    }
  }, []);

  const quotes =
    compareDraft?.quotes && compareDraft.quotes.length > 0
      ? compareDraft.quotes
      : fallbackQuotes;

  const rankedQuotes = useMemo(() => {
    return [...quotes].sort((a, b) => {
      if (b.completeness !== a.completeness) return b.completeness - a.completeness;
      if (a.checkCount !== b.checkCount) return a.checkCount - b.checkCount;
      return a.missingCount - b.missingCount;
    });
  }, [quotes]);

  const winner = rankedQuotes[0];
  const totalCheckCount = quotes.reduce((sum, q) => sum + q.checkCount, 0);
  const totalMissingCount = quotes.reduce((sum, q) => sum + q.missingCount, 0);
  const categoryLabel = winner?.categoryLabel || "견적";

  return (
    <main className="min-h-screen bg-[#fdfcff] text-[#222237]">
      <div className="mx-auto min-h-screen max-w-5xl px-5 pb-56 pt-5 sm:px-8 lg:px-10">
        <section className="relative overflow-hidden rounded-[30px] bg-white px-6 py-7 shadow-sm ring-1 ring-[#ece8f0] sm:px-10 sm:py-10">
          <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-[#f4e8f0]" />

          <div className="relative z-10">
            <div className="flex items-center justify-between gap-3">
              <Link
                href="/test"
                className="inline-flex rounded-full bg-[#f7edf3] px-4 py-2 text-xs font-extrabold text-[#c46b8d] ring-1 ring-[#efe1e8]"
              >
                DayPic 2.0
              </Link>

              <Link
                href="/test/quote-box"
                className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-extrabold text-[#c46b8d] shadow-sm ring-1 ring-[#efe1e8]"
              >
                견적함 ›
              </Link>
            </div>

            <div className="mt-8 sm:mt-10">
              <p className="text-sm font-black text-[#c46b8d]">
                {categoryLabel} 비교 분석
              </p>

              <h1 className="mt-3 text-[28px] font-black leading-[1.22] tracking-[-0.055em] sm:text-[42px]">
                어떤 견적이
                <br />
                가장 비교하기 쉬울까요?
              </h1>

              <p className="mt-4 max-w-2xl text-[14px] leading-6 text-[#6d6876] sm:text-[16px] sm:leading-7">
                가격만 비교하지 않고, 확인된 정보와 미확인 항목을 기준으로
                의사결정하기 쉬운 견적을 정리했어요.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-[30px] bg-[#222237] p-5 text-white shadow-sm sm:p-7">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-white/10 text-[#e5a9bf]">
              <ClipboardCheck size={24} />
            </div>

            <div>
              <p className="text-sm font-black text-[#e5a9bf]">
                AI 비교 요약
              </p>
              <h2 className="mt-2 text-[24px] font-black leading-[1.35] tracking-[-0.05em]">
                {winner.vendorName} 견적이
                <br />
                가장 명확해 보여요
              </h2>
              <p className="mt-3 text-sm font-bold leading-6 text-white/75">
                선택한 견적 중 확인된 정보가 가장 많고, 비교에 필요한 정보가
                상대적으로 잘 정리되어 있어요.
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2">
            <DarkStat title="비교 업체" value={`${quotes.length}개`} />
            <DarkStat title="확인 필요" value={`${totalCheckCount}건`} />
            <DarkStat title="미확인" value={`${totalMissingCount}건`} />
          </div>
        </section>

        <section className="mt-5 rounded-[30px] bg-white p-5 shadow-sm ring-1 ring-[#ece8f0] sm:p-7">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-black tracking-[-0.04em]">
              견적별 비교
            </h2>
            <p className="text-xs font-black text-[#c46b8d]">완성도순</p>
          </div>

          <div className="space-y-3">
            {rankedQuotes.map((quote, index) => (
              <CompareCard
                key={quote.id}
                quote={quote}
                rank={index + 1}
                isWinner={quote.id === winner.id}
              />
            ))}
          </div>
        </section>

        <section className="mt-5 rounded-[30px] bg-white p-5 shadow-sm ring-1 ring-[#ece8f0] sm:p-7">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black tracking-[-0.04em]">
              AI가 발견한 확인 필요 항목
            </h2>
            <span className="rounded-full bg-[#fff3ed] px-3 py-1 text-xs font-black text-[#e58a5c]">
              {totalCheckCount}건
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {rankedQuotes.map((quote) => (
              <CheckListCard key={quote.id} quote={quote} />
            ))}
          </div>
        </section>

        <section className="mt-5 rounded-[30px] bg-white p-5 shadow-sm ring-1 ring-[#ece8f0] sm:p-7">
          <h2 className="text-xl font-black tracking-[-0.04em]">
            최종 해석
          </h2>

          <div className="mt-4 rounded-[24px] bg-[#f8eef2] p-5">
            <p className="text-sm font-black text-[#c46b8d]">
              지금 단계에서는
            </p>
            <p className="mt-3 text-sm font-bold leading-7 text-[#4b3f48]">
              {winner.vendorName} 견적이 가장 정보가 명확해요. 다만 최종
              선택 전에는 확인 필요 항목을 업체에 다시 물어보고, 계약서에 포함
              항목과 별도 비용을 남기는 것이 좋아요.
            </p>
          </div>
        </section>

        <section className="mt-5 rounded-[30px] bg-white p-5 shadow-sm ring-1 ring-[#ece8f0] sm:p-7">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-[#f8eef2] text-[#c46b8d]">
              <Sparkles size={23} />
            </div>

            <div>
              <h2 className="text-xl font-black tracking-[-0.04em]">
                공유용 카드뉴스
              </h2>
              <p className="mt-2 text-sm font-bold leading-6 text-[#6d6876]">
                결과를 공유하면 추가 이용권을 받을 수 있어요. 지금은 준비 중인
                기능이에요.
              </p>
            </div>
          </div>

         <Link
  href="/test/quote-share"
  className="mt-5 flex h-[54px] w-full items-center justify-center rounded-[22px] bg-[#f8eef2] text-sm font-black text-[#c46b8d]"
>
  공유용 카드뉴스 만들기
</Link>
        </section>

        <section className="mt-5 grid grid-cols-2 gap-3">
          <Link
            href="/test/quote-box"
            className="flex h-[58px] items-center justify-center gap-2 rounded-[22px] border border-[#ece8f0] bg-white text-sm font-black text-[#c46b8d] shadow-sm"
          >
            <RotateCcw size={17} />
            다시 선택
          </Link>

          <Link
            href="/test/quote-add"
            className="flex h-[58px] items-center justify-center gap-2 rounded-[22px] border border-[#ece8f0] bg-white text-sm font-black text-[#c46b8d] shadow-sm"
          >
            새 견적 추가
          </Link>
        </section>
      </div>

      <div className="fixed bottom-[74px] left-0 right-0 z-40 bg-gradient-to-t from-[#fdfcff] via-[#fdfcff] to-transparent px-5 pb-4 pt-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/test/quote-box"
            className="flex h-[56px] w-full items-center justify-center gap-2 rounded-[22px] bg-[#c46b8d] text-[15px] font-black text-white shadow-lg shadow-[#c46b8d]/25 transition active:scale-[0.98]"
          >
            견적함으로 돌아가기
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}

function DarkStat({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[18px] bg-white/10 px-3 py-4 text-center ring-1 ring-white/10">
      <p className="text-[11px] font-bold text-white/60">{title}</p>
      <p className="mt-1 text-lg font-black text-white">{value}</p>
    </div>
  );
}

function CompareCard({
  quote,
  rank,
  isWinner,
}: {
  quote: QuoteItem;
  rank: number;
  isWinner: boolean;
}) {
  return (
    <div
      className={`rounded-[26px] border p-5 ${
        isWinner
          ? "border-[#c46b8d] bg-[#f8eef2]"
          : "border-[#ece8f0] bg-[#fdfcff]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black text-[#c46b8d]">{rank}순위</p>
          <h3 className="mt-1 text-xl font-black tracking-[-0.04em]">
            {quote.vendorName}
          </h3>
          <p className="mt-1 text-xs font-bold text-[#6d6876]">
            {quote.categoryLabel}
          </p>
        </div>

        <div className="rounded-[18px] bg-white px-3 py-2 text-center shadow-sm">
          <p className="text-[10px] font-bold text-[#8b7d86]">완성도</p>
          <p className="text-lg font-black text-[#c46b8d]">
            {quote.completeness}%
          </p>
        </div>
      </div>

      <div className="mt-4 h-3 overflow-hidden rounded-full bg-white">
        <div
          className="h-full rounded-full bg-[#c46b8d]"
          style={{ width: `${quote.completeness}%` }}
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <SmallInfo title="가격" value={quote.price} />
        <SmallInfo title="확인됨" value={`${quote.confirmedCount}개`} />
        <SmallInfo title="확인필요" value={`${quote.checkCount}개`} />
        <SmallInfo
          title="미확인"
          value={`${quote.missingCount}개`}
          warning={quote.missingCount > 0}
        />
      </div>

      {isWinner ? (
        <div className="mt-4 flex items-start gap-2 rounded-[18px] bg-white px-4 py-4">
          <CheckCircle2 className="mt-0.5 text-[#c46b8d]" size={18} />
          <p className="text-sm font-bold leading-6 text-[#4b3f48]">
            선택한 견적 중 정보가 가장 명확해서 비교와 의사결정이 쉬운
            견적이에요.
          </p>
        </div>
      ) : (
        <div className="mt-4 flex items-start gap-2 rounded-[18px] bg-white px-4 py-4">
          <AlertTriangle className="mt-0.5 text-[#e58a5c]" size={18} />
          <p className="text-sm font-bold leading-6 text-[#4b3f48]">
            가격만으로 판단하기 전에 확인 필요 항목을 먼저 체크해보세요.
          </p>
        </div>
      )}
    </div>
  );
}

function CheckListCard({ quote }: { quote: QuoteItem }) {
  const items =
    quote.checkItems && quote.checkItems.length > 0
      ? quote.checkItems
      : quote.checkCount > 0
      ? ["계약서 제공 여부", "추가 비용 여부"]
      : [];

  return (
    <div className="rounded-[22px] bg-[#fdfcff] p-4 ring-1 ring-[#ece8f0]">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-black text-[#222237]">
          {quote.vendorName}
        </h3>
        <span
          className={`rounded-full px-3 py-1 text-[11px] font-black ${
            items.length > 0
              ? "bg-[#fff3ed] text-[#e58a5c]"
              : "bg-[#f8eef2] text-[#c46b8d]"
          }`}
        >
          {items.length > 0 ? `${items.length}건 확인 필요` : "확인 필요 없음"}
        </span>
      </div>

      {items.length > 0 ? (
        <div className="mt-3 space-y-2">
          {items.map((item, index) => (
            <div
              key={`${quote.id}-${index}`}
              className="flex items-center gap-2 rounded-[16px] bg-white px-3 py-3"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#fff3ed] text-[11px] font-black text-[#e58a5c]">
                {index + 1}
              </span>
              <p className="text-sm font-bold text-[#4b3f48]">{item}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-sm font-bold leading-6 text-[#6d6876]">
          현재 입력된 견적 기준으로 추가 확인이 필요한 항목이 적어요.
        </p>
      )}
    </div>
  );
}

function SmallInfo({
  title,
  value,
  warning,
}: {
  title: string;
  value: string;
  warning?: boolean;
}) {
  return (
    <div className="rounded-[16px] bg-white px-3 py-3 ring-1 ring-[#ece8f0]">
      <p className="text-[11px] font-bold text-[#8b7d86]">{title}</p>
      <p
        className={`mt-1 text-sm font-black ${
          warning ? "text-[#e58a5c]" : "text-[#222237]"
        }`}
      >
        {value}
      </p>
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