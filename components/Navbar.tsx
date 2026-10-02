"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Workout {
  id: number;
}

export default function Navbar() {
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

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

    const updateSavedCount = () => {
      const savedWorkouts =
        localStorage.getItem("savedWorkouts");

      if (savedWorkouts) {
        const saved: Workout[] =
          JSON.parse(savedWorkouts);

        setSavedCount(saved.length);
      } else {
        setSavedCount(0);
      }
    };

    updatePlanCount();
    updateSavedCount();

    window.addEventListener(
      "storage",
      updatePlanCount
    );

    window.addEventListener(
      "planUpdated",
      updatePlanCount
    );

    window.addEventListener(
      "storage",
      updateSavedCount
    );

    window.addEventListener(
      "savedUpdated",
      updateSavedCount
    );

    return () => {
      window.removeEventListener(
        "storage",
        updatePlanCount
      );

      window.removeEventListener(
        "planUpdated",
        updatePlanCount
      );

      window.removeEventListener(
        "storage",
        updateSavedCount
      );

      window.removeEventListener(
        "savedUpdated",
        updateSavedCount
      );
    };
  }, []);

  return (
    <nav className="border-b border-white/10 bg-[#080808]">
      <div className="mx-auto flex min-h-20 max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <Image
            src="/logo.png"
            alt="FitLog Logo"
            width={42}
            height={42}
            priority
            className="h-9 w-9 object-contain sm:h-10 sm:w-10"
          />

          <span className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
            FITLOG
          </span>
        </Link>

        {/* Navigation */}
        <div className="order-3 flex w-full items-center justify-center gap-4 sm:order-none sm:w-auto sm:gap-8">
          <Link
            href="/"
            className="rounded-full border border-[#ccff00] px-4 py-2 text-xs font-medium text-white sm:px-5 sm:text-sm"
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className="text-xs font-medium text-gray-400 transition hover:text-white sm:text-sm"
          >
            My Plan
          </Link>
        </div>

        {/* Counters */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/my-plan"
            className="rounded-full bg-[#ccff00] px-3 py-2 text-xs font-bold text-black sm:px-4 sm:text-sm"
          >
            Plan {planCount}
          </Link>

          <Link
            href="/saved"
            className="rounded-full border border-white/20 px-3 py-2 text-xs font-medium text-white sm:px-4 sm:text-sm"
          >
            Saved {savedCount}
          </Link>
        </div>

      </div>
    </nav>
  );
}