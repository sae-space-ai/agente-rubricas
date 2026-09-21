/**
 * Script de prueba para verificar que los 3 formatos de exportación funcionan correctamente
 * Ejecutar con: node test-exports.mjs
 */

import { asignaturas } from './src/data/curriculum.ts';
import { exportToXLSX, exportToWord, exportToPDF } from './src/services/exportService.ts';

// Seleccionar una asignatura de prueba
const asignaturaTest = asignaturas.find(a => a.id === 'profesional-lenguaje-musical');

if (!asignaturaTest) {
  console.error('❌ No se encontró la asignatura de prueba');
  process.exit(1);
}

const testData = {
  asignatura: asignaturaTest,
  curso: '1º'
};

console.log('🧪 Iniciando pruebas de exportación...\n');
console.log(`📚 Asignatura: ${testData.asignatura.nombre}`);
console.log(`📅 Curso: ${testData.curso}\n`);

// Prueba 1: Exportar a XLSX
console.log('📊 Probando exportación a XLSX...');
try {
  await exportToXLSX(testData);
  console.log('✅ XLSX: Exportación exitosa\n');
} catch (error) {
  console.error('❌ XLSX: Error en la exportación');
  console.error(error);
  process.exit(1);
}

// Esperar un poco entre exportaciones
await new Promise(resolve => setTimeout(resolve, 1000));

// Prueba 2: Exportar a Word
console.log('📄 Probando exportación a Word...');
try {
  await exportToWord(testData);
  console.log('✅ Word: Exportación exitosa\n');
} catch (error) {
  console.error('❌ Word: Error en la exportación');
  console.error(error);
  process.exit(1);
}

// Esperar un poco entre exportaciones
await new Promise(resolve => setTimeout(resolve, 1000));

// Prueba 3: Exportar a PDF
console.log('📕 Probando exportación a PDF...');
try {
  await exportToPDF(testData);
  console.log('✅ PDF: Exportación exitosa\n');
} catch (error) {
  console.error('❌ PDF: Error en la exportación');
  console.error(error);
  process.exit(1);
}

console.log('🎉 Todas las pruebas de exportación han pasado correctamente!');
console.log('\n📁 Archivos generados:');
console.log(`   - Rubrica_${testData.asignatura.nombre.replace(/\s+/g, '_')}_${testData.curso}.xlsx`);
console.log(`   - Rubrica_${testData.asignatura.nombre.replace(/\s+/g, '_')}_${testData.curso}.docx`);
console.log(`   - Rubrica_${testData.asignatura.nombre.replace(/\s+/g, '_')}_${testData.curso}.pdf`);
