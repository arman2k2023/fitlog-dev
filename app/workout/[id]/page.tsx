import WorkoutDetail from "@/components/WorkoutDetail";

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
        `https://api.abcz.workers.dev/api/fitlog/${id}`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#080808] px-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">
                        Workout Not Found
                    </h1>

                    <p className="mt-3 text-gray-400">
                        We could not find this workout.
                    </p>
                </div>
            </main>
        );
    }

    const data = await response.json();

    // API response থেকে workout বের করা
    const workout = data?.data ?? data;

    if (!workout) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#080808] px-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">
                        Workout Not Found
                    </h1>

                    <p className="mt-3 text-gray-400">
                        Workout data is unavailable.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#080808] px-6 py-20">
            <div className="mx-auto max-w-7xl">
                <WorkoutDetail workout={workout} />
            </div>
        </main>
    );
}
