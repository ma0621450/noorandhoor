"use client";

import { useEffect, useRef, useState } from "react";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Underline as UnderlineIcon,
} from "lucide-react";
import { uploadInlineImage } from "@/lib/admin/data/blogImages";
import { createClient } from "@/lib/supabase/client";
import { cx } from "@/lib/admin/utils";

function ToolbarButton({ active, disabled, onClick, label, children }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      onMouseDown={(event) => {
        event.preventDefault();
        onClick?.();
      }}
      className={cx(
        "inline-flex h-8 min-w-8 items-center justify-center rounded-md px-1.5 text-sm font-semibold transition",
        active
          ? "bg-[#ba8a44]/25 text-[#eec876]"
          : "text-white/55 hover:bg-white/8 hover:text-[#eec876]",
        disabled && "cursor-not-allowed opacity-40",
      )}
    >
      {children}
    </button>
  );
}

export default function RichTextEditor({
  value = "",
  onChange,
  error,
  label = "Article body",
  placeholder = "Write your article...",
}) {
  const imageInputRef = useRef(null);
  const [htmlMode, setHtmlMode] = useState(false);
  const [htmlDraft, setHtmlDraft] = useState(value || "");
  const [uploadError, setUploadError] = useState("");

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        codeBlock: true,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      Image.configure({ allowBase64: false }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "blog-rich-editor min-h-[280px] px-5 py-4 text-[15px] leading-7 text-white/85 outline-none",
      },
    },
    onUpdate: ({ editor: current }) => {
      const html = current.getHTML();
      setHtmlDraft(html);
      onChange?.(html);
    },
  });

  useEffect(() => {
    if (!editor || htmlMode) return;
    const current = editor.getHTML();
    if ((value || "") !== current) {
      editor.commands.setContent(value || "", { emitUpdate: false });
      setHtmlDraft(value || "");
    }
  }, [editor, value, htmlMode]);

  const setLink = () => {
    if (!editor) return;
    const previous = editor.getAttributes("link").href || "";
    const url = window.prompt("Enter link URL", previous);
    if (url === null) return;
    if (!url.trim()) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url.trim() })
      .run();
  };

  const onPickImage = async (file) => {
    if (!file || !editor) return;
    setUploadError("");
    try {
      const url = await uploadInlineImage(createClient(), file);
      editor.chain().focus().setImage({ src: url, alt: "" }).run();
    } catch (err) {
      setUploadError(err?.message || "Could not upload image.");
    }
  };

  const toggleHtmlMode = () => {
    if (!editor) return;
    if (htmlMode) {
      editor.commands.setContent(htmlDraft || "", { emitUpdate: false });
      onChange?.(htmlDraft || "");
      setHtmlMode(false);
      return;
    }
    setHtmlDraft(editor.getHTML());
    setHtmlMode(true);
  };

  return (
    <div className="space-y-1.5">
      {label ? (
        <p className="text-xs font-medium uppercase tracking-[1.4px] text-white/60">
          {label}
        </p>
      ) : null}

      <div className="flex max-h-[min(70vh,640px)] flex-col overflow-hidden rounded-2xl border border-[#ba8a44]/30 bg-[#141414]">
        <div className="sticky top-0 z-20 flex shrink-0 flex-wrap items-center gap-0.5 border-b border-[#ba8a44]/25 bg-[#1a1a1a] px-2 py-2">
          <ToolbarButton
            label="Bold"
            active={editor?.isActive("bold")}
            disabled={!editor || htmlMode}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold className="h-4 w-4" strokeWidth={2.4} />
          </ToolbarButton>
          <ToolbarButton
            label="Italic"
            active={editor?.isActive("italic")}
            disabled={!editor || htmlMode}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic className="h-4 w-4" strokeWidth={2.4} />
          </ToolbarButton>
          <ToolbarButton
            label="Underline"
            active={editor?.isActive("underline")}
            disabled={!editor || htmlMode}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <UnderlineIcon className="h-4 w-4" strokeWidth={2.4} />
          </ToolbarButton>
          <ToolbarButton
            label="Heading 1"
            active={editor?.isActive("heading", { level: 1 })}
            disabled={!editor || htmlMode}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <Heading1 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            label="Heading 2"
            active={editor?.isActive("heading", { level: 2 })}
            disabled={!editor || htmlMode}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <Heading2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            label="Heading 3"
            active={editor?.isActive("heading", { level: 3 })}
            disabled={!editor || htmlMode}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            <Heading3 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            label="Bullet list"
            active={editor?.isActive("bulletList")}
            disabled={!editor || htmlMode}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            label="Numbered list"
            active={editor?.isActive("orderedList")}
            disabled={!editor || htmlMode}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            label="Quote"
            active={editor?.isActive("blockquote")}
            disabled={!editor || htmlMode}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <Quote className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            label="Code block"
            active={editor?.isActive("codeBlock")}
            disabled={!editor || htmlMode}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          >
            <Code2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            label="HTML"
            active={htmlMode}
            disabled={!editor}
            onClick={toggleHtmlMode}
          >
            <span className="px-0.5 text-[11px] font-bold tracking-wide">
              HTML
            </span>
          </ToolbarButton>
          <ToolbarButton
            label="Link"
            active={editor?.isActive("link")}
            disabled={!editor || htmlMode}
            onClick={setLink}
          >
            <Link2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            label="Image"
            disabled={!editor || htmlMode}
            onClick={() => imageInputRef.current?.click()}
          >
            <ImageIcon className="h-4 w-4" />
          </ToolbarButton>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto bg-[#141414]">
          {htmlMode ? (
            <textarea
              value={htmlDraft}
              onChange={(event) => {
                setHtmlDraft(event.target.value);
                onChange?.(event.target.value);
              }}
              className="min-h-[280px] w-full resize-none bg-transparent px-5 py-4 font-mono text-sm leading-6 text-white/85 outline-none"
              spellCheck={false}
            />
          ) : (
            <EditorContent editor={editor} />
          )}
        </div>
      </div>

      <input
        ref={imageInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(event) => {
          onPickImage(event.target.files?.[0]);
          event.target.value = "";
        }}
      />

      {(uploadError || error) && (
        <p className="text-xs text-red-300">{uploadError || error}</p>
      )}
    </div>
  );
}
