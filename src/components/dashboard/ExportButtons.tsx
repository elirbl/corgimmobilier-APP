import { useState } from 'react';
import { reportService, type SalesReportParams } from '../../services/reportService';

interface ExportButtonsProps {
  params?: SalesReportParams;
}

export function ExportButtons({ params }: ExportButtonsProps) {
  const [loading, setLoading] = useState<'excel' | 'pdf' | null>(null);

  async function handleExport(type: 'excel' | 'pdf') {
    setLoading(type);
    try {
      if (type === 'excel') {
        await reportService.downloadSalesExcel(params);
      } else {
        await reportService.downloadSalesPdf(params);
      }
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => handleExport('excel')}
        disabled={loading !== null}
        className="rounded border border-navy-200 px-3 py-1.5 text-xs font-medium text-navy-600 hover:bg-navy-50 disabled:opacity-50"
      >
        {loading === 'excel' ? 'Export...' : 'Exporter Excel'}
      </button>
      <button
        type="button"
        onClick={() => handleExport('pdf')}
        disabled={loading !== null}
        className="rounded border border-navy-200 px-3 py-1.5 text-xs font-medium text-navy-600 hover:bg-navy-50 disabled:opacity-50"
      >
        {loading === 'pdf' ? 'Export...' : 'Exporter PDF'}
      </button>
    </div>
  );
}
