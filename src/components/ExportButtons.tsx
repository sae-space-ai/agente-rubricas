import { useState } from 'react';
import { exportToXLSX, exportToWord, exportToPDF, ExportData } from '../services/exportService';
import { AsignaturaData } from '../data/curriculum';

interface ExportButtonsProps {
  asignatura: AsignaturaData;
  curso: string;
}

export default function ExportButtons({ asignatura, curso }: ExportButtonsProps) {
  const [exporting, setExporting] = useState<string | null>(null);

  const handleExportXLSX = async () => {
    setExporting('xlsx');
    try {
      const data: ExportData = { asignatura, curso };
      await exportToXLSX(data);
    } catch (error) {
      console.error('Error al exportar a XLSX:', error);
      alert('Error al exportar a Excel. Por favor, inténtelo de nuevo.');
    } finally {
      setTimeout(() => setExporting(null), 1000);
    }
  };

  const handleExportWord = async () => {
    setExporting('word');
    try {
      const data: ExportData = { asignatura, curso };
      await exportToWord(data);
    } catch (error) {
      console.error('Error al exportar a Word:', error);
      alert('Error al exportar a Word. Por favor, inténtelo de nuevo.');
    } finally {
      setTimeout(() => setExporting(null), 1000);
    }
  };

  const handleExportPDF = async () => {
    setExporting('pdf');
    try {
      const data: ExportData = { asignatura, curso };
      await exportToPDF(data);
    } catch (error) {
      console.error('Error al exportar a PDF:', error);
      alert('Error al exportar a PDF. Por favor, inténtelo de nuevo.');
    } finally {
      setTimeout(() => setExporting(null), 1000);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={handleExportXLSX}
        disabled={exporting !== null}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all shadow-sm ${
          exporting === 'xlsx'
            ? 'bg-green-600 text-white'
            : 'bg-green-500 text-white hover:bg-green-600 hover:shadow-md'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {exporting === 'xlsx' ? (
          <>
            <i className="fas fa-spinner fa-spin"></i>
            <span>Exportando...</span>
          </>
        ) : (
          <>
            <i className="fas fa-file-excel"></i>
            <span>Excel (XLSX)</span>
          </>
        )}
      </button>

      <button
        onClick={handleExportWord}
        disabled={exporting !== null}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all shadow-sm ${
          exporting === 'word'
            ? 'bg-blue-600 text-white'
            : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-md'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {exporting === 'word' ? (
          <>
            <i className="fas fa-spinner fa-spin"></i>
            <span>Exportando...</span>
          </>
        ) : (
          <>
            <i className="fas fa-file-word"></i>
            <span>Word (DOCX)</span>
          </>
        )}
      </button>

      <button
        onClick={handleExportPDF}
        disabled={exporting !== null}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all shadow-sm ${
          exporting === 'pdf'
            ? 'bg-red-600 text-white'
            : 'bg-red-500 text-white hover:bg-red-600 hover:shadow-md'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {exporting === 'pdf' ? (
          <>
            <i className="fas fa-spinner fa-spin"></i>
            <span>Exportando...</span>
          </>
        ) : (
          <>
            <i className="fas fa-file-pdf"></i>
            <span>PDF</span>
          </>
        )}
      </button>
    </div>
  );
}
