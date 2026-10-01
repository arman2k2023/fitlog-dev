"use client";

import { useEffect, useState } from "react";
import type { Workout } from "@/types/workout";
import WorkoutCard from "@/components/WorkoutCard";

export default function WorkoutLibrary() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://api.abcz.workers.dev/api/fitlog")
            .then((response) => response.json())
            .then((data: Workout[]) => {
                setWorkouts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Failed to load workouts:", error);
                setLoading(false);
            });
    }, []);

    return (
        <section id="library" className="bg-[#080808] px-6 py-20">
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

                {/* Loading */}
                {loading && (
                    <div className="flex min-h-[300px] items-center justify-center">
                        <p className="text-lg text-gray-400">
                            Loading workouts…
                        </p>
                    </div>
                )}

                {/* Workout Grid */}
                {!loading && (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {workouts.map((workout) => (
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