import type { InstagramData, InstagramSticker } from '../../types/templates';
import { INSTAGRAM_SIZES } from '../../types/templates';

interface Props {
  data: InstagramData;
  scale: number;
  onStickersChange?: (stickers: InstagramSticker[]) => void;
}

export function InstagramTemplate({ data, scale, onStickersChange }: Props) {
  const size = INSTAGRAM_SIZES[data.size];

  const handleStickerDrag =
    (id: string) => (event: React.PointerEvent<HTMLDivElement>) => {
      if (!onStickersChange) return;
      const target = event.currentTarget.parentElement as HTMLDivElement | null;
      if (!target) return;

      const bounds = target.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;

      onStickersChange(
        data.stickers.map((s) =>
          s.id === id
            ? {
                ...s,
                x: Math.min(1, Math.max(0, x)),
                y: Math.min(1, Math.max(0, y)),
              }
            : s,
        ),
      );
    };

  return (
    <div
      className="rounded-xl shadow-2xl overflow-hidden flex flex-col justify-center items-center text-center relative"
      style={{
        width: size.width * scale,
        height: size.height * scale,
        backgroundColor: data.backgroundColor,
        color: data.textColor,
        fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
      }}
    >
      {data.backgroundImage && (
        <img
          src={data.backgroundImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <div
        className="relative flex flex-col items-center justify-center text-center px-12"
        style={{
          padding: 80 * scale,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <h1
          className="font-bold max-w-full"
          style={{
            fontSize: Math.max(24, 56 * scale),
            lineHeight: 1.15,
          }}
        >
          {data.headline}
        </h1>
        {data.subtext && (
          <p
            className="mt-6 opacity-90"
            style={{
              fontSize: Math.max(14, 28 * scale),
              marginTop: 32 * scale,
            }}
          >
            {data.subtext}
          </p>
        )}
      </div>

      {/* Stickers */}
      <div className="absolute inset-0 pointer-events-none">
        {data.stickers.map((sticker) => (
          <div
            key={sticker.id}
            className="absolute pointer-events-auto cursor-grab active:cursor-grabbing select-none"
            style={{
              left: `${sticker.x * 100}%`,
              top: `${sticker.y * 100}%`,
              transform: `translate(-50%, -50%) scale(${sticker.scale}) rotate(${sticker.rotation}deg)`,
            }}
            onPointerDown={(e) => {
              e.preventDefault();
              (e.target as HTMLElement).setPointerCapture(e.pointerId);
            }}
            onPointerMove={(e) => {
              if (!(e.buttons & 1)) return;
              handleStickerDrag(sticker.id)(e);
            }}
          >
            <div className="px-3 py-1 rounded-full bg-black/60 text-white text-xs font-semibold backdrop-blur">
              {sticker.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
