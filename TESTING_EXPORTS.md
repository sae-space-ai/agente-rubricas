# Guía de Prueba de Exportación

## ✅ Verificación de los 3 Formatos de Salida

Este documento describe cómo verificar que los 3 formatos de exportación (XLSX, PDF y Word) funcionan correctamente.

### 📋 Requisitos Previos

1. La aplicación debe estar corriendo (`npm run dev`)
2. Debes haber generado una rúbrica en modo local (no IA)
3. Los botones de exportación solo aparecen en modo local

### 🧪 Pasos de Prueba

#### Paso 1: Generar una Rúbrica

1. Abre la aplicación en tu navegador
2. Selecciona el **Nivel de Enseñanza** (Elemental o Profesional)
3. Selecciona una **Asignatura** (ej: "Lenguaje Musical")
4. Selecciona un **Curso** (ej: "1º")
5. Asegúrate de que el **Modo de Generación** sea "Datos Locales"
6. Haz clic en **"Generar Rúbrica"**

#### Paso 2: Verificar Botones de Exportación

Después de generar la rúbrica, deberías ver un panel con 3 botones de colores:

- 🟢 **Excel (XLSX)** - Botón verde
- 🔵 **Word (DOCX)** - Botón azul
- 🔴 **PDF** - Botón rojo

#### Paso 3: Probar Exportación a Excel (XLSX)

1. Haz clic en el botón **"Excel (XLSX)"**
2. El botón debe mostrar "Exportando..." con un spinner
3. Después de 1-2 segundos, se descargará automáticamente un archivo:
   - Nombre: `Rubrica_[Nombre_Asignatura]_[Curso].xlsx`
   - Ejemplo: `Rubrica_Lenguaje_Musical_1º.xlsx`
4. Abre el archivo con Microsoft Excel, LibreOffice Calc o Google Sheets
5. **Verifica que contenga:**
   - ✅ Título de la rúbrica
   - ✅ Referencia al decreto correspondiente
   - ✅ Sección de Competencias Específicas
   - ✅ Sección de Niveles de Logro
   - ✅ Tabla de Criterios e Indicadores
   - ✅ Sección de Instrumentos de Evaluación

#### Paso 4: Probar Exportación a Word (DOCX)

1. Haz clic en el botón **"Word (DOCX)"**
2. El botón debe mostrar "Exportando..." con un spinner
3. Después de 1-2 segundos, se descargará automáticamente un archivo:
   - Nombre: `Rubrica_[Nombre_Asignatura]_[Curso].docx`
   - Ejemplo: `Rubrica_Lenguaje_Musical_1º.docx`
4. Abre el archivo con Microsoft Word, LibreOffice Writer o Google Docs
5. **Verifica que contenga:**
   - ✅ Título formateado en negrita
   - ✅ Información del decreto en cursiva
   - ✅ Secciones con encabezados
   - ✅ Tabla con bordes y formato profesional
   - ✅ Todos los criterios e indicadores
   - ✅ Formato legible y profesional

#### Paso 5: Probar Exportación a PDF

1. Haz clic en el botón **"PDF"**
2. El botón debe mostrar "Exportando..." con un spinner
3. Después de 1-2 segundos, se descargará automáticamente un archivo:
   - Nombre: `Rubrica_[Nombre_Asignatura]_[Curso].pdf`
   - Ejemplo: `Rubrica_Lenguaje_Musical_1º.pdf`
4. Abre el archivo con Adobe Reader, Preview o cualquier visor de PDF
5. **Verifica que contenga:**
   - ✅ Título en la primera página
   - ✅ Información del decreto
   - ✅ Secciones bien organizadas
   - ✅ Tabla con formato profesional (encabezados en color)
   - ✅ Paginación correcta si el documento es largo
   - ✅ Texto legible y bien formateado

### 🔍 Verificaciones Adicionales

#### Para cada formato, verifica:

1. **Contenido Completo:**
   - Todas las competencias están presentes
   - Todos los criterios están listados
   - Todos los indicadores de los 4 niveles están incluidos
   - Los instrumentos de evaluación están listados

2. **Formato Correcto:**
   - Los títulos están formateados
   - Las tablas tienen bordes y estructura clara
   - El texto es legible
   - No hay caracteres extraños o corruptos

3. **Referencias Normativas:**
   - Para Enseñanzas Elementales: "Decreto 110/2007 (modificado por Decreto 54/2022)"
   - Para Enseñanzas Profesionales: "Decreto 111/2007"

4. **Niveles de Logro Correctos:**
   - **Elemental:** No Apt, Apt con Deficiencias, Apt, Apt con Excelencia
   - **Profesional:** Inicial, En Desarrollo, Adquirido, Avanzado

### 🐛 Solución de Problemas

#### Error: "Error al exportar a Excel/Word/PDF"

**Causa posible:** Las dependencias no están instaladas correctamente

**Solución:**
```bash
npm install
npm run build
npm run dev
```

#### Error: El archivo se descarga pero está vacío o corrupto

**Causa posible:** Problema con la generación del archivo

**Solución:**
1. Abre la consola del navegador (F12)
2. Busca errores en la pestaña "Console"
3. Verifica que no haya errores de CORS o de red
4. Intenta con otra asignatura o curso

#### Error: El archivo no se descarga

**Causa posible:** El navegador bloquea la descarga o hay un problema con file-saver

**Solución:**
1. Verifica la configuración de descargas del navegador
2. Asegúrate de que no haya extensiones bloqueando descargas
3. Prueba con otro navegador (Chrome, Firefox, Edge)

#### Error: Los caracteres especiales no se muestran correctamente

**Causa posible:** Problema de codificación

**Solución:**
- Para Excel: Verifica que la codificación sea UTF-8
- Para Word: Debería funcionar automáticamente
- Para PDF: jsPDF usa codificación estándar, los caracteres especiales deberían funcionar

### 📊 Resultados Esperados

Si todo funciona correctamente, deberías poder:

1. ✅ Generar rúbricas en modo local
2. ✅ Ver los 3 botones de exportación
3. ✅ Descargar archivos XLSX, DOCX y PDF
4. ✅ Abrir los archivos sin errores
5. ✅ Ver todo el contenido completo y formateado
6. ✅ Identificar las referencias a los decretos correctos

### 🎯 Casos de Prueba Recomendados

Prueba con diferentes combinaciones:

1. **Enseñanzas Elementales:**
   - Lenguaje Musical - 1º, 2º, 3º, 4º
   - Instrumento - 1º, 2º, 3º, 4º
   - Coro - 3º, 4º

2. **Enseñanzas Profesionales:**
   - Lenguaje Musical - 1º, 2º, 3º, 4º
   - Instrumento Principal - 1º, 2º, 3º, 4º, 5º, 6º
   - Música de Cámara - 2º, 3º, 4º, 5º, 6º
   - Armonía - 1º, 2º, 3º, 4º
   - Historia de la Música - 1º, 2º

### ✅ Checklist Final

- [ ] Se pueden generar rúbricas en modo local
- [ ] Aparecen los 3 botones de exportación
- [ ] Excel (XLSX) se descarga y abre correctamente
- [ ] Word (DOCX) se descarga y abre correctamente
- [ ] PDF se descarga y abre correctamente
- [ ] Los 3 formatos contienen toda la información
- [ ] Las referencias a los decretos son correctas
- [ ] Los niveles de logro son apropiados para cada nivel
- [ ] No hay errores en la consola del navegador
- [ ] Los archivos se pueden abrir con sus aplicaciones correspondientes

---

**Si todas las pruebas pasan, los 3 formatos de exportación funcionan correctamente.**
