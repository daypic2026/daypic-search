"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const categories = [
  { id: "wedding-snap", icon: "📷", title: "본식스냅" },
  { id: "wedding-video", icon: "🎥", title: "본식영상" },
  { id: "wedding-hall", icon: "🏛️", title: "웨딩홀" },
  { id: "dress", icon: "👗", title: "드레스" },
  { id: "hairmakeup", icon: "💄", title: "헤어메이크업" },
  { id: "mc", icon: "🎤", title: "사회자" },
  { id: "bouquet", icon: "💐", title: "부케" },
  { id: "invitation", icon: "💌", title: "청첩장" },
  { id: "interior", icon: "🛋️", title: "인테리어" },
  { id: "travel", icon: "✈️", title: "여행" },
];

export default function QuoteAddPage() {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState("wedding-snap");
  const [vendorName, setVendorName] = useState("");
  const [quoteText, setQuoteText] = useState("");

  const selectedCategoryLabel =
    categories.find((item) => item.id === selectedCategory)?.title ||
    "견적 분석";

  const canSubmit = quoteText.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;

    const quoteData = {
      category: selectedCategory,
      categoryLabel: selectedCategoryLabel,
      vendorName: vendorName.trim() || "업체명 미정",
      quoteText: quoteText.trim(),
    };

    localStorage.setItem("quoteDraft", JSON.stringify(quoteData));

    console.log("quoteData:", quoteData);

    router.push("/test/quote-processing");
  };

  return (
    <main className="min-h-screen bg-[#fdfcff] text-[#222237]">
      <div className="mx-auto min-h-screen max-w-5xl px-5 pb-52 pt-5 sm:px-8 lg:px-10">
        <section className="relative overflow-hidden rounded-[30px] bg-white px-6 py-7 shadow-sm ring-1 ring-[#ece8f0] sm:px-10 sm:py-10">
          <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-[#f4e8f0]" />
          <div className="absolute right-8 bottom-10 hidden h-20 w-20 rounded-[28px] bg-[#f7f3fa] sm:block" />

          <div className="absolute right-5 top-14 z-20">
            <div className="relative h-[110px] w-[145px] sm:h-[155px] sm:w-[205px]">
              <Image
                src="/daypic2/character1.png"
                alt="DayPic 견적 입력 캐릭터"
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

              
            </div>

            <div className="mt-8 max-w-[560px] sm:mt-10">
              <p className="text-xs font-black text-[#c46b8d] sm:text-sm">
                견적 추가
              </p>

              <h1 className="mt-3 text-[20px] font-black leading-[1.35] tracking-[-0.055em] sm:text-[42px]">
                받은 견적을
                <br />
                <span className="text-[#c46b8d]">그대로 붙여넣어</span>{" "}
                주세요
              </h1>

              <p className="mt-4 max-w-2xl text-[13px] leading-6 text-[#6d6876] sm:text-[16px] sm:leading-7">
                카카오톡, DM, 문자, 이메일로 받은 견적을 복사해서 넣으면
                <br className="hidden sm:block" />
                AI가 가격, 구성, 확인할 항목을 정리해요.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-[30px] bg-white p-5 shadow-sm ring-1 ring-[#ece8f0] sm:p-7">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[20px] font-black leading-[1.35] tracking-[-0.055em]">
              견적 정보
            </h2>

            <span className="rounded-full bg-[#f7edf3] px-3 py-1 text-xs font-black text-[#c46b8d]">
              AI 항목 정리
            </span>
          </div>

          <div className="mb-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[13px] font-black text-[#222237]">
                업종 선택
              </p>
              <p className="max-w-[170px] truncate text-right text-xs font-bold text-[#9d929d]">
                {selectedCategoryLabel}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {categories.map((category) => {
                const isSelected = selectedCategory === category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex h-11 items-center gap-2 rounded-[16px] border px-3 text-[13px] font-black transition active:scale-[0.98] ${
                      isSelected
                        ? "border-[#c46b8d] bg-[#f8eef2] text-[#c46b8d]"
                        : "border-[#ece8f0] bg-[#fdfcff] text-[#222237]"
                    }`}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[12px]">
                      {category.icon}
                    </span>
                    <span className="truncate">{category.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[13px] font-black text-[#222237]">
              업체명
              <span className="ml-1 text-[11px] font-bold text-[#9d929d]">
                선택 입력
              </span>
            </label>

            <input
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
              placeholder="예) 상담받은 업체"
              className="h-[52px] w-full rounded-[18px] border border-[#ece8f0] bg-[#fdfcff] px-4 text-[14px] font-bold text-[#222237] outline-none placeholder:text-[#b7aab3] focus:border-[#c46b8d]"
            />

            <p className="mt-2 text-[11px] font-bold text-[#8b7d86]">
              업체명이 없어도 분석할 수 있어요.
            </p>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-[13px] font-black text-[#222237]">
              견적 내용
            </label>

            <textarea
              value={quoteText}
              onChange={(e) => setQuoteText(e.target.value)}
              maxLength={5000}
              placeholder={`예)

본식스냅 95만원
본식영상 포함
아이폰스냅 추가 가능

원본 2,000장
보정본 40장
앨범 별도
당일~5일 전달

계약서 작성 가능 여부 문의`}
              className="h-[290px] w-full resize-none rounded-[22px] border border-[#ece8f0] bg-[#fdfcff] p-4 text-[14px] font-medium leading-6 text-[#222237] outline-none placeholder:text-[#b7aab3] focus:border-[#c46b8d]"
            />
          </div>

          <div className="mt-3 flex items-center justify-between gap-4">
            <p className="text-[11px] font-bold text-[#8b7d86]">
              붙여넣은 내용에서 가격, 구성, 확인할 항목을 찾아요.
            </p>
            <p className="shrink-0 text-[11px] font-bold text-[#8b7d86]">
              {quoteText.length} / 5000
            </p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`mt-5 flex h-[52px] w-full items-center justify-center rounded-[20px] text-[15px] font-black transition active:scale-[0.98] ${
              canSubmit
                ? "bg-[#c46b8d] text-white shadow-lg shadow-[#c46b8d]/25"
                : "bg-[#f1e6eb] text-[#a99ba4]"
            }`}
          >
            AI로 견적 분석하기
          </button>
        </section>

        <section className="mt-5 rounded-[30px] bg-white p-5 shadow-sm ring-1 ring-[#ece8f0] sm:p-7">
          <h2 className="text-[20px] font-black leading-[1.35] tracking-[-0.055em]">
            이렇게 정리돼요
          </h2>

          <div className="mt-4 space-y-2">
            <InfoItem title="가격과 구성을 분리해요" />
            <InfoItem title="누락된 확인 항목을 찾아요" />
            <InfoItem title="비교 결과와 질문 문장을 만들어요" />
          </div>
        </section>
      </div>

      <div className="fixed bottom-[74px] left-0 right-0 z-40 bg-gradient-to-t from-[#fdfcff] via-[#fdfcff] to-transparent px-5 pb-4 pt-8">
        <div className="mx-auto max-w-5xl">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`flex h-[52px] w-full items-center justify-center rounded-[20px] text-[15px] font-black transition active:scale-[0.98] ${
              canSubmit
                ? "bg-[#c46b8d] text-white shadow-lg shadow-[#c46b8d]/25"
                : "bg-[#f1e6eb] text-[#a99ba4]"
            }`}
          >
            AI로 견적 분석하기
          </button>
        </div>
      </div>
    </main>
  );
}

function InfoItem({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 rounded-[18px] bg-[#f8eef2] px-4 py-3">
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#c46b8d] text-[10px] font-black text-white">
        ✓
      </div>
      <p className="text-[13px] font-black leading-[1.35] text-[#222237]">
        {title}
      </p>
    </div>
  );
}