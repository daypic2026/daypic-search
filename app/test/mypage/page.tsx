"use client";

import Link from "next/link";

export default function MyPage() {
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
                href="/test/quote-add"
                className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-extrabold text-[#c46b8d] shadow-sm ring-1 ring-[#efe1e8]"
              >
                새 견적 ›
              </Link>
            </div>

            <div className="mt-8 sm:mt-10">
              <p className="text-sm font-black text-[#c46b8d]">마이페이지</p>

              <div className="mt-4 flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[24px] bg-[#c46b8d] text-xl font-black text-white shadow-lg shadow-[#c46b8d]/20">
                  J
                </div>

                <div>
                  <h1 className="text-[28px] font-black leading-[1.22] tracking-[-0.055em] sm:text-[42px]">
                    제이님
                  </h1>
                  <p className="mt-1 text-sm font-bold text-[#6d6876]">
                    무료 프로젝트 3개 남음
                  </p>
                </div>
              </div>

              <p className="mt-5 max-w-2xl text-[14px] leading-6 text-[#6d6876] sm:text-[16px] sm:leading-7">
                저장한 견적, 분석 결과, 확인 필요한 항목을 한 곳에서 관리할
                수 있어요.
              </p>

              <Link
                href="/test/quote-add"
                className="mt-6 flex h-[56px] w-full items-center justify-center rounded-[22px] bg-[#c46b8d] text-[15px] font-black text-white shadow-lg shadow-[#c46b8d]/25 transition active:scale-[0.98] sm:w-[260px]"
              >
                새 견적 분석하기
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-5 grid grid-cols-3 gap-2">
          <StatusBox title="저장 견적" value="2개" />
          <StatusBox title="미확인" value="17건" warning />
          <StatusBox title="완료" value="0건" />
        </section>

        <section className="mt-5 rounded-[30px] bg-[#222237] p-5 text-white shadow-sm sm:p-7">
          <p className="text-sm font-black text-[#e5a9bf]">이용권</p>

          <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.05em]">
            무료 프로젝트
            <br />
            3개 남았어요
          </h2>

          <p className="mt-3 text-sm font-bold leading-6 text-white/70">
            견적 분석 1회마다 프로젝트 1개가 차감돼요.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <button className="flex h-[52px] items-center justify-center rounded-[20px] bg-white text-sm font-black text-[#c46b8d]">
              이용권 충전
            </button>

            <button className="flex h-[52px] items-center justify-center rounded-[20px] bg-white text-sm font-black text-[#c46b8d]">
              친구 초대
            </button>
          </div>
        </section>

        <section className="mt-5 rounded-[30px] bg-white p-5 shadow-sm ring-1 ring-[#ece8f0] sm:p-7">
          <h2 className="text-xl font-black tracking-[-0.04em]">
            내 데이터
          </h2>

          <div className="mt-3 divide-y divide-[#ece8f0]">
            <MenuItem label="저장된 견적" href="/test/quote-box" />
            <MenuItem label="견적 분석 결과" href="/test/quote-result" />
            <MenuItem label="견적 비교 결과" href="/test/quote-compare" />
            <MenuItem label="확인 질문 기록" href="/test/quote-box" />
          </div>
        </section>

        <section className="mt-5 rounded-[30px] bg-white p-5 shadow-sm ring-1 ring-[#ece8f0] sm:p-7">
          <h2 className="text-xl font-black tracking-[-0.04em]">혜택</h2>

          <div className="mt-4 space-y-3">
            <GuideItem title="친구 초대 시 무료 프로젝트를 받을 수 있어요" />
            <GuideItem title="결과 공유 시 추가 이용권을 받을 수 있어요" />
            <GuideItem title="추후 무제한 플랜으로 업그레이드할 수 있어요" />
          </div>
        </section>

        <section className="mt-5 rounded-[30px] bg-white p-5 shadow-sm ring-1 ring-[#ece8f0] sm:p-7">
          <h2 className="text-xl font-black tracking-[-0.04em]">설정</h2>

          <div className="mt-3 divide-y divide-[#ece8f0]">
            <MenuItem label="알림 설정" href="/test/mypage" />
            <MenuItem label="개인정보 관리" href="/test/mypage" />
            <MenuItem label="서비스 이용 안내" href="/test/mypage" />
            <MenuItem label="로그아웃" href="/test/mypage" danger />
          </div>
        </section>
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
          <Link href="/test/quote-box" className="rounded-2xl py-2">
            <div className="text-lg leading-none">▱</div>
            <div className="mt-1">견적함</div>
          </Link>
          <Link href="/artists" className="rounded-2xl py-2">
            <div className="text-lg leading-none">⌕</div>
            <div className="mt-1">찾기</div>
          </Link>
          <Link href="/test/mypage" className="rounded-2xl py-2 text-[#c46b8d]">
            <div className="text-lg leading-none">○</div>
            <div className="mt-1">마이</div>
          </Link>
        </div>
      </nav>
    </main>
  );
}

function StatusBox({
  title,
  value,
  warning,
}: {
  title: string;
  value: string;
  warning?: boolean;
}) {
  return (
    <div className="rounded-[22px] bg-white p-4 text-center shadow-sm ring-1 ring-[#ece8f0]">
      <p className="text-[11px] font-bold text-[#8b7d86]">{title}</p>
      <p
        className={`mt-2 text-lg font-black ${
          warning ? "text-[#e58a5c]" : "text-[#222237]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function MenuItem({
  label,
  href,
  danger,
}: {
  label: string;
  href: string;
  danger?: boolean;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between py-4 text-sm font-black"
    >
      <span className={danger ? "text-[#e58a5c]" : "text-[#222237]"}>
        {label}
      </span>
      <span className="text-[#aaa0aa]">›</span>
    </Link>
  );
}

function GuideItem({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 rounded-[18px] bg-[#f8eef2] px-4 py-4">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#c46b8d] text-xs font-black text-white">
        ✓
      </div>
      <p className="text-sm font-black text-[#222237]">{title}</p>
    </div>
  );
}