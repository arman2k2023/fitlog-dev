import Image from "next/image";

export default function Hero() {
    return (
        <section className="px-4 pt-6 sm:px-6 sm:pt-8">
            <div className="mx-auto max-w-7xl">

                {/* Hero Card */}
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#15181e]">

                    {/* Background Decoration */}
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#ccff00]/5 blur-3xl" />

                        <div className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-white/[0.02] blur-3xl" />
                    </div>

                    {/* Hero Content */}
                    <div className="relative grid min-h-[330px] grid-cols-1 items-center gap-8 px-6 py-10 sm:px-8 md:grid-cols-2 md:px-12 md:py-10">

                        {/* Left Side */}
                        <div className="max-w-xl">

                            <p className="mb-4 text-xs font-bold tracking-[0.18em] text-[#ccff00]">
                                WORKOUT LIBRARY
                            </p>

                            <h1 className="text-3xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
                                TRAIN WITH INTENT.
                                <br />
                                LOG EVERY SET.
                            </h1>

                            <p className="mt-5 max-w-lg text-sm leading-6 text-gray-400 sm:text-base">
                                FitLog is a dark, no-nonsense gym companion:
                                pick a lift, lock it into today's plan, and
                                watch the week's work add up.
                            </p>

                            <a
                                href="#library"
                                className="mt-6 inline-flex items-center rounded-md bg-[#ccff00] px-5 py-3 text-xs font-bold uppercase text-black transition hover:bg-[#b8eb00]"
                            >
                                Browse Workouts
                            </a>
                        </div>

                        {/* Right Side */}
                        <div className="relative flex min-h-[200px] items-center justify-center md:min-h-[250px] md:justify-end">

                            <Image
                                src="/banner.png"
                                alt="FitLog Workout"
                                width={420}
                                height={320}
                                priority
                                className="h-auto max-h-[220px] w-auto object-contain sm:max-h-[260px] md:max-h-[300px]"
                            />

                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}