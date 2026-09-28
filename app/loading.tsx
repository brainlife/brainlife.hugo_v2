export default function Loading() {
    return (
        <div className="min-h-screen bg-[#060a14] text-white flex flex-col font-sans overflow-hidden">
            {/* Embedded Keyframes for instant shimmer animation */}
            <style>{`
                @keyframes blShimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .skeleton-pulse {
                    position: relative;
                    overflow: hidden;
                    background: rgba(30, 41, 59, 0.65);
                }
                .skeleton-pulse::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    transform: translateX(-100%);
                    background: linear-gradient(
                        90deg,
                        transparent 0%,
                        rgba(92, 197, 216, 0.12) 50%,
                        transparent 100%
                    );
                    animation: blShimmer 1.8s infinite cubic-bezier(0.4, 0, 0.2, 1);
                }
            `}</style>

            {/* Navbar Skeleton */}
            <header className="h-[72px] w-full border-b border-white/5 px-6 lg:px-12 flex items-center justify-between z-10 backdrop-blur-md bg-[#0b1120]/80">
                {/* Logo & Brand Skeleton */}
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg skeleton-pulse" />
                    <div className="w-24 h-5 rounded skeleton-pulse" />
                </div>

                {/* Nav Links Skeleton */}
                <div className="hidden lg:flex items-center gap-8">
                    <div className="w-14 h-4 rounded skeleton-pulse" />
                    <div className="w-12 h-4 rounded skeleton-pulse" />
                    <div className="w-14 h-4 rounded skeleton-pulse" />
                    <div className="w-14 h-4 rounded skeleton-pulse" />
                    <div className="w-16 h-4 rounded skeleton-pulse" />
                </div>

                {/* Right Portal CTA Skeleton */}
                <div className="w-24 h-9 rounded border border-white/20 skeleton-pulse" />
            </header>

            {/* Hero Section Skeleton */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-20 flex flex-col">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
                    {/* Left Hero Column */}
                    <div className="lg:col-span-6 flex flex-col gap-6">
                        {/* Pill Tag */}
                        <div className="w-56 h-6 rounded-full skeleton-pulse" />

                        {/* Title Lines */}
                        <div className="flex flex-col gap-3">
                            <div className="w-full h-12 md:h-14 rounded-xl skeleton-pulse" />
                            <div className="w-4/5 h-12 md:h-14 rounded-xl skeleton-pulse" />
                        </div>

                        {/* Subtitle Lines */}
                        <div className="flex flex-col gap-2 pt-2">
                            <div className="w-full h-4 rounded skeleton-pulse" />
                            <div className="w-11/12 h-4 rounded skeleton-pulse" />
                            <div className="w-2/3 h-4 rounded skeleton-pulse" />
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex items-center gap-4 pt-4">
                            <div className="w-40 h-12 rounded-lg skeleton-pulse border border-[#5cc5d8]/40" />
                            <div className="w-36 h-12 rounded-lg skeleton-pulse border border-white/10" />
                        </div>

                        {/* Sponsors Row Skeleton */}
                        <div className="pt-8 flex items-center gap-6 opacity-40">
                            <div className="w-16 h-5 rounded skeleton-pulse" />
                            <div className="w-20 h-5 rounded skeleton-pulse" />
                            <div className="w-16 h-5 rounded skeleton-pulse" />
                            <div className="w-24 h-5 rounded skeleton-pulse" />
                        </div>
                    </div>

                    {/* Right Hero Visual Stage Skeleton */}
                    <div className="lg:col-span-6 flex items-center justify-center relative min-h-[460px]">
                        {/* Central Holographic Connectome Globe Placeholder */}
                        <div className="w-72 h-72 md:w-88 md:h-88 rounded-full skeleton-pulse border border-[#5cc5d8]/20 flex items-center justify-center">
                            <div
                                className="w-48 h-48 rounded-full border border-dashed border-[#5cc5d8]/30 animate-spin"
                                style={{ animationDuration: '20s' }}
                            />
                        </div>

                        {/* Top-Left Floating HUD Card Skeleton */}
                        <div className="absolute top-4 left-4 w-44 h-18 rounded-xl p-3 bg-[#0d1527]/90 border border-white/10 flex flex-col gap-2 shadow-2xl">
                            <div className="w-20 h-3 rounded skeleton-pulse" />
                            <div className="w-28 h-3.5 rounded skeleton-pulse" />
                            <div className="w-16 h-2.5 rounded skeleton-pulse" />
                        </div>

                        {/* Top-Right Floating HUD Card Skeleton */}
                        <div className="absolute top-8 right-4 w-48 h-20 rounded-xl p-3 bg-[#0d1527]/90 border border-white/10 flex flex-col gap-2 shadow-2xl">
                            <div className="w-24 h-3 rounded skeleton-pulse" />
                            <div className="w-32 h-3.5 rounded skeleton-pulse" />
                            <div className="w-20 h-2.5 rounded skeleton-pulse" />
                        </div>

                        {/* Bottom Turntable Pedestal Skeleton */}
                        <div className="absolute bottom-6 w-64 h-5 rounded-full skeleton-pulse border border-[#5cc5d8]/30" />
                    </div>
                </div>

                {/* Bottom Section Wireframe Preview: Specialized Tools Grid */}
                <div className="pt-20 flex flex-col gap-8">
                    {/* Section Header */}
                    <div className="flex flex-col items-center gap-3 text-center mx-auto max-w-xl">
                        <div className="w-32 h-4 rounded-full skeleton-pulse" />
                        <div className="w-80 h-8 rounded-lg skeleton-pulse" />
                        <div className="w-96 h-4 rounded skeleton-pulse" />
                    </div>

                    {/* 4 Products Skeleton Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="h-80 rounded-3xl p-3 bg-[#0f172a]/60 border border-white/10 flex flex-col justify-between"
                            >
                                {/* Thumbnail */}
                                <div className="w-full h-36 rounded-2xl skeleton-pulse" />

                                {/* Card Body */}
                                <div className="flex flex-col gap-2 p-2">
                                    <div className="w-20 h-3 rounded skeleton-pulse" />
                                    <div className="w-36 h-4 rounded skeleton-pulse" />
                                    <div className="w-full h-3 rounded skeleton-pulse" />
                                    <div className="w-4/5 h-3 rounded skeleton-pulse" />
                                </div>

                                {/* Badges */}
                                <div className="flex gap-2 p-2">
                                    <div className="w-14 h-5 rounded-full skeleton-pulse" />
                                    <div className="w-16 h-5 rounded-full skeleton-pulse" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
