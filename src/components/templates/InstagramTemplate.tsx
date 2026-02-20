import type { InstagramData, InstagramSticker } from '../../types/templates';
import { INSTAGRAM_SIZES } from '../../types/templates';

interface Props {
  data: InstagramData;
  scale: number;
  onStickersChange?: (stickers: InstagramSticker[]) => void;
  onInstagramChange?: (partial: Partial<InstagramData>) => void;
}

export function InstagramTemplate({ data, scale, onStickersChange, onInstagramChange }: Props) {
  const size = INSTAGRAM_SIZES[data.size];
  const headlineX = data.headlineX ?? 0.5;
  const headlineY = data.headlineY ?? 0.4;
  const subtextX = data.subtextX ?? 0.5;
  const subtextY = data.subtextY ?? 0.6;
  const bgScale = data.backgroundImageScale ?? 1;
  const bgX = data.backgroundImageX ?? 0.5;
  const bgY = data.backgroundImageY ?? 0.5;

  const clamp = (v: number) => Math.min(1, Math.max(0, v));

  const makeDragHandler = (field: 'headline' | 'subtext') => (e: React.PointerEvent<HTMLDivElement>) => {
    if (!onInstagramChange) return;
    const target = e.currentTarget.closest('[data-instagram-canvas]') as HTMLDivElement | null;
    if (!target) return;
    const bounds = target.getBoundingClientRect();
    const x = clamp((e.clientX - bounds.left) / bounds.width);
    const y = clamp((e.clientY - bounds.top) / bounds.height);
    if (field === 'headline') {
      onInstagramChange({ headlineX: x, headlineY: y });
    } else {
      onInstagramChange({ subtextX: x, subtextY: y });
    }
  };

  const handleStickerDrag = (id: string) => (e: React.PointerEvent<HTMLDivElement>) => {
    if (!onStickersChange) return;
    const target = e.currentTarget.closest('[data-instagram-canvas]') as HTMLDivElement | null;
    if (!target) return;
    const bounds = target.getBoundingClientRect();
    const x = clamp((e.clientX - bounds.left) / bounds.width);
    const y = clamp((e.clientY - bounds.top) / bounds.height);
    onStickersChange(
      data.stickers.map((s) =>
        s.id === id ? { ...s, x, y } : s
      ),
    );
  };

  return (
    <div
      data-instagram-canvas
      className="rounded-xl shadow-2xl overflow-hidden relative"
      style={{
        width: size.width * scale,
        height: size.height * scale,
        backgroundColor: data.backgroundColor,
        color: data.textColor,
        fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
      }}
    >
      {data.backgroundImage && (
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            transform: `scale(${bgScale})`,
            transformOrigin: '50% 50%',
          }}
        >
          <img
            src={data.backgroundImage}
            alt=""
            className="absolute w-full h-full object-cover"
            style={{
              objectPosition: `${bgX * 100}% ${bgY * 100}%`,
            }}
          />
        </div>
      )}

      {/* Draggable headline */}
      <div
        className="absolute cursor-grab active:cursor-grabbing select-none touch-none z-10"
        style={{
          left: `${headlineX * 100}%`,
          top: `${headlineY * 100}%`,
          transform: 'translate(-50%, -50%)',
          maxWidth: '90%',
        }}
        onPointerDown={(e) => (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)}
        onPointerMove={(e) => {
          if (e.buttons !== 1) return;
          makeDragHandler('headline')(e);
        }}
      >
        <h1
          className="font-bold text-center whitespace-nowrap"
          style={{
            fontSize: Math.max(24, 56 * scale),
            lineHeight: 1.15,
          }}
        >
          {data.headline}
        </h1>
      </div>

      {/* Draggable subtext */}
      {data.subtext && (
        <div
          className="absolute cursor-grab active:cursor-grabbing select-none touch-none z-10"
          style={{
            left: `${subtextX * 100}%`,
            top: `${subtextY * 100}%`,
            transform: 'translate(-50%, -50%)',
            maxWidth: '85%',
          }}
          onPointerDown={(e) => (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)}
        onPointerMove={(e) => {
          if (e.buttons !== 1) return;
          makeDragHandler('subtext')(e);
        }}
        >
          <p
            className="opacity-90 text-center whitespace-nowrap"
            style={{ fontSize: Math.max(14, 28 * scale) }}
          >
            {data.subtext}
          </p>
        </div>
      )}

      {/* Stickers */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {data.stickers.map((sticker) => (
          <div
            key={sticker.id}
            className="absolute pointer-events-auto cursor-grab active:cursor-grabbing select-none touch-none"
            style={{
              left: `${sticker.x * 100}%`,
              top: `${sticker.y * 100}%`,
              transform: `translate(-50%, -50%) scale(${sticker.scale}) rotate(${sticker.rotation}deg)`,
            }}
            onPointerDown={(e) => (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)}
            onPointerMove={(e) => {
              if (e.buttons !== 1) return;
              handleStickerDrag(sticker.id)(e);
            }}
          >
            <div className="px-3 py-1 rounded-full bg-black/60 text-white text-xs font-semibold backdrop-blur whitespace-nowrap">
              {sticker.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
