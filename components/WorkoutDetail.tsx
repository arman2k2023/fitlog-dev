"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface WorkoutDetailProps {
    workout: {
        id: number;
        image: string;
        name: string;
        difficulty: string;
        rating: number;
        muscleGroups?: string[];
        equipment: string | string[];
        duration: number;
        caloriesBurned: number;
        sets: number;
        reps: string;
        instructions?: string[];
    };
}

export default function WorkoutDetail({
    workout,
}: WorkoutDetailProps) {
    const [added, setAdded] = useState(false);
    const [saved, setSaved] = useState(false);

    // Check existing Plan and Saved status
    useEffect(() => {
        const existingPlan = JSON.parse(
            localStorage.getItem("todayPlan") || "[]"
        );

        const existingSaved = JSON.parse(
            localStorage.getItem("savedWorkouts") || "[]"
        );

        const alreadyAdded = existingPlan.some(
            (item: { id: number }) => item.id === workout.id
        );

        const alreadySaved = existingSaved.some(
            (item: { id: number }) => item.id === workout.id
        );

        setAdded(alreadyAdded);
        setSaved(alreadySaved);
    }, [workout.id]);

    // Add workout to today's plan
    const handleAddToPlan = () => {
        const existingPlan = JSON.parse(
            localStorage.getItem("todayPlan") || "[]"
        );

        const alreadyAdded = existingPlan.some(
            (item: { id: number }) => item.id === workout.id
        );

        if (!alreadyAdded) {
            const updatedPlan = [...existingPlan, workout];

            localStorage.setItem(
                "todayPlan",
                JSON.stringify(updatedPlan)
            );
        }

        setAdded(true);

        window.dispatchEvent(
            new Event("planUpdated")
        );
    };

    // Save workout
    const handleSaveWorkout = () => {
        const existingSaved = JSON.parse(
            localStorage.getItem("savedWorkouts") || "[]"
        );

        const alreadySaved = existingSaved.some(
            (item: { id: number }) => item.id === workout.id
        );

        if (!alreadySaved) {
            const updatedSaved = [
                ...existingSaved,
                workout,
            ];

            localStorage.setItem(
                "savedWorkouts",
                JSON.stringify(updatedSaved)
            );
        }

        setSaved(true);

        window.dispatchEvent(
            new Event("savedUpdated")
        );
    };

    return (
        <>
            {/* Main Details */}
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">

                {/* Image */}
                <div className="overflow-hidden rounded-2xl border border-white/10 sm:rounded-3xl">
                    <Image
                        src={workout.image}
                        alt={workout.name}
                        width={800}
                        height={600}
                        className="h-[300px] w-full object-cover sm:h-[400px] lg:h-full lg:min-h-[500px]"
                    />
                </div>

                {/* Details */}
                <div>

                    {/* Label */}
                    <p className="text-xs font-semibold tracking-[0.25em] text-[#ccff00] sm:text-sm">
                        WORKOUT DETAILS
                    </p>

                    {/* Title */}
                    <h1 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:mt-4 sm:text-5xl">
                        {workout.name}
                    </h1>

                    {/* Difficulty + Rating */}
                    <div className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
                        <span className="rounded-full border border-[#ccff00] px-3 py-2 text-xs text-[#ccff00] sm:px-4 sm:text-sm">
                            {workout.difficulty}
                        </span>

                        <span className="rounded-full bg-white/10 px-3 py-2 text-xs text-gray-300 sm:px-4 sm:text-sm">
                            ⭐ {workout.rating}
                        </span>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">

                        {/* Add to Plan */}
                        <button
                            type="button"
                            onClick={handleAddToPlan}
                            className="w-full rounded-xl bg-[#ccff00] px-5 py-3.5 text-sm font-bold text-black transition hover:opacity-90 sm:py-4"
                        >
                            {added
                                ? "ADDED TO TODAY'S PLAN ✓"
                                : "ADD TO TODAY'S PLAN"}
                        </button>

                        {/* Save */}
                        <button
                            type="button"
                            onClick={handleSaveWorkout}
                            className="w-full rounded-xl border border-white/20 px-5 py-3.5 text-sm font-bold text-white transition hover:border-[#ccff00] hover:text-[#ccff00] sm:py-4"
                        >
                            {saved
                                ? "SAVED WORKOUT ✓"
                                : "SAVE WORKOUT"}
                        </button>
                    </div>

                    {/* Muscle Groups */}
                    <div className="mt-7 sm:mt-8">
                        <p className="text-xs font-semibold tracking-widest text-gray-500">
                            MUSCLE GROUPS
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                            {workout.muscleGroups?.map(
                                (muscle) => (
                                    <span
                                        key={muscle}
                                        className="rounded-full bg-white/10 px-3 py-2 text-xs text-gray-300 sm:px-4 sm:text-sm"
                                    >
                                        {muscle}
                                    </span>
                                )
                            )}
                        </div>
                    </div>

                    {/* Equipment */}
                    <div className="mt-6">
                        <p className="text-xs font-semibold tracking-widest text-gray-500">
                            EQUIPMENT
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                            {Array.isArray(
                                workout.equipment
                            ) ? (
                                workout.equipment.map(
                                    (item) => (
                                        <span
                                            key={item}
                                            className="rounded-full border border-white/10 px-3 py-2 text-xs text-gray-300 sm:px-4 sm:text-sm"
                                        >
                                            {item}
                                        </span>
                                    )
                                )
                            ) : (
                                <span className="text-sm text-gray-300">
                                    {workout.equipment}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="mt-7 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4">

                        <div className="rounded-xl bg-[#111111] p-4">
                            <p className="text-xs text-gray-500">
                                DURATION
                            </p>

                            <p className="mt-1 font-bold text-white">
                                {workout.duration} min
                            </p>
                        </div>

                        <div className="rounded-xl bg-[#111111] p-4">
                            <p className="text-xs text-gray-500">
                                CALORIES
                            </p>

                            <p className="mt-1 font-bold text-white">
                                {workout.caloriesBurned}
                            </p>
                        </div>

                        <div className="rounded-xl bg-[#111111] p-4">
                            <p className="text-xs text-gray-500">
                                SETS
                            </p>

                            <p className="mt-1 font-bold text-white">
                                {workout.sets}
                            </p>
                        </div>

                        <div className="rounded-xl bg-[#111111] p-4">
                            <p className="text-xs text-gray-500">
                                REPS
                            </p>

                            <p className="mt-1 font-bold text-white">
                                {workout.reps}
                            </p>
                        </div>

                        <div className="rounded-xl bg-[#111111] p-4">
                            <p className="text-xs text-gray-500">
                                RATING
                            </p>

                            <p className="mt-1 font-bold text-white">
                                ⭐ {workout.rating}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Instructions */}
            <section className="mt-12 sm:mt-16">

                <p className="text-xs font-semibold tracking-[0.25em] text-[#ccff00] sm:text-sm">
                    HOW TO DO IT
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-white sm:mt-3 sm:text-3xl">
                    INSTRUCTIONS
                </h2>

                <ol className="mt-5 space-y-3 sm:mt-6 sm:space-y-4">
                    {workout.instructions?.map(
                        (instruction, index) => (
                            <li
                                key={index}
                                className="flex gap-3 rounded-xl border border-white/10 bg-[#111111] p-4 sm:gap-4 sm:p-5"
                            >
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-sm font-bold text-black">
                                    {index + 1}
                                </span>

                                <p className="text-sm leading-6 text-gray-300 sm:text-base sm:leading-7">
                                    {instruction}
                                </p>
                            </li>
                        )
                    )}
                </ol>
            </section>
        </>
    );
}

