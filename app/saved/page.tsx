"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Workout {
    id: number;
    image: string;
    name: string;
    difficulty: string;
    rating: number;
    duration: number;
    caloriesBurned: number;
    sets: number;
    reps: string;
}

export default function SavedPage() {
    const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);

    useEffect(() => {
        const loadSavedWorkouts = () => {
            const saved = localStorage.getItem("savedWorkouts");

            if (saved) {
                setSavedWorkouts(JSON.parse(saved));
            } else {
                setSavedWorkouts([]);
            }
        };

        loadSavedWorkouts();

        window.addEventListener(
            "savedUpdated",
            loadSavedWorkouts
        );

        return () => {
            window.removeEventListener(
                "savedUpdated",
                loadSavedWorkouts
            );
        };
    }, []);

    const handleRemoveSaved = (id: number) => {
        const updatedSaved = savedWorkouts.filter(
            (workout) => workout.id !== id
        );

        localStorage.setItem(
            "savedWorkouts",
            JSON.stringify(updatedSaved)
        );

        setSavedWorkouts(updatedSaved);

        window.dispatchEvent(new Event("savedUpdated"));
    };

    return (
        <main className="min-h-screen bg-[#080808] px-4 py-14 sm:px-6 sm:py-20">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div>
                    <p className="text-xs font-semibold tracking-[0.25em] text-[#ccff00] sm:text-sm">
                        YOUR SAVED WORKOUTS
                    </p>

                    <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-5xl">
                        SAVED WORKOUTS
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm text-gray-400 sm:mt-4 sm:text-base">
                        Your favorite workouts are saved here.
                    </p>
                </div>

                {/* Empty State */}
                {savedWorkouts.length === 0 ? (
                    <div className="mt-8 rounded-2xl border border-white/10 bg-[#111111] p-8 text-center sm:mt-12 sm:p-10">

                        <h2 className="text-xl font-bold text-white sm:text-2xl">
                            No saved workouts
                        </h2>

                        <p className="mt-3 text-sm text-gray-400 sm:text-base">
                            Save a workout to see it here.
                        </p>

                        <Link
                            href="/"
                            className="mt-6 inline-block rounded-xl bg-[#ccff00] px-5 py-3 text-sm font-bold text-black transition hover:opacity-90 sm:px-6"
                        >
                            BROWSE WORKOUTS
                        </Link>

                    </div>
                ) : (

                    /* Saved Workout Cards */
                    <div className="mt-8 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">

                        {savedWorkouts.map((workout) => (
                            <div
                                key={workout.id}
                                className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111]"
                            >

                                <Image
                                    src={workout.image}
                                    alt={workout.name}
                                    width={600}
                                    height={400}
                                    className="h-48 w-full object-cover sm:h-52"
                                />

                                <div className="p-4 sm:p-5">

                                    <h2 className="text-lg font-bold text-white sm:text-xl">
                                        {workout.name}
                                    </h2>

                                    <div className="mt-3 flex flex-wrap gap-2">

                                        <span className="rounded-full border border-[#ccff00] px-3 py-1 text-xs text-[#ccff00]">
                                            {workout.difficulty}
                                        </span>

                                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300">
                                            ⭐ {workout.rating}
                                        </span>

                                    </div>

                                    {/* Workout Stats */}
                                    <div className="mt-5 grid grid-cols-2 gap-3">

                                        <div className="rounded-lg bg-[#080808] p-3">
                                            <p className="text-[10px] text-gray-500 sm:text-xs">
                                                DURATION
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-white sm:text-base">
                                                {workout.duration} min
                                            </p>
                                        </div>

                                        <div className="rounded-lg bg-[#080808] p-3">
                                            <p className="text-[10px] text-gray-500 sm:text-xs">
                                                CALORIES
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-white sm:text-base">
                                                {workout.caloriesBurned}
                                            </p>
                                        </div>

                                        <div className="rounded-lg bg-[#080808] p-3">
                                            <p className="text-[10px] text-gray-500 sm:text-xs">
                                                SETS
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-white sm:text-base">
                                                {workout.sets}
                                            </p>
                                        </div>

                                        <div className="rounded-lg bg-[#080808] p-3">
                                            <p className="text-[10px] text-gray-500 sm:text-xs">
                                                REPS
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-white sm:text-base">
                                                {workout.reps}
                                            </p>
                                        </div>

                                    </div>

                                    {/* Buttons */}
                                    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">

                                        <Link
                                            href={`/workout/${workout.id}`}
                                            className="rounded-xl bg-[#ccff00] px-4 py-3 text-center text-xs font-bold text-black transition hover:opacity-90 sm:text-sm"
                                        >
                                            VIEW
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemoveSaved(
                                                    workout.id
                                                )
                                            }
                                            className="rounded-xl border border-red-500/40 px-4 py-3 text-xs font-bold text-red-400 transition hover:bg-red-500/10 sm:text-sm"
                                        >
                                            REMOVE
                                        </button>

                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>
                )}
            </div>
        </main>
    );
}