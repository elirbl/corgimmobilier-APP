import api from './api';

export interface SalesReportParams {
  agenceId?: number;
  dateDebut?: string;
  dateFin?: string;
  typeRapport?: string;
}

function downloadBlob(blob: Blob, fileName: string) {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

export const reportService = {
  downloadSalesExcel: async (params: SalesReportParams = {}): Promise<void> => {
    const { data } = await api.get('/api/reports/ventes/excel', { params, responseType: 'blob' });
    downloadBlob(data, 'ventes.xlsx');
  },

  downloadSalesPdf: async (params: SalesReportParams = {}): Promise<void> => {
    const { data } = await api.get('/api/reports/ventes/pdf', { params, responseType: 'blob' });
    downloadBlob(data, 'ventes.pdf');
  },
};
