"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
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

type OptionItem = {
  id: string;
  title: string;
  price: string;
  desc: string;
  risk?: "low" | "medium" | "high";
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
    id: "base-price",
    label: "기본 견적",
    value: "95만원",
    status: "confirmed",
    note: "스냅 + 영상 기준으로 확인됨",
  },
  {
    id: "shooting-person",
    label: "촬영 인원",
    value: "1인",
    status: "confirmed",
    note: "메인 작가 1인 촬영 기준",
  },
  {
    id: "shooting-range",
    label: "촬영 범위",
    value: "신부대기실~원판",
    status: "confirmed",
    note: "기본 촬영 범위 확인됨",
  },
  {
    id: "raw",
    label: "원본 제공",
    value: "전체 제공",
    status: "confirmed",
    note: "원본 파일 제공 명시",
  },
  {
    id: "retouch",
    label: "보정본",
    value: "40장",
    status: "confirmed",
    note: "정밀 보정본 수량 확인됨",
  },
  {
    id: "album",
    label: "앨범",
    value: "별도",
    status: "check",
    note: "앨범 추가 시 별도 비용 발생",
  },
  {
    id: "delivery",
    label: "납품 일정",
    value: "원본 2~3주",
    status: "confirmed",
    note: "보정본은 셀렉 후 약 60일",
  },
  {
    id: "contract",
    label: "계약서",
    value: "있음",
    status: "confirmed",
    note: "계약서 작성 및 계약금 조건 명시",
  },
  {
    id: "refund",
    label: "환불 규정",
    value: "있음",
    status: "confirmed",
    note: "취소 시점별 위약금 기준 명시",
  },
  {
    id: "travel-fee",
    label: "출장비",
    value: "별도",
    status: "check",
    note: "지역별 출장비 추가 가능",
  },
  {
    id: "storage",
    label: "원본 보관",
    value: "3개월",
    status: "confirmed",
    note: "최종 납품 완료일 기준",
  },
  {
    id: "correction-range",
    label: "보정 범위",
    value: "확인 필요",
    status: "check",
    note: "피부, 체형, 색감 보정 범위 확인 필요",
  },
];

const optionItems: OptionItem[] = [
  {
    id: "main-photographer",
    title: "대표 지정",
    price: "+30만원",
    desc: "대표 작가 촬영을 원하는 경우 추가",
    risk: "medium",
  },
  {
    id: "two-person",
    title: "2인 촬영 전환",
    price: "+40만원",
    desc: "다양한 각도와 하객 스케치 보완",
    risk: "medium",
  },
  {
    id: "makeup-shop",
    title: "메이크업샵 촬영",
    price: "+20만원",
    desc: "식전 3시간 전부터 촬영 시작",
    risk: "low",
  },
  {
    id: "reception",
    title: "연회장 또는 폐백",
    price: "+10만원",
    desc: "기본 촬영 범위 외 추가 촬영",
    risk: "low",
  },
  {
    id: "parent-album",
    title: "부모님 앨범",
    price: "+15만원",
    desc: "1권당 추가 비용",
    risk: "medium",
  },
  {
    id: "travel-fee",
    title: "출장비",
    price: "+5~30만원",
    desc: "지역에 따라 추가 발생",
    risk: "high",
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

  const checkItems = standardFields.filter((item) => item.status === "check");

  const missingItems = standardFields.filter(
    (item) => item.status === "missing"
  );

  const recommendation = useMemo(() => {
    return {
      level: "진행 검토 가능",
      desc: `${vendorName} 견적은 기본 구성과 계약 조건은 비교적 잘 정리되어 있어요. 다만 대표 지정, 2인 촬영, 앨범, 출장비 같은 옵션을 선택하면 실제 결제 금액이 크게 달라질 수 있어요.`,
      action:
        "기본 견적만 보고 결정하기보다, 필요한 옵션을 포함했을 때 최종 금액이 얼마인지 확인한 뒤 선택하는 것을 추천해요.",
    };
  }, [vendorName]);

  const questions = [
    "현재 견적에 출장비가 포함되어 있나요? 예식 지역 기준 최종 금액을 확인할 수 있을까요?",
    "대표 지정 또는 2인 촬영으로 변경하면 최종 견적은 얼마인가요?",
    "앨범 추가 시 페이지 수와 최종 비용은 어떻게 계산되나요?",
    "보정본의 보정 범위는 피부, 체형, 색감 중 어디까지 포함되나요?",
    "최종 견적과 포함 항목을 계약서에 모두 기재할 수 있나요?",
  ];

  return (
    <main className="min-h-screen bg-[#fdfcff] text-[#222237]">
      <div className="mx-auto min-h-screen max-w-5xl px-5 pb-52 pt-5 sm:px-8 lg:px-10">
        <section className="relative overflow-hidden rounded-[30px] bg-white px-6 py-7 shadow-sm ring-1 ring-[#ece8f0] sm:px-10 sm:py-10">
          <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-[#f4e8f0]" />
          <div className="absolute right-8 bottom-10 hidden h-20 w-20 rounded-[28px] bg-[#f7f3fa] sm:block" />

          <div className="absolute right-4 top-16 z-20">
            <div className="relative h-[86px] w-[112px] sm:h-[140px] sm:w-[185px]">
              <Image
                src="/daypic2/character1.png"
                alt="DayPic 분석 결과 캐릭터"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

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

            <div className="mt-8 max-w-[520px] pr-24 sm:mt-10 sm:pr-44">
              <p className="text-xs font-black text-[#c46b8d] sm:text-sm">
                {categoryLabel} 분석 결과
              </p>

              <h1 className="mt-3 text-[20px] font-black leading-[1.35] tracking-[-0.055em] sm:text-[42px]">
                기본 견적과
                <br />
                <span className="text-[#c46b8d]">추가 옵션</span>을
                정리했어요
              </h1>

              <p className="mt-4 text-[13px] leading-6 text-[#6d6876] sm:text-[16px] sm:leading-7">
                복잡한 견적서를 선택 기준으로 바꾸고
                <br />
                실제 최종 비용까지 함께 확인해요.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-[26px] bg-[#222237] px-5 py-4 text-white shadow-sm sm:p-6">
          <p className="text-xs font-black text-[#e5a9bf]">AI 한 줄 분석</p>

          <h2 className="mt-3 text-[18px] font-black leading-[1.3] tracking-[-0.05em] sm:text-[28px]">
            기본가는 괜찮지만,
            <br />
            옵션 포함 최종가를 봐야 해요.
          </h2>

          <p className="mt-4 text-[13px] font-bold leading-[1.6] text-white/75">
            {recommendation.desc}
          </p>
        </section>

        <section className="mt-5 rounded-[30px] bg-white p-5 shadow-sm ring-1 ring-[#ece8f0] sm:p-7">
          <div className="grid grid-cols-2 gap-3">
            <CostCard title="기본 견적" value="95만원" desc="현재 확인된 기본가" />
            <CostCard
              title="옵션 포함 예상"
              value="145~180만원"
              desc="대표/2인/앨범/출장비 포함 가능"
              highlight
            />
          </div>

          <p className="mt-4 rounded-[20px] bg-[#f8eef2] px-4 py-3 text-[13px] font-bold leading-6 text-[#4b3f48]">
            95만원은 기본가에 가깝고, 선택 옵션에 따라 실제 결제 금액은 더
            높아질 수 있어요.
          </p>
        </section>

        <section className="mt-5 rounded-[30px] bg-white p-5 shadow-sm ring-1 ring-[#ece8f0] sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black text-[#c46b8d] sm:text-sm">
                견적서 완성도
              </p>
              <h2 className="mt-2 text-[28px] font-black tracking-[-0.06em]">
                {completeness}%
              </h2>
              <p className="mt-1 text-[12px] font-bold text-[#6d6876]">
                총 {totalCount}개 표준 항목 중 {confirmedCount}개 확인
              </p>
            </div>

            <div className="rounded-[20px] bg-[#f8eef2] px-4 py-3 text-center text-[#c46b8d]">
              <p className="text-[11px] font-black">확인필요</p>
              <p className="text-2xl font-black">{checkCount}건</p>
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
          <h2 className="text-[20px] font-black leading-[1.35] tracking-[-0.055em] text-[#c46b8d]">
            기본 견적 표준표
          </h2>

          <p className="mt-2 text-[13px] font-bold leading-6 text-[#6d6876]">
            업체 상품명을 빼고, 선택에 필요한 항목만 정리했어요.
          </p>

          <div className="mt-5 overflow-hidden rounded-[24px] ring-1 ring-[#ece8f0]">
            <div className="grid grid-cols-[0.9fr_1.1fr_1.2fr] bg-[#f8eef2] px-3 py-3 text-[11px] font-black text-[#c46b8d]">
              <div>항목</div>
              <div className="text-center">내용</div>
              <div className="text-right">메모</div>
            </div>

            <div className="divide-y divide-[#f0eaf0] bg-white">
              {standardFields
                .filter((item) => item.status !== "missing")
                .map((item) => (
                  <StandardTableRow key={item.id} item={item} />
                ))}
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-[30px] bg-white p-5 shadow-sm ring-1 ring-[#ece8f0] sm:p-7">
          <h2 className="text-[20px] font-black leading-[1.35] tracking-[-0.055em] text-[#c46b8d]">
            추가 옵션 정리
          </h2>

          <p className="mt-2 text-[13px] font-bold leading-6 text-[#6d6876]">
            실제 최종 비용을 바꾸는 옵션들이에요.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {optionItems.map((item) => (
              <OptionCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section className="mt-5 rounded-[30px] bg-white p-5 shadow-sm ring-1 ring-[#ece8f0] sm:p-7">
          <SectionHeader
            title="AI 해석"
            badge="핵심 4개"
            icon={<Sparkles size={20} />}
          />

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <AnalysisCard
              title="기본가"
              value="명확함"
              desc="기본 견적과 주요 제공 항목이 비교적 잘 정리되어 있어요."
              level="good"
            />
            <AnalysisCard
              title="옵션"
              value="주의"
              desc="대표 지정, 2인 촬영, 앨범, 출장비에 따라 최종가가 달라져요."
              level="check"
            />
            <AnalysisCard
              title="계약 규정"
              value="확인됨"
              desc="계약금, 잔금일, 취소 시점별 위약금 기준이 명시되어 있어요."
              level="good"
            />
            <AnalysisCard
              title="최종 비용"
              value="확인 필요"
              desc="내가 선택할 옵션을 포함한 최종 견적을 다시 받아야 해요."
              level="check"
            />
          </div>
        </section>

        <section className="mt-5 rounded-[30px] bg-white p-5 shadow-sm ring-1 ring-[#ece8f0] sm:p-7">
          <SectionHeader
            title="추가 확인이 필요한 항목"
            badge={`${checkItems.length + missingItems.length}개`}
            icon={<AlertTriangle size={20} />}
          />

          <div className="mt-4 space-y-3">
            {[...checkItems, ...missingItems].map((item) => (
              <MissingCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section className="mt-5 rounded-[30px] bg-white p-5 shadow-sm ring-1 ring-[#ece8f0] sm:p-7">
          <h2 className="text-[20px] font-black leading-[1.35] tracking-[-0.055em]">
            선택 기준 반영
          </h2>

          {preference?.combination && (
            <div className="mt-4 rounded-[22px] bg-[#f8eef2] p-4">
              <p className="text-xs font-black text-[#c46b8d]">선택 조합</p>
              <p className="mt-1 text-[15px] font-black">
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
          <h2 className="text-[20px] font-black leading-[1.35] tracking-[-0.055em]">
            최종 의견
          </h2>

          <div className="mt-4 rounded-[24px] bg-[#fdfcff] p-5 ring-1 ring-[#ece8f0]">
            <p className="text-[13px] font-black text-[#c46b8d]">
              {recommendation.level}
            </p>
            <p className="mt-3 text-[13px] font-bold leading-7 text-[#4b3f48]">
              {recommendation.action}
            </p>
          </div>
        </section>

        <section className="mt-5 rounded-[30px] bg-white p-5 shadow-sm ring-1 ring-[#ece8f0] sm:p-7">
          <h2 className="text-[20px] font-black leading-[1.35] tracking-[-0.055em]">
            업체에 꼭 확인할 질문
          </h2>

          <div className="mt-4 space-y-3">
            {questions.map((question) => (
              <QuestionItem key={question} text={question} />
            ))}
          </div>
        </section>
      </div>

      <div className="fixed bottom-[74px] left-0 right-0 z-40 bg-gradient-to-t from-[#fdfcff] via-[#fdfcff] to-transparent px-5 pb-4 pt-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/test/quote-box"
            className="flex h-[52px] w-full items-center justify-center gap-2 rounded-[20px] bg-[#c46b8d] text-[15px] font-black text-white shadow-lg shadow-[#c46b8d]/25 transition active:scale-[0.98]"
          >
            이 비교 진단서 견적함에 보관하기
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}

function CostCard({
  title,
  value,
  desc,
  highlight,
}: {
  title: string;
  value: string;
  desc: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-[22px] p-4 ring-1 ${
        highlight
          ? "bg-[#f8eef2] ring-[#ead0dc]"
          : "bg-[#fdfcff] ring-[#ece8f0]"
      }`}
    >
      <p className="text-[11px] font-black text-[#8b7d86]">{title}</p>
      <p
        className={`mt-2 text-[24px] font-black tracking-[-0.06em] ${
          highlight ? "text-[#c46b8d]" : "text-[#222237]"
        }`}
      >
        {value}
      </p>
      <p className="mt-1 text-[11px] font-bold leading-5 text-[#6d6876]">
        {desc}
      </p>
    </div>
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

function StandardTableRow({ item }: { item: StandardField }) {
  return (
    <div className="grid grid-cols-[0.9fr_1.1fr_1.2fr] items-center gap-3 px-3 py-4">
      <p className="text-[12px] font-black leading-[1.35] text-[#222237]">
        {item.label}
      </p>

      <p className="text-center text-[13px] font-black leading-[1.35] text-[#c46b8d]">
        {item.value}
      </p>

      <p className="text-right text-[11px] font-bold leading-[1.45] text-[#6d6876]">
        {item.note}
      </p>
    </div>
  );
}

function OptionCard({ item }: { item: OptionItem }) {
  const riskClass =
    item.risk === "high"
      ? "bg-[#fff1e8] text-[#e58a5c]"
      : item.risk === "medium"
        ? "bg-[#f8eef2] text-[#c46b8d]"
        : "bg-[#eaf7ef] text-[#3ca56b]";

  const riskLabel =
    item.risk === "high"
      ? "금액 변동 큼"
      : item.risk === "medium"
        ? "선택 주의"
        : "부담 낮음";

  return (
    <div className="rounded-[22px] bg-[#fdfcff] p-4 ring-1 ring-[#ece8f0]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[13px] font-black text-[#222237]">{item.title}</p>
          <p className="mt-1 text-[11px] font-bold leading-5 text-[#6d6876]">
            {item.desc}
          </p>
        </div>

        <p className="shrink-0 text-[15px] font-black text-[#c46b8d]">
          {item.price}
        </p>
      </div>

      <span
        className={`mt-3 inline-flex rounded-full px-3 py-1 text-[10px] font-black ${riskClass}`}
      >
        {riskLabel}
      </span>
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
        <h2 className="text-[20px] font-black leading-[1.35] tracking-[-0.055em]">
          {title}
        </h2>
      </div>

      <span className="rounded-full bg-[#f8eef2] px-3 py-1 text-xs font-black text-[#c46b8d]">
        {badge}
      </span>
    </div>
  );
}

function AnalysisCard({
  title,
  value,
  desc,
  level,
}: {
  title: string;
  value: string;
  desc: string;
  level: "good" | "check" | "neutral";
}) {
  return (
    <div className="rounded-[22px] bg-[#fdfcff] p-4 ring-1 ring-[#ece8f0]">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[13px] font-black text-[#222237]">{title}</p>
        <span
          className={`rounded-full px-2 py-1 text-[10px] font-black ${
            level === "good"
              ? "bg-[#f8eef2] text-[#c46b8d]"
              : level === "check"
                ? "bg-[#fff3e8] text-[#e58a5c]"
                : "bg-[#f1eef3] text-[#8b7d86]"
          }`}
        >
          {value}
        </span>
      </div>

      <p className="mt-3 text-xs font-bold leading-5 text-[#6d6876]">
        {desc}
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
    <div className="rounded-[18px] bg-[#f8eef2] px-4 py-4 text-[13px] font-black leading-6 text-[#222237]">
      {text}
    </div>
  );
}