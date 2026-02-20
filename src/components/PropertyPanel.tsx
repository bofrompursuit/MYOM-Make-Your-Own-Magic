import type { TemplateData, BookCoverData, BookPageData, EventInviteData, InstagramData } from '../types/templates';

interface Props {
  data: TemplateData;
  onChange: (data: TemplateData) => void;
}

function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">
      {children}
    </label>
  );
}

function Input({
  value,
  onChange,
  id,
  placeholder,
  type = 'text',
}: {
  value: string;
  onChange: (v: string) => void;
  id?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-600 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
    />
  );
}

export function PropertyPanel({ data, onChange }: Props) {
  if (data.kind === 'book-cover') {
    const d = data.data as BookCoverData;
    const update = (partial: Partial<BookCoverData>) =>
      onChange({ kind: 'book-cover', data: { ...d, ...partial } });
    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={d.title} onChange={(v) => update({ title: v })} placeholder="Book title" />
        </div>
        <div>
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input id="subtitle" value={d.subtitle} onChange={(v) => update({ subtitle: v })} placeholder="Subtitle" />
        </div>
        <div>
          <Label htmlFor="author">Author</Label>
          <Input id="author" value={d.author} onChange={(v) => update({ author: v })} placeholder="Author name" />
        </div>
        <div>
          <Label>Background</Label>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={d.backgroundColor}
              onChange={(e) => update({ backgroundColor: e.target.value })}
              className="w-10 h-10 rounded cursor-pointer border border-zinc-600"
            />
            <Input value={d.backgroundColor} onChange={(v) => update({ backgroundColor: v })} />
          </div>
        </div>
        <div>
          <Label>Text color</Label>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={d.textColor}
              onChange={(e) => update({ textColor: e.target.value })}
              className="w-10 h-10 rounded cursor-pointer border border-zinc-600"
            />
            <Input value={d.textColor} onChange={(v) => update({ textColor: v })} />
          </div>
        </div>
      </div>
    );
  }

  if (data.kind === 'book-page') {
    const d = data.data as BookPageData;
    const update = (partial: Partial<BookPageData>) =>
      onChange({ kind: 'book-page', data: { ...d, ...partial } });
    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="page-title">Chapter / Title</Label>
          <Input id="page-title" value={d.title} onChange={(v) => update({ title: v })} placeholder="Chapter title" />
        </div>
        <div>
          <Label htmlFor="body">Body text</Label>
          <textarea
            id="body"
            value={d.body}
            onChange={(e) => update({ body: e.target.value })}
            placeholder="Page content..."
            rows={6}
            className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-600 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-y"
          />
        </div>
        <div>
          <Label htmlFor="page-num">Page number</Label>
          <Input id="page-num" value={d.pageNumber} onChange={(v) => update({ pageNumber: v })} placeholder="1" />
        </div>
        <div>
          <Label>Background</Label>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={d.backgroundColor}
              onChange={(e) => update({ backgroundColor: e.target.value })}
              className="w-10 h-10 rounded cursor-pointer border border-zinc-600"
            />
            <Input value={d.backgroundColor} onChange={(v) => update({ backgroundColor: v })} />
          </div>
        </div>
        <div>
          <Label>Text color</Label>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={d.textColor}
              onChange={(e) => update({ textColor: e.target.value })}
              className="w-10 h-10 rounded cursor-pointer border border-zinc-600"
            />
            <Input value={d.textColor} onChange={(v) => update({ textColor: v })} />
          </div>
        </div>
      </div>
    );
  }

  if (data.kind === 'event-invite') {
    const d = data.data as EventInviteData;
    const update = (partial: Partial<EventInviteData>) =>
      onChange({ kind: 'event-invite', data: { ...d, ...partial } });
    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="invite-title">Title</Label>
          <Input id="invite-title" value={d.title} onChange={(v) => update({ title: v })} placeholder="You're Invited" />
        </div>
        <div>
          <Label htmlFor="invite-sub">Subtitle</Label>
          <Input id="invite-sub" value={d.subtitle} onChange={(v) => update({ subtitle: v })} placeholder="To a special evening" />
        </div>
        <div>
          <Label htmlFor="date">Date</Label>
          <Input id="date" value={d.date} onChange={(v) => update({ date: v })} placeholder="Saturday, March 15" />
        </div>
        <div>
          <Label htmlFor="time">Time</Label>
          <Input id="time" value={d.time} onChange={(v) => update({ time: v })} placeholder="7:00 PM" />
        </div>
        <div>
          <Label htmlFor="place">Place</Label>
          <Input id="place" value={d.place} onChange={(v) => update({ place: v })} placeholder="Venue or address" />
        </div>
        <div>
          <Label htmlFor="rsvp">RSVP</Label>
          <Input id="rsvp" value={d.rsvp} onChange={(v) => update({ rsvp: v })} placeholder="RSVP by..." />
        </div>
        <div>
          <Label>Background</Label>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={d.backgroundColor}
              onChange={(e) => update({ backgroundColor: e.target.value })}
              className="w-10 h-10 rounded cursor-pointer border border-zinc-600"
            />
            <Input value={d.backgroundColor} onChange={(v) => update({ backgroundColor: v })} />
          </div>
        </div>
        <div>
          <Label>Text color</Label>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={d.textColor}
              onChange={(e) => update({ textColor: e.target.value })}
              className="w-10 h-10 rounded cursor-pointer border border-zinc-600"
            />
            <Input value={d.textColor} onChange={(v) => update({ textColor: v })} />
          </div>
        </div>
      </div>
    );
  }

  if (data.kind === 'instagram') {
    const d = data.data as InstagramData;
    const update = (partial: Partial<InstagramData>) =>
      onChange({ kind: 'instagram', data: { ...d, ...partial } });
    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="headline">Headline</Label>
          <Input id="headline" value={d.headline} onChange={(v) => update({ headline: v })} placeholder="Your Headline" />
        </div>
        <div>
          <Label htmlFor="subtext">Subtext / CTA</Label>
          <Input id="subtext" value={d.subtext} onChange={(v) => update({ subtext: v })} placeholder="Supporting text" />
        </div>
        <div>
          <Label>Background</Label>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={d.backgroundColor}
              onChange={(e) => update({ backgroundColor: e.target.value })}
              className="w-10 h-10 rounded cursor-pointer border border-zinc-600"
            />
            <Input value={d.backgroundColor} onChange={(v) => update({ backgroundColor: v })} />
          </div>
        </div>
        <div>
          <Label>Text color</Label>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={d.textColor}
              onChange={(e) => update({ textColor: e.target.value })}
              className="w-10 h-10 rounded cursor-pointer border border-zinc-600"
            />
            <Input value={d.textColor} onChange={(v) => update({ textColor: v })} />
          </div>
        </div>
      </div>
    );
  }

  return null;
}
