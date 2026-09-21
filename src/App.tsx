import { useState, useRef } from 'react';
import {
  asignaturas,
  nivelesLogro,
  generarIndicadores,
  type AsignaturaData,
  type CriterioEvaluacion
} from './data/curriculum';

export default function App() {
  const [selectedAsignatura, setSelectedAsignatura] = useState<string>('');
  const [selectedCurso, setSelectedCurso] = useState<string>('');
  const [rubricGenerated, setRubricGenerated] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const rubricRef = useRef<HTMLDivElement>(null);

  const currentAsignatura: AsignaturaData | undefined = asignaturas.find(
    (a) => a.id === selectedAsignatura
  );

  const handleGenerate = () => {
    if (selectedAsignatura && selectedCurso) {
      setRubricGenerated(true);
    }
  };

  const handleReset = () => {
    setRubricGenerated(false);
    setSelectedAsignatura('');
    setSelectedCurso('');
  };

  const handlePrint = () => {
    window.print();
  };

  const getCriteriosByCompetencia = (competenciaId: string): CriterioEvaluacion[] => {
    if (!currentAsignatura) return [];
    return currentAsignatura.criterios.filter((c) => c.competenciaId === competenciaId);
  };

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
                  Enseñanzas Profesionales de Música — Extremadura
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="hidden sm:flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all"
            >
              <i className="fas fa-info-circle"></i>
              <span className="text-sm">Decreto 58/2022</span>
            </button>
          </div>
        </div>
      </header>

      {/* Info Panel */}
      {showInfo && (
        <div className="bg-indigo-50 border-b border-indigo-200 print:hidden">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-indigo-100">
              <h3 className="font-semibold text-indigo-900 mb-2">
                <i className="fas fa-gavel mr-2"></i>Marco Normativo
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Esta herramienta genera rúbricas de evaluación basadas en el{' '}
                <strong>Decreto 58/2022</strong> de la Junta de Extremadura, por el que se establece
                el currículo de las enseñanzas artísticas profesionales de Música en la Comunidad
                Autónoma de Extremadura. Las competencias específicas, criterios de evaluación y
                niveles de logro se ajustan a la normativa vigente.
              </p>
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
                  Seleccione la asignatura y el curso para generar la rúbrica de evaluación
                </p>
              </div>

              <div className="p-6 space-y-6">
                {/* Asignatura Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <i className="fas fa-book-open mr-2 text-indigo-600"></i>
                    Asignatura
                  </label>
                  <select
                    value={selectedAsignatura}
                    onChange={(e) => {
                      setSelectedAsignatura(e.target.value);
                      setSelectedCurso('');
                    }}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-gray-50 hover:bg-white"
                  >
                    <option value="">— Seleccione una asignatura —</option>
                    {asignaturas.map((asig) => (
                      <option key={asig.id} value={asig.id}>
                        {asig.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Curso Selection */}
                {currentAsignatura && (
                  <div className="animate-fadeIn">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <i className="fas fa-graduation-cap mr-2 text-indigo-600"></i>
                      Curso
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {currentAsignatura.cursos.map((curso) => (
                        <button
                          key={curso}
                          onClick={() => setSelectedCurso(curso)}
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

                {/* Generate Button */}
                <div className="pt-4 border-t border-gray-100">
                  <button
                    onClick={handleGenerate}
                    disabled={!selectedAsignatura || !selectedCurso}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${
                      selectedAsignatura && selectedCurso
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <i className="fas fa-magic"></i>
                    Generar Rúbrica de Evaluación
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
                  <h3 className="font-semibold text-gray-800 text-sm">4 Niveles</h3>
                </div>
                <p className="text-gray-500 text-xs">
                  Inicial, En Desarrollo, Adquirido y Avanzado
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <i className="fas fa-bullseye text-green-600"></i>
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm">Indicadores</h3>
                </div>
                <p className="text-gray-500 text-xs">
                  Descripciones observables para cada nivel de logro
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <i className="fas fa-tools text-purple-600"></i>
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm">Instrumentos</h3>
                </div>
                <p className="text-gray-500 text-xs">
                  Sugerencias de instrumentos de evaluación
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
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-sm"
              >
                <i className="fas fa-print"></i>
                <span className="text-sm font-medium">Imprimir / Exportar PDF</span>
              </button>
            </div>

            {/* Rubric Title */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-6">
              <div className="bg-gradient-to-r from-indigo-900 to-purple-900 px-6 py-5">
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Rúbrica de Evaluación — {currentAsignatura?.nombre}, {selectedCurso}
                </h2>
                <p className="text-indigo-200 text-sm mt-1">
                  Enseñanzas Profesionales de Música — Comunidad Autónoma de Extremadura
                </p>
                <p className="text-indigo-300 text-xs mt-1">
                  Decreto 58/2022 — Curso académico 2024/2025
                </p>
              </div>

              {/* Competencias Específicas */}
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <i className="fas fa-star text-amber-500"></i>
                  Competencias Específicas
                </h3>
                <div className="space-y-3">
                  {currentAsignatura?.competencias.map((comp) => (
                    <div
                      key={comp.id}
                      className="bg-indigo-50 rounded-lg p-4 border border-indigo-100"
                    >
                      <p className="font-semibold text-indigo-900 text-sm">
                        {comp.id}: {comp.descripcion}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {comp.descriptores.map((desc, idx) => (
                          <span
                            key={idx}
                            className="bg-white text-indigo-700 text-xs px-2 py-1 rounded-full border border-indigo-200"
                          >
                            {desc}
                          </span>
                        ))}
                      </div>
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
                        {nivel.nombre}
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
                  Criterios de Evaluación e Indicadores de Logro
                </h3>

                {currentAsignatura?.competencias.map((comp) => {
                  const criterios = getCriteriosByCompetencia(comp.id);
                  if (criterios.length === 0) return null;

                  return (
                    <div key={comp.id} className="mb-8">
                      <div className="bg-indigo-100 rounded-t-lg px-4 py-2 border border-indigo-200">
                        <h4 className="font-bold text-indigo-900 text-sm">
                          {comp.id}: {comp.descripcion}
                        </h4>
                      </div>

                      <div className="border border-gray-200 rounded-b-lg overflow-hidden">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="text-left px-3 py-2 font-semibold text-gray-700 w-48 border-r border-gray-200">
                                Criterio
                              </th>
                              {nivelesLogro.map((nivel) => (
                                <th
                                  key={nivel.nombre}
                                  className="text-center px-2 py-2 font-semibold border-r border-gray-200 last:border-r-0"
                                  style={{ color: nivel.color }}
                                >
                                  {nivel.nombre}
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
                                    {criterio.id}
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
                                      {generarIndicadores(
                                        currentAsignatura?.id || '',
                                        criterio.id,
                                        nivel.nombre
                                      )}
                                    </p>
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Instrumentos de Evaluación */}
              <div className="p-6 border-t border-gray-100 bg-amber-50">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <i className="fas fa-tools text-amber-600"></i>
                  Instrumentos de Evaluación Sugeridos
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentAsignatura?.instrumentos.map((inst, idx) => (
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
            </div>

            {/* Footer Note */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 text-center print:border-0">
              <p className="text-xs text-gray-500">
                Documento generado conforme al Decreto 58/2022 de la Junta de Extremadura.
                <br />
                Las rúbricas son orientativas y deben adaptarse al contexto específico del aula y
                del alumnado.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 mt-12 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            <i className="fas fa-music mr-2 text-indigo-400"></i>
            Arquitecto de Rúbricas Musicales — Enseñanzas Profesionales de Música
          </p>
          <p className="text-xs mt-2 text-gray-500">
            Basado en el Decreto 58/2022 — Comunidad Autónoma de Extremadura
          </p>
        </div>
      </footer>
    </div>
  );
}
