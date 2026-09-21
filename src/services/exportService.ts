import { 
  nivelesLogro, 
  criterios, 
  competencias, 
  instrumentosEvaluacion, 
  generarDescriptor,
  materias,
  type Materia 
} from '../data/curriculum';

/**
 * Exporta la rúbrica a formato XLSX (Excel)
 */
export async function exportToXLSX(materia: Materia, curso: string): Promise<void> {
  const XLSX = await import('xlsx');
  const { saveAs } = await import('file-saver');

  const materiaData = materias.find(m => m.id === materia);
  const materiaNombre = materiaData?.nombre || materia;

  // Crear datos para la hoja
  const worksheetData: any[][] = [];

  // Título
  worksheetData.push([`Rúbrica de Evaluación - ${materiaNombre}, ${curso}`]);
  worksheetData.push(['Enseñanzas Profesionales de Música - Extremadura']);
  worksheetData.push(['Programación Didáctica 2026/2027 - Decreto 111/2007']);
  worksheetData.push([]);

  // Competencias
  worksheetData.push(['COMPETENCIAS (CM-1 a CM-7)']);
  competencias.forEach(comp => {
    worksheetData.push([`${comp.id}: ${comp.nombre}`]);
    worksheetData.push([comp.descripcion]);
    worksheetData.push([]);
  });

  // Niveles de Logro
  worksheetData.push(['NIVELES DE LOGRO']);
  worksheetData.push(['Nivel', 'Nombre', 'Descripción']);
  nivelesLogro.forEach(nivel => {
    worksheetData.push([`Nivel ${nivel.nivel}`, nivel.nombre, nivel.descripcion]);
  });
  worksheetData.push([]);

  // Criterios e Indicadores
  worksheetData.push(['CRITERIOS DE EVALUACIÓN (CO-01 a CO-12) E INDICADORES DE LOGRO']);
  worksheetData.push([]);

  // Encabezados de la tabla
  worksheetData.push(['Criterio (CO)', ...nivelesLogro.map(n => `Nivel ${n.nivel}: ${n.nombre}`)]);

  // Filas de criterios
  criterios.forEach(criterio => {
    const row = [`${criterio.id}: ${criterio.nombre} - ${criterio.descripcion}`];
    nivelesLogro.forEach(nivel => {
      row.push(generarDescriptor(criterio.id, nivel.nivel, curso));
    });
    worksheetData.push(row);
  });

  worksheetData.push([]);

  // Sistema de Puntuación
  worksheetData.push(['SISTEMA DE PUNTUACIÓN']);
  worksheetData.push(['Cada criterio se puntúa de 1 a 4']);
  worksheetData.push(['Puntuación máxima = Número de criterios × 4']);
  worksheetData.push(['Nota final = (Total suma × 10) / Puntuación máxima']);
  worksheetData.push([]);

  // Instrumentos de Evaluación
  worksheetData.push(['INSTRUMENTOS DE EVALUACIÓN SUGERIDOS']);
  worksheetData.push([instrumentosEvaluacion.join(', ')]);

  // Crear libro de trabajo
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(worksheetData);

  // Ajustar anchos de columna
  ws['!cols'] = [
    { wch: 50 },
    { wch: 30 },
    { wch: 30 },
    { wch: 30 },
    { wch: 30 }
  ];

  XLSX.utils.book_append_sheet(wb, ws, 'Rúbrica');

  // Generar archivo
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });

  saveAs(blob, `Rubrica_${materiaNombre.replace(/\s+/g, '_')}_${curso}.xlsx`);
}

/**
 * Exporta la rúbrica a formato Word (DOCX)
 */
export async function exportToWord(materia: Materia, curso: string): Promise<void> {
  const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType } = await import('docx');
  const { saveAs } = await import('file-saver');

  const materiaData = materias.find(m => m.id === materia);
  const materiaNombre = materiaData?.nombre || materia;

  const children: any[] = [];

  // Título
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `Rúbrica de Evaluación - ${materiaNombre}, ${curso}`,
          bold: true,
          size: 32,
        }),
      ],
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: 'Enseñanzas Profesionales de Música - Extremadura',
          size: 24,
        }),
      ],
      spacing: { after: 100 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: 'Programación Didáctica 2026/2027 - Decreto 111/2007',
          size: 20,
          italics: true,
        }),
      ],
      spacing: { after: 400 },
    })
  );

  // Competencias
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: 'COMPETENCIAS (CM-1 a CM-7)',
          bold: true,
          size: 28,
        }),
      ],
      spacing: { before: 200, after: 200 },
    })
  );

  competencias.forEach(comp => {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: `${comp.id}: ${comp.nombre}`, bold: true, size: 22 }),
        ],
        spacing: { after: 50 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: comp.descripcion, size: 20, italics: true }),
        ],
        spacing: { after: 200 },
      })
    );
  });

  // Niveles de Logro
  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: 'NIVELES DE LOGRO', bold: true, size: 28 }),
      ],
      spacing: { before: 400, after: 200 },
    })
  );

  nivelesLogro.forEach(nivel => {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: `Nivel ${nivel.nivel}: ${nivel.nombre} - `, bold: true, size: 22 }),
          new TextRun({ text: nivel.descripcion, size: 22 }),
        ],
        spacing: { after: 100 },
      })
    );
  });

  // Criterios e Indicadores
  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: 'CRITERIOS DE EVALUACIÓN (CO-01 a CO-12) E INDICADORES DE LOGRO', bold: true, size: 28 }),
      ],
      spacing: { before: 400, after: 200 },
    })
  );

  // Crear tabla
  const tableRows: any[] = [];

  // Encabezado
  tableRows.push(
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: 'Criterio (CO)', bold: true, size: 20 })] })],
          width: { size: 30, type: WidthType.PERCENTAGE },
        }),
        ...nivelesLogro.map(nivel =>
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: `Nivel ${nivel.nivel}: ${nivel.nombre}`, bold: true, size: 20 })] })],
            width: { size: 17.5, type: WidthType.PERCENTAGE },
          })
        ),
      ],
    })
  );

  // Filas de criterios
  criterios.forEach(criterio => {
    tableRows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: `${criterio.id}: ${criterio.nombre}`, size: 18 })] })],
            width: { size: 30, type: WidthType.PERCENTAGE },
          }),
          ...nivelesLogro.map(nivel =>
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: generarDescriptor(criterio.id, nivel.nivel, curso), size: 18 })] })],
              width: { size: 17.5, type: WidthType.PERCENTAGE },
            })
          ),
        ],
      })
    );
  });

  children.push(
    new Table({
      rows: tableRows,
      width: { size: 100, type: WidthType.PERCENTAGE },
    })
  );

  children.push(new Paragraph({ children: [], spacing: { after: 200 } }));

  // Sistema de Puntuación
  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: 'SISTEMA DE PUNTUACIÓN', bold: true, size: 28 }),
      ],
      spacing: { before: 400, after: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Cada criterio se puntúa de 1 a 4', size: 22 }),
      ],
      spacing: { after: 100 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Puntuación máxima = Número de criterios × 4', size: 22 }),
      ],
      spacing: { after: 100 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Nota final = (Total suma × 10) / Puntuación máxima', size: 22 }),
      ],
    })
  );

  // Instrumentos de Evaluación
  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: 'INSTRUMENTOS DE EVALUACIÓN SUGERIDOS', bold: true, size: 28 }),
      ],
      spacing: { before: 400, after: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: instrumentosEvaluacion.join(', '), size: 22 }),
      ],
    })
  );

  // Crear documento
  const doc = new Document({
    sections: [{ children }],
  });

  // Generar blob y descargar
  const blob = await Packer.toBlob(doc);
  saveAs(blob, `Rubrica_${materiaNombre.replace(/\s+/g, '_')}_${curso}.docx`);
}

/**
 * Exporta la rúbrica a formato PDF
 */
export async function exportToPDF(materia: Materia, curso: string): Promise<void> {
  const { default: jsPDF } = await import('jspdf');
  await import('jspdf-autotable');

  const materiaData = materias.find(m => m.id === materia);
  const materiaNombre = materiaData?.nombre || materia;

  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  let yPosition = 20;

  // Título
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Rúbrica de Evaluación', margin, yPosition);
  yPosition += 8;

  doc.setFontSize(16);
  doc.text(`${materiaNombre}, ${curso}`, margin, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Enseñanzas Profesionales de Música - Extremadura', margin, yPosition);
  yPosition += 5;
  doc.text('Programación Didáctica 2026/2027 - Decreto 111/2007', margin, yPosition);
  yPosition += 15;

  // Competencias
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('COMPETENCIAS (CM-1 a CM-7)', margin, yPosition);
  yPosition += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  competencias.forEach(comp => {
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFont('helvetica', 'bold');
    doc.text(`${comp.id}: ${comp.nombre}`, margin, yPosition);
    yPosition += 5;

    doc.setFont('helvetica', 'italic');
    const descText = doc.splitTextToSize(comp.descripcion, pageWidth - 2 * margin);
    doc.text(descText, margin, yPosition);
    yPosition += descText.length * 5 + 5;
  });

  // Niveles de Logro
  if (yPosition > 240) {
    doc.addPage();
    yPosition = 20;
  }

  yPosition += 5;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('NIVELES DE LOGRO', margin, yPosition);
  yPosition += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  nivelesLogro.forEach(nivel => {
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFont('helvetica', 'bold');
    doc.text(`Nivel ${nivel.nivel}: ${nivel.nombre}`, margin, yPosition);

    doc.setFont('helvetica', 'normal');
    const nivelText = doc.splitTextToSize(nivel.descripcion, pageWidth - 2 * margin - 30);
    doc.text(nivelText, margin + 30, yPosition);
    yPosition += nivelText.length * 5 + 3;
  });

  // Criterios e Indicadores
  if (yPosition > 220) {
    doc.addPage();
    yPosition = 20;
  }

  yPosition += 5;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('CRITERIOS DE EVALUACIÓN (CO-01 a CO-12) E INDICADORES', margin, yPosition);
  yPosition += 10;

  // Crear tabla con autotable
  const tableData = criterios.map(criterio => {
    return [
      `${criterio.id}: ${criterio.nombre}`,
      ...nivelesLogro.map(nivel => generarDescriptor(criterio.id, nivel.nivel, curso))
    ];
  });

  (doc as any).autoTable({
    startY: yPosition,
    head: [['Criterio (CO)', ...nivelesLogro.map(n => `Nivel ${n.nivel}: ${n.nombre}`)]],
    body: tableData,
    margin: { left: margin, right: margin },
    styles: {
      fontSize: 7,
      cellPadding: 2,
      overflow: 'linebreak',
    },
    headStyles: {
      fillColor: [79, 70, 229],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    columnStyles: {
      0: { cellWidth: 45 },
      1: { cellWidth: 35 },
      2: { cellWidth: 35 },
      3: { cellWidth: 35 },
      4: { cellWidth: 35 },
    },
  });

  yPosition = (doc as any).lastAutoTable.finalY + 10;

  // Sistema de Puntuación
  if (yPosition > 250) {
    doc.addPage();
    yPosition = 20;
  }

  yPosition += 5;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('SISTEMA DE PUNTUACIÓN', margin, yPosition);
  yPosition += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Cada criterio se puntúa de 1 a 4', margin, yPosition);
  yPosition += 5;
  doc.text('Puntuación máxima = Número de criterios × 4', margin, yPosition);
  yPosition += 5;
  doc.text('Nota final = (Total suma × 10) / Puntuación máxima', margin, yPosition);
  yPosition += 10;

  // Instrumentos de Evaluación
  if (yPosition > 250) {
    doc.addPage();
    yPosition = 20;
  }

  yPosition += 5;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('INSTRUMENTOS DE EVALUACIÓN SUGERIDOS', margin, yPosition);
  yPosition += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const instText = doc.splitTextToSize(instrumentosEvaluacion.join(', '), pageWidth - 2 * margin);
  doc.text(instText, margin, yPosition);

  // Guardar PDF
  doc.save(`Rubrica_${materiaNombre.replace(/\s+/g, '_')}_${curso}.pdf`);
}
