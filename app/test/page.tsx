import Link from "next/link";
import Image from "next/image";

const featureCards = [
  ["AI 비교", "같은 기준 정리"],
  ["누락 체크", "빠진 항목 탐지"],
  ["추천 분석", "선택 이유 설명"],
];

const concerns = [
  "A 업체가 더 싼데 괜찮을까?",
  "구성은 좋은데 추가비용이 생기진 않을까?",
  "후기가 좋은 업체가 정말 좋은 업체일까?",
  "결국 어디를 선택해야 하지?",
];

const steps = [
  ["1", "견적 붙여넣기", "카톡, DM, 문자 견적 그대로 입력"],
  ["2", "AI 비교 분석", "가격, 구성, 옵션, 추가비용 정리"],
  ["3", "중요 기준 선택", "가격, 퀄리티, 신뢰도 우선순위 설정"],
  ["4", "추천 이유 확인", "왜 이 선택이 맞는지 확인"],
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fdfcff] text-[#222237]">
      <div className="mx-auto w-full max-w-5xl px-5 pb-40 pt-5 sm:px-8 lg:px-10">
        <section className="relative overflow-hidden rounded-[30px] bg-white px-6 py-7 shadow-sm ring-1 ring-[#ece8f0] sm:px-10 sm:py-10">
          <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-[#f4e8f0]" />
          <div className="absolute right-8 bottom-10 hidden h-20 w-20 rounded-[28px] bg-[#f7f3fa] sm:block" />

          <div className="absolute right-7 top-14 z-20">
            <div className="relative h-[115px] w-[145px] sm:h-[155px] sm:w-[200px]">
              <Image
                src="/daypic2/character1.png"
                alt="DayPic AI 분석 캐릭터"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          <div className="relative z-10">
            <div className="mb-5 inline-flex rounded-full bg-[#f7edf3] px-4 py-2 text-xs font-extrabold text-[#c46b8d] ring-1 ring-[#efe1e8]">
              DayPic 2.0
            </div>

            <div className="flex items-start justify-between gap-9">
              <div className="max-w-[560px]">
                <h1 className="text-[20px] font-black leading-[1.35] tracking-[-0.055em] sm:text-[42px]">
                  견적은 받았는데
                  <br />
                  <span className="text-[#c46b8d]">어디를 선택할지</span>
                  <br />
                  모르겠다면
                </h1>
              </div>
            </div>

            <p className="mt-4 max-w-2xl text-[13px] leading-6 text-[#6d6876] sm:text-[16px] sm:leading-7">
              AI가 견적을 분석하고 어떤 선택이 더 적합한지
              <br />
              이유와 함께 알려드려요.
            </p>

            <Link
              href="/test/quote-add"
              className="mt-3 flex h-[50px] w-full items-center justify-center rounded-[22px] bg-[#c46b8d] text-[15px] font-black text-white shadow-lg shadow-[#c46b8d]/25 transition active:scale-[0.98] sm:w-[260px]"
            >
              견적 분석하기
            </Link>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {featureCards.map(([title, desc]) => (
                <div
                  key={title}
                  className="rounded-[18px] bg-[#f8f6fb] px-3 py-2 ring-1 ring-[#ece8f0]"
                >
                  <p className="whitespace-nowrap text-[13px] font-black tracking-[-0.03em]">
                    {title}
                  </p>
                  <p className="mt-0.5 whitespace-nowrap text-[10px] leading-4 text-[#6d6876]">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-[26px] bg-[#222237] px-5 py-4 text-white shadow-sm sm:p-6">
          <p className="text-xs font-black text-[#e5a9bf]">
            단순 가격 비교가 아니에요
          </p>

          <h2 className="mt-3 text-[18px] font-black leading-[1.3] tracking-[-0.05em] sm:text-[28px]">
            왜 선택해야 하는지,
            <br />
            왜 조심해야 하는지 알려드려요.
          </h2>

          <div className="mt-4 space-y-2 text-[13px] font-bold leading-[1.45]">
            {[
              "가격과 구성을 같은 기준으로 정리",
              "누락 항목과 추가비용 가능성 체크",
              "내 기준에 맞는 추천 이유 제공",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#e5a9bf] text-[10px] text-[#e5a9bf]">
                  ✓
                </span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative mt-5 rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-[#ece8f0] sm:p-7">
          <h2 className="pr-20 text-[20px] font-black leading-[1.35] tracking-[-0.055em] text-[#c46b8d] sm:text-[28px]">
            이런 고민 해본 적 있나요?
          </h2>

          <div className="absolute right-5 top-4">
            <div className="relative h-[70px] w-[70px]">
              <Image
                src="/daypic2/character2.png"
                alt="DayPic 고민 캐릭터"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {concerns.map((item) => (
              <div
                key={item}
                className="rounded-[18px] bg-[#f8f6fb] px-4 py-3 text-[13px] font-extrabold leading-[1.35] text-[#222237]"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="relative mt-5 rounded-[30px] bg-white p-5 shadow-sm ring-1 ring-[#ece8f0] sm:p-7">
          <h2 className="pr-20 text-[20px] font-black leading-[1.35] tracking-[-0.055em] text-[#c46b8d] sm:text-[28px]">
            이렇게 진행돼요
          </h2>

          <div className="absolute right-5 top-5">
            <div className="relative h-[75px] w-[75px]">
              <Image
                src="/daypic2/character3.png"
                alt="DayPic 진행 캐릭터"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {steps.map(([num, title, desc]) => (
              <div
                key={num}
                className="flex items-center gap-4 rounded-[20px] bg-[#f8f6fb] p-4"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#c46b8d] text-sm font-black text-white">
                  {num}
                </div>

                <div>
                  <p className="text-[13px] font-black leading-[1.35]">
                    {title}
                  </p>
                  <p className="mt-1 text-[12px] leading-[1.45] text-[#6d6876]">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-5 rounded-[30px] bg-white p-5 shadow-sm ring-1 ring-[#ece8f0] sm:p-7">
          <h2 className="text-[20px] font-black leading-[1.35] tracking-[-0.055em] text-[#c46b8d] sm:text-[28px]">
            이런 결과를 보여드려요
          </h2>

          <div className="mt-5 rounded-[24px] border border-[#ece8f0] bg-[#fdfcff] p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[13px] font-black text-[#c46b8d]">
                  AI 추천 1위
                </p>
                <p className="mt-2 text-[20px] font-black tracking-[-0.04em]">
                  A 업체
                </p>
              </div>

              <div className="rounded-[18px] bg-[#b85c82] px-4 py-3 text-center text-white shadow-lg shadow-[#b85c82]/20">
                <p className="text-[11px] font-bold">추천점수</p>
                <p className="text-2xl font-black">92</p>
              </div>
            </div>

            <div className="mt-5 space-y-2 text-[13px] font-bold leading-[1.45] text-[#222237]">
              <p>✓ 가격 대비 구성이 가장 안정적이에요</p>
              <p>✓ 추가비용 가능성이 낮아요</p>
              <p>✓ 선택한 기준과 가장 잘 맞아요</p>
            </div>

            <div className="mt-5 rounded-[18px] bg-white p-4 ring-1 ring-[#ece8f0]">
              <p className="text-[13px] font-black text-[#c46b8d]">
                확인 필요
              </p>
              <p className="mt-2 text-[13px] leading-6 text-[#6d6876]">
                계약서 제공 여부와 추가 옵션 비용은 확인이 필요해요.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="fixed bottom-[62px] left-0 right-0 z-40 bg-gradient-to-t from-[#fdfcff] via-[#fdfcff] to-transparent px-5 pb-3 pt-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/test/quote-add"
            className="flex h-[56px] w-full items-center justify-center rounded-[22px] bg-[#c46b8d] text-[15px] font-black text-white shadow-lg shadow-[#c46b8d]/25 transition active:scale-[0.98]"
          >
            견적 분석하기
          </Link>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#ece8f0] bg-white/95 backdrop-blur">
        <div className="mx-auto grid max-w-5xl grid-cols-5 px-2 py-2 text-center text-[11px] font-semibold text-[#aaa0aa]">
          <Link href="/" className="rounded-2xl py-2 text-[#c46b8d]">
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
          <Link href="/mypage" className="rounded-2xl py-2">
            <div className="text-lg leading-none">○</div>
            <div className="mt-1">마이</div>
          </Link>
        </div>
      </nav>
    </main>
  );
}