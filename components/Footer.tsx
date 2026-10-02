import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[#080808] px-4 py-8 sm:px-6">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">

                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2"
                >
                    <Image
                        src="/logo.png"
                        alt="FitLog Logo"
                        width={40}
                        height={40}
                        className="h-9 w-9 object-contain"
                    />

                    <span className="text-xl font-extrabold tracking-tight text-white">
                        FITLOG
                    </span>
                </Link>

                {/* Copyright */}
                <p className="text-center text-xs text-gray-500 sm:text-right sm:text-sm">
                    © 2026 FitLog — Workout Library. Train hard, log honest.
                </p>

            </div>
        </footer>
    );
}

