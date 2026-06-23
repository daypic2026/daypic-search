import Link from "next/link";

const templates = [
  {
    href: "/quote-template/snap",
    icon: "📸",
    title: "본식스냅 견적서",
    desc: "촬영구성 · 결과물 · 납품일정 · 추가비용",
    tag: "가장 먼저 만들기 추천",
  },
  {
    href: "/quote-template/video",
    icon: "🎥",
    title: "본식영상 견적서",
    desc: "촬영구성 · 영상구성 · 하이라이트 · 납품일정",
    tag: "준비중",
  },
  {
    href: "/quote-template/iphone",
    icon: "📱",
    title: "아이폰스냅 견적서",
    desc: "촬영구성 · 원본전달 · 릴스제작 · 납품속도",
    tag: "준비중",
  },
];

export default function QuoteTemplatePage() {
  return (
    <main className="min-h-screen bg-[#FFF9FB] px-4 py-5 text-[#222237]">
      <div className="mx-auto max-w-[430px] pb-24">
        <header className="rounded-[32px] bg-white p-5 shadow-sm">
          <p className="text-[12px] font-bold text-[#D97A9B]">
            DayPic 표준견적서
          </p>

          <h1 className="mt-2 text-[28px] font-black leading-tight">
            업체마다 다른 견적서,
            <br />
            비교하기 쉽게
            <br />
            정리해요.
          </h1>

          <p className="mt-3 text-[13px] leading-relaxed text-[#6F6670]">
            항목을 선택하고 입력하면 예쁜 카드형 견적서로 자동 정리돼요.
            나중에는 이미지 저장과 공유까지 연결할 수 있어요.
          </p>
        </header>

        <section className="mt-5">
          <div className="mb-3 flex items-end justify-between">
            <div>
              <p className="text-[12px] font-bold text-[#D97A9B]">
                견적서 종류 선택
              </p>
              <h2 className="text-[20px] font-black">
                어떤 견적서를 만들까요?
              </h2>
            </div>
          </div>

          <div className="space-y-3">
            {templates.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-[28px] border border-[#F1DEE7] bg-white p-4 shadow-sm transition active:scale-[0.99]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF0F5] text-[24px]">
                    {item.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[17px] font-black">{item.title}</h3>
                      <span className="rounded-full bg-[#FFF0F5] px-2 py-1 text-[10px] font-bold text-[#D97A9B]">
                        {item.tag}
                      </span>
                    </div>

                    <p className="mt-1 text-[13px] leading-relaxed text-[#6F6670]">
                      {item.desc}
                    </p>
                  </div>

                  <span className="mt-3 text-[18px] font-black text-[#D97A9B]">
                    ›
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-5 rounded-[28px] bg-white p-5 shadow-sm">
          <h2 className="text-[17px] font-black">왜 표준견적서가 필요할까요?</h2>

          <div className="mt-4 space-y-3">
            {[
              "업체마다 다른 견적 양식을 같은 기준으로 정리할 수 있어요.",
              "포함/미포함 항목을 한눈에 확인할 수 있어요.",
              "추가비용과 확인필요 항목을 놓치지 않을 수 있어요.",
              "나중에 견적함, 비교표, AI 추천으로 확장할 수 있어요.",
            ].map((text) => (
              <div key={text} className="flex gap-3">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D97A9B] text-[11px] font-black text-white">
                  ✓
                </div>
                <p className="text-[13px] font-semibold leading-relaxed text-[#4A4250]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-5 rounded-[28px] bg-[#222237] p-5 text-white">
          <p className="text-[12px] font-bold text-[#F5B6CB]">
            DayPic 방향
          </p>
          <h2 className="mt-2 text-[20px] font-black leading-tight">
            견적서를 예쁘게 만드는 것보다
            <br />
            비교 가능한 기준을 만드는 게 핵심이에요.
          </h2>
          <p className="mt-3 text-[13px] leading-relaxed text-white/70">
            표준견적서가 쌓이면 이후에는 업체 간 비교, 확인필요 항목,
            추천점수, 선택 이유 데이터까지 연결할 수 있어요.
          </p>
        </section>
      </div>
    </main>
  );
}