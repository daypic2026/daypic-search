"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Plus,
  RotateCcw,
  Sparkles,
} from "lucide-react";

type QuoteDraft = {
  category?: string;
  categoryLabel?: string;
  vendorName?: string;
  quoteText?: string;
};

type PreferenceItem = {
  id: string;
  title: string;
  desc?: string;
  rank: number;
};

type QuotePreference = {
  category?: string;
  categoryLabel?: string;
  combination?: {
    id: string;
    title: string;
    desc: string;
  } | null;
  preferences?: PreferenceItem[];
};

type StandardField = {
  id: string;
  label: string;
  value: string;
  status: "confirmed" | "missing" | "check";
  note: string;
};

type AnalysisCard = {
  title: string;
  value: string;
  desc: string;
  level: "good" | "check" | "neutral";
};

const fallbackPreferences: PreferenceItem[] = [
  { id: "price", title: "가격", rank: 1 },
  { id: "composition", title: "구성", rank: 2 },
  { id: "extra-cost", title: "추가비용 없음", rank: 3 },
  { id: "contract", title: "계약 조건", rank: 4 },
  { id: "trust", title: "신뢰도", rank: 5 },
];

const standardFields: StandardField[] = [
  {
    id: "price",
    label: "총 견적가",
    value: "95만원",
    status: "confirmed",
    note: "견적서에 명시됨",
  },
  {
    id: "snap",
    label: "스냅 촬영",
    value: "55만원",
    status: "confirmed",
    note: "가격 확인됨",
  },
  {
    id: "video",
    label: "영상 촬영",
    value: "40만원",
    status: "confirmed",
    note: "4K 2CAM 구성 확인됨",
  },
  {
    id: "iphone",
    label: "아이폰스냅",
    value: "25만원",
    status: "confirmed",
    note: "가격 및 제공 범위 확인됨",
  },
  {
    id: "raw",
    label: "원본 수량",
    value: "약 800장 전달",
    status: "confirmed",
    note: "2,000장 이상 촬영 후 선별 전달",
  },
  {
    id: "retouch",
    label: "수정본",
    value: "40장",
    status: "confirmed",
    note: "수정본 수량 명시됨",
  },
  {
    id: "delivery",
    label: "원본 전달일",
    value: "당일~최대 5일",
    status: "confirmed",
    note: "클라우드 전달 명시됨",
  },
  {
    id: "album",
    label: "앨범",
    value: "별도 추가",
    status: "check",
    note: "20p 6만원 / 50p 15만원",
  },
  {
    id: "contract",
    label: "계약서",
    value: "미확인",
    status: "missing",
    note: "견적서에 명시되지 않음",
  },
  {
    id: "refund",
    label: "환불 규정",
    value: "미확인",
    status: "missing",
    note: "취소 및 환불 기준 확인 필요",
  },
  {
    id: "travel-fee",
    label: "출장비",
    value: "미확인",
    status: "missing",
    note: "지역별 추가비 여부 확인 필요",
  },
  {
    id: "storage",
    label: "원본 보관기간",
    value: "미확인",
    status: "missing",
    note: "클라우드 보관기간 확인 필요",
  },
];

export default function QuoteResultPage() {
  const [draft, setDraft] = useState<QuoteDraft | null>(null);
  const [preference, setPreference] = useState<QuotePreference | null>(null);

  useEffect(() => {
    const savedDraft = localStorage.getItem("quoteDraft");
    const savedPreference = localStorage.getItem("quotePreference");

    if (savedDraft) {
      try {
        setDraft(JSON.parse(savedDraft));
      } catch {
        setDraft(null);
      }
    }

    if (savedPreference) {
      try {
        setPreference(JSON.parse(savedPreference));
      } catch {
        setPreference(null);
      }
    }
  }, []);

  const categoryLabel =
    preference?.categoryLabel || draft?.categoryLabel || "견적";

  const vendorName = draft?.vendorName || "이 업체";

  const selectedPreferences =
    preference?.preferences && preference.preferences.length > 0
      ? preference.preferences
      : fallbackPreferences;

  const confirmedCount = standardFields.filter(
    (item) => item.status === "confirmed"
  ).length;

  const missingCount = standardFields.filter(
    (item) => item.status === "missing"
  ).length;

  const checkCount = standardFields.filter(
    (item) => item.status === "check"
  ).length;

  const totalCount = standardFields.length;
  const completeness = Math.round((confirmedCount / totalCount) * 100);

  const confirmedItems = standardFields.filter(
    (item) => item.status === "confirmed"
  );

  const missingItems = standardFields.filter(
    (item) => item.status === "missing"
  );

  const checkItems = standardFields.filter((item) => item.status === "check");

  const analysisCards: AnalysisCard[] = [
    {
      title: "가격",
      value: "명확함",
      desc: "스냅, 영상, 아이폰스냅, 패키지 비용이 각각 구분되어 있어요.",
      level: "good",
    },
    {
      title: "결과물 구성",
      value: "충분함",
      desc: "원본, 전달본, 수정본 수량이 비교적 자세히 적혀 있어요.",
      level: "good",
    },
    {
      title: "전달 일정",
      value: "명확함",
      desc: "원본은 당일 또는 익일, 늦어도 5일 이내 전달로 적혀 있어요.",
      level: "good",
    },
    {
      title: "계약 조건",
      value: "확인 필요",
      desc: "계약서, 환불 규정, 일정 변경 조건은 견적서에 보이지 않아요.",
      level: "check",
    },
  ];

  const recommendation = useMemo(() => {
    return {
      level: "진행 검토 가능",
      desc: `${vendorName} 견적은 가격과 제공 구성은 비교적 명확한 편이에요. 다만 계약서, 환불규정, 출장비처럼 실제 계약 단계에서 중요한 항목은 아직 확인이 필요해요.`,
      action:
        "바로 결정하기보다는 아래 확인 질문을 업체에 보내고 답변을 받은 뒤 최종 선택하는 것을 추천해요.",
    };
  }, [vendorName]);

  const questions = [
    "계약서 작성이 가능한가요? 계약서에 포함 항목과 별도 비용이 모두 기재되나요?",
    "예식 취소나 일정 변경 시 환불 기준은 어떻게 되나요?",
    "예식 지역에 따라 출장비나 추가 비용이 발생하나요?",
    "원본 파일은 클라우드에서 몇 일 동안 보관되나요?",
    "수정본 40장의 보정 범위는 어디까지 포함되나요?",
  ];

  return (
    <main className="min-h-screen bg-[#fdfcff] text-[#222237]">
      <div className="mx-auto min-h-screen max-w-5xl px-5 pb-52 pt-5 sm:px-8 lg:px-10">
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
                href="/test/quote-preference"
                className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-extrabold text-[#c46b8d] shadow-sm ring-1 ring-[#efe1e8]"
              >
                기준 수정 ›
              </Link>
            </div>

            <div className="mt-8 sm:mt-10">
              <p className="text-sm font-black text-[#c46b8d]">
                {categoryLabel} 분석 결과
              </p>

              <h1 className="mt-3 text-[28px] font-black leading-[1.22] tracking-[-0.055em] sm:text-[42px]">
                이 견적에서
                <br />
                <span className="text-[#c46b8d]">확인된 것과 빠진 것</span>
                을 정리했어요
              </h1>

              <p className="mt-4 max-w-2xl text-[14px] leading-6 text-[#6d6876] sm:text-[16px] sm:leading-7">
                입력한 견적 내용을 DayPic 표준 항목으로 나누고, 선택 전 꼭
                확인해야 할 내용을 정리했어요.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-[30px] bg-[#222237] p-5 text-white shadow-sm sm:p-7">
          <p className="text-sm font-black text-[#e5a9bf]">AI 한 줄 분석</p>
          <h2 className="mt-3 text-[22px] font-black leading-[1.4] tracking-[-0.04em]">
            가격과 구성은 명확하지만,
            <br />
            계약 조건은 추가 확인이 필요해요.
          </h2>
          <p className="mt-4 text-sm font-bold leading-6 text-white/75">
            {recommendation.desc}
          </p>
        </section>

        <section className="mt-5 rounded-[30px] bg-white p-5 shadow-sm ring-1 ring-[#ece8f0] sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-black text-[#c46b8d]">
                견적서 완성도
              </p>
              <h2 className="mt-2 text-[32px] font-black tracking-[-0.06em]">
                {completeness}%
              </h2>
              <p className="mt-1 text-sm font-bold text-[#6d6876]">
                총 {totalCount}개 표준 항목 중 {confirmedCount}개 확인
              </p>
            </div>

            <div className="rounded-[22px] bg-[#f8eef2] px-4 py-3 text-center text-[#c46b8d]">
              <p className="text-[11px] font-black">미확인</p>
              <p className="text-2xl font-black">{missingCount}건</p>
            </div>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#f8eef2]">
            <div
              className="h-full rounded-full bg-[#c46b8d]"
              style={{ width: `${completeness}%` }}
            />
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <MiniStat label="확인됨" value={`${confirmedCount}개`} />
            <MiniStat label="확인필요" value={`${checkCount}개`} />
            <MiniStat label="미확인" value={`${missingCount}개`} />
          </div>
        </section>

        <section className="mt-5 rounded-[30px] bg-white p-5 shadow-sm ring-1 ring-[#ece8f0] sm:p-7">
          <SectionHeader
            title="AI 해석"
            badge="핵심 4개"
            icon={<Sparkles size={20} />}
          />

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {analysisCards.map((item) => (
              <AnalysisCard key={item.title} item={item} />
            ))}
          </div>
        </section>

        <section className="mt-5 rounded-[30px] bg-white p-5 shadow-sm ring-1 ring-[#ece8f0] sm:p-7">
          <SectionHeader
            title="견적서에서 확인된 항목"
            badge={`${confirmedItems.length}개`}
            icon={<CheckCircle2 size={20} />}
          />

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {confirmedItems.map((item) => (
              <StandardCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section className="mt-5 rounded-[30px] bg-white p-5 shadow-sm ring-1 ring-[#ece8f0] sm:p-7">
          <SectionHeader
            title="추가 확인이 필요한 항목"
            badge={`${missingItems.length + checkItems.length}개`}
            icon={<AlertTriangle size={20} />}
          />

          <div className="mt-4 space-y-3">
            {[...checkItems, ...missingItems].map((item) => (
              <MissingCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section className="mt-5 rounded-[30px] bg-white p-5 shadow-sm ring-1 ring-[#ece8f0] sm:p-7">
          <h2 className="text-xl font-black tracking-[-0.04em]">
            선택 기준 반영
          </h2>

          {preference?.combination && (
            <div className="mt-4 rounded-[22px] bg-[#f8eef2] p-4">
              <p className="text-xs font-black text-[#c46b8d]">선택 조합</p>
              <p className="mt-1 text-lg font-black">
                {preference.combination.title}
              </p>
              <p className="mt-1 text-xs font-bold leading-5 text-[#6d6876]">
                {preference.combination.desc}
              </p>
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {selectedPreferences.map((item) => (
              <span
                key={`${item.id}-${item.rank}`}
                className="rounded-full bg-[#f8eef2] px-3 py-2 text-xs font-black text-[#c46b8d]"
              >
                {item.rank}순위 · {item.title}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-5 rounded-[30px] bg-white p-5 shadow-sm ring-1 ring-[#ece8f0] sm:p-7">
          <h2 className="text-xl font-black tracking-[-0.04em]">
            최종 의견
          </h2>

          <div className="mt-4 rounded-[24px] bg-[#fdfcff] p-5 ring-1 ring-[#ece8f0]">
            <p className="text-sm font-black text-[#c46b8d]">
              {recommendation.level}
            </p>
            <p className="mt-3 text-sm font-bold leading-7 text-[#4b3f48]">
              {recommendation.action}
            </p>
          </div>
        </section>

        <section className="mt-5 rounded-[30px] bg-white p-5 shadow-sm ring-1 ring-[#ece8f0] sm:p-7">
          <h2 className="text-xl font-black tracking-[-0.04em]">
            업체에 꼭 확인할 질문
          </h2>

          <div className="mt-4 space-y-3">
            {questions.map((question) => (
              <QuestionItem key={question} text={question} />
            ))}
          </div>
        </section>

        <section className="mt-5 grid grid-cols-2 gap-3">
          <Link
            href="/test/quote-add"
            className="flex h-[58px] items-center justify-center gap-2 rounded-[22px] border border-[#ece8f0] bg-white text-sm font-black text-[#c46b8d] shadow-sm"
          >
            <Plus size={18} />
            견적 추가
          </Link>

          <Link
            href="/test/quote-preference"
            className="flex h-[58px] items-center justify-center gap-2 rounded-[22px] border border-[#ece8f0] bg-white text-sm font-black text-[#c46b8d] shadow-sm"
          >
            <RotateCcw size={17} />
            기준 수정
          </Link>
        </section>
      </div>

      <div className="fixed bottom-[74px] left-0 right-0 z-40 bg-gradient-to-t from-[#fdfcff] via-[#fdfcff] to-transparent px-5 pb-4 pt-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/test/quote-box"
            className="flex h-[56px] w-full items-center justify-center gap-2 rounded-[22px] bg-[#c46b8d] text-[15px] font-black text-white shadow-lg shadow-[#c46b8d]/25 transition active:scale-[0.98]"
          >
            견적함에 저장하기
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

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
          <Link href="/test/quote-box" className="rounded-2xl py-2 text-[#c46b8d]">
            <div className="text-lg leading-none">▱</div>
            <div className="mt-1">견적함</div>
          </Link>
          <Link href="/artists" className="rounded-2xl py-2">
            <div className="text-lg leading-none">⌕</div>
            <div className="mt-1">찾기</div>
          </Link>
          <Link href="/mypage" className="rounded-2xl py-2">
            <div className="text-lg leading-none">○</div>
            <div className="mt-1">마이</div>
          </Link>
        </div>
      </nav>
    </main>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[18px] bg-[#fdfcff] px-3 py-3 text-center ring-1 ring-[#ece8f0]">
      <p className="text-[11px] font-bold text-[#8b7d86]">{label}</p>
      <p className="mt-1 text-lg font-black text-[#222237]">{value}</p>
    </div>
  );
}

function SectionHeader({
  title,
  badge,
  icon,
}: {
  title: string;
  badge: string;
  icon: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <div className="text-[#c46b8d]">{icon}</div>
        <h2 className="text-xl font-black tracking-[-0.04em]">{title}</h2>
      </div>

      <span className="rounded-full bg-[#f8eef2] px-3 py-1 text-xs font-black text-[#c46b8d]">
        {badge}
      </span>
    </div>
  );
}

function AnalysisCard({ item }: { item: AnalysisCard }) {
  return (
    <div className="rounded-[22px] bg-[#fdfcff] p-4 ring-1 ring-[#ece8f0]">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-black text-[#222237]">{item.title}</p>
        <span
          className={`rounded-full px-2 py-1 text-[10px] font-black ${
            item.level === "good"
              ? "bg-[#f8eef2] text-[#c46b8d]"
              : item.level === "check"
                ? "bg-[#fff3e8] text-[#e58a5c]"
                : "bg-[#f1eef3] text-[#8b7d86]"
          }`}
        >
          {item.value}
        </span>
      </div>

      <p className="mt-3 text-xs font-bold leading-5 text-[#6d6876]">
        {item.desc}
      </p>
    </div>
  );
}

function StandardCard({ item }: { item: StandardField }) {
  return (
    <div className="rounded-[22px] bg-[#fdfcff] p-4 ring-1 ring-[#ece8f0]">
      <p className="text-xs font-black text-[#8b7d86]">{item.label}</p>
      <p className="mt-2 text-xl font-black tracking-[-0.04em]">
        {item.value}
      </p>
      <p className="mt-1 text-xs font-bold leading-5 text-[#6d6876]">
        {item.note}
      </p>
    </div>
  );
}

function MissingCard({ item }: { item: StandardField }) {
  const isMissing = item.status === "missing";

  return (
    <div
      className={`rounded-[22px] p-4 ring-1 ${
        isMissing
          ? "bg-[#fff8f4] ring-[#f4d8c7]"
          : "bg-[#f8eef2] ring-[#ecd2dd]"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
            isMissing
              ? "bg-[#e58a5c] text-white"
              : "bg-[#c46b8d] text-white"
          }`}
        >
          {isMissing ? <HelpCircle size={16} /> : <AlertTriangle size={15} />}
        </div>

        <div>
          <p className="text-sm font-black text-[#222237]">{item.label}</p>
          <p className="mt-1 text-sm font-bold text-[#6d6876]">
            {item.value}
          </p>
          <p className="mt-2 text-xs font-bold leading-5 text-[#6d6876]">
            {item.note}
          </p>
        </div>
      </div>
    </div>
  );
}

function QuestionItem({ text }: { text: string }) {
  return (
    <div className="rounded-[18px] bg-[#f8eef2] px-4 py-4 text-sm font-black leading-6 text-[#222237]">
      {text}
    </div>
  );
}