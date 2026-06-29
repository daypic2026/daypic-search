"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  FileText,
  Heart,
  Plus,
  Search,
  X,
} from "lucide-react";

type QuoteStatus = "favorite" | "review" | "rejected";
type DetailTab = "summary" | "table" | "raw";
type ViewMode = "folders" | "category" | "detail";

type CategoryItem = {
  id: string;
  label: string;
  icon: string;
  description: string;
};

type QuoteItem = {
  id: string;
  category: string;
  categoryLabel: string;
  vendorName: string;
  price: string;
  expectedPrice: string;
  originalCount: string;
  retouchedCount: string;
  missingCount: number;
  rating: number;
  status: QuoteStatus;
  summary: string[];
  missingItems: string[];
  rawText: string;
  table: { label: string; value: string; memo: string }[];
};

const categories: CategoryItem[] = [
  { id: "wedding-snap", label: "본식스냅", icon: "📸", description: "스냅 견적 비교" },
  { id: "wedding-video", label: "본식영상", icon: "🎥", description: "영상 견적 비교" },
  { id: "iphone-snap", label: "아이폰스냅", icon: "📱", description: "아이폰스냅 비교" },
  { id: "weddinghall", label: "웨딩홀", icon: "🏛️", description: "홀 견적 비교" },
  { id: "dress", label: "드레스", icon: "👗", description: "드레스샵 비교" },
  { id: "hairmakeup", label: "헤어메이크업", icon: "💄", description: "헤메 견적 비교" },
  { id: "bouquet", label: "부케", icon: "💐", description: "부케 견적 비교" },
  { id: "mc", label: "사회자", icon: "🎤", description: "사회자 견적 비교" },
  { id: "invitation", label: "청첩장", icon: "💌", description: "청첩장 비교" },
  { id: "travel", label: "신혼여행", icon: "✈️", description: "여행 견적 비교" },
  { id: "interior", label: "인테리어", icon: "🛋️", description: "신혼집 견적 비교" },
];

const quotes: QuoteItem[] = [
  {
    id: "q1",
    category: "wedding-snap",
    categoryLabel: "본식스냅",
    vendorName: "위브스냅",
    price: "95만원",
    expectedPrice: "145~180만원",
    originalCount: "2,000장",
    retouchedCount: "40장",
    missingCount: 2,
    rating: 4.8,
    status: "favorite",
    summary: ["원본 전체 제공", "보정본 40장", "앨범 별도", "출장비 확인 필요"],
    missingItems: ["계약서 작성 여부", "원본 보관 기간"],
    rawText: "위브스냅 본식스냅 95만원\n원본 2,000장\n보정본 40장\n앨범 별도\n출장비 별도",
    table: [
      { label: "기본 견적", value: "95만원", memo: "스냅 기준" },
      { label: "원본", value: "2,000장", memo: "전체 제공" },
      { label: "보정본", value: "40장", memo: "정밀 보정" },
      { label: "앨범", value: "별도", memo: "추가 비용 가능" },
    ],
  },
  {
    id: "q2",
    category: "wedding-snap",
    categoryLabel: "본식스냅",
    vendorName: "모먼트스냅",
    price: "105만원",
    expectedPrice: "130~160만원",
    originalCount: "2,000장",
    retouchedCount: "50장",
    missingCount: 1,
    rating: 4.6,
    status: "favorite",
    summary: ["보정본 50장", "원본 2,000장", "앨범 포함 여부 확인 필요"],
    missingItems: ["앨범 포함 여부"],
    rawText: "모먼트스냅 105만원\n원본 2,000장\n보정본 50장",
    table: [
      { label: "기본 견적", value: "105만원", memo: "기본 구성" },
      { label: "원본", value: "2,000장", memo: "전체 제공" },
      { label: "보정본", value: "50장", memo: "수량 우수" },
      { label: "앨범", value: "확인 필요", memo: "문의 필요" },
    ],
  },
  {
    id: "q3",
    category: "wedding-snap",
    categoryLabel: "본식스냅",
    vendorName: "브릭스냅",
    price: "110만원",
    expectedPrice: "150~190만원",
    originalCount: "1,800장",
    retouchedCount: "40장",
    missingCount: 2,
    rating: 4.5,
    status: "favorite",
    summary: ["감성 결과물 강점", "대표 지정 비용 확인 필요"],
    missingItems: ["대표 지정 비용", "출장비"],
    rawText: "브릭스냅 110만원\n원본 1,800장\n보정본 40장",
    table: [
      { label: "기본 견적", value: "110만원", memo: "높은 편" },
      { label: "원본", value: "1,800장", memo: "평균 수준" },
      { label: "보정본", value: "40장", memo: "확인됨" },
      { label: "대표 지정", value: "확인 필요", memo: "추가비 가능" },
    ],
  },
  {
    id: "q4",
    category: "wedding-snap",
    categoryLabel: "본식스냅",
    vendorName: "스냅바이유",
    price: "90만원",
    expectedPrice: "120~150만원",
    originalCount: "2,000장",
    retouchedCount: "40장",
    missingCount: 3,
    rating: 4.3,
    status: "review",
    summary: ["가격 경쟁력 있음", "계약 조건 확인 필요"],
    missingItems: ["계약서", "환불 규정", "촬영 작가 공개 여부"],
    rawText: "스냅바이유 90만원\n원본 2,000장\n보정본 40장",
    table: [
      { label: "기본 견적", value: "90만원", memo: "가성비 우수" },
      { label: "원본", value: "2,000장", memo: "확인됨" },
      { label: "보정본", value: "40장", memo: "확인됨" },
      { label: "계약서", value: "확인 필요", memo: "중요" },
    ],
  },
  {
    id: "q5",
    category: "wedding-snap",
    categoryLabel: "본식스냅",
    vendorName: "그날의온도",
    price: "88만원",
    expectedPrice: "120~155만원",
    originalCount: "1,500장",
    retouchedCount: "30장",
    missingCount: 4,
    rating: 4.2,
    status: "review",
    summary: ["가격은 낮음", "미확인 항목이 많음"],
    missingItems: ["앨범", "출장비", "계약서", "환불 규정"],
    rawText: "그날의온도 88만원\n원본 1,500장\n보정본 30장",
    table: [
      { label: "기본 견적", value: "88만원", memo: "저렴한 편" },
      { label: "원본", value: "1,500장", memo: "적은 편" },
      { label: "보정본", value: "30장", memo: "적은 편" },
      { label: "확인 필요", value: "4건", memo: "주의" },
    ],
  },
  {
    id: "q6",
    category: "wedding-snap",
    categoryLabel: "본식스냅",
    vendorName: "필름은유",
    price: "115만원",
    expectedPrice: "150~200만원",
    originalCount: "2,000장",
    retouchedCount: "50장",
    missingCount: 2,
    rating: 4.4,
    status: "review",
    summary: ["보정본 수량 좋음", "최종가 확인 필요"],
    missingItems: ["추가 옵션 비용", "출장비"],
    rawText: "필름은유 115만원\n원본 2,000장\n보정본 50장",
    table: [
      { label: "기본 견적", value: "115만원", memo: "높은 편" },
      { label: "원본", value: "2,000장", memo: "확인됨" },
      { label: "보정본", value: "50장", memo: "수량 우수" },
      { label: "출장비", value: "확인 필요", memo: "지역별 상이" },
    ],
  },
  {
    id: "q7",
    category: "wedding-snap",
    categoryLabel: "본식스냅",
    vendorName: "기억의순간",
    price: "100만원",
    expectedPrice: "135~170만원",
    originalCount: "1,800장",
    retouchedCount: "40장",
    missingCount: 3,
    rating: 4.1,
    status: "review",
    summary: ["무난한 구성", "세부 조건 확인 필요"],
    missingItems: ["앨범", "작가 공개", "원본 보관"],
    rawText: "기억의순간 100만원\n원본 1,800장\n보정본 40장",
    table: [
      { label: "기본 견적", value: "100만원", memo: "평균 수준" },
      { label: "원본", value: "1,800장", memo: "확인됨" },
      { label: "보정본", value: "40장", memo: "확인됨" },
      { label: "원본 보관", value: "확인 필요", memo: "중요" },
    ],
  },
  {
    id: "q8",
    category: "wedding-snap",
    categoryLabel: "본식스냅",
    vendorName: "스냅하우스",
    price: "120만원",
    expectedPrice: "160~210만원",
    originalCount: "2,000장",
    retouchedCount: "40장",
    missingCount: 5,
    rating: 3.8,
    status: "rejected",
    summary: ["가격 높음", "미확인 항목 많음"],
    missingItems: ["앨범", "출장비", "계약서", "환불", "작가 공개"],
    rawText: "스냅하우스 120만원\n원본 2,000장\n보정본 40장",
    table: [
      { label: "기본 견적", value: "120만원", memo: "높은 편" },
      { label: "원본", value: "2,000장", memo: "확인됨" },
      { label: "보정본", value: "40장", memo: "확인됨" },
      { label: "계약 조건", value: "확인 필요", memo: "중요" },
    ],
  },
  {
    id: "q9",
    category: "wedding-snap",
    categoryLabel: "본식스냅",
    vendorName: "해피데이스냅",
    price: "85만원",
    expectedPrice: "130~175만원",
    originalCount: "1,500장",
    retouchedCount: "30장",
    missingCount: 6,
    rating: 3.5,
    status: "rejected",
    summary: ["최저가", "확인 필요 항목 많음"],
    missingItems: ["계약서", "환불", "앨범", "출장비", "작가 공개", "납품일"],
    rawText: "해피데이스냅 85만원\n원본 1,500장\n보정본 30장",
    table: [
      { label: "기본 견적", value: "85만원", memo: "최저가" },
      { label: "원본", value: "1,500장", memo: "적은 편" },
      { label: "보정본", value: "30장", memo: "적은 편" },
      { label: "확인 필요", value: "6건", memo: "주의" },
    ],
  },
  {
    id: "q10",
    category: "wedding-snap",
    categoryLabel: "본식스냅",
    vendorName: "스튜디오A",
    price: "130만원",
    expectedPrice: "170~230만원",
    originalCount: "2,000장",
    retouchedCount: "40장",
    missingCount: 5,
    rating: 3.7,
    status: "rejected",
    summary: ["가격대 높음", "추가 확인 필요"],
    missingItems: ["앨범", "출장비", "계약서", "환불", "원본 보관"],
    rawText: "스튜디오A 130만원\n원본 2,000장\n보정본 40장",
    table: [
      { label: "기본 견적", value: "130만원", memo: "높은 편" },
      { label: "원본", value: "2,000장", memo: "확인됨" },
      { label: "보정본", value: "40장", memo: "확인됨" },
      { label: "예상 최종가", value: "170~230만원", memo: "옵션 포함 시" },
    ],
  },
  {
    id: "v1",
    category: "wedding-video",
    categoryLabel: "본식영상",
    vendorName: "무드필름",
    price: "80만원",
    expectedPrice: "100~130만원",
    originalCount: "-",
    retouchedCount: "-",
    missingCount: 2,
    rating: 4.2,
    status: "review",
    summary: ["본식영상 1인 촬영", "하이라이트 영상 제공"],
    missingItems: ["원본 영상 제공 여부", "납품 기간"],
    rawText: "무드필름 본식영상 80만원\n하이라이트 영상 제공",
    table: [{ label: "기본 견적", value: "80만원", memo: "영상 기준" }],
  },
];

const statusInfo: Record<QuoteStatus, { label: string; icon: string; desc: string }> = {
  favorite: { label: "관심업체", icon: "⭐", desc: "최종 후보" },
  review: { label: "검토중", icon: "🔎", desc: "비교 필요" },
  rejected: { label: "제외", icon: "✕", desc: "조건 제외" },
};

export default function QuoteBoxPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("folders");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeQuoteId, setActiveQuoteId] = useState<string>("q1");
  const [activeTab, setActiveTab] = useState<DetailTab>("summary");

  const selectedQuotes = useMemo(() => {
    if (!selectedCategory) return [];
    return quotes.filter((quote) => quote.category === selectedCategory);
  }, [selectedCategory]);

  const selectedCategoryInfo = categories.find((item) => item.id === selectedCategory);

  const activeQuote = selectedQuotes.find((quote) => quote.id === activeQuoteId);

  const grouped = useMemo(() => {
    return {
      favorite: selectedQuotes.filter((quote) => quote.status === "favorite"),
      review: selectedQuotes.filter((quote) => quote.status === "review"),
      rejected: selectedQuotes.filter((quote) => quote.status === "rejected"),
    };
  }, [selectedQuotes]);

  const openCategory = (categoryId: string) => {
    const firstQuote = quotes.find((quote) => quote.category === categoryId);
    setSelectedCategory(categoryId);
    setActiveQuoteId(firstQuote?.id || "");
    setActiveTab("summary");
    setViewMode("category");
  };

  const openDetail = (quoteId: string) => {
    setActiveQuoteId(quoteId);
    setActiveTab("summary");
    setViewMode("detail");
  };

  return (
    <main className="min-h-screen bg-[#fffafb] text-[#222237]">
      <div className="mx-auto min-h-screen max-w-[1120px] px-4 pb-32 pt-5 sm:px-6">
        <TopHeader />

        {viewMode === "folders" && <FolderHome onOpenCategory={openCategory} />}

        {viewMode === "category" && selectedCategoryInfo && (
          <CategoryList
            categoryInfo={selectedCategoryInfo}
            selectedQuotes={selectedQuotes}
            grouped={grouped}
            onBack={() => {
              setSelectedCategory(null);
              setViewMode("folders");
            }}
            onOpenDetail={openDetail}
          />
        )}

        {viewMode === "detail" && activeQuote && selectedCategoryInfo && (
          <QuoteDetail
            quote={activeQuote}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onBack={() => setViewMode("category")}
          />
        )}
      </div>

      <BottomNav />
    </main>
  );
}

function TopHeader() {
  return (
    <header className="flex items-center justify-between">
      <Link href="/test" className="flex items-center gap-2">
        <img src="/daypic-logo.png" alt="daypic" className="h-10 w-auto" />
      </Link>

      <Link
        href="/test/quote-add"
        className="flex h-10 items-center gap-1 rounded-full bg-[#c46b8d] px-4 text-xs font-black text-white shadow-lg shadow-[#c46b8d]/20"
      >
        <Plus size={15} />
        견적 추가
      </Link>
    </header>
  );
}

function FolderHome({ onOpenCategory }: { onOpenCategory: (id: string) => void }) {
  return (
    <>
      <section className="mt-5 rounded-[30px] bg-[#222237] p-6 text-white">
        <div className="flex gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-black text-[#f2b6c9]">DayPic 견적함</p>
            <h1 className="mt-3 text-[30px] font-black leading-tight tracking-[-0.07em]">
              받은 견적을
              <br />
              업종별로 정리해요
            </h1>
            <p className="mt-4 text-sm font-bold leading-6 text-white/70">
              카톡, DM, 문자로 받은 견적을 한곳에 모아두고 정리할 수 있어요.
            </p>
          </div>

          <div className="hidden shrink-0 self-end sm:block">
            <DdaomImage src="/daypic2/character1.png" size="medium" />
          </div>
        </div>

        <div className="mt-5 flex justify-end sm:hidden">
          <DdaomImage src="/daypic2/character1.png" size="small" />
        </div>
      </section>

      <section className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const categoryQuotes = quotes.filter((quote) => quote.category === category.id);
          const favoriteCount = categoryQuotes.filter((q) => q.status === "favorite").length;
          const missingCount = categoryQuotes.reduce((sum, q) => sum + q.missingCount, 0);

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onOpenCategory(category.id)}
              className="rounded-[22px] bg-white p-4 text-left shadow-sm ring-1 ring-[#f0e5eb] transition active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-[#fff0f5] text-xl">
                  {category.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="truncate text-[19px] font-black tracking-[-0.06em]">
                      {category.label}
                    </h2>
                    <ChevronRight size={17} className="shrink-0 text-[#c46b8d]" />
                  </div>
                  <p className="mt-1 text-xs font-bold text-[#8b7d86]">
                    {category.description}
                  </p>
                </div>
              </div>

              {categoryQuotes.length > 0 ? (
                <div className="mt-4 flex items-center justify-between rounded-[18px] bg-[#fffafb] px-4 py-3">
                  <div>
                    <p className="text-xs font-black">전체 견적</p>
                    <p className="mt-1 text-xs font-bold text-[#8b7d86]">
                      관심 {favoriteCount}개 · 확인필요 {missingCount}건
                    </p>
                  </div>
                  <p className="text-lg font-black text-[#c46b8d]">
                    {categoryQuotes.length}개
                  </p>
                </div>
              ) : (
                <div className="mt-4 rounded-[18px] border border-dashed border-[#eadde4] px-4 py-3 text-xs font-black text-[#b09aa7]">
                  아직 저장된 견적이 없어요
                </div>
              )}
            </button>
          );
        })}
      </section>
    </>
  );
}

function CategoryList({
  categoryInfo,
  selectedQuotes,
  grouped,
  onBack,
  onOpenDetail,
}: {
  categoryInfo: CategoryItem;
  selectedQuotes: QuoteItem[];
  grouped: Record<QuoteStatus, QuoteItem[]>;
  onBack: () => void;
  onOpenDetail: (id: string) => void;
}) {
  return (
    <>
      <section className="mt-5 rounded-[26px] bg-white p-5 shadow-sm ring-1 ring-[#f0e5eb]">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-xs font-black text-[#8b7d86]"
        >
          <ArrowLeft size={16} />
          견적함으로 돌아가기
        </button>

        <div className="mt-5 flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-[#fff0f5] text-2xl">
            {categoryInfo.icon}
          </div>
          <div>
            <h1 className="text-[28px] font-black tracking-[-0.07em]">
              {categoryInfo.label} 견적함
            </h1>
            <p className="mt-1 text-sm font-bold text-[#8b7d86]">
              총 {selectedQuotes.length}개 견적을 정리하고 있어요.
            </p>
          </div>
        </div>

        <Link
          href="/test/quote-add"
          className="mt-5 flex h-13 w-full items-center justify-center gap-2 rounded-[18px] bg-[#c46b8d] text-sm font-black text-white shadow-lg shadow-[#c46b8d]/20"
        >
          <Plus size={17} />
          견적 추가하기
        </Link>

        <div className="mt-5 grid grid-cols-3 gap-2">
          <CountCard label="관심업체" value={grouped.favorite.length} icon={<Heart size={18} />} />
          <CountCard label="검토중" value={grouped.review.length} icon={<Search size={18} />} />
          <CountCard label="제외" value={grouped.rejected.length} icon={<X size={18} />} />
        </div>
      </section>

      <section className="mt-4 space-y-4">
        <StatusBlock status="favorite" items={grouped.favorite} onOpenDetail={onOpenDetail} />
        <StatusBlock status="review" items={grouped.review} onOpenDetail={onOpenDetail} />
        <StatusBlock status="rejected" items={grouped.rejected} onOpenDetail={onOpenDetail} />
      </section>

      <div className="fixed bottom-[72px] left-0 right-0 z-40 bg-gradient-to-t from-[#fffafb] via-[#fffafb] to-transparent px-4 pb-4 pt-8">
        <Link
          href="/test/quote-preference"
          className="mx-auto flex h-[54px] max-w-[720px] items-center justify-center gap-2 rounded-[20px] bg-[#c46b8d] text-sm font-black text-white shadow-lg shadow-[#c46b8d]/20"
        >
          관심업체 비교 시작하기
          <ArrowRight size={17} />
        </Link>
      </div>
    </>
  );
}

function StatusBlock({
  status,
  items,
  onOpenDetail,
}: {
  status: QuoteStatus;
  items: QuoteItem[];
  onOpenDetail: (id: string) => void;
}) {
  const info = statusInfo[status];

  return (
    <div className="rounded-[24px] bg-white p-4 shadow-sm ring-1 ring-[#f0e5eb]">
      <div className="mb-3">
        <h2 className="text-xl font-black tracking-[-0.06em]">
          {info.icon} {info.label} <span className="text-[#c46b8d]">{items.length}</span>
        </h2>
        <p className="mt-1 text-sm font-bold text-[#8b7d86]">{info.desc}</p>
      </div>

      <div className="space-y-2">
        {items.map((quote) => (
          <button
            key={quote.id}
            type="button"
            onClick={() => onOpenDetail(quote.id)}
            className="flex w-full items-center justify-between gap-3 rounded-[18px] border border-[#f0e5eb] bg-white px-4 py-4 text-left active:scale-[0.99]"
          >
            <div className="min-w-0">
              <h3 className="truncate text-base font-black">{quote.vendorName}</h3>
              <p className="mt-1 text-xs font-bold text-[#8b7d86]">
                확인필요 {quote.missingCount}건 · ★ {quote.rating}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Chip text={`원본 ${quote.originalCount}`} />
                <Chip text={`보정 ${quote.retouchedCount}`} />
              </div>
            </div>

            <div className="shrink-0 text-right">
              <p className="text-base font-black text-[#c46b8d]">{quote.price}</p>
              <ChevronRight size={17} className="ml-auto mt-2 text-[#c46b8d]" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function QuoteDetail({
  quote,
  activeTab,
  onTabChange,
  onBack,
}: {
  quote: QuoteItem;
  activeTab: DetailTab;
  onTabChange: (tab: DetailTab) => void;
  onBack: () => void;
}) {
  return (
    <>
      <section className="mt-5 rounded-[26px] bg-white p-5 shadow-sm ring-1 ring-[#f0e5eb]">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-xs font-black text-[#8b7d86]"
        >
          <ArrowLeft size={16} />
          목록으로 돌아가기
        </button>

        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black text-[#c46b8d]">{quote.categoryLabel}</p>
            <h1 className="mt-1 text-[30px] font-black tracking-[-0.07em]">
              {quote.vendorName}
            </h1>
            <p className="mt-2 text-sm font-bold text-[#8b7d86]">
              확인필요 {quote.missingCount}건 · ★ {quote.rating}
            </p>
          </div>

          <DdaomImage src="/daypic2/character3.png" size="small" />
        </div>
      </section>

      <section className="mt-4 rounded-[26px] bg-white p-5 shadow-sm ring-1 ring-[#f0e5eb]">
        <div className="grid grid-cols-2 overflow-hidden rounded-[22px] ring-1 ring-[#f0e5eb]">
          <div className="p-5">
            <p className="text-xs font-bold text-[#8b7d86]">기본 견적</p>
            <p className="mt-2 text-[28px] font-black">{quote.price}</p>
          </div>
          <div className="bg-[#fff0f5] p-5">
            <p className="text-xs font-bold text-[#c46b8d]">예상 최종가</p>
            <p className="mt-2 text-[24px] font-black text-[#c46b8d]">
              {quote.expectedPrice}
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 border-b border-[#f0e5eb] text-center text-sm font-black">
          <Tab active={activeTab === "summary"} onClick={() => onTabChange("summary")}>
            요약
          </Tab>
          <Tab active={activeTab === "table"} onClick={() => onTabChange("table")}>
            견적표
          </Tab>
          <Tab active={activeTab === "raw"} onClick={() => onTabChange("raw")}>
            원문
          </Tab>
        </div>

        <div className="mt-5">
          {activeTab === "summary" && (
            <div className="space-y-4">
              <InfoBox title="핵심 요약" items={quote.summary} />
              <WarningBox title={`확인 필요 ${quote.missingCount}건`} items={quote.missingItems} />
            </div>
          )}

          {activeTab === "table" && (
            <div className="overflow-hidden rounded-[20px] ring-1 ring-[#f0e5eb]">
              {quote.table.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[0.8fr_1fr_1fr] border-b border-[#f7edf2] px-4 py-4 text-xs last:border-b-0"
                >
                  <p className="font-black">{row.label}</p>
                  <p className="font-black text-[#c46b8d]">{row.value}</p>
                  <p className="font-bold text-[#7c6f7c]">{row.memo}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "raw" && (
            <pre className="whitespace-pre-wrap rounded-[20px] bg-[#f8f5f8] p-5 font-sans text-sm font-bold leading-7 text-[#5f5865]">
              {quote.rawText}
            </pre>
          )}
        </div>
      </section>

      <div className="fixed bottom-[72px] left-0 right-0 z-40 bg-gradient-to-t from-[#fffafb] via-[#fffafb] to-transparent px-4 pb-4 pt-8">
        <Link
          href="/test/quote-preference"
          className="mx-auto flex h-[54px] max-w-[720px] items-center justify-center gap-2 rounded-[20px] bg-[#c46b8d] text-sm font-black text-white shadow-lg shadow-[#c46b8d]/20"
        >
          비교 분석 시작하기
          <ArrowRight size={17} />
        </Link>
      </div>
    </>
  );
}

function CountCard({ label, value, icon }: { label: string; value: number; icon: ReactNode }) {
  return (
    <div className="rounded-[18px] bg-[#fffafb] p-4 ring-1 ring-[#f0e5eb]">
      <div className="flex items-center justify-between">
        <p className="text-xs font-black text-[#8b7d86]">{label}</p>
        <div className="text-[#c46b8d]">{icon}</div>
      </div>
      <p className="mt-2 text-[28px] font-black tracking-[-0.05em]">{value}개</p>
    </div>
  );
}

function Chip({ text }: { text: string }) {
  return (
    <span className="rounded-full bg-[#f8f5f8] px-2 py-1 text-[11px] font-bold text-[#7c6f7c]">
      {text}
    </span>
  );
}

function Tab({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border-b-2 py-3 ${
        active ? "border-[#c46b8d] text-[#c46b8d]" : "border-transparent text-[#8b7d86]"
      }`}
    >
      {children}
    </button>
  );
}

function InfoBox({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[22px] bg-white p-5 ring-1 ring-[#f0e5eb]">
      <h3 className="text-base font-black">{title}</h3>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex gap-2 text-sm font-bold text-[#5f5865]">
            <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[#c46b8d]" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WarningBox({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[22px] bg-[#fff8f3] p-5 ring-1 ring-[#f5dfcf]">
      <h3 className="text-base font-black text-[#b86440]">{title}</h3>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex gap-2 text-sm font-bold text-[#6f5a50]">
            <span>⚠</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DdaomImage({
  src = "/daypic2/character1.png",
  size = "medium",
}: {
  src?: string;
  size?: "small" | "medium" | "large";
}) {
  const sizeClass =
    size === "small" ? "h-16 w-16" : size === "large" ? "h-28 w-28" : "h-24 w-24";

  return <img src={src} alt="따옴이" className={`${sizeClass} object-contain`} />;
}

function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#f0e5eb] bg-white/95 backdrop-blur">
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
          <div className="mt-1">작가찾기</div>
        </Link>
        <Link href="/mypage" className="rounded-2xl py-2">
          <div className="text-lg leading-none">○</div>
          <div className="mt-1">마이</div>
        </Link>
      </div>
    </nav>
  );
}