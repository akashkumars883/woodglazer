"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import { useEffect } from "react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";

import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon,
  List, 
  ListOrdered, 
  Quote, 
  Undo, 
  Redo, 
  Code,
  Heading1,
  Heading2,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Type
} from "lucide-react";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter the URL", previousUrl);

    if (url === null) { return; }
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt("Enter the Image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const buttons = [
    // Typography
    { group: "Text", items: [
      { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive("bold"), label: "Bold" },
      { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive("italic"), label: "Italic" },
      { icon: UnderlineIcon, action: () => editor.chain().focus().toggleUnderline().run(), active: editor.isActive("underline"), label: "Underline" },
    ]},
    { group: "Headings", items: [
      { icon: Heading1, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: editor.isActive("heading", { level: 1 }), label: "H1" },
      { icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive("heading", { level: 2 }), label: "H2" },
      { icon: Type, action: () => editor.chain().focus().setParagraph().run(), active: editor.isActive("paragraph"), label: "Paragraph" },
    ]},
    // Alignment
    { group: "Align", items: [
      { icon: AlignLeft, action: () => editor.chain().focus().setTextAlign("left").run(), active: editor.isActive({ textAlign: "left" }), label: "Align Left" },
      { icon: AlignCenter, action: () => editor.chain().focus().setTextAlign("center").run(), active: editor.isActive({ textAlign: "center" }), label: "Align Center" },
      { icon: AlignRight, action: () => editor.chain().focus().setTextAlign("right").run(), active: editor.isActive({ textAlign: "right" }), label: "Align Right" },
    ]},
    // Lists & Blocks
    { group: "Lists", items: [
      { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive("bulletList"), label: "Bullet List" },
      { icon: ListOrdered, action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive("orderedList"), label: "Ordered List" },
    ]},
    // External
    { group: "Insert", items: [
      { icon: LinkIcon, action: setLink, active: editor.isActive("link"), label: "Add Link" },
      { icon: ImageIcon, action: addImage, active: false, label: "Add Image" },
    ]},
    // System
    { group: "System", items: [
      { icon: Quote, action: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive("blockquote"), label: "Quote" },
      { icon: Code, action: () => editor.chain().focus().toggleCodeBlock().run(), active: editor.isActive("codeBlock"), label: "Code Block" },
    ]}
  ];

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-stone-200 bg-stone-50 rounded-t-xl sticky top-0 z-10">
      {buttons.map((group, gIdx) => (
         <div key={gIdx} className="flex items-center gap-1 px-2 border-r border-stone-200 last:border-0 h-8">
            {group.items.map((btn, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                   e.preventDefault();
                   btn.action();
                }}
                className={`
                  p-1.5 rounded-lg transition-all duration-200 hover:bg-stone-200
                  ${btn.active ? "bg-primary text-white shadow-sm ring-1 ring-primary/30" : "text-stone-600"}
                `}
                title={btn.label}
              >
                <btn.icon className="w-4 h-4" />
              </button>
            ))}
         </div>
      ))}
      
      <div className="ml-auto flex items-center gap-1 px-2 h-8">
        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().undo().run(); }}
          disabled={!editor.can().chain().focus().undo().run()}
          className="p-1.5 rounded-lg text-stone-600 hover:bg-stone-200 disabled:opacity-30 transition-all"
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().redo().run(); }}
          disabled={!editor.can().chain().focus().redo().run()}
          className="p-1.5 rounded-lg text-stone-600 hover:bg-stone-200 disabled:opacity-30 transition-all"
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default function TipTapEditor({ 
  content, 
  onChange 
}: { 
  content: string; 
  onChange: (content: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary cursor-pointer underline font-bold",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-2xl shadow-xl mx-auto my-12 border border-stone-100",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Write your wood glazer story here...",
      }),
    ],
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
       attributes: {
          class: "prose prose-stone max-w-none focus:outline-none p-6 lg:p-12 prose-headings:font-black prose-p:font-semibold prose-a:text-primary prose-p:my-2 prose-p:leading-relaxed",
       }
    }
  });

  // Sync content prop when changed dynamically from parent
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="border border-stone-200 rounded-xl bg-white shadow-sm overflow-hidden flex flex-col h-[650px] transition-all hover:border-stone-300">
      {/* Permanent Static Top Formatting Bar */}
      <MenuBar editor={editor} />
      
      {/* Scrollable typing area locked inside the editor box */}
      <div className="flex-1 overflow-y-auto bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
