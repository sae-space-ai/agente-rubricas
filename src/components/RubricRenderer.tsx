import { useMemo } from 'react';

interface RubricRendererProps {
  content: string;
  asignatura: string;
  curso: string;
}

interface ParsedSection {
  title: string;
  content: string;
  type: 'heading' | 'list' | 'paragraph' | 'table' | 'bold';
}

function parseMarkdown(text: string): ParsedSection[] {
  const lines = text.split('\n');
  const sections: ParsedSection[] = [];
  let currentContent = '';
  let currentTitle = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Detectar encabezados
    if (line.startsWith('# ') || line.startsWith('## ') || line.startsWith('### ')) {
      if (currentTitle || currentContent) {
        sections.push({
          title: currentTitle,
          content: currentContent.trim(),
          type: currentTitle.startsWith('#') ? 'heading' : 'paragraph'
        });
      }
      currentTitle = line;
      currentContent = '';
    } else if (line.startsWith('- ') || line.startsWith('* ') || /^\d+\./.test(line)) {
      currentContent += line + '\n';
    } else if (line === '') {
      if (currentContent.trim()) {
        sections.push({
          title: currentTitle,
          content: currentContent.trim(),
          type: 'paragraph'
        });
        currentContent = '';
        currentTitle = '';
      }
    } else {
      currentContent += line + '\n';
    }
  }

  if (currentTitle || currentContent) {
    sections.push({
      title: currentTitle,
      content: currentContent.trim(),
      type: 'paragraph'
    });
  }

  return sections;
}

function renderInlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>');
}

export default function RubricRenderer({ content, asignatura, curso }: RubricRendererProps) {
  const sections = useMemo(() => parseMarkdown(content), [content]);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 px-6 py-5">
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Rúbrica de Evaluación — {asignatura}, {curso}
        </h2>
        <p className="text-indigo-200 text-sm mt-1">
          Enseñanzas Profesionales de Música — Comunidad Autónoma de Extremadura
        </p>
        <p className="text-indigo-300 text-xs mt-1">
          Generada con IA — Decreto 58/2022
        </p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {sections.map((section, idx) => (
          <div key={idx} className="animate-fadeIn" style={{ animationDelay: `${idx * 50}ms` }}>
            {section.title && (
              <h3 className="text-lg font-bold text-indigo-900 mb-3 flex items-center gap-2 border-b border-indigo-100 pb-2">
                <i className={`fas ${getIconForSection(section.title)} text-indigo-500`}></i>
                <span dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(section.title.replace(/^#+\s*/, '')) }} />
              </h3>
            )}
            {renderContent(section.content)}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <p className="text-xs text-gray-500 text-center">
          Documento generado mediante inteligencia artificial (Qwen 3.0) conforme al Decreto 58/2022.
          <br />
          Las rúbricas son orientativas y deben ser revisadas y adaptadas por el docente.
        </p>
      </div>
    </div>
  );
}

function getIconForSection(title: string): string {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('competencia')) return 'fa-star';
  if (lowerTitle.includes('criterio')) return 'fa-clipboard-check';
  if (lowerTitle.includes('nivel')) return 'fa-layer-group';
  if (lowerTitle.includes('indicador')) return 'fa-bullseye';
  if (lowerTitle.includes('instrumento')) return 'fa-tools';
  if (lowerTitle.includes('título') || lowerTitle.includes('titulo')) return 'fa-file-alt';
  return 'fa-chevron-right';
}

function renderContent(content: string): JSX.Element {
  const lines = content.split('\n').filter(line => line.trim());
  const isList = lines.every(line =>
    line.startsWith('- ') || line.startsWith('* ') || /^\d+\./.test(line.trim())
  );

  if (isList && lines.length > 0) {
    const isOrdered = /^\d+\./.test(lines[0].trim());
    const ListTag = isOrdered ? 'ol' : 'ul';

    return (
      <ListTag className={`${isOrdered ? 'list-decimal' : 'list-disc'} pl-6 space-y-2`}>
        {lines.map((line, idx) => (
          <li
            key={idx}
            className="text-gray-700 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: renderInlineMarkdown(line.replace(/^[-*]\s+|^\d+\.\s+/, ''))
            }}
          />
        ))}
      </ListTag>
    );
  }

  return (
    <div className="space-y-2">
      {lines.map((line, idx) => (
        <p
          key={idx}
          className="text-gray-700 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(line) }}
        />
      ))}
    </div>
  );
}
