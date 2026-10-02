import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
            <main className="min-h-screen bg-[#080808]">
                <Navbar />

                <section className="flex min-h-[70vh] items-center justify-center px-6">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-white sm:text-4xl">
                            Workout Not Found
                        </h1>

                        <p className="mt-3 text-sm text-gray-400 sm:text-base">
                            We could not find this workout.
                        </p>
                    </div>
                </section>

                <Footer />
            </main>
        );
    }

    const data = await response.json();

    const workout = data?.data ?? data;

    if (!workout) {
        return (
            <main className="min-h-screen bg-[#080808]">
                <Navbar />

                <section className="flex min-h-[70vh] items-center justify-center px-6">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-white sm:text-4xl">
                            Workout Not Found
                        </h1>

                        <p className="mt-3 text-sm text-gray-400 sm:text-base">
                            Workout data is unavailable.
                        </p>
                    </div>
                </section>

                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#080808]">
            <Navbar />

            <section className="px-4 py-14 sm:px-6 sm:py-20">
                <div className="mx-auto max-w-7xl">
                    <WorkoutDetail workout={workout} />
                </div>
            </section>

            <Footer />
        </main>
    );
}