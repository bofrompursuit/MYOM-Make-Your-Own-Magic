import type { BookPageData } from '../../types/templates';
import { FONT_OPTIONS } from '../../types/templates';

interface Props {
  data: BookPageData;
  scale: number;
}

export function BookPageTemplate({ data, scale }: Props) {
  const fontFamily = FONT_OPTIONS[data.fontFamily ?? 'georgia']?.fontFamily ?? FONT_OPTIONS.georgia.fontFamily;
  return (
    <div
      className="rounded-sm shadow-2xl overflow-hidden flex flex-col"
      style={{
        width: 396 * scale,
        height: 612 * scale,
        backgroundColor: data.backgroundColor,
        color: data.textColor,
        padding: 40 * scale,
        fontFamily,
      }}
    >
      {data.title && (
        <h2
          className="font-semibold mb-4"
          style={{ fontSize: Math.max(14, 20 * scale) }}
        >
          {data.title}
        </h2>
      )}
      <p
        className="flex-1 leading-relaxed whitespace-pre-wrap"
        style={{ fontSize: Math.max(11, 14 * scale) }}
      >
        {data.body}
      </p>
      <p
        className="text-center opacity-70 mt-4"
        style={{ fontSize: Math.max(10, 12 * scale) }}
      >
        {data.pageNumber}
      </p>
    </div>
  );
}
