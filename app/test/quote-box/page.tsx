"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Plus,
  RotateCcw,
} from "lucide-react";

type QuoteProject = {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  vendorName: string;
  price: string;
  completeness: number;
  confirmedCount: number;
  missingCount: number;
  checkCount: number;
  updatedAt: string;
  status: "ready" | "draft";
};

const sampleProjects: QuoteProject[] = [
  {
    id: "quote-1",
    title: "위브스냅 견적",
    category: "wedding-snap",
    categoryLabel: "본식스냅",
    vendorName: "위브스냅",
    price: "95만원",
    completeness: 67,
    confirmedCount: 8,
    missingCount: 4,
    checkCount: 1,
    updatedAt: "방금 전",
    status: "ready",
  },
];

export default function QuoteBoxPage() {
  const [projects, setProjects] = useState<QuoteProject[]>(sampleProjects);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    const savedDraft = localStorage.getItem("quoteDraft");

    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);

        const exists = sampleProjects.some(
          (item) => item.vendorName === draft.vendorName
        );

        if (!exists) {
          setProjects([
            {
              id: "quote-local",
              title: `${draft.vendorName || "업체명 미정"} 견적`,
              category: draft.category || "wedding-snap",
              categoryLabel: draft.categoryLabel || "본식스냅",
              vendorName: draft.vendorName || "업체명 미정",
              price: "95만원",
              completeness: 67,
              confirmedCount: 8,
              missingCount: 4,
              checkCount: 1,
              updatedAt: "방금 전",
              status: "ready",
            },
            ...sampleProjects,
          ]);
        }
      } catch {
        setProjects(sampleProjects);
      }
    }
  }, []);

  const selectedProjects = projects.filter((item) =>
    selectedIds.includes(item.id)
  );

  const selectedCategory = selectedProjects[0]?.category;

  const canCompare =
    selectedProjects.length >= 2 &&
    selectedProjects.every((item) => item.category === selectedCategory);

  const groupedProjects = useMemo(() => {
    return projects.reduce<Record<string, QuoteProject[]>>((acc, project) => {
      if (!acc[project.categoryLabel]) acc[project.categoryLabel] = [];
      acc[project.categoryLabel].push(project);
      return acc;
    }, {});
  }, [projects]);

  const totalMissing = projects.reduce(
    (sum, item) => sum + item.missingCount,
    0
  );

  const averageCompleteness =
    projects.length > 0
      ? Math.round(
          projects.reduce((sum, item) => sum + item.completeness, 0) /
            projects.length
        )
      : 0;

  const toggleSelect = (project: QuoteProject) => {
    setSelectedIds((prev) => {
      if (prev.includes(project.id)) {
        return prev.filter((id) => id !== project.id);
      }

      if (prev.length > 0) {
        const firstSelected = projects.find((item) => item.id === prev[0]);

        if (firstSelected && firstSelected.category !== project.category) {
          return [project.id];
        }
      }

      return [...prev, project.id];
    });
  };

  const handleCompare = () => {
    if (!canCompare) return;

    localStorage.setItem(
      "quoteCompareDraft",
      JSON.stringify({
        quoteIds: selectedIds,
        category: selectedCategory,
        quotes: selectedProjects,
      })
    );

    window.location.href = "/test/quote-compare";
  };

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
              <p className="text-sm font-black text-[#c46b8d]">내 견적함</p>

              <h1 className="mt-3 text-[28px] font-black leading-[1.22] tracking-[-0.055em] sm:text-[42px]">
                분석한 견적을
                <br />
                <span className="text-[#c46b8d]">한 곳에서 비교</span>
                해요
              </h1>

              <p className="mt-4 max-w-2xl text-[14px] leading-6 text-[#6d6876] sm:text-[16px] sm:leading-7">
                같은 업종 견적을 2개 이상 선택하면, 저장된 표준 분석 결과를
                기준으로 비교할 수 있어요.
              </p>
            </div>
          </div>
        </section>

        {projects.length > 0 ? (
          <>
            <section className="mt-5 grid grid-cols-3 gap-2">
              <SummaryCard title="저장 견적" value={`${projects.length}개`} />
              <SummaryCard title="평균 완성도" value={`${averageCompleteness}%`} />
              <SummaryCard title="미확인" value={`${totalMissing}건`} warning />
            </section>

            <section className="mt-5 rounded-[30px] bg-[#222237] p-5 text-white shadow-sm sm:p-7">
              <p className="text-sm font-black text-[#e5a9bf]">
                비교 분석 준비
              </p>

              <h2 className="mt-2 text-[22px] font-black leading-[1.35] tracking-[-0.04em]">
                같은 업종 견적을
                <br />
                2개 이상 선택해 주세요.
              </h2>

              <p className="mt-3 text-sm font-bold leading-6 text-white/70">
                현재 {selectedProjects.length}개 선택됨
                {selectedProjects.length > 0 &&
                  ` · ${selectedProjects[0].categoryLabel}`}
              </p>
            </section>

            <section className="mt-5 space-y-6">
              {Object.entries(groupedProjects).map(([categoryLabel, items]) => (
                <div key={categoryLabel}>
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-xl font-black tracking-[-0.04em]">
                      {categoryLabel}
                    </h2>
                    <p className="text-xs font-black text-[#c46b8d]">
                      {items.length}개
                    </p>
                  </div>

                  <div className="space-y-3">
                    {items.map((project) => {
                      const isSelected = selectedIds.includes(project.id);

                      return (
                        <QuoteCard
                          key={project.id}
                          project={project}
                          isSelected={isSelected}
                          onClick={() => toggleSelect(project)}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </section>

            <section className="mt-5 rounded-[30px] bg-white p-5 shadow-sm ring-1 ring-[#ece8f0] sm:p-7">
              <h2 className="text-xl font-black tracking-[-0.04em]">
                견적함에서 할 수 있는 것
              </h2>

              <div className="mt-4 space-y-3">
                <GuideItem title="같은 업종 견적끼리 비교할 수 있어요" />
                <GuideItem title="견적서 완성도와 미확인 항목을 비교해요" />
                <GuideItem title="API 없이 저장된 분석 결과로 1차 비교해요" />
              </div>
            </section>
          </>
        ) : (
          <EmptyState />
        )}
      </div>

      <div className="fixed bottom-[74px] left-0 right-0 z-40 bg-gradient-to-t from-[#fdfcff] via-[#fdfcff] to-transparent px-5 pb-4 pt-8">
        <div className="mx-auto max-w-5xl">
          <button
            type="button"
            onClick={handleCompare}
            disabled={!canCompare}
            className={`flex h-[56px] w-full items-center justify-center gap-2 rounded-[22px] text-[15px] font-black transition active:scale-[0.98] ${
              canCompare
                ? "bg-[#c46b8d] text-white shadow-lg shadow-[#c46b8d]/25"
                : "bg-[#f1e6eb] text-[#a99ba4]"
            }`}
          >
            선택한 견적 비교하기
            <ArrowRight size={18} />
          </button>
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

function SummaryCard({
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

function QuoteCard({
  project,
  isSelected,
  onClick,
}: {
  project: QuoteProject;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-[28px] border p-5 text-left transition active:scale-[0.98] ${
        isSelected
          ? "border-[#c46b8d] bg-[#f8eef2]"
          : "border-[#ece8f0] bg-white"
      }`}
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black text-[#c46b8d]">
            {project.categoryLabel}
          </p>
          <h3 className="mt-1 text-xl font-black tracking-[-0.04em]">
            {project.vendorName}
          </h3>
          <p className="mt-1 text-xs font-bold text-[#7c6f7c]">
            {project.updatedAt}
          </p>
        </div>

        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full ${
            isSelected
              ? "bg-[#c46b8d] text-white"
              : "bg-[#f8eef2] text-[#c46b8d]"
          }`}
        >
          {isSelected ? <CheckCircle2 size={18} /> : <FileText size={16} />}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <SmallInfo title="가격" value={project.price} />
        <SmallInfo title="완성도" value={`${project.completeness}%`} />
        <SmallInfo
          title="미확인"
          value={`${project.missingCount}건`}
          warning={project.missingCount > 0}
        />
      </div>

      <Link
        href="/test/quote-result"
        onClick={(e) => e.stopPropagation()}
        className="mt-4 flex h-[50px] items-center justify-center rounded-[18px] bg-white text-sm font-black text-[#c46b8d] ring-1 ring-[#ece8f0]"
      >
        분석 결과 보기
      </Link>
    </button>
  );
}

function SmallInfo({
  title,
  value,
  warning,
}: {
  title: string;
  value: string;
  warning?: boolean;
}) {
  return (
    <div className="rounded-[16px] bg-white px-3 py-3 text-center ring-1 ring-[#ece8f0]">
      <p className="text-[11px] font-bold text-[#8b7d86]">{title}</p>
      <p
        className={`mt-1 text-sm font-black ${
          warning ? "text-[#e58a5c]" : "text-[#222237]"
        }`}
      >
        {value}
      </p>
    </div>
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

function EmptyState() {
  return (
    <section className="mt-5 rounded-[34px] bg-white p-7 text-center shadow-sm ring-1 ring-[#ece8f0]">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] bg-[#f8eef2] text-3xl">
        📄
      </div>

      <h2 className="mt-6 text-[26px] font-black leading-snug tracking-[-0.06em]">
        아직 저장된
        <br />
        견적이 없어요
      </h2>

      <p className="mt-4 text-sm font-bold leading-6 text-[#7c6f7c]">
        받은 견적을 붙여넣으면
        <br />
        DayPic Standard로 정리해드려요.
      </p>

      <Link
        href="/test/quote-add"
        className="mt-7 flex h-[58px] items-center justify-center rounded-[22px] bg-[#c46b8d] text-[15px] font-black text-white shadow-lg shadow-[#c46b8d]/25"
      >
        첫 견적 추가하기
      </Link>
    </section>
  );
}