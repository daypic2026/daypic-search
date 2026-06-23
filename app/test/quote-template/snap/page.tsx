"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type QuoteState = {
  vendorName: string;
  contactPhone: string;
  contactLink: string;
  weddingHall: string;
  businessRegistered: boolean;
  totalPrice: string;

  mainPhotographerDirect: boolean;
  mainPhotographerCount: "1인" | "2인";
  subPhotographerIncluded: boolean;
  brideRoomIncluded: boolean;
  ceremonyIncluded: boolean;
  familyPhotoIncluded: boolean;
  pyebaekIncluded: boolean;
  receptionIncluded: boolean;

  originalIncluded: boolean;
  retouchedIncluded: boolean;
  retouchedCount: string;
  albumIncluded: boolean;
  frameIncluded: boolean;
  photoLinkIncluded: boolean;

  originalDelivery: string;
  retouchedDelivery: string;
  finalDelivery: string;

  travelFee: string;
  familyPhotoExtraFee: string;
  pyebaekExtraFee: string;
  receptionExtraFee: string;
  overtimeFee: string;
  otherFee: string;

  expectedExtraFee: string;
  styleItems: string[];
};

const initialQuote: QuoteState = {
  vendorName: "",
  contactPhone: "",
  contactLink: "",
  weddingHall: "",
  businessRegistered: false,
  totalPrice: "",

  mainPhotographerDirect: false,
  mainPhotographerCount: "1인",
  subPhotographerIncluded: false,
  brideRoomIncluded: true,
  ceremonyIncluded: true,
  familyPhotoIncluded: true,
  pyebaekIncluded: false,
  receptionIncluded: false,

  originalIncluded: true,
  retouchedIncluded: true,
  retouchedCount: "",
  albumIncluded: false,
  frameIncluded: false,
  photoLinkIncluded: false,

  originalDelivery: "",
  retouchedDelivery: "",
  finalDelivery: "",

  travelFee: "",
  familyPhotoExtraFee: "",
  pyebaekExtraFee: "",
  receptionExtraFee: "",
  overtimeFee: "",
  otherFee: "",

  expectedExtraFee: "없음",
  styleItems: [],
};

const styleOptions = [
  {
    label: "자연스러운 순간 위주",
    recommend: "자연스러운 순간을 중요하게 생각하는 분",
  },
  {
    label: "부모님 사진 중요",
    recommend: "부모님 표정과 가족사진을 중요하게 생각하는 분",
  },
  {
    label: "감성적인 색감",
    recommend: "감성적인 색감의 사진을 좋아하는 분",
  },
  {
    label: "밝고 화사한 색감",
    recommend: "밝고 화사한 분위기를 선호하는 분",
  },
  { label: "화이트 톤",
    recommend: "맑고 깨끗한 화이트 톤 색감",
  },
  {
    label: "인물 중심",
    recommend: "신랑신부 중심의 인물 사진을 원하는 분",
  },
  {
    label: "디테일 컷 중요",
    recommend: "드레스, 부케, 반지 같은 디테일 컷을 중요하게 보는 분",
  },
  {
    label: "과한 보정 지양",
    recommend: "과한 보정보다 자연스러운 결과물을 원하는 분",
  },
  {
    label: "빠른 납품",
    recommend: "결과물을 빠르게 받아보고 싶은 분",
  },
];

const guideItems = [
  "대표작가 직접 촬영 여부",
  "추가비용 발생 조건",
  "보정본 수량",
  "최종 납품 일정",
  "취소 및 환불 규정",
];

function onlyNumber(value: string) {
  return value.replace(/[^0-9]/g, "");
}

function formatNumber(value: string) {
  const number = onlyNumber(value);
  if (!number) return "";
  return Number(number).toLocaleString("ko-KR");
}

function formatPrice(value: string) {
  const number = Number(onlyNumber(value));
  if (!number) return "금액 미입력";
  if (number >= 10000) {
    return `${Math.round(number / 10000).toLocaleString()}만원`;
  }
  return `${number.toLocaleString()}원`;
}

function formatDays(value: string) {
  const number = onlyNumber(value);
  if (!number) return "미입력";
  return `${number}일`;
}

function getRecommendItems(styleItems: string[]) {
  const selected = styleOptions
    .filter((item) => styleItems.includes(item.label))
    .map((item) => item.recommend);

  if (selected.length === 0) {
    return [
      "아직 추천 성향이 선택되지 않았어요",
      "촬영 스타일을 선택하면 자동으로 추천 문구가 생성돼요",
    ];
  }

  return selected.slice(0, 3);
}

export default function SnapQuoteTemplatePage() {
  const [quote, setQuote] = useState<QuoteState>(initialQuote);
  const [copied, setCopied] = useState(false);

  const update = <K extends keyof QuoteState>(key: K, value: QuoteState[K]) => {
    setQuote((prev) => ({ ...prev, [key]: value }));
  };

  const toggleStyleItem = (item: string) => {
    setQuote((prev) => ({
      ...prev,
      styleItems: prev.styleItems.includes(item)
        ? prev.styleItems.filter((v) => v !== item)
        : [...prev.styleItems, item],
    }));
  };

  const recommendItems = useMemo(
    () => getRecommendItems(quote.styleItems),
    [quote.styleItems]
  );

  const cardText = useMemo(() => {
    return `
${quote.vendorName || "업체명 미입력"}

총 견적
${formatPrice(quote.totalPrice)}

웨딩홀
${quote.weddingHall || "미입력"}

업체 연락처
${quote.contactPhone || "미입력"}

사업자등록
${quote.businessRegistered ? "확인" : "미확인"}

촬영구성
${quote.mainPhotographerDirect ? "- 대표작가 직접촬영" : "- 대표작가 직접촬영 미확인"}
- 메인작가 ${quote.mainPhotographerCount}
${quote.subPhotographerIncluded ? "- 서브작가 포함" : "- 서브작가 미포함"}
${quote.brideRoomIncluded ? "- 신부대기실 포함" : "- 신부대기실 미포함"}
${quote.familyPhotoIncluded ? "- 원판촬영 포함" : "- 원판촬영 미포함"}
${quote.receptionIncluded ? "- 연회장촬영 포함" : "- 연회장촬영 미포함"}
${quote.pyebaekIncluded ? "- 폐백촬영 포함" : "- 폐백촬영 미포함"}

결과물
${quote.originalIncluded ? "- 원본 제공" : "- 원본 미제공"}
${quote.retouchedIncluded ? `- 보정본 ${quote.retouchedCount || "미입력"}장` : "- 보정본 미제공"}
${quote.albumIncluded ? "- 앨범 포함" : "- 앨범 미포함"}
${quote.frameIncluded ? "- 액자 포함" : "- 액자 미포함"}
${quote.photoLinkIncluded ? "- 사진 확인 링크 제공" : "- 사진 확인 링크 미제공"}

납품
- 원본 ${formatDays(quote.originalDelivery)}
- 보정본 ${formatDays(quote.retouchedDelivery)}
- 최종 납품 ${formatDays(quote.finalDelivery)}

이런 분께 추천해요
${recommendItems.map((item) => `- ${item}`).join("\n")}
    `.trim();
  }, [quote, recommendItems]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cardText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <main className="min-h-screen bg-[#FFF9FB] px-4 py-5 text-[#222237]">
      <div className="mx-auto max-w-[430px] pb-28">
        <header className="mb-5 rounded-[32px] bg-white p-5 shadow-sm">
          <p className="text-[12px] font-bold text-[#D97A9B]">
            DayPic 표준견적 v1.0
          </p>
          <h1 className="mt-1 text-[26px] font-black leading-tight">
            본식스냅 견적을
            <br />
            예쁜 카드로 정리해요
          </h1>
          <p className="mt-2 text-[13px] leading-relaxed text-[#6F6670]">
            업체마다 다른 견적서를 신부가 보기 쉬운 기준으로 정리해요.
          </p>
        </header>

        <section className="space-y-4">
          <Box title="기본정보">
            <div className="space-y-3">
              <Field label="업체명" value={quote.vendorName} placeholder="예: ㅇㅇ스냅" onChange={(v) => update("vendorName", v)} />
              <Field label="업체 연락처" value={quote.contactPhone} placeholder="예: 010-0000-0000" onChange={(v) => update("contactPhone", v)} />
              <Field label="문의 / 확인 링크" value={quote.contactLink} placeholder="예: 홈페이지, 카카오채널, 인스타 DM" onChange={(v) => update("contactLink", v)} />
              <Field label="웨딩홀 이름" value={quote.weddingHall} placeholder="예: 더채플앳청담" onChange={(v) => update("weddingHall", v)} />

              <Toggle
                label="사업자등록 확인"
                checked={quote.businessRegistered}
                onChange={() => update("businessRegistered", !quote.businessRegistered)}
              />

              <MoneyField label="총 견적금액" value={quote.totalPrice} placeholder="예: 900,000" onChange={(v) => update("totalPrice", v)} />
            </div>
          </Box>

          <Box title="촬영구성">
            <div className="grid grid-cols-2 gap-2">
              <Toggle label="대표작가 직접촬영" checked={quote.mainPhotographerDirect} onChange={() => update("mainPhotographerDirect", !quote.mainPhotographerDirect)} />
              <Toggle label="서브작가 포함" checked={quote.subPhotographerIncluded} onChange={() => update("subPhotographerIncluded", !quote.subPhotographerIncluded)} />
              <Toggle label="신부대기실 포함" checked={quote.brideRoomIncluded} onChange={() => update("brideRoomIncluded", !quote.brideRoomIncluded)} />
              <Toggle label="본식촬영 포함" checked={quote.ceremonyIncluded} onChange={() => update("ceremonyIncluded", !quote.ceremonyIncluded)} />
              <Toggle label="원판촬영 포함" checked={quote.familyPhotoIncluded} onChange={() => update("familyPhotoIncluded", !quote.familyPhotoIncluded)} />
              <Toggle label="폐백촬영 포함" checked={quote.pyebaekIncluded} onChange={() => update("pyebaekIncluded", !quote.pyebaekIncluded)} />
              <Toggle label="연회장촬영 포함" checked={quote.receptionIncluded} onChange={() => update("receptionIncluded", !quote.receptionIncluded)} />
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              {["1인", "2인"].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => update("mainPhotographerCount", count as "1인" | "2인")}
                  className={`rounded-2xl border px-3 py-3 text-[13px] font-black ${
                    quote.mainPhotographerCount === count
                      ? "border-[#D97A9B] bg-[#D97A9B] text-white"
                      : "border-[#EFE4E9] bg-white text-[#6F6670]"
                  }`}
                >
                  촬영작가 {count}
                </button>
              ))}
            </div>
          </Box>

          <Box title="결과물">
            <div className="grid grid-cols-2 gap-2">
              <Toggle label="원본 제공" checked={quote.originalIncluded} onChange={() => update("originalIncluded", !quote.originalIncluded)} />
              <Toggle label="보정본 제공" checked={quote.retouchedIncluded} onChange={() => update("retouchedIncluded", !quote.retouchedIncluded)} />
              <Toggle label="앨범 제공" checked={quote.albumIncluded} onChange={() => update("albumIncluded", !quote.albumIncluded)} />
              <Toggle label="액자 제공" checked={quote.frameIncluded} onChange={() => update("frameIncluded", !quote.frameIncluded)} />
              <Toggle label="사진 확인 링크" checked={quote.photoLinkIncluded} onChange={() => update("photoLinkIncluded", !quote.photoLinkIncluded)} />
            </div>

            <div className="mt-3">
              <Field
                label="보정본 수량"
                value={quote.retouchedCount}
                placeholder="예: 30"
                onChange={(v) => update("retouchedCount", onlyNumber(v))}
              />
            </div>
          </Box>

          <Box title="납품">
            <div className="grid grid-cols-3 gap-2">
              <DayField label="원본" value={quote.originalDelivery} onChange={(v) => update("originalDelivery", v)} />
              <DayField label="보정본" value={quote.retouchedDelivery} onChange={(v) => update("retouchedDelivery", v)} />
              <DayField label="최종" value={quote.finalDelivery} onChange={(v) => update("finalDelivery", v)} />
            </div>
          </Box>

          <Box title="추가비용">
            <div className="space-y-3">
              <MoneyField label="출장비" value={quote.travelFee} placeholder="예: 50,000" onChange={(v) => update("travelFee", v)} />
              <MoneyField label="원판 추가비" value={quote.familyPhotoExtraFee} placeholder="예: 100,000" onChange={(v) => update("familyPhotoExtraFee", v)} />
              <MoneyField label="폐백 추가비" value={quote.pyebaekExtraFee} placeholder="예: 100,000" onChange={(v) => update("pyebaekExtraFee", v)} />
              <MoneyField label="연회장 추가비" value={quote.receptionExtraFee} placeholder="예: 100,000" onChange={(v) => update("receptionExtraFee", v)} />
              <MoneyField label="시간 추가비(시간당)" value={quote.overtimeFee} placeholder="예: 100,000" onChange={(v) => update("overtimeFee", v)} />
              <MoneyField label="기타 추가비" value={quote.otherFee} placeholder="예: 50,000" onChange={(v) => update("otherFee", v)} />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {["없음", "1~10만원", "10~30만원", "30만원 이상"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => update("expectedExtraFee", item)}
                  className={`rounded-2xl border px-3 py-3 text-[13px] font-black ${
                    quote.expectedExtraFee === item
                      ? "border-[#D97A9B] bg-[#D97A9B] text-white"
                      : "border-[#EFE4E9] bg-white text-[#6F6670]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </Box>

          <Box title="촬영 스타일">
            <p className="mb-3 text-[12px] leading-relaxed text-[#8B7E88]">
              선택한 항목은 카드 하단의 “이런 분께 추천해요” 문구로 자동 정리돼요.
            </p>

            <div className="flex flex-wrap gap-2">
              {styleOptions.map((item) => (
                <Chip
                  key={item.label}
                  active={quote.styleItems.includes(item.label)}
                  onClick={() => toggleStyleItem(item.label)}
                >
                  {item.label}
                </Chip>
              ))}
            </div>
          </Box>

          <section
            id="quote-card"
            className="overflow-hidden rounded-[36px] border border-[#F1DEE7] bg-white shadow-sm"
          >
            <div className="relative bg-gradient-to-br from-[#FFF0F5] via-white to-[#FFF9FB] p-5">
              <div className="absolute right-4 top-16 h-20 w-20 opacity-95">
                <Image
                  src="/daypic2/ddaom.png"
                  alt="데이픽 캐릭터 따옴이"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="flex items-center justify-between">
                <p className="rounded-full bg-white px-3 py-1 text-[11px] font-black text-[#D97A9B] shadow-sm">
                  DayPic Standard Quote
                </p>
                <p className="text-[11px] font-bold text-[#B98AA0]">
                  본식스냅
                </p>
              </div>

              <h2 className="mt-5 max-w-[260px] text-[28px] font-black leading-tight">
                {quote.vendorName || "업체명 미입력"}
              </h2>

              <p className="mt-2 text-[13px] font-semibold text-[#7A6E78]">
                {quote.weddingHall || "웨딩홀 미입력"}
              </p>

              <div className="mt-5 rounded-[28px] bg-[#222237] p-5 text-white">
                <p className="text-[12px] font-bold text-[#F5B6CB]">
                  총 견적
                </p>
                <p className="mt-1 text-[34px] font-black">
                  {formatPrice(quote.totalPrice)}
                </p>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <MiniCard
                  label="사업자등록"
                  value={quote.businessRegistered ? "확인" : "미확인"}
                />
                <MiniCard
                  label="연락처"
                  value={quote.contactPhone || "미입력"}
                />
              </div>
            </div>

            <div className="space-y-4 p-5">
              <PrettySection
                title="촬영구성"
                items={[
                  quote.mainPhotographerDirect ? "대표작가 직접촬영" : "대표작가 직접촬영 미확인",
                  `메인작가 ${quote.mainPhotographerCount}`,
                  quote.subPhotographerIncluded ? "서브작가 포함" : "서브작가 미포함",
                  quote.familyPhotoIncluded ? "원판촬영 포함" : "원판촬영 미포함",
                  quote.receptionIncluded ? "연회장촬영 포함" : "연회장촬영 미포함",
                  quote.pyebaekIncluded ? "폐백촬영 포함" : "폐백촬영 미포함",
                ]}
              />

              <PrettySection
                title="결과물"
                items={[
                  quote.originalIncluded ? "원본 제공" : "원본 미제공",
                  quote.retouchedIncluded ? `보정본 ${quote.retouchedCount || "미입력"}장` : "보정본 미제공",
                  quote.albumIncluded ? "앨범 포함" : "앨범 미포함",
                  quote.frameIncluded ? "액자 포함" : "액자 미포함",
                  quote.photoLinkIncluded ? "사진 확인 링크 제공" : "사진 확인 링크 미제공",
                ]}
              />

              <div className="grid grid-cols-3 gap-2">
                <MiniCard label="원본" value={formatDays(quote.originalDelivery)} />
                <MiniCard label="보정본" value={formatDays(quote.retouchedDelivery)} />
                <MiniCard label="최종" value={formatDays(quote.finalDelivery)} />
              </div>

              <div className="rounded-[24px] bg-[#FFF9FB] p-4">
                <p className="mb-3 text-[13px] font-black">
                  이런 분께 추천해요
                </p>

                <div className="space-y-2">
                  {recommendItems.map((item) => (
                    <div
                      key={item}
                      className="rounded-xl bg-white px-3 py-2 text-[12px] font-semibold text-[#4A4250]"
                    >
                      ✓ {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] bg-[#FFF9FB] p-4">
                <p className="mb-3 text-[13px] font-black">
                  예약 전 꼭 확인하세요
                </p>

                <div className="space-y-2">
                  {guideItems.map((item) => (
                    <div
                      key={item}
                      className="rounded-xl bg-white px-3 py-2 text-[12px] font-semibold text-[#4A4250]"
                    >
                      ✓ {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 border-t border-[#F1DEE7] pt-4">
                <div className="relative h-8 w-8">
                  <Image
                    src="/daypic2/ddaom.png"
                    alt="데이픽 캐릭터 따옴이"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-[11px] font-black text-[#B98AA0]">
                  DayPic Standard Quote
                </p>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="w-full rounded-2xl bg-[#D97A9B] py-4 text-[15px] font-black text-white"
              >
                {copied ? "복사 완료" : "견적 카드 내용 복사하기"}
              </button>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[12px] font-bold text-[#6F6670]">
        {label}
      </span>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-[#EFE4E9] bg-white px-4 py-3 text-[14px] font-semibold text-[#222237] outline-none focus:border-[#D97A9B]"
      />
    </label>
  );
}

function MoneyField(props: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <Field
      {...props}
      value={formatNumber(props.value)}
      onChange={(v) => props.onChange(onlyNumber(v))}
    />
  );
}

function DayField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[12px] font-bold text-[#6F6670]">
        {label}
      </span>
      <div className="flex items-center rounded-2xl border border-[#EFE4E9] bg-white px-3 py-3 focus-within:border-[#D97A9B]">
        <input
          inputMode="numeric"
          value={onlyNumber(value)}
          placeholder="30"
          onChange={(e) => onChange(onlyNumber(e.target.value))}
          className="min-w-0 flex-1 bg-transparent text-[14px] font-bold text-[#222237] outline-none"
        />
        <span className="text-[13px] font-bold text-[#8B7E88]">일</span>
      </div>
    </label>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`rounded-2xl border px-3 py-2 text-left text-[13px] font-bold ${
        checked
          ? "border-[#D97A9B] bg-[#FFF0F5] text-[#D97A9B]"
          : "border-[#EFE4E9] bg-white text-[#6F6670]"
      }`}
    >
      {label} {checked ? "O" : "X"}
    </button>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-2 text-[12px] font-bold ${
        active
          ? "border-[#D97A9B] bg-[#FFF0F5] text-[#D97A9B]"
          : "border-[#EFE4E9] bg-white text-[#6F6670]"
      }`}
    >
      {children}
    </button>
  );
}

function Box({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[28px] bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-[15px] font-black">{title}</h2>
      {children}
    </section>
  );
}

function PrettySection({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h3 className="mb-2 text-[15px] font-black">{title}</h3>
      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-2xl bg-[#FFF9FB] px-3 py-3 text-[12px] font-bold text-[#4A4250]"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function MiniCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/80 p-3 text-center">
      <p className="text-[11px] font-bold text-[#8B7E88]">{label}</p>
      <p className="mt-1 break-words text-[13px] font-black text-[#222237]">
        {value}
      </p>
    </div>
  );
}