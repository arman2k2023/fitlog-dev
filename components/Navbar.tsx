"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Workout {
  id: number;
}

export default function Navbar() {
  const [planCount, setPlanCount] = useState(0);

  useEffect(() => {
    const updatePlanCount = () => {
      const savedPlan = localStorage.getItem("todayPlan");

      if (savedPlan) {
        const plan: Workout[] = JSON.parse(savedPlan);
        setPlanCount(plan.length);
      } else {
        setPlanCount(0);
      }
    };

    updatePlanCount();

    window.addEventListener("storage", updatePlanCount);
    window.addEventListener("planUpdated", updatePlanCount);

    return () => {
      window.removeEventListener("storage", updatePlanCount);
      window.removeEventListener("planUpdated", updatePlanCount);
    };
  }, []);

  return (
    <nav className="border-b border-white/10 bg-[#080808]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="FitLog Logo"
            width={42}
            height={42}
            priority
            className="h-10 w-10 object-contain"
          />

          <span className="text-2xl font-extrabold tracking-tight text-white">
            FITLOG
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="rounded-full border border-[#ccff00] px-5 py-2 text-sm font-medium text-white"
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className="text-sm font-medium text-gray-400 transition hover:text-white"
          >
            My Plan
          </Link>
        </div>

        {/* Counters */}
        <div className="flex items-center gap-3">

          <Link
            href="/my-plan"
            className="rounded-full bg-[#ccff00] px-4 py-2 text-sm font-bold text-black"
          >
            Plan {planCount}
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white"
          >
            Saved 0
          </Link>

        </div>
      </div>
    </nav>
  );
}