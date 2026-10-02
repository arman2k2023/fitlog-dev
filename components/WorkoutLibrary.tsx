"use client";

import { useEffect, useState } from "react";
import type { Workout } from "@/types/workout";
import WorkoutCard from "@/components/WorkoutCard";

export default function WorkoutLibrary() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [search, setSearch] = useState("");
    const [difficulty, setDifficulty] = useState("All");
    const [muscle, setMuscle] = useState("All");

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

    const filteredWorkouts = workouts.filter((workout) => {
        const matchesSearch = workout.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesDifficulty =
            difficulty === "All" ||
            workout.difficulty === difficulty;

        const matchesMuscle =
            muscle === "All" ||
            workout.muscleGroups?.includes(muscle);

        return (
            matchesSearch &&
            matchesDifficulty &&
            matchesMuscle
        );
    });

    const handleClearFilters = () => {
        setSearch("");
        setDifficulty("All");
        setMuscle("All");
    };

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

                {/* Search + Filters */}
                <div className="mb-10 flex flex-col gap-4 lg:flex-row">

                    {/* Search */}
                    <input
                        type="text"
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        placeholder="Search workouts..."
                        className="w-full rounded-xl border border-white/10 bg-[#111111] px-5 py-4 text-white outline-none placeholder:text-gray-500 focus:border-[#ccff00] lg:max-w-md"
                    />

                    {/* Difficulty */}
                    <select
                        value={difficulty}
                        onChange={(event) =>
                            setDifficulty(event.target.value)
                        }
                        className="rounded-xl border border-white/10 bg-[#111111] px-5 py-4 text-white outline-none focus:border-[#ccff00]"
                    >
                        <option value="All">
                            All Difficulties
                        </option>

                        <option value="Beginner">
                            Beginner
                        </option>

                        <option value="Intermediate">
                            Intermediate
                        </option>

                        <option value="Advanced">
                            Advanced
                        </option>
                    </select>

                    {/* Muscle Group */}
                    <select
                        value={muscle}
                        onChange={(event) =>
                            setMuscle(event.target.value)
                        }
                        className="rounded-xl border border-white/10 bg-[#111111] px-5 py-4 text-white outline-none focus:border-[#ccff00]"
                    >
                        <option value="All">
                            All Muscles
                        </option>

                        <option value="Chest">
                            Chest
                        </option>

                        <option value="Arms">
                            Arms
                        </option>

                        <option value="Back">
                            Back
                        </option>

                        <option value="Legs">
                            Legs
                        </option>

                        <option value="Shoulders">
                            Shoulders
                        </option>

                        <option value="Core">
                            Core
                        </option>
                    </select>

                    {/* Clear Button */}
                    <button
                        type="button"
                        onClick={handleClearFilters}
                        className="rounded-xl border border-white/20 px-6 py-4 text-sm font-bold text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
                    >
                        CLEAR FILTERS
                    </button>

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

                {/* No Results */}
                {!loading &&
                    !error &&
                    filteredWorkouts.length === 0 && (
                        <div className="rounded-2xl border border-white/10 bg-[#111111] p-10 text-center">
                            <h3 className="text-2xl font-bold text-white">
                                No workouts found
                            </h3>

                            <p className="mt-3 text-gray-400">
                                Try changing your search or filters.
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