interface BienCardSkeletonProps {
  variant?: 'grid' | 'list';
}

export function BienCardSkeleton({ variant = 'grid' }: BienCardSkeletonProps) {
  if (variant === 'list') {
    return (
      <div className="flex animate-pulse gap-4 rounded-lg border border-navy-100 bg-white p-4 shadow-sm">
        <div className="h-28 w-40 flex-shrink-0 rounded-md bg-navy-100" />
        <div className="flex flex-1 flex-col gap-2 py-1">
          <div className="h-4 w-2/3 rounded bg-navy-100" />
          <div className="h-4 w-1/3 rounded bg-navy-100" />
          <div className="mt-auto h-3 w-1/2 rounded bg-navy-100" />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-pulse overflow-hidden rounded-lg border border-navy-100 bg-white shadow-sm">
      <div className="h-44 w-full bg-navy-100" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-2/3 rounded bg-navy-100" />
        <div className="h-4 w-1/3 rounded bg-navy-100" />
        <div className="h-3 w-1/2 rounded bg-navy-100" />
      </div>
    </div>
  );
}
