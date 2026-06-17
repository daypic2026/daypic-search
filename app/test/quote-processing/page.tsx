"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const steps = [
  "견적 내용을 이해하고 있어요",
  "비교하기 쉽게 정리하고 있어요",
  "놓치기 쉬운 항목을 확인하고 있어요",
  "당신에게 맞는 추천을 만들고 있어요",
];

const checkItems = [
  { title: "가격 비교", desc: "총액과 옵션 비용 확인" },
  { title: "포함 구성", desc: "무엇이 포함됐는지 정리" },
  { title: "추가 비용", desc: "놓치기 쉬운 비용 체크" },
  { title: "추천 기준", desc: "우선순위 반영" },
];

export default function QuoteProcessingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(12);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + 5, 96);

        if (next >= 30) setStepIndex(1);
        if (next >= 58) setStepIndex(2);
        if (next >= 82) setStepIndex(3);

        if (next >= 96) {
          clearInterval(timer);
          setTimeout(() => {
            router.push("/test/quote-preference");
          }, 900);
        }

        return next;
      });
    }, 380);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <main className="min-h-screen bg-[#fdfcff] text-[#222237]">
      <div className="mx-auto min-h-screen max-w-5xl px-5 pb-32 pt-5 sm:px-8 lg:px-10">
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
                내 견적함 ›
              </Link>
            </div>

            <div className="mt-8 sm:mt-10">
              <p className="text-sm font-black text-[#c46b8d]">
                AI 분석 중
              </p>

              <h1 className="mt-3 text-[28px] font-black leading-[1.22] tracking-[-0.055em] sm:text-[42px]">
                견적을 읽고
                <br />
                <span className="text-[#c46b8d]">선택 기준을 정리</span>
                하고 있어요
              </h1>

              <p className="mt-4 max-w-2xl text-[14px] leading-6 text-[#6d6876] sm:text-[16px] sm:leading-7">
                가격과 구성을 같은 기준으로 비교하고, 놓치기 쉬운 항목까지
                함께 확인하고 있어요.
              </p>
            </div>

            <div className="mt-7">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-black text-[#c46b8d]">
                  {steps[stepIndex]}
                </p>
                <p className="text-sm font-black text-[#c46b8d]">
                  {progress}%
                </p>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-[#f8eef2]">
                <div
                  className="h-full rounded-full bg-[#c46b8d] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-[30px] bg-white p-5 shadow-sm ring-1 ring-[#ece8f0] sm:p-7">
          <h2 className="text-xl font-black tracking-[-0.04em]">
            분석 진행 상황
          </h2>

          <div className="mt-5 space-y-3">
            {steps.map((step, index) => {
              const active = index <= stepIndex;

              return (
                <div
                  key={step}
                  className={`flex items-center gap-3 rounded-[20px] px-4 py-4 transition ${
                    active ? "bg-[#f8eef2]" : "bg-[#fdfcff]"
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                      active
                        ? "bg-[#c46b8d] text-white"
                        : "bg-[#f1e6eb] text-[#a99ba4]"
                    }`}
                  >
                    {active ? "✓" : index + 1}
                  </div>

                  <p
                    className={`text-sm font-black ${
                      active ? "text-[#222237]" : "text-[#a99ba4]"
                    }`}
                  >
                    {step}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-5 rounded-[30px] bg-[#222237] p-5 text-white shadow-sm sm:p-7">
          <p className="text-sm font-black text-[#e5a9bf]">
            AI가 확인하는 항목
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {checkItems.map((item) => (
              <MiniCard key={item.title} title={item.title} desc={item.desc} />
            ))}
          </div>
        </section>

        <p className="mt-8 text-center text-sm font-bold leading-relaxed text-[#8b7d86]">
          잠시만 기다려주세요.
          <br />
          복잡한 견적을 쉽게 비교할 수 있도록 정리하고 있어요.
        </p>
      </div>
    </main>
  );
}

function MiniCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-[20px] bg-white/10 p-4 ring-1 ring-white/10">
      <p className="text-sm font-black text-white">{title}</p>
      <p className="mt-1 text-xs font-bold leading-5 text-white/70">{desc}</p>
    </div>
  );
}