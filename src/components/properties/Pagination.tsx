interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
  );

  return (
    <nav aria-label="Pagination" className="mt-6 flex items-center justify-center gap-1">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Page précédente"
        className="rounded-md px-3 py-2 text-sm font-medium text-navy-600 hover:bg-navy-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-40"
      >
        Précédent
      </button>

      {pages.map((p, idx) => {
        const prev = pages[idx - 1];
        const showEllipsis = prev !== undefined && p - prev > 1;

        return (
          <span key={p} className="flex items-center">
            {showEllipsis && <span className="px-2 text-navy-300">…</span>}
            <button
              type="button"
              onClick={() => onPageChange(p)}
              aria-current={p === page ? 'page' : undefined}
              className={`min-w-[2.25rem] rounded-md px-3 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                p === page ? 'bg-brand-600 text-white' : 'text-navy-600 hover:bg-navy-100'
              }`}
            >
              {p}
            </button>
          </span>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Page suivante"
        className="rounded-md px-3 py-2 text-sm font-medium text-navy-600 hover:bg-navy-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-40"
      >
        Suivant
      </button>
    </nav>
  );
}
