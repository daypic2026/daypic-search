"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "홈", href: "/test", icon: "⌂" },
  { label: "견적추가", href: "/test/quote-add", icon: "+" },
  { label: "견적함", href: "/test/quote-box", icon: "▱" },
  { label: "찾기", href: "/", icon: "⌕" },
  { label: "마이", href: "/test/mypage", icon: "○" },
];

export default function QuoteBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 border-t border-[#FFE1EC] bg-white/95 px-4 pb-5 pt-3 backdrop-blur">
      <div className="grid grid-cols-5 text-center">
        {navItems.map((item) => {
          const active =
            item.href === "/test"
              ? pathname === "/test"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center gap-1"
            >
              <span
                className={`text-2xl leading-none ${
                  active ? "text-[#FF6B9D]" : "text-[#B8AEB8]"
                }`}
              >
                {item.icon}
              </span>

              <span
                className={`text-[11px] font-black ${
                  active ? "text-[#FF6B9D]" : "text-[#B8AEB8]"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}