import { useCallback, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import {
  TEMPLATE_SPECS,
  INSTAGRAM_SIZES,
  type TemplateKind,
  type TemplateData,
  type InstagramData,
  DEFAULT_BOOK_COVER,
  DEFAULT_BOOK_PAGE,
  DEFAULT_EVENT_INVITE,
  DEFAULT_INSTAGRAM,
} from './types/templates';
import { TemplateCanvas } from './components/TemplateCanvas';
import { PropertyPanel } from './components/PropertyPanel';

const INITIAL_DATA: TemplateData[] = [
  { kind: 'book-cover', data: DEFAULT_BOOK_COVER },
  { kind: 'book-page', data: DEFAULT_BOOK_PAGE },
  { kind: 'event-invite', data: DEFAULT_EVENT_INVITE },
  { kind: 'instagram', data: DEFAULT_INSTAGRAM },
];

function getDefaultData(kind: TemplateKind): TemplateData {
  const found = INITIAL_DATA.find((d) => d.kind === kind);
  return found ?? { kind: 'instagram', data: DEFAULT_INSTAGRAM };
}

const ZOOM_MIN = 0.25;
const ZOOM_MAX = 2;
const ZOOM_STEP = 0.25;

export default function App() {
  const [templateKind, setTemplateKind] = useState<TemplateKind>('book-cover');
  const [templateData, setTemplateData] = useState<TemplateData>(() => getDefaultData('book-cover'));
  const [zoom, setZoom] = useState(1);
  const [exporting, setExporting] = useState(false);
  const templateRef = useRef<HTMLDivElement>(null);

  const switchTemplate = useCallback((kind: TemplateKind) => {
    setTemplateKind(kind);
    setTemplateData(getDefaultData(kind));
  }, []);

  const getExportDimensions = useCallback(() => {
    if (templateData.kind === 'instagram') {
      const size = INSTAGRAM_SIZES[(templateData.data as InstagramData).size];
      return { width: size.width, height: size.height };
    }
    const spec = TEMPLATE_SPECS[templateData.kind];
    return { width: spec.width, height: spec.height };
  }, [templateData]);

  const handleExport = useCallback(async () => {
    const el = templateRef.current?.firstElementChild as HTMLElement;
    if (!el) return;
    const { width: targetW, height: targetH } = getExportDimensions();
    const renderedW = el.offsetWidth;
    const renderedH = el.offsetHeight;
    const scaleX = targetW / renderedW;
    const scaleY = targetH / renderedH;
    const scale = Math.max(scaleX, scaleY, 1);
    setExporting(true);
    try {
      const canvas = await html2canvas(el, {
        scale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
      });
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `myom-${templateData.kind}-${Date.now()}.png`;
      link.href = dataUrl;
      link.rel = 'download';
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e) {
      console.error('Export failed', e);
    } finally {
      setExporting(false);
    }
  }, [templateData.kind, getExportDimensions]);

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--canvas-bg)]">
      {/* Left sidebar - template picker */}
      <aside className="w-56 shrink-0 border-r border-[var(--border)] bg-[var(--sidebar-bg)] flex flex-col">
        <div className="p-4 border-b border-[var(--border)]">
          <h1 className="text-lg font-semibold text-white tracking-tight">
            MYOM
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Make Your Own Magic
          </p>
        </div>
        <nav className="p-2 flex-1">
          <p className="text-[10px] uppercase tracking-wider text-zinc-500 px-2 mb-2">
            Templates
          </p>
          {(Object.keys(TEMPLATE_SPECS) as TemplateKind[]).map((kind) => {
            const spec = TEMPLATE_SPECS[kind];
            const active = templateKind === kind;
            return (
              <button
                key={kind}
                type="button"
                onClick={() => switchTemplate(kind)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors mb-0.5 ${
                  active
                    ? 'bg-indigo-600 text-white'
                    : 'text-zinc-300 hover:bg-zinc-700/80'
                }`}
              >
                {spec.name}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Center - canvas */}
      <main className="flex-1 flex flex-col min-w-0 overflow-auto">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--panel-bg)]/80 flex-wrap gap-3">
          <div>
            <h2 className="text-sm font-medium text-white">
              {TEMPLATE_SPECS[templateKind].name}
            </h2>
            <p className="text-xs text-zinc-400">
              {TEMPLATE_SPECS[templateKind].description}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400 whitespace-nowrap">Zoom</span>
              <div className="flex items-center bg-zinc-800 rounded-lg border border-zinc-600 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.max(ZOOM_MIN, z - ZOOM_STEP))}
                  className="px-2.5 py-1.5 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors text-sm font-medium"
                  aria-label="Zoom out"
                >
                  −
                </button>
                <span className="px-2.5 text-sm text-white min-w-[3ch] text-center tabular-nums">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.min(ZOOM_MAX, z + ZOOM_STEP))}
                  className="px-2.5 py-1.5 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors text-sm font-medium"
                  aria-label="Zoom in"
                >
                  +
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={handleExport}
              disabled={exporting}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors"
            >
              {exporting ? 'Exporting…' : 'Download PNG'}
            </button>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-6 overflow-auto">
          <TemplateCanvas
            data={templateData}
            scale={zoom}
            templateRef={templateRef}
            onInstagramStickersChange={(stickers) => {
              if (templateData.kind !== 'instagram') return;
              setTemplateData({
                kind: 'instagram',
                data: { ...templateData.data, stickers },
              });
            }}
            onInstagramChange={(partial) => {
              if (templateData.kind !== 'instagram') return;
              setTemplateData({
                kind: 'instagram',
                data: { ...templateData.data, ...partial },
              });
            }}
          />
        </div>
      </main>

      {/* Right panel - properties */}
      <aside className="w-72 shrink-0 border-l border-[var(--border)] bg-[var(--panel-bg)] overflow-y-auto">
        <div className="p-4 border-b border-[var(--border)]">
          <h3 className="text-sm font-medium text-white">Properties</h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Edit content and colors
          </p>
        </div>
        <div className="p-4">
          <PropertyPanel data={templateData} onChange={setTemplateData} />
        </div>
      </aside>
    </div>
  );
}
