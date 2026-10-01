"use client";

import { useEffect, useState } from "react";
import type { Workout } from "@/types/workout";
import WorkoutCard from "@/components/WorkoutCard";

export default function WorkoutLibrary() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const loadWorkouts = async () => {
            try {
                const response = await fetch(
                    "https://api.abcz.workers.dev/api/fitlog"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch workouts");
                }

                const data = await response.json();

                setWorkouts(data);
            } catch (error) {
                console.error(
                    "Failed to load workouts:",
                    error
                );

                setError(true);
            } finally {
                setLoading(false);
            }
        };

        loadWorkouts();
    }, []);

    const filteredWorkouts = workouts.filter((workout) =>
        workout.name
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <section
            id="library"
            className="bg-[#080808] px-6 py-20"
        >
            <div className="mx-auto max-w-7xl">

                {/* Section Header */}
                <div className="mb-10">
                    <p className="text-sm font-semibold tracking-[0.25em] text-[#ccff00]">
                        WORKOUT LIBRARY
                    </p>

                    <h2 className="mt-3 text-4xl font-extrabold text-white sm:text-5xl">
                        THE LIBRARY
                    </h2>

                    <p className="mt-4 text-gray-400">
                        Twelve lifts covering every major muscle group.
                    </p>
                </div>

                {/* Search */}
                <div className="mb-10">
                    <input
                        type="text"
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        placeholder="Search workouts..."
                        className="w-full rounded-xl border border-white/10 bg-[#111111] px-5 py-4 text-white outline-none placeholder:text-gray-500 focus:border-[#ccff00] sm:max-w-xl"
                    />
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex min-h-[300px] items-center justify-center">
                        <p className="text-lg text-gray-400">
                            Loading workouts...
                        </p>
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="rounded-2xl border border-red-500/20 bg-[#111111] p-10 text-center">
                        <h3 className="text-2xl font-bold text-white">
                            Failed to load workouts
                        </h3>

                        <p className="mt-3 text-gray-400">
                            Please try again later.
                        </p>
                    </div>
                )}

                {/* No Search Result */}
                {!loading &&
                    !error &&
                    filteredWorkouts.length === 0 && (
                        <div className="rounded-2xl border border-white/10 bg-[#111111] p-10 text-center">
                            <h3 className="text-2xl font-bold text-white">
                                No workouts found
                            </h3>

                            <p className="mt-3 text-gray-400">
                                Try searching with another workout name.
                            </p>
                        </div>
                    )}

                {/* Workout Grid */}
                {!loading &&
                    !error &&
                    filteredWorkouts.length > 0 && (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredWorkouts.map((workout) => (
                                <WorkoutCard
                                    key={workout.id}
                                    workout={workout}
                                />
                            ))}
                        </div>
                    )}

            </div>
        </section>
    );
}