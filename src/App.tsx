import { useState, useRef } from 'react';
import {
  materias,
  nivelesLogro,
  competencias,
  criterios,
  instrumentosEvaluacion,
  generarDescriptor,
  validarMateriaCurso,
  type Materia
} from './data/curriculum';
import { generarRubrica, type RubricResponse } from './services/api';
import RubricRenderer from './components/RubricRenderer';
import ExportButtons from './components/ExportButtons';

type ModoGeneracion = 'local' | 'api';

export default function App() {
  const [selectedMateria, setSelectedMateria] = useState<Materia | ''>('');
  const [selectedCurso, setSelectedCurso] = useState<string>('');
  const [rubricGenerated, setRubricGenerated] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [modoGeneracion, setModoGeneracion] = useState<ModoGeneracion>('local');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [validationError, setValidationError] = useState<string>('');
  const [apiRubric, setApiRubric] = useState<RubricResponse | null>(null);
  const rubricRef = useRef<HTMLDivElement>(null);

  const materiaData = materias.find(m => m.id === selectedMateria);

  const handleMateriaChange = (materia: Materia | '') => {
    setSelectedMateria(materia);
    setSelectedCurso('');
    setValidationError('');
  };

  const handleCursoChange = (curso: string) => {
    setSelectedCurso(curso);
    setValidationError('');
    
    // Validar combinación materia-curso
    if (selectedMateria && curso) {
      const validacion = validarMateriaCurso(selectedMateria, curso);
      if (!validacion.valido) {
        setValidationError(validacion.mensaje || 'Combinación inválida');
      }
    }
  };

  const handleGenerate = async () => {
    if (!selectedMateria || !selectedCurso) {
      setError('Por favor, seleccione una materia y un curso.');
      return;
    }

    // Validar combinación materia-curso
    const validacion = validarMateriaCurso(selectedMateria, selectedCurso);
    if (!validacion.valido) {
      setError(validacion.mensaje || 'Combinación inválida');
      return;
    }

    if (modoGeneracion === 'local') {
      setRubricGenerated(true);
    } else {
      setLoading(true);
      setError('');

      try {
        const response = await generarRubrica({
          asignatura: selectedMateria,
          curso: selectedCurso
        });
        setApiRubric(response);
        setRubricGenerated(true);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Error al generar la rúbrica. Inténtelo de nuevo.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleReset = () => {
    setRubricGenerated(false);
    setSelectedMateria('');
    setSelectedCurso('');
    setApiRubric(null);
    setError('');
    setValidationError('');
  };

  const handlePrint = () => {
    window.print();
  };

  const canGenerate = !!(selectedMateria && selectedCurso && !validationError);

  const materiaNombre = materiaData?.nombre || '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800 text-white shadow-xl print:bg-indigo-900">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                <i className="fas fa-music text-3xl text-amber-300"></i>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Arquitecto de Rúbricas Musicales
                </h1>
                <p className="text-indigo-200 text-sm sm:text-base mt-1">
                  Programación Didáctica 2026/2027 — Música de Cámara, Banda y Orquesta
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="hidden sm:flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all"
            >
              <i className="fas fa-info-circle"></i>
              <span className="text-sm">Información</span>
            </button>
          </div>
        </div>
      </header>

      {/* Info Panel */}
      {showInfo && (
        <div className="bg-indigo-50 border-b border-indigo-200 print:hidden">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-indigo-100">
              <h3 className="font-semibold text-indigo-900 mb-3">
                <i className="fas fa-book mr-2"></i>Programación Didáctica 2026/2027
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Materias:</strong> Música de Cámara, Banda, Orquesta</p>
                <p><strong>Regla crítica:</strong> Música de Cámara solo se imparte en 4º, 5º y 6º curso</p>
                <p><strong>Criterios de evaluación:</strong> CO-01 a CO-12 (12 criterios)</p>
                <p><strong>Competencias:</strong> CM-1 a CM-7 (7 competencias)</p>
                <p><strong>Niveles de logro:</strong> Inicial, En desarrollo, Adecuado, Consolidado</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {!rubricGenerated ? (
          /* Selection Form */
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <i className="fas fa-sliders-h"></i>
                  Configuración de la Rúbrica
                </h2>
                <p className="text-indigo-100 text-sm mt-1">
                  Seleccione la materia, el curso y el modo de generación
                </p>
              </div>

              <div className="p-6 space-y-6">
                {/* Mode Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <i className="fas fa-cogs mr-2 text-indigo-600"></i>
                    Modo de Generación
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => setModoGeneracion('local')}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        modoGeneracion === 'local'
                          ? 'border-indigo-500 bg-indigo-50 shadow-md'
                          : 'border-gray-200 bg-gray-50 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <i className={`fas fa-database text-lg ${modoGeneracion === 'local' ? 'text-indigo-600' : 'text-gray-400'}`}></i>
                        <span className="font-bold text-gray-800">Datos Locales</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Rúbricas predefinidas con criterios CO-01 a CO-12
                      </p>
                    </button>
                    <button
                      onClick={() => setModoGeneracion('api')}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        modoGeneracion === 'api'
                          ? 'border-purple-500 bg-purple-50 shadow-md'
                          : 'border-gray-200 bg-gray-50 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <i className={`fas fa-robot text-lg ${modoGeneracion === 'api' ? 'text-purple-600' : 'text-gray-400'}`}></i>
                        <span className="font-bold text-gray-800">IA con Qwen 2.5 VL</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Generación dinámica con Qwen 2.5 VL 72B
                      </p>
                    </button>
                  </div>
                </div>

                {/* Materia Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <i className="fas fa-music mr-2 text-indigo-600"></i>
                    Materia
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {materias.map((mat) => (
                      <button
                        key={mat.id}
                        onClick={() => handleMateriaChange(mat.id)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          selectedMateria === mat.id
                            ? 'border-indigo-500 bg-indigo-50 shadow-md'
                            : 'border-gray-200 bg-gray-50 hover:border-indigo-300'
                        }`}
                      >
                        <div className="font-bold text-gray-800 mb-1">{mat.nombre}</div>
                        <p className="text-xs text-gray-500">
                          Cursos: {mat.cursos.join(', ')}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Curso Selection */}
                {selectedMateria && materiaData && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <i className="fas fa-calendar-alt mr-2 text-indigo-600"></i>
                      Curso
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {materiaData.cursos.map((curso) => (
                        <button
                          key={curso}
                          onClick={() => handleCursoChange(curso)}
                          className={`px-4 py-3 rounded-xl border-2 font-medium transition-all ${
                            selectedCurso === curso
                              ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-md'
                              : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-indigo-300 hover:bg-indigo-50/50'
                          }`}
                        >
                          {curso}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Validation Error */}
                {validationError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                    <i className="fas fa-exclamation-triangle text-red-500 mt-0.5"></i>
                    <div>
                      <p className="text-red-700 text-sm font-medium">Combinación inválida</p>
                      <p className="text-red-600 text-xs mt-1">{validationError}</p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                    <i className="fas fa-exclamation-triangle text-red-500 mt-0.5"></i>
                    <div>
                      <p className="text-red-700 text-sm font-medium">Error</p>
                      <p className="text-red-600 text-xs mt-1">{error}</p>
                    </div>
                  </div>
                )}

                {/* Generate Button */}
                <div className="pt-4 border-t border-gray-100">
                  <button
                    onClick={handleGenerate}
                    disabled={loading || !canGenerate}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${
                      loading
                        ? 'bg-gray-300 text-gray-500 cursor-wait'
                        : canGenerate
                        ? modoGeneracion === 'api'
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                          : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {loading ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        Generando rúbrica con IA...
                      </>
                    ) : (
                      <>
                        <i className={`fas ${modoGeneracion === 'api' ? 'fa-robot' : 'fa-magic'}`}></i>
                        {modoGeneracion === 'api' ? 'Generar con IA (Qwen 2.5 VL)' : 'Generar Rúbrica'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <i className="fas fa-list-check text-blue-600"></i>
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm">12 Criterios</h3>
                </div>
                <p className="text-gray-500 text-xs">
                  CO-01 a CO-12 (Preparación, Ritmo, Escucha, etc.)
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <i className="fas fa-layer-group text-green-600"></i>
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm">4 Niveles</h3>
                </div>
                <p className="text-gray-500 text-xs">
                  Inicial, En desarrollo, Adecuado, Consolidado
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <i className="fas fa-brain text-purple-600"></i>
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm">7 Competencias</h3>
                </div>
                <p className="text-gray-500 text-xs">
                  CM-1 a CM-7 (Ejecución, Ritmo, Audición, etc.)
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Rubric Display */
          <div ref={rubricRef}>
            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 print:hidden">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all shadow-sm"
              >
                <i className="fas fa-arrow-left"></i>
                <span className="text-sm font-medium">Volver</span>
              </button>
              <div className="flex flex-wrap gap-3">
                {modoGeneracion === 'api' && (
                  <span className="flex items-center gap-2 px-3 py-2 bg-purple-50 border border-purple-200 rounded-lg text-purple-700 text-xs font-medium">
                    <i className="fas fa-robot"></i>
                    Generado con Qwen 2.5 VL
                  </span>
                )}
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-sm"
                >
                  <i className="fas fa-print"></i>
                  <span className="text-sm font-medium">Imprimir</span>
                </button>
              </div>
            </div>

            {/* Export Buttons - Solo para modo local */}
            {modoGeneracion === 'local' && selectedMateria && (
              <div className="mb-6 print:hidden">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <i className="fas fa-download text-indigo-600"></i>
                    Exportar Rúbrica
                  </h3>
                  <ExportButtons materia={selectedMateria} curso={selectedCurso} />
                </div>
              </div>
            )}

            {/* Rubric Content */}
            {modoGeneracion === 'api' && apiRubric ? (
              <RubricRenderer
                content={apiRubric.rubrica}
                asignatura={apiRubric.asignatura}
                curso={apiRubric.curso}
              />
            ) : (
              /* Local Rubric */
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-900 to-purple-900 px-6 py-5">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Rúbrica de Evaluación — {materiaNombre}, {selectedCurso}
                  </h2>
                  <p className="text-indigo-200 text-sm mt-1">
                    Enseñanzas Profesionales de Música — Extremadura
                  </p>
                  <p className="text-indigo-300 text-xs mt-1">
                    Programación Didáctica 2026/2027 — Decreto 111/2007
                  </p>
                </div>

                {/* Competencias */}
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <i className="fas fa-star text-amber-500"></i>
                    Competencias (CM-1 a CM-7)
                  </h3>
                  <div className="space-y-3">
                    {competencias.map((comp) => (
                      <div
                        key={comp.id}
                        className="bg-indigo-50 rounded-lg p-4 border border-indigo-100"
                      >
                        <p className="font-semibold text-indigo-900 text-sm">
                          {comp.id}: {comp.nombre}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">{comp.descripcion}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Niveles de Logro */}
                <div className="p-6 border-b border-gray-100 bg-gray-50">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <i className="fas fa-layer-group text-blue-500"></i>
                    Niveles de Logro
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {nivelesLogro.map((nivel) => (
                      <div
                        key={nivel.nombre}
                        className="rounded-lg p-3 border-2 text-center"
                        style={{ borderColor: nivel.color, backgroundColor: `${nivel.color}10` }}
                      >
                        <div
                          className="font-bold text-sm mb-1"
                          style={{ color: nivel.color }}
                        >
                          Nivel {nivel.nivel}: {nivel.nombre}
                        </div>
                        <p className="text-xs text-gray-600">{nivel.descripcion}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Criterios e Indicadores */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <i className="fas fa-clipboard-check text-green-500"></i>
                    Criterios de Evaluación (CO-01 a CO-12) e Indicadores de Logro
                  </h3>

                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm min-w-[800px]">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="text-left px-3 py-2 font-semibold text-gray-700 w-48 border-r border-gray-200">
                              Criterio (CO)
                            </th>
                            {nivelesLogro.map((nivel) => (
                              <th
                                key={nivel.nombre}
                                className="text-center px-2 py-2 font-semibold border-r border-gray-200 last:border-r-0"
                                style={{ color: nivel.color }}
                              >
                                Nivel {nivel.nivel}: {nivel.nombre}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {criterios.map((criterio, idx) => (
                            <tr
                              key={criterio.id}
                              className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                            >
                              <td className="px-3 py-3 border-r border-gray-200 align-top">
                                <span className="font-medium text-gray-800 text-xs">
                                  {criterio.id}: {criterio.nombre}
                                </span>
                                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                                  {criterio.descripcion}
                                </p>
                              </td>
                              {nivelesLogro.map((nivel) => (
                                <td
                                  key={nivel.nombre}
                                  className="px-2 py-3 border-r border-gray-200 last:border-r-0 align-top"
                                >
                                  <p className="text-xs text-gray-700 leading-relaxed">
                                    {generarDescriptor(criterio.id, nivel.nivel, selectedCurso)}
                                  </p>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Sistema de Puntuación */}
                <div className="p-6 border-t border-gray-100 bg-blue-50">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <i className="fas fa-calculator text-blue-600"></i>
                    Sistema de Puntuación
                  </h3>
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Fórmula de cálculo:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      <li>Cada criterio se puntúa de 1 a 4</li>
                      <li>Puntuación máxima = Número de criterios × 4</li>
                      <li>Nota final = (Total suma × 10) / Puntuación máxima</li>
                    </ul>
                  </div>
                </div>

                {/* Instrumentos de Evaluación */}
                <div className="p-6 border-t border-gray-100 bg-amber-50">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <i className="fas fa-tools text-amber-600"></i>
                    Instrumentos de Evaluación Sugeridos
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {instrumentosEvaluacion.map((inst, idx) => (
                      <span
                        key={idx}
                        className="bg-white text-amber-800 text-sm px-3 py-2 rounded-lg border border-amber-200 shadow-sm"
                      >
                        <i className="fas fa-check-circle text-amber-500 mr-2"></i>
                        {inst}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Note */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <p className="text-xs text-gray-500 text-center">
                    Documento generado conforme a la Programación Didáctica 2026/2027 y el Decreto 111/2007.
                    <br />
                    Las rúbricas son orientativas y deben adaptarse al contexto específico del aula y del alumnado.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 mt-12 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            <i className="fas fa-music mr-2 text-indigo-400"></i>
            Arquitecto de Rúbricas Musicales — Programación Didáctica 2026/2027
          </p>
          <p className="text-xs mt-2 text-gray-500">
            Música de Cámara, Banda y Orquesta — Enseñanzas Profesionales de Música
          </p>
          <p className="text-xs mt-1 text-gray-600">
            <i className="fas fa-robot mr-1 text-purple-400"></i>
            Powered by Qwen 2.5 VL 72B via Nebius Token Factory
          </p>
        </div>
      </footer>
    </div>
  );
}
