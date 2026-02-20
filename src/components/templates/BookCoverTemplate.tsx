import type { BookCoverData } from '../../types/templates';

interface Props {
  data: BookCoverData;
  scale: number;
}

export function BookCoverTemplate({ data, scale }: Props) {
  return (
    <div
      className="rounded-sm shadow-2xl flex flex-col justify-between overflow-hidden"
      style={{
        width: 405 * scale,
        height: 585 * scale,
        backgroundColor: data.backgroundColor,
        padding: 32 * scale,
      }}
    >
      <div style={{ flex: 1 }} />
      <div
        className="flex flex-col gap-2"
        style={{
          color: data.textColor,
          fontFamily: 'Georgia, "Times New Roman", serif',
        }}
      >
        <h1
          className="font-bold leading-tight"
          style={{
            fontSize: Math.max(18, 28 * scale),
            lineHeight: 1.2,
          }}
        >
          {data.title}
        </h1>
        {data.subtitle && (
          <p
            className="opacity-90"
            style={{ fontSize: Math.max(12, 16 * scale) }}
          >
            {data.subtitle}
          </p>
        )}
        <p
          className="mt-4 opacity-80"
          style={{
            fontSize: Math.max(11, 14 * scale),
            fontStyle: 'italic',
          }}
        >
          {data.author}
        </p>
      </div>
    </div>
  );
}
