import { RichText as LexicalRichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

type Data = { root: { children: unknown[] } } | null | undefined;

/** Server-side renderer for Payload Lexical richText fields. */
export function RichText({ data, className }: { data: Data; className?: string }) {
  if (!data) return null;
  return (
    <div className={className}>
      <LexicalRichText data={data as unknown as SerializedEditorState} />
    </div>
  );
}
