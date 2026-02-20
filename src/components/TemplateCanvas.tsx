import type { TemplateData, InstagramSticker } from '../types/templates';
import { BookCoverTemplate } from './templates/BookCoverTemplate';
import { BookPageTemplate } from './templates/BookPageTemplate';
import { EventInviteTemplate } from './templates/EventInviteTemplate';
import { InstagramTemplate } from './templates/InstagramTemplate';
import { TEMPLATE_SPECS } from '../types/templates';

interface Props {
  data: TemplateData;
  scale: number;
  templateRef?: React.RefObject<HTMLDivElement | null>;
  onInstagramStickersChange?: (stickers: InstagramSticker[]) => void;
}

export function TemplateCanvas({
  data,
  scale,
  templateRef,
  onInstagramStickersChange,
}: Props) {
  const spec = TEMPLATE_SPECS[data.kind];
  const baseWidth =
    data.kind === 'instagram'
      ? TEMPLATE_SPECS.instagram.width
      : spec.width;
  const baseHeight =
    data.kind === 'instagram'
      ? TEMPLATE_SPECS.instagram.height
      : spec.height;
  const maxW = 400;
  const maxH = 560;
  const scaleToFit = Math.min(
    maxW / baseWidth,
    maxH / baseHeight,
    1.2
  );
  const displayScale = scale * scaleToFit;

  return (
    <div
      className="flex items-center justify-center min-h-[400px] p-6 bg-zinc-900/50 rounded-xl border border-zinc-700/50"
      data-template-canvas
    >
      <div ref={templateRef}>
        {data.kind === 'book-cover' && (
          <BookCoverTemplate data={data.data} scale={displayScale} />
        )}
        {data.kind === 'book-page' && (
          <BookPageTemplate data={data.data} scale={displayScale} />
        )}
        {data.kind === 'event-invite' && (
          <EventInviteTemplate data={data.data} scale={displayScale} />
        )}
        {data.kind === 'instagram' && (
          <InstagramTemplate
            data={data.data}
            scale={displayScale}
            onStickersChange={onInstagramStickersChange}
          />
        )}
      </div>
    </div>
  );
}
