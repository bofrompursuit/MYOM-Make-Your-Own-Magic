import type { EventInviteData } from '../../types/templates';

interface Props {
  data: EventInviteData;
  scale: number;
}

export function EventInviteTemplate({ data, scale }: Props) {
  return (
    <div
      className="rounded-sm shadow-2xl overflow-hidden flex flex-col justify-center items-center text-center"
      style={{
        width: 360 * scale,
        height: 504 * scale,
        backgroundColor: data.backgroundColor,
        color: data.textColor,
        padding: 36 * scale,
        fontFamily: '"Playfair Display", Georgia, serif',
      }}
    >
      <p
        className="uppercase tracking-[0.3em] opacity-80 mb-2"
        style={{ fontSize: Math.max(10, 12 * scale) }}
      >
        {data.subtitle}
      </p>
      <h1
        className="font-bold mb-6"
        style={{ fontSize: Math.max(22, 32 * scale) }}
      >
        {data.title}
      </h1>
      <div className="w-12 h-px bg-current opacity-50 my-4" style={{ width: 48 * scale, height: 2, marginTop: 16 * scale, marginBottom: 16 * scale }} />
      <p className="font-medium" style={{ fontSize: Math.max(14, 18 * scale) }}>
        {data.date}
      </p>
      <p className="opacity-90" style={{ fontSize: Math.max(13, 16 * scale) }}>
        {data.time}
      </p>
      <p className="mt-2 opacity-90" style={{ fontSize: Math.max(13, 16 * scale), marginTop: 12 * scale }}>
        {data.place}
      </p>
      <p
        className="mt-8 opacity-70"
        style={{ fontSize: Math.max(11, 13 * scale), marginTop: 32 * scale }}
      >
        {data.rsvp}
      </p>
    </div>
  );
}
