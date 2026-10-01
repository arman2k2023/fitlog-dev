"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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

export default function MyPlanPage() {
    const [plan, setPlan] = useState<Workout[]>([]);

    useEffect(() => {
        const loadPlan = () => {
            const savedPlan = localStorage.getItem("todayPlan");

            if (savedPlan) {
                setPlan(JSON.parse(savedPlan));
            } else {
                setPlan([]);
            }
        };

        loadPlan();

        window.addEventListener("planUpdated", loadPlan);

        return () => {
            window.removeEventListener("planUpdated", loadPlan);
        };
    }, []);

    const handleRemove = (id: number) => {
        const updatedPlan = plan.filter(
            (workout) => workout.id !== id
        );

        localStorage.setItem(
            "todayPlan",
            JSON.stringify(updatedPlan)
        );

        setPlan(updatedPlan);

        window.dispatchEvent(new Event("planUpdated"));
    };

    return (
        <main className="min-h-screen bg-[#080808] px-6 py-20">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div>
                    <p className="text-sm font-semibold tracking-[0.25em] text-[#ccff00]">
                        YOUR WORKOUT
                    </p>

                    <h1 className="mt-3 text-4xl font-extrabold text-white sm:text-5xl">
                        TODAY'S PLAN
                    </h1>

                    <p className="mt-4 max-w-2xl text-gray-400">
                        Your selected workouts for today.
                    </p>
                </div>

                {/* Empty State */}
                {plan.length === 0 ? (
                    <div className="mt-12 rounded-2xl border border-white/10 bg-[#111111] p-10 text-center">
                        <h2 className="text-2xl font-bold text-white">
                            No workouts yet
                        </h2>

                        <p className="mt-3 text-gray-400">
                            Add a workout from the workout library to get started.
                        </p>
                    </div>
                ) : (

                    /* Workout Cards */
                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {plan.map((workout) => (
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

                                    {/* Name */}
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

                                    {/* Workout Stats */}
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

                                    {/* Remove Button */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleRemove(workout.id)
                                        }
                                        className="mt-5 w-full rounded-xl border border-red-500/40 px-4 py-3 text-sm font-bold text-red-400 transition hover:bg-red-500/10"
                                    >
                                        REMOVE FROM PLAN
                                    </button>

                                </div>
                            </div>
                        ))}

                    </div>
                )}
            </div>
        </main>
    );
}