import { useState } from 'react';
import { exportToXLSX, exportToWord, exportToPDF } from '../services/exportService';
import { Materia, materias } from '../data/curriculum';

interface ExportButtonsProps {
  materia: Materia;
  curso: string;
}

export default function ExportButtons({ materia, curso }: ExportButtonsProps) {
  const [exporting, setExporting] = useState<string | null>(null);

  const materiaData = materias.find(m => m.id === materia);
  const materiaNombre = materiaData?.nombre || materia;

  const handleExportXLSX = async () => {
    setExporting('xlsx');
    try {
      await exportToXLSX(materia, curso);
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
      await exportToWord(materia, curso);
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
      await exportToPDF(materia, curso);
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
