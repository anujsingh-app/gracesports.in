import React from 'react';

export const ProductCardSkeleton: React.FC<{ index?: number }> = ({ index = 0 }) => {
  return (
    <div
      className="flex flex-col rounded-2xl bg-gradient-to-b from-white/[0.04] via-white/[0.015] to-transparent border border-white/[0.07] backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] overflow-hidden animate-pulse"
      style={{ animationDelay: `${(index % 4) * 120}ms` }}
    >
      {/* Top Gloss Highlight Line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Image Skeleton with Shimmer */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-white/[0.04] animate-shimmer">
        {/* Placeholder subtle icon or gradient center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.05]" />
        </div>

        {/* Top Badges Skeleton */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 pointer-events-none">
          <div className="w-24 h-5 rounded-lg bg-white/[0.08] animate-shimmer" />
          <div className="w-16 h-4 rounded-md bg-white/[0.06] animate-shimmer" />
        </div>

        {/* Vignette bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#090C13] to-transparent" />
      </div>

      {/* Content Skeleton */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Title line */}
        <div className="h-6 w-4/5 rounded-lg bg-white/[0.08] animate-shimmer" />

        {/* Short description lines */}
        <div className="space-y-1.5 my-1">
          <div className="h-3 w-full rounded bg-white/[0.04] animate-shimmer" />
          <div className="h-3 w-3/4 rounded bg-white/[0.04] animate-shimmer" />
        </div>

        {/* Specification pills */}
        <div className="flex flex-wrap gap-1.5 my-1">
          <div className="h-5 w-24 rounded-md bg-white/[0.04] animate-shimmer border border-white/[0.04]" />
          <div className="h-5 w-20 rounded-md bg-white/[0.04] animate-shimmer border border-white/[0.04]" />
        </div>

        {/* Price & Add to quote button row */}
        <div className="mt-auto pt-3 border-t border-white/[0.06] flex items-center justify-between">
          <div className="space-y-1">
            <div className="h-2.5 w-16 rounded bg-white/[0.04] animate-shimmer" />
            <div className="h-7 w-28 rounded-lg bg-white/[0.09] animate-shimmer" />
          </div>

          <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/[0.06] animate-shimmer" />
        </div>

        {/* Action buttons row */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="h-8 rounded-xl bg-white/[0.04] border border-white/[0.06] animate-shimmer" />
          <div className="h-8 rounded-xl bg-red-950/40 border border-red-500/20 animate-shimmer" />
        </div>
      </div>
    </div>
  );
};

export const ProductGridSkeleton: React.FC<{ count?: number }> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <ProductCardSkeleton key={idx} index={idx} />
      ))}
    </div>
  );
};
