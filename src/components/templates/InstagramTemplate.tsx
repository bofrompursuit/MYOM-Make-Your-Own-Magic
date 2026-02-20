import type { InstagramData } from '../../types/templates';

interface Props {
  data: InstagramData;
  scale: number;
}

export function InstagramTemplate({ data, scale }: Props) {
  return (
    <div
      className="rounded-xl shadow-2xl overflow-hidden flex flex-col justify-center items-center text-center"
      style={{
        width: 1080 * scale,
        height: 1080 * scale,
        backgroundColor: data.backgroundColor,
        color: data.textColor,
        padding: 80 * scale,
        fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
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
  );
}
