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
        <main className="min-h-screen bg-[#080808] px-6 py-20">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div>
                    <p className="text-sm font-semibold tracking-[0.25em] text-[#ccff00]">
                        YOUR SAVED WORKOUTS
                    </p>

                    <h1 className="mt-3 text-4xl font-extrabold text-white sm:text-5xl">
                        SAVED WORKOUTS
                    </h1>

                    <p className="mt-4 max-w-2xl text-gray-400">
                        Your favorite workouts are saved here.
                    </p>
                </div>

                {/* Empty State */}
                {savedWorkouts.length === 0 ? (
                    <div className="mt-12 rounded-2xl border border-white/10 bg-[#111111] p-10 text-center">

                        <h2 className="text-2xl font-bold text-white">
                            No saved workouts
                        </h2>

                        <p className="mt-3 text-gray-400">
                            Save a workout to see it here.
                        </p>

                        <Link
                            href="/"
                            className="mt-6 inline-block rounded-xl bg-[#ccff00] px-6 py-3 font-bold text-black transition hover:opacity-90"
                        >
                            BROWSE WORKOUTS
                        </Link>

                    </div>
                ) : (

                    /* Saved Workout Cards */
                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {savedWorkouts.map((workout) => (
                            <div
                                key={workout.id}
                                className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111]"
                            >

                                {/* Image */}
                                <Image
                                    src={workout.image}
                                    alt={workout.name}
                                    width={600}
                                    height={400}
                                    className="h-52 w-full object-cover"
                                />

                                <div className="p-5">

                                    {/* Workout Name */}
                                    <h2 className="text-xl font-bold text-white">
                                        {workout.name}
                                    </h2>

                                    {/* Difficulty + Rating */}
                                    <div className="mt-3 flex flex-wrap gap-2">

                                        <span className="rounded-full border border-[#ccff00] px-3 py-1 text-xs text-[#ccff00]">
                                            {workout.difficulty}
                                        </span>

                                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300">
                                            ⭐ {workout.rating}
                                        </span>

                                    </div>

                                    {/* Stats */}
                                    <div className="mt-5 grid grid-cols-2 gap-3">

                                        <div className="rounded-lg bg-[#080808] p-3">
                                            <p className="text-xs text-gray-500">
                                                DURATION
                                            </p>

                                            <p className="mt-1 font-semibold text-white">
                                                {workout.duration} min
                                            </p>
                                        </div>

                                        <div className="rounded-lg bg-[#080808] p-3">
                                            <p className="text-xs text-gray-500">
                                                CALORIES
                                            </p>

                                            <p className="mt-1 font-semibold text-white">
                                                {workout.caloriesBurned}
                                            </p>
                                        </div>

                                        <div className="rounded-lg bg-[#080808] p-3">
                                            <p className="text-xs text-gray-500">
                                                SETS
                                            </p>

                                            <p className="mt-1 font-semibold text-white">
                                                {workout.sets}
                                            </p>
                                        </div>

                                        <div className="rounded-lg bg-[#080808] p-3">
                                            <p className="text-xs text-gray-500">
                                                REPS
                                            </p>

                                            <p className="mt-1 font-semibold text-white">
                                                {workout.reps}
                                            </p>
                                        </div>

                                    </div>

                                    {/* Buttons */}
                                    <div className="mt-5 grid grid-cols-2 gap-3">

                                        <Link
                                            href={`/workout/${workout.id}`}
                                            className="rounded-xl bg-[#ccff00] px-4 py-3 text-center text-sm font-bold text-black transition hover:opacity-90"
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
                                            className="rounded-xl border border-red-500/40 px-4 py-3 text-sm font-bold text-red-400 transition hover:bg-red-500/10"
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