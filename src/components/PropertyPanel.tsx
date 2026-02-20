import { useRef, useState } from 'react';
import type {
  TemplateData,
  BookCoverData,
  BookPageData,
  EventInviteData,
  InstagramData,
  InstagramSizeKey,
  FontKey,
} from '../types/templates';
import { INSTAGRAM_SIZES, FONT_OPTIONS } from '../types/templates';

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

function FontSelect({
  value,
  onChange,
  id,
}: {
  value: FontKey;
  onChange: (v: FontKey) => void;
  id?: string;
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value as FontKey)}
      className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
    >
      {(Object.keys(FONT_OPTIONS) as FontKey[]).map((key) => (
        <option key={key} value={key}>
          {FONT_OPTIONS[key].label}
        </option>
      ))}
    </select>
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
        <div>
          <Label htmlFor="book-cover-font">Font</Label>
          <FontSelect id="book-cover-font" value={d.fontFamily ?? 'georgia'} onChange={(v) => update({ fontFamily: v })} />
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
        <div>
          <Label htmlFor="book-page-font">Font</Label>
          <FontSelect id="book-page-font" value={d.fontFamily ?? 'georgia'} onChange={(v) => update({ fontFamily: v })} />
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
        <div>
          <Label htmlFor="event-invite-font">Font</Label>
          <FontSelect id="event-invite-font" value={d.fontFamily ?? 'playfair'} onChange={(v) => update({ fontFamily: v })} />
        </div>
      </div>
    );
  }

  if (data.kind === 'instagram') {
    const d = data.data as InstagramData;
    const update = (partial: Partial<InstagramData>) =>
      onChange({ kind: 'instagram', data: { ...d, ...partial } });

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [usingCamera, setUsingCamera] = useState(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const result = typeof reader.result === 'string' ? reader.result : '';
        if (result) {
          update({
            backgroundImage: result,
            backgroundImageScale: d.backgroundImageScale ?? 1,
            backgroundImageX: d.backgroundImageX ?? 0.5,
            backgroundImageY: d.backgroundImageY ?? 0.5,
          });
        }
      };
      reader.readAsDataURL(file);
    };

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setUsingCamera(true);
        }
      } catch {
        // ignore for now
      }
    };

    const capturePhoto = () => {
      if (!videoRef.current) return;
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 1080;
      canvas.height = video.videoHeight || 1080;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/png');
      update({
        backgroundImage: dataUrl,
        backgroundImageScale: d.backgroundImageScale ?? 1,
        backgroundImageX: d.backgroundImageX ?? 0.5,
        backgroundImageY: d.backgroundImageY ?? 0.5,
      });

      const stream = video.srcObject as MediaStream | null;
      stream?.getTracks().forEach((t) => t.stop());
      video.srcObject = null;
      setUsingCamera(false);
    };

    const addSticker = (text: string) => {
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      const stickers = [
        ...d.stickers,
        {
          id,
          text,
          x: 0.5,
          y: 0.5,
          scale: 1,
          rotation: 0,
        },
      ];
      update({ stickers });
    };

    const handleSizeChange = (value: InstagramSizeKey) => {
      update({ size: value });
    };

    return (
      <div className="space-y-4">
        <p className="text-[10px] text-zinc-500 mb-2">
          Drag headline and subtext on the canvas to reposition.
        </p>
        <div>
          <Label htmlFor="headline">Headline</Label>
          <Input id="headline" value={d.headline} onChange={(v) => update({ headline: v })} placeholder="Your Headline" />
        </div>
        <div>
          <Label htmlFor="subtext">Subtext / CTA</Label>
          <Input id="subtext" value={d.subtext} onChange={(v) => update({ subtext: v })} placeholder="Supporting text" />
        </div>
        <div>
          <Label>Canvas size</Label>
          <select
            value={d.size}
            onChange={(e) => handleSizeChange(e.target.value as InstagramSizeKey)}
            className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {Object.values(INSTAGRAM_SIZES).map((size) => (
              <option key={size.key} value={size.key}>
                {size.label}
              </option>
            ))}
          </select>
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
        <div>
          <Label htmlFor="instagram-font">Font</Label>
          <FontSelect id="instagram-font" value={d.fontFamily ?? 'dm-sans'} onChange={(v) => update({ fontFamily: v })} />
        </div>
        <div className="pt-2 border-t border-zinc-700/70 space-y-3">
          <Label>Background media</Label>
          <div className="space-y-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-xs text-zinc-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-indigo-600 file:text-white hover:file:bg-indigo-500"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={usingCamera ? capturePhoto : startCamera}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-600 text-xs text-zinc-100 hover:bg-zinc-700 transition-colors"
              >
                {usingCamera ? 'Capture photo' : 'Take photo'}
              </button>
            </div>
            {usingCamera && (
              <video
                ref={videoRef}
                className="mt-2 w-full rounded-lg border border-zinc-700"
                autoPlay
                playsInline
                muted
              />
            )}
            {d.backgroundImage && (
              <div className="mt-3 space-y-3 pt-3 border-t border-zinc-700/50">
                <div>
                  <Label>Photo size</Label>
                  <input
                    type="range"
                    min={0.5}
                    max={2}
                    step={0.1}
                    value={d.backgroundImageScale ?? 1}
                    onChange={(e) =>
                      update({ backgroundImageScale: parseFloat(e.target.value) })
                    }
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-zinc-700 accent-indigo-500"
                  />
                  <p className="text-[10px] text-zinc-500 mt-0.5">
                    {(d.backgroundImageScale ?? 1).toFixed(1)}× zoom
                  </p>
                </div>
                <div>
                  <Label>Photo position (focus point)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-zinc-500">X</span>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={d.backgroundImageX ?? 0.5}
                        onChange={(e) =>
                          update({ backgroundImageX: parseFloat(e.target.value) })
                        }
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-zinc-700 accent-indigo-500"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500">Y</span>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={d.backgroundImageY ?? 0.5}
                        onChange={(e) =>
                          update({ backgroundImageY: parseFloat(e.target.value) })
                        }
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-zinc-700 accent-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="pt-2 border-t border-zinc-700/70 space-y-2">
          <Label>Stickers</Label>
          <div className="flex flex-wrap gap-2">
            {['New', '✨ Magic', '🔥 Hot', 'Sale', 'Drop'].map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => addSticker(label)}
                className="px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-600 text-[11px] text-zinc-100 hover:bg-zinc-700"
              >
                {label}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-zinc-500">
            Drag stickers directly on the canvas to reposition.
          </p>
        </div>
      </div>
    );
  }

  return null;
}
