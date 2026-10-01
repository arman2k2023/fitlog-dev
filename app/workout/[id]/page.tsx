import Image from "next/image";

interface WorkoutDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function WorkoutDetailsPage({
    params,
}: WorkoutDetailsPageProps) {
    const { id } = await params;

    const response = await fetch(
        `https://api.abcz.workers.dev/api/fitlog/${id}`
    );

    const workout = await response.json();

    return (
        <main className="min-h-screen bg-[#080808] px-6 py-20">
            <div className="mx-auto max-w-7xl">

                <div className="grid gap-10 lg:grid-cols-2">

                    {/* Image */}
                    <div className="overflow-hidden rounded-3xl border border-white/10">
                        <Image
                            src={workout.image}
                            alt={workout.name}
                            width={800}
                            height={600}
                            className="h-full min-h-[400px] w-full object-cover"
                        />
                    </div>

                    {/* Details */}
                    <div>

                        <p className="text-sm font-semibold tracking-[0.25em] text-[#ccff00]">
                            WORKOUT DETAILS
                        </p>

                        <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl">
                            {workout.name}
                        </h1>

                        {/* Difficulty + Rating */}
                        <div className="mt-6 flex flex-wrap gap-3">
                            <span className="rounded-full border border-[#ccff00] px-4 py-2 text-sm text-[#ccff00]">
                                {workout.difficulty}
                            </span>

                            <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-gray-300">
                                ⭐ {workout.rating}
                            </span>
                        </div>

                        {/* Muscle Groups */}
                        <div className="mt-8">
                            <p className="text-xs font-semibold tracking-widest text-gray-500">
                                MUSCLE GROUPS
                            </p>

                            <div className="mt-3 flex flex-wrap gap-2">
                                {workout.muscleGroups?.map((muscle: string) => (
                                    <span
                                        key={muscle}
                                        className="rounded-full bg-white/10 px-4 py-2 text-sm text-gray-300"
                                    >
                                        {muscle}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Equipment */}
                        <div className="mt-6">
                            <p className="text-xs font-semibold tracking-widest text-gray-500">
                                EQUIPMENT
                            </p>

                            <div className="mt-3 flex flex-wrap gap-2">
                                {Array.isArray(workout.equipment) ? (
                                    workout.equipment.map((item: string) => (
                                        <span
                                            key={item}
                                            className="rounded-full border border-white/10 px-4 py-2 text-sm text-gray-300"
                                        >
                                            {item}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-sm text-gray-300">
                                        {workout.equipment}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Workout Stats */}
                        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">

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
                <section className="mt-16">
                    <p className="text-sm font-semibold tracking-[0.25em] text-[#ccff00]">
                        HOW TO DO IT
                    </p>

                    <h2 className="mt-3 text-3xl font-extrabold text-white">
                        INSTRUCTIONS
                    </h2>

                    <ol className="mt-6 space-y-4">
                        {workout.instructions?.map(
                            (instruction: string, index: number) => (
                                <li
                                    key={index}
                                    className="flex gap-4 rounded-xl border border-white/10 bg-[#111111] p-5"
                                >
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-sm font-bold text-black">
                                        {index + 1}
                                    </span>

                                    <p className="leading-7 text-gray-300">
                                        {instruction}
                                    </p>
                                </li>
                            )
                        )}
                    </ol>
                </section>

            </div>
        </main>
    );
}