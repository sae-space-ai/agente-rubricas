import { AsignaturaData, getNivelesLogro, generarIndicadores } from '../data/curriculum';

export interface ExportData {
  asignatura: AsignaturaData;
  curso: string;
}

/**
 * Exporta la rúbrica a formato XLSX (Excel)
 */
export async function exportToXLSX(data: ExportData): Promise<void> {
  const XLSX = await import('xlsx');
  const { saveAs } = await import('file-saver');
  const { asignatura, curso } = data;
  const nivelesLogro = getNivelesLogro(asignatura.nivel);

  // Crear datos para la hoja
  const worksheetData: any[][] = [];

  // Título
  worksheetData.push([`Rúbrica de Evaluación - ${asignatura.nombre}, ${curso}`]);
  worksheetData.push([`Enseñanzas ${asignatura.nivel === 'elemental' ? 'Elementales' : 'Profesionales'} de Música - Extremadura`]);
  worksheetData.push([asignatura.nivel === 'elemental'
    ? 'Decreto 110/2007 (modificado por Decreto 54/2022)'
    : 'Decreto 111/2007'
  ]);
  worksheetData.push([]);

  // Competencias Específicas
  worksheetData.push(['COMPETENCIAS ESPECÍFICAS']);
  asignatura.competencias.forEach(comp => {
    worksheetData.push([`${comp.id}: ${comp.descripcion}`]);
    worksheetData.push(['Descriptores:', comp.descriptores.join(', ')]);
    worksheetData.push([]);
  });

  // Niveles de Logro
  worksheetData.push(['NIVELES DE LOGRO']);
  nivelesLogro.forEach(nivel => {
    worksheetData.push([nivel.nombre, nivel.descripcion]);
  });
  worksheetData.push([]);

  // Criterios e Indicadores
  worksheetData.push(['CRITERIOS DE EVALUACIÓN E INDICADORES DE LOGRO']);
  worksheetData.push([]);

  asignatura.competencias.forEach(comp => {
    const criterios = asignatura.criterios.filter(c => c.competenciaId === comp.id);

    if (criterios.length > 0) {
      worksheetData.push([`${comp.id}: ${comp.descripcion}`]);
      worksheetData.push([]);

      // Encabezados de la tabla
      worksheetData.push(['Criterio', ...nivelesLogro.map(n => n.nombre)]);

      // Filas de criterios
      criterios.forEach(criterio => {
        const row = [`${criterio.id}: ${criterio.descripcion}`];
        nivelesLogro.forEach(nivel => {
          row.push(generarIndicadores(asignatura.id, criterio.id, nivel.nombre));
        });
        worksheetData.push(row);
      });

      worksheetData.push([]);
    }
  });

  // Instrumentos de Evaluación
  worksheetData.push(['INSTRUMENTOS DE EVALUACIÓN SUGERIDOS']);
  worksheetData.push([asignatura.instrumentos.join(', ')]);

  // Crear libro de trabajo
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(worksheetData);

  // Ajustar anchos de columna
  ws['!cols'] = [
    { wch: 40 },
    { wch: 25 },
    { wch: 25 },
    { wch: 25 },
    { wch: 25 }
  ];

  XLSX.utils.book_append_sheet(wb, ws, 'Rúbrica');

  // Generar archivo
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });

  saveAs(blob, `Rubrica_${asignatura.nombre.replace(/\s+/g, '_')}_${curso}.xlsx`);
}

/**
 * Exporta la rúbrica a formato Word (DOCX)
 */
export async function exportToWord(data: ExportData): Promise<void> {
  const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType } = await import('docx');
  const { saveAs } = await import('file-saver');
  const { asignatura, curso } = data;
  const nivelesLogro = getNivelesLogro(asignatura.nivel);

  const children: any[] = [];

  // Título
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `Rúbrica de Evaluación - ${asignatura.nombre}, ${curso}`,
          bold: true,
          size: 32,
        }),
      ],
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `Enseñanzas ${asignatura.nivel === 'elemental' ? 'Elementales' : 'Profesionales'} de Música - Extremadura`,
          size: 24,
        }),
      ],
      spacing: { after: 100 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: asignatura.nivel === 'elemental'
            ? 'Decreto 110/2007 (modificado por Decreto 54/2022)'
            : 'Decreto 111/2007',
          size: 20,
          italics: true,
        }),
      ],
      spacing: { after: 400 },
    })
  );

  // Competencias Específicas
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: 'COMPETENCIAS ESPECÍFICAS',
          bold: true,
          size: 28,
        }),
      ],
      spacing: { before: 200, after: 200 },
    })
  );

  asignatura.competencias.forEach(comp => {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: `${comp.id}: ${comp.descripcion}`, size: 22 }),
        ],
        spacing: { after: 100 },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: `Descriptores: ${comp.descriptores.join(', ')}`,
            size: 20,
            italics: true,
          }),
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
          new TextRun({ text: `${nivel.nombre}: `, bold: true, size: 22 }),
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
        new TextRun({ text: 'CRITERIOS DE EVALUACIÓN E INDICADORES DE LOGRO', bold: true, size: 28 }),
      ],
      spacing: { before: 400, after: 200 },
    })
  );

  asignatura.competencias.forEach(comp => {
    const criterios = asignatura.criterios.filter(c => c.competenciaId === comp.id);

    if (criterios.length > 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${comp.id}: ${comp.descripcion}`, bold: true, size: 24 }),
          ],
          spacing: { before: 200, after: 200 },
        })
      );

      // Crear tabla
      const tableRows: any[] = [];

      // Encabezado
      tableRows.push(
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: 'Criterio', bold: true, size: 20 })] })],
              width: { size: 30, type: WidthType.PERCENTAGE },
            }),
            ...nivelesLogro.map(nivel =>
              new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text: nivel.nombre, bold: true, size: 20 })] })],
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
                children: [new Paragraph({ children: [new TextRun({ text: `${criterio.id}: ${criterio.descripcion}`, size: 18 })] })],
                width: { size: 30, type: WidthType.PERCENTAGE },
              }),
              ...nivelesLogro.map(nivel =>
                new TableCell({
                  children: [new Paragraph({ children: [new TextRun({ text: generarIndicadores(asignatura.id, criterio.id, nivel.nombre), size: 18 })] })],
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
    }
  });

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
        new TextRun({ text: asignatura.instrumentos.join(', '), size: 22 }),
      ],
    })
  );

  // Crear documento
  const doc = new Document({
    sections: [{ children }],
  });

  // Generar blob y descargar
  const blob = await Packer.toBlob(doc);
  saveAs(blob, `Rubrica_${asignatura.nombre.replace(/\s+/g, '_')}_${curso}.docx`);
}

/**
 * Exporta la rúbrica a formato PDF
 */
export async function exportToPDF(data: ExportData): Promise<void> {
  const { default: jsPDF } = await import('jspdf');
  await import('jspdf-autotable');
  const { asignatura, curso } = data;
  const nivelesLogro = getNivelesLogro(asignatura.nivel);

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
  doc.text(`${asignatura.nombre}, ${curso}`, margin, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Enseñanzas ${asignatura.nivel === 'elemental' ? 'Elementales' : 'Profesionales'} de Música - Extremadura`, margin, yPosition);
  yPosition += 5;
  doc.text(asignatura.nivel === 'elemental'
    ? 'Decreto 110/2007 (modificado por Decreto 54/2022)'
    : 'Decreto 111/2007', margin, yPosition);
  yPosition += 15;

  // Competencias Específicas
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('COMPETENCIAS ESPECÍFICAS', margin, yPosition);
  yPosition += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  asignatura.competencias.forEach(comp => {
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 20;
    }

    const compText = doc.splitTextToSize(`${comp.id}: ${comp.descripcion}`, pageWidth - 2 * margin);
    doc.text(compText, margin, yPosition);
    yPosition += compText.length * 5 + 2;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    const descText = doc.splitTextToSize(`Descriptores: ${comp.descriptores.join(', ')}`, pageWidth - 2 * margin);
    doc.text(descText, margin, yPosition);
    yPosition += descText.length * 4 + 5;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
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
    doc.text(`${nivel.nombre}:`, margin, yPosition);

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
  doc.text('CRITERIOS DE EVALUACIÓN E INDICADORES DE LOGRO', margin, yPosition);
  yPosition += 10;

  asignatura.competencias.forEach(comp => {
    const criterios = asignatura.criterios.filter(c => c.competenciaId === comp.id);

    if (criterios.length > 0) {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      const compTitle = doc.splitTextToSize(`${comp.id}: ${comp.descripcion}`, pageWidth - 2 * margin);
      doc.text(compTitle, margin, yPosition);
      yPosition += compTitle.length * 5 + 5;

      // Crear tabla con autotable
      const tableData = criterios.map(criterio => {
        return [
          `${criterio.id}: ${criterio.descripcion}`,
          ...nivelesLogro.map(nivel => generarIndicadores(asignatura.id, criterio.id, nivel.nombre))
        ];
      });

      (doc as any).autoTable({
        startY: yPosition,
        head: [['Criterio', ...nivelesLogro.map(n => n.nombre)]],
        body: tableData,
        margin: { left: margin, right: margin },
        styles: {
          fontSize: 8,
          cellPadding: 2,
          overflow: 'linebreak',
        },
        headStyles: {
          fillColor: [79, 70, 229],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
        },
        columnStyles: {
          0: { cellWidth: 50 },
          1: { cellWidth: 35 },
          2: { cellWidth: 35 },
          3: { cellWidth: 35 },
          4: { cellWidth: 35 },
        },
      });

      yPosition = (doc as any).lastAutoTable.finalY + 10;
    }
  });

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
  const instText = doc.splitTextToSize(asignatura.instrumentos.join(', '), pageWidth - 2 * margin);
  doc.text(instText, margin, yPosition);

  // Guardar PDF
  doc.save(`Rubrica_${asignatura.nombre.replace(/\s+/g, '_')}_${curso}.pdf`);
}
