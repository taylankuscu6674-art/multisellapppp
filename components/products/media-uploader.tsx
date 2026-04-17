"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { ImagePlus, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PreviewFile {
  id: string;
  name: string;
  url: string;
}

export function MediaUploader() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [coverId, setCoverId] = useState<string | null>(null);

  const helperText = useMemo(() => {
    if (files.length === 0) {
      return "Drop photos here or browse from your device.";
    }

    return `${files.length} image${files.length === 1 ? "" : "s"} queued for compression.`;
  }, [files.length]);

  function addFiles(fileList: FileList | null) {
    if (!fileList) {
      return;
    }

    const nextFiles = Array.from(fileList).map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      url: URL.createObjectURL(file)
    }));

    setFiles((current) => {
      const merged = [...current, ...nextFiles];
      if (!coverId && merged[0]) {
        setCoverId(merged[0].id);
      }
      return merged;
    });
  }

  return (
    <div className="space-y-4">
      <div
        className="flex min-h-56 flex-col items-center justify-center rounded-lg border border-dashed bg-muted/40 p-6 text-center"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          addFiles(event.dataTransfer.files);
        }}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-sm">
          <ImagePlus className="h-6 w-6 text-primary" />
        </div>
        <p className="mt-4 text-sm font-semibold">{helperText}</p>
        <p className="mt-1 max-w-md text-xs leading-5 text-muted-foreground">
          Images are prepared for resize, compression, ordering, and cover selection before
          marketplace review.
        </p>
        <input
          ref={inputRef}
          name="images"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(event) => addFiles(event.target.files)}
        />
        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={() => inputRef.current?.click()}
        >
          Browse photos
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {files.map((file, index) => (
          <button
            key={file.id}
            type="button"
            onClick={() => setCoverId(file.id)}
            className={cn(
              "group relative aspect-[4/5] overflow-hidden rounded-lg border bg-white text-left",
              coverId === file.id && "ring-2 ring-primary"
            )}
          >
            <Image src={file.url} alt={file.name} fill className="object-cover" />
            <span className="absolute left-2 top-2 rounded-md bg-white/90 px-2 py-1 text-xs font-semibold">
              {coverId === file.id ? "Cover" : `Photo ${index + 1}`}
            </span>
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex items-center justify-between rounded-lg border bg-white p-3 text-sm">
          <span className="flex items-center gap-2">
            <Wand2 className="h-4 w-4 text-primary" />
            AI background cleanup
          </span>
          <Badge variant="muted">Placeholder</Badge>
        </label>
        <label className="flex items-center justify-between rounded-lg border bg-white p-3 text-sm">
          <span className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-secondary" />
            Watermark toggle
          </span>
          <Badge variant="muted">Placeholder</Badge>
        </label>
      </div>
    </div>
  );
}
