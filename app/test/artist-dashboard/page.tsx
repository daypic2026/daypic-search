"use client";

import Link from "next/link";

const actions = [
  {
    icon: "👤",
    title: "작가 정보",
    desc: "업체명, 지역, 서비스, 가격, 문의 링크를 관리합니다.",
    href: "/artist-profile",
    button: "정보 수정",
  },
  {
    icon: "🖼️",
    title: "사진 갤러리",
    desc: "대표 사진과 포트폴리오 이미지를 관리합니다.",
    href: "/artist-gallery",
    button: "사진 관리",
  },
  {
    icon: "🎬",
    title: "영상 갤러리",
    desc: "영상 포트폴리오 링크를 등록합니다.",
    href: "/artist-video",
    button: "영상 관리",
  },
  {
    icon: "📅",
    title: "일정 관리",
    desc: "촬영 불가 날짜를 등록하고 관리합니다.",
    href: "/artist-schedule",
    button: "일정 관리",
  },
  {
    icon: "🧾",
    title: "견적서 작성",
    desc: "본식스냅, 영상, 아이폰스냅 견적서를 작성합니다.",
    href: "/test/quote-template",
    button: "견적 작성",
  },
  {
    icon: "📁",
    title: "견적함",
    desc: "작성한 견적서를 보관하고 다시 사용할 수 있습니다.",
    href: "/artist/quotes",
    button: "견적함",
  },
];

const steps = [
  {
    step: "STEP 1",
    title: "작가 정보 등록",
    desc: "서비스, 지역, 비용, 인스타 및 오픈채팅 링크를 정리해주세요.",
  },
  {
    step: "STEP 2",
    title: "사진 갤러리 관리",
    desc: "대표 사진과 포트폴리오 이미지를 정리해주세요.",
  },
  {
    step: "STEP 3",
    title: "영상 갤러리 관리",
    desc: "영상 링크를 등록해 작가님의 스타일을 보여주세요.",
  },
  {
    step: "STEP 4",
    title: "일정 관리",
    desc: "촬영 불가 날짜를 등록해 잘못된 문의를 줄여주세요.",
  },
  {
    step: "STEP 5",
    title: "견적서 작성",
    desc: "반복되는 견적은 저장하고, 신부님별 견적서를 빠르게 만들어보세요.",
  },
];

export default function ArtistDashboardPage() {
  const artistName = "위브스냅";

  return (
    <main className="min-h-screen bg-[#fbf7ff] text-[#2b2745]">
      <header className="sticky top-0 z-30 border-b border-[#eee4f7] bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3 md:px-8 md:py-4">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/daypic_logo.png"
              alt="daypic"
              className="h-8 w-auto md:h-10"
            />
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/artist-profile"
              className="hidden h-9 items-center justify-center rounded-full bg-[#2c2448] px-4 text-[13px] font-bold text-white md:inline-flex"
            >
              정보등록
            </Link>

            <Link
              href="/mypage"
              className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-full border border-[#e3d8f4] px-3 text-[12px] font-bold text-[#4d426b] md:px-4 md:text-[13px]"
            >
              My
            </Link>

            <Link
              href="/logout"
              className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-full border border-[#e3d8f4] px-3 text-[12px] font-bold text-[#4d426b] md:px-4 md:text-[13px]"
            >
              로그아웃
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1200px] px-4 py-5 pb-10 md:px-8 md:py-10">
        <section className="rounded-[28px] border border-[#eadff5] bg-[linear-gradient(135deg,#ffffff_0%,#fbf7ff_62%,#fff1f7_100%)] p-5 shadow-[0_14px_40px_rgba(95,71,147,0.08)] md:rounded-[36px] md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <div className="inline-flex rounded-full border border-[#eadff8] bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.08em] text-[#7a5cf6] md:px-4 md:py-2 md:text-[12px]">
                Artist Dashboard
              </div>

              <h1 className="mt-4 text-[28px] font-black leading-[1.22] tracking-[-0.06em] text-[#2c2646] md:mt-6 md:text-[46px]">
                안녕하세요,
                <br />
                {artistName}님
              </h1>

              <p className="mt-3 max-w-[680px] text-[14px] leading-6 text-[#6e6786] md:mt-5 md:text-[16px] md:leading-8">
                작가 정보, 포트폴리오, 일정, 견적서를 한 곳에서 관리해보세요.
                데이픽은 촬영 가능한 날짜와 조건을 기준으로 더 빠른 연결을 돕습니다.
              </p>

              <div className="mt-5 flex flex-wrap gap-2 md:mt-6 md:gap-3">
                <Tag>날짜 기준 매칭</Tag>
                <Tag pink>견적서 작성</Tag>
                <Tag blue>작가 관리</Tag>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 md:mt-8 md:grid-cols-3 md:gap-4">
                {actions.map((item) => (
                  <DashboardCard key={item.title} {...item} />
                ))}
              </div>
            </div>

            <aside className="rounded-[26px] border border-[#eadff5] bg-white p-5 shadow-[0_12px_28px_rgba(94,72,145,0.06)] md:rounded-[32px] md:p-7">
              <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#9d91b4] md:text-[13px]">
                DayPic Guide
              </p>

              <h2 className="mt-3 text-[22px] font-black leading-[1.35] tracking-[-0.05em] text-[#2c2646] md:text-[28px]">
                오늘 관리할 항목을
                <br className="hidden md:block" />
                선택해주세요
              </h2>

              <p className="mt-3 text-[13px] leading-6 text-[#786f92] md:text-[15px] md:leading-7">
                정보가 정리될수록 검색 연결 정확도가 올라가고, 고객이 작가님의 강점을 더 쉽게 이해할 수 있습니다.
              </p>

              <div className="mt-5 space-y-3 md:mt-7 md:space-y-4">
                {steps.map((item, index) => (
                  <StepCard key={item.step} {...item} active={index === 4} />
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-5 rounded-[26px] border border-[#eadff5] bg-white p-5 shadow-[0_10px_26px_rgba(60,50,100,0.05)] md:mt-8 md:rounded-[30px] md:p-7">
          <h2 className="text-[22px] font-black tracking-[-0.04em] text-[#2c2646] md:text-[24px]">
            이렇게 달라집니다
          </h2>

          <p className="mt-2 text-[14px] leading-6 text-[#786f92] md:text-[15px] md:leading-7">
            작가 정보와 일정, 견적서가 정리될수록 문의 연결 흐름이 더 좋아집니다.
          </p>

          <div className="mt-5 grid gap-3 md:mt-6 md:grid-cols-4 md:gap-4">
            <InfoBox
              title="노출 정확도 상승"
              desc="서비스, 지역, 가격이 정리될수록 더 정확하게 노출됩니다."
            />
            <InfoBox
              title="문의 전환 증가"
              desc="포트폴리오와 문의 링크가 명확할수록 실제 문의로 이어지기 쉽습니다."
            />
            <InfoBox
              title="반복 업무 감소"
              desc="반복되는 견적 구성을 저장하면 같은 내용을 매번 쓰지 않아도 됩니다."
            />
            <InfoBox
              title="빠른 연결 흐름"
              desc="고객은 정리된 정보를 보고 더 빠르게 선택할 수 있습니다."
            />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 md:flex md:justify-end">
            <Link
              href="/artist-profile"
              className="inline-flex h-[46px] items-center justify-center whitespace-nowrap rounded-full border border-[#dccff2] px-4 text-[13px] font-bold text-[#4d426b] md:px-6 md:text-[14px]"
            >
              정보 수정
            </Link>

            <Link
              href="/artist/quote-create"
              className="inline-flex h-[46px] items-center justify-center whitespace-nowrap rounded-full bg-[#c7658c] px-4 text-[13px] font-bold text-white md:px-6 md:text-[14px]"
            >
              견적서 작성
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function Tag({
  children,
  pink = false,
  blue = false,
}: {
  children: React.ReactNode;
  pink?: boolean;
  blue?: boolean;
}) {
  const color = pink
    ? "bg-[#fff1f7] text-[#c7658c]"
    : blue
      ? "bg-[#eef5ff] text-[#5c79c8]"
      : "bg-[#f3ebff] text-[#7a5cf6]";

  return (
    <span
      className={`rounded-full px-3 py-1.5 text-[11px] font-bold md:px-5 md:py-2 md:text-[13px] ${color}`}
    >
      {children}
    </span>
  );
}

function DashboardCard({
  icon,
  title,
  desc,
  href,
  button,
}: {
  icon: string;
  title: string;
  desc: string;
  href: string;
  button: string;
}) {
  return (
    <article className="rounded-[22px] border border-[#e8dff3] bg-white/95 p-4 shadow-[0_8px_20px_rgba(78,58,130,0.04)] md:rounded-[24px] md:p-5">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#f5efff] text-[19px] md:h-11 md:w-11 md:text-[20px]">
        {icon}
      </div>

      <h2 className="text-[17px] font-black tracking-[-0.04em] text-[#2b2745] md:text-[21px]">
        {title}
      </h2>

      <p className="mt-2 hidden min-h-[56px] text-[13px] leading-6 text-[#6e6786] sm:block md:text-[14px]">
        {desc}
      </p>

      <Link
        href={href}
        className="mt-4 inline-flex h-[42px] w-full items-center justify-center whitespace-nowrap rounded-[14px] bg-[#6d46f6] text-[13px] font-bold text-white transition hover:bg-[#5636df] md:h-[46px] md:rounded-[16px] md:text-[14px]"
      >
        {button}
      </Link>
    </article>
  );
}

function StepCard({
  step,
  title,
  desc,
  active = false,
}: {
  step: string;
  title: string;
  desc: string;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-[18px] px-4 py-3 md:rounded-[20px] md:px-5 md:py-4 ${
        active ? "bg-[#fff1f7]" : "bg-[#f5efff]"
      }`}
    >
      <p
        className={`text-[10px] font-black uppercase tracking-[0.12em] md:text-[12px] ${
          active ? "text-[#c7658c]" : "text-[#7a5cf6]"
        }`}
      >
        {step}
      </p>

      <h3 className="mt-1.5 text-[14px] font-black text-[#2b2745] md:mt-2 md:text-[16px]">
        {title}
      </h3>

      <p className="mt-1.5 text-[12px] leading-5 text-[#6e6786] md:mt-2 md:text-[13px] md:leading-6">
        {desc}
      </p>
    </div>
  );
}

function InfoBox({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-[20px] bg-[#fbf7ff] px-4 py-4 md:rounded-[22px] md:px-5 md:py-5">
      <h3 className="text-[14px] font-black text-[#6d46f6] md:text-[15px]">
        {title}
      </h3>
      <p className="mt-2 text-[12px] leading-5 text-[#6e6786] md:text-[13px] md:leading-6">
        {desc}
      </p>
    </div>
  );
}
