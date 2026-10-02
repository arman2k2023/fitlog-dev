import type { Workout } from "@/types/workout";
import Link from "next/link";
import Image from "next/image";

interface WorkoutCardProps {
    workout: Workout;
}

export default function WorkoutCard({
    workout,
}: WorkoutCardProps) {
    return (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111]">

            {/* Image */}
            <Image
                src={workout.image}
                alt={workout.name}
                width={600}
                height={400}
                className="h-56 w-full object-cover"
            />

            {/* Content */}
            <div className="p-5">

                {/* Difficulty + Rating */}
                <div className="flex items-center justify-between">
                    <span className="rounded-full border border-[#ccff00] px-3 py-1 text-xs text-[#ccff00]">
                        {workout.difficulty}
                    </span>

                    <span className="text-sm text-white">
                        ⭐ {workout.rating}
                    </span>
                </div>

                {/* Name */}
                <Link href={`/workout/${workout.id}`}>
                    <h3 className="mt-4 text-xl font-bold text-white transition hover:text-[#ccff00]">
                        {workout.name}
                    </h3>
                </Link>

                {/* Equipment */}
                <p className="mt-2 text-sm text-gray-400">
                    {Array.isArray(workout.equipment)
                        ? workout.equipment.join(" · ")
                        : workout.equipment}
                </p>

                {/* Duration + Calories */}
                <div className="mt-3 flex gap-4 text-sm text-gray-400">
                    <span>
                        {workout.duration} min
                    </span>

                    <span>
                        {workout.caloriesBurned} calories
                    </span>
                </div>

                {/* Muscle Groups */}
                <div className="mt-4 flex flex-wrap gap-2">
                    {workout.muscleGroups.map((muscle) => (
                        <span
                            key={muscle}
                            className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300"
                        >
                            {muscle}
                        </span>
                    ))}
                </div>

                {/* View Details */}
                <Link
                    href={`/workout/${workout.id}`}
                    className="mt-5 block w-full rounded-full bg-[#ccff00] py-3 text-center text-sm font-bold text-black transition hover:bg-[#d9ff4d]"
                >
                    VIEW DETAILS
                </Link>

            </div>
        </div>
    );
}