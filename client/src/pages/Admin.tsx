/**
 * Simply Sharon - Admin Dashboard
 * Block-based post editor with drag-and-drop blocks, thumbnail management, and post management.
 * Only accessible to authenticated admin users.
 */

import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";
import {
  Plus, Trash2, GripVertical, Image, Type, Quote, Video,
  Bold, Italic, Underline, Hash, Eye, EyeOff, Save, ArrowLeft, Upload,
  FileText, Settings, LogOut, ChevronDown, ChevronRight, X, Heading1, Heading2, Heading3
} from "lucide-react";

// ─── Block Types ──────────────────────────────────────────────────────────────
type BlockType = "paragraph" | "heading" | "quote" | "image" | "video" | "divider";

type Block = {
  id: string;
  type: BlockType;
  content?: string;
  url?: string;
  caption?: string;
};

function generateId() {
  return Math.random().toString(36).slice(2);
}

// ─── Rich Text Toolbar ────────────────────────────────────────────────────────
function RichTextToolbar({ editorRef }: { editorRef: React.RefObject<HTMLDivElement | null> }) {
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());

  // Update active format state when selection changes
  const updateActiveFormats = useCallback(() => {
    const formats = new Set<string>();
    if (document.queryCommandState("bold")) formats.add("bold");
    if (document.queryCommandState("italic")) formats.add("italic");
    if (document.queryCommandState("underline")) formats.add("underline");
    const block = document.queryCommandValue("formatBlock");
    if (block) formats.add(block.toLowerCase());
    setActiveFormats(formats);
  }, []);

  useEffect(() => {
    document.addEventListener("selectionchange", updateActiveFormats);
    return () => document.removeEventListener("selectionchange", updateActiveFormats);
  }, [updateActiveFormats]);

  const exec = (cmd: string, value?: string) => {
    editorRef.current?.focus();
    document.execCommand(cmd, false, value);
    updateActiveFormats();
  };

  const ToolBtn = ({
    cmd, value, title, children, active
  }: {
    cmd: string; value?: string; title: string;
    children: React.ReactNode; active?: boolean;
  }) => (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); exec(cmd, value); }}
      title={title}
      className={`p-1.5 rounded text-sm transition-colors ${
        active
          ? "bg-black text-white"
          : "text-gray-600 hover:bg-gray-100 hover:text-black"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex items-center gap-0.5 px-2 py-1.5 bg-gray-50 border border-gray-200 rounded-t-lg flex-wrap">
      {/* Text formatting */}
      <ToolBtn cmd="bold" title="Bold (Ctrl+B)" active={activeFormats.has("bold")}>
        <Bold size={14} />
      </ToolBtn>
      <ToolBtn cmd="italic" title="Italic (Ctrl+I)" active={activeFormats.has("italic")}>
        <Italic size={14} />
      </ToolBtn>
      <ToolBtn cmd="underline" title="Underline (Ctrl+U)" active={activeFormats.has("underline")}>
        <Underline size={14} />
      </ToolBtn>

      <div className="w-px h-5 bg-gray-300 mx-1" />

      {/* Heading sizes */}
      <ToolBtn cmd="formatBlock" value="h1" title="Heading 1" active={activeFormats.has("h1")}>
        <Heading1 size={14} />
      </ToolBtn>
      <ToolBtn cmd="formatBlock" value="h2" title="Heading 2" active={activeFormats.has("h2")}>
        <Heading2 size={14} />
      </ToolBtn>
      <ToolBtn cmd="formatBlock" value="h3" title="Heading 3" active={activeFormats.has("h3")}>
        <Heading3 size={14} />
      </ToolBtn>
      <ToolBtn cmd="formatBlock" value="p" title="Normal text" active={activeFormats.has("p")}>
        <Type size={14} />
      </ToolBtn>

      <div className="w-px h-5 bg-gray-300 mx-1" />

      {/* Lists */}
      <ToolBtn cmd="insertUnorderedList" title="Bullet list">
        <span className="text-xs font-bold leading-none">••</span>
      </ToolBtn>
      <ToolBtn cmd="insertOrderedList" title="Numbered list">
        <span className="text-xs font-bold leading-none">1.</span>
      </ToolBtn>

      <div className="w-px h-5 bg-gray-300 mx-1" />

      {/* Alignment */}
      <ToolBtn cmd="justifyLeft" title="Align left">
        <span className="text-xs leading-none">≡</span>
      </ToolBtn>
      <ToolBtn cmd="justifyCenter" title="Align center">
        <span className="text-xs leading-none">≡</span>
      </ToolBtn>
      <ToolBtn cmd="justifyRight" title="Align right">
        <span className="text-xs leading-none">≡</span>
      </ToolBtn>

      <div className="w-px h-5 bg-gray-300 mx-1" />

      {/* Clear formatting */}
      <ToolBtn cmd="removeFormat" title="Clear formatting">
        <span className="text-xs font-bold leading-none">Tx</span>
      </ToolBtn>
    </div>
  );
}

// ─── Rich Text Block Editor ────────────────────────────────────────────────────
function RichTextBlock({
  block,
  onChange,
}: {
  block: Block;
  onChange: (updated: Block) => void;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);
  // Track if we're currently updating from outside to avoid cursor reset
  const isInternalUpdate = useRef(false);

  // Sync content from block to editor only when block.content changes externally
  useEffect(() => {
    if (editorRef.current && !isInternalUpdate.current) {
      const currentHtml = editorRef.current.innerHTML;
      if (currentHtml !== (block.content || "")) {
        editorRef.current.innerHTML = block.content || "";
      }
    }
    isInternalUpdate.current = false;
  }, [block.content]);

  const handleInput = () => {
    if (editorRef.current) {
      isInternalUpdate.current = true;
      onChange({ ...block, content: editorRef.current.innerHTML });
    }
  };

  const blockStyles: Record<string, string> = {
    paragraph: "text-base text-gray-800 leading-relaxed",
    heading: "text-2xl font-bold text-black leading-tight",
    quote: "text-lg italic text-gray-700 border-l-4 border-black pl-4",
  };

  const placeholders: Record<string, string> = {
    paragraph: "Start writing...",
    heading: "Heading text...",
    quote: "Quote text...",
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-black focus-within:border-black transition-all">
      {focused && <RichTextToolbar editorRef={editorRef} />}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        data-placeholder={placeholders[block.type] || "Write here..."}
        className={`min-h-[80px] px-3 py-2 outline-none font-['Source_Sans_3'] ${blockStyles[block.type] || "text-base"} empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 empty:before:pointer-events-none`}
      />
    </div>
  );
}

// ─── Block Editor ──────────────────────────────────────────────────────────────
function BlockIcon({ type }: { type: BlockType }) {  const icons: Record<BlockType, React.ReactNode> = {
    paragraph: <Type size={14} />,
    heading: <Hash size={14} />,
    quote: <Quote size={14} />,
    image: <Image size={14} />,
    video: <Video size={14} />,
    divider: <span className="text-xs font-bold">—</span>,
  };
  return <>{icons[type]}</>;
}

function BlockEditor({
  block,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: {
  block: Block;
  onChange: (updated: Block) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [isDragging, setIsDragging] = useState(false);

  const renderInput = () => {
    if (block.type === "divider") {
      return <div className="w-full h-0.5 bg-gray-300 rounded my-2" />;
    }

    if (block.type === "image" || block.type === "video") {
      return (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={block.url || ""}
            onChange={(e) => onChange({ ...block, url: e.target.value })}
            placeholder={block.type === "image" ? "Image URL..." : "YouTube embed URL (https://www.youtube.com/embed/...)"}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-['Source_Sans_3'] focus:outline-none focus:ring-1 focus:ring-black"
          />
          <input
            type="text"
            value={block.caption || ""}
            onChange={(e) => onChange({ ...block, caption: e.target.value })}
            placeholder="Caption (optional)"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-['Source_Sans_3'] focus:outline-none focus:ring-1 focus:ring-black"
          />
          {block.type === "image" && block.url && (
            <img src={block.url} alt={block.caption || ""} className="max-h-48 object-cover rounded-lg" />
          )}
          {block.type === "video" && block.url && (
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
              <iframe src={block.url} className="w-full h-full" allowFullScreen title="Video preview" />
            </div>
          )}
        </div>
      );
    }

    // Use rich text editor for text-based blocks
    return <RichTextBlock block={block} onChange={onChange} />;
  };

  return (
    <div
      className={`group relative flex gap-2 items-start p-2 rounded-xl transition-all ${isDragging ? "opacity-50 bg-gray-50" : "hover:bg-gray-50"}`}
    >
      {/* Drag handle + move buttons */}
      <div className="flex flex-col items-center gap-1 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onMoveUp}
          disabled={isFirst}
          className="p-0.5 text-gray-400 hover:text-black disabled:opacity-20 transition-colors"
          title="Move up"
        >
          <ChevronDown size={14} className="rotate-180" />
        </button>
        <GripVertical size={16} className="text-gray-300 cursor-grab" />
        <button
          onClick={onMoveDown}
          disabled={isLast}
          className="p-0.5 text-gray-400 hover:text-black disabled:opacity-20 transition-colors"
          title="Move down"
        >
          <ChevronDown size={14} />
        </button>
      </div>

      {/* Block type badge */}
      <div className="flex-shrink-0 mt-2 w-6 h-6 rounded bg-gray-200 flex items-center justify-center text-gray-500">
        <BlockIcon type={block.type} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {renderInput()}
      </div>

      {/* Delete */}
      <button
        onClick={onDelete}
        className="flex-shrink-0 mt-2 p-1 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
        title="Delete block"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}

// ─── Add Block Menu ───────────────────────────────────────────────────────────
function AddBlockMenu({ onAdd }: { onAdd: (type: BlockType) => void }) {
  const [open, setOpen] = useState(false);

  const blockTypes: { type: BlockType; label: string; icon: React.ReactNode }[] = [
    { type: "paragraph", label: "Paragraph", icon: <Type size={16} /> },
    { type: "heading", label: "Heading", icon: <Hash size={16} /> },
    { type: "quote", label: "Quote", icon: <Quote size={16} /> },
    { type: "image", label: "Image", icon: <Image size={16} /> },
    { type: "video", label: "Video", icon: <Video size={16} /> },
    { type: "divider", label: "Divider", icon: <span className="font-bold text-sm">—</span> },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-xl text-gray-400 hover:border-black hover:text-black transition-colors w-full justify-center font-['Source_Sans_3'] text-sm"
      >
        <Plus size={16} />
        Add Block
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg p-2 z-10 grid grid-cols-3 gap-1 w-56">
          {blockTypes.map(({ type, label, icon }) => (
            <button
              key={type}
              onClick={() => { onAdd(type); setOpen(false); }}
              className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-100 transition-colors text-xs font-['Source_Sans_3'] text-gray-700"
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Post Editor ──────────────────────────────────────────────────────────────
function PostEditor({
  postId,
  onBack,
}: {
  postId?: number;
  onBack: () => void;
}) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [summary, setSummary] = useState("");
  const [topic, setTopic] = useState("");
  const [episode, setEpisode] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [blocks, setBlocks] = useState<Block[]>([
    { id: generateId(), type: "paragraph", content: "" },
  ]);
  const [published, setPublished] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const utils = trpc.useUtils();
  const createPost = trpc.admin.createPost.useMutation({
    onSuccess: () => {
      toast.success("Post saved successfully!");
      utils.admin.listPosts.invalidate();
      onBack();
    },
    onError: (err) => toast.error(`Failed to save: ${err.message}`),
  });

  const uploadThumbnail = trpc.admin.uploadThumbnail.useMutation({
    onSuccess: (data) => {
      setThumbnailUrl(data.url);
      setThumbnailPreview(data.url);
      setUploading(false);
      toast.success("Thumbnail uploaded!");
    },
    onError: () => {
      setUploading(false);
      toast.error("Upload failed. Please try again.");
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = (ev.target?.result as string).split(",")[1];
      uploadThumbnail.mutate({ dataBase64: base64, contentType: file.type, filename: file.name });
    };
    reader.readAsDataURL(file);
  };

  const handleThumbnailUrlChange = (url: string) => {
    setThumbnailUrl(url);
    setThumbnailPreview(url);
  };

  const addBlock = (type: BlockType) => {
    setBlocks((prev) => [...prev, { id: generateId(), type }]);
  };

  const updateBlock = (id: string, updated: Block) => {
    setBlocks((prev) => prev.map((b) => (b.id === id ? updated : b)));
  };

  const deleteBlock = (id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  const moveBlock = (id: string, direction: "up" | "down") => {
    setBlocks((prev) => {
      const idx = prev.findIndex((b) => b.id === id);
      if (idx === -1) return prev;
      const newBlocks = [...prev];
      const targetIdx = direction === "up" ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= newBlocks.length) return prev;
      [newBlocks[idx], newBlocks[targetIdx]] = [newBlocks[targetIdx], newBlocks[idx]];
      return newBlocks;
    });
  };

  const handleSave = () => {
    if (!title.trim()) { toast.error("Title is required"); return; }
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const hashtagArray = hashtags.split(",").map((h) => h.trim()).filter(Boolean);
    createPost.mutate({
      title: title.trim(),
      subtitle: subtitle.trim() || undefined,
      summary: summary.trim() || undefined,
      topic: topic.trim() || undefined,
      episode: episode ? parseInt(episode) : undefined,
      hashtags: hashtagArray,
      thumbnailUrl: thumbnailUrl || undefined,
      blocks,
      published,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-['Source_Sans_3'] text-sm"
        >
          <ArrowLeft size={16} />
          Back to Posts
        </button>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-sm font-['Source_Sans_3'] text-gray-600">Published</span>
            <div
              onClick={() => setPublished(!published)}
              className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${published ? "bg-black" : "bg-gray-300"}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${published ? "translate-x-5" : "translate-x-0.5"}`} />
            </div>
          </label>
          <button
            onClick={handleSave}
            disabled={createPost.isPending}
            className="flex items-center gap-2 px-5 py-2 bg-black text-white text-sm font-bold font-['Source_Sans_3'] rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
          >
            <Save size={14} />
            {createPost.isPending ? "Saving..." : "Save Post"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main editor */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title..."
            className="w-full px-4 py-3 text-3xl font-bold font-['Source_Sans_3'] border-b-2 border-gray-200 focus:border-black focus:outline-none bg-transparent"
          />
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Subtitle (optional)..."
            className="w-full px-4 py-2 text-lg font-['Source_Sans_3'] border-b border-gray-100 focus:border-gray-300 focus:outline-none bg-transparent text-gray-600"
          />
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Short summary for the archive listing..."
            rows={2}
            className="w-full px-4 py-2 text-sm font-['Source_Sans_3'] border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black resize-none text-gray-600"
          />

          {/* Blocks */}
          <div className="border border-gray-200 rounded-xl p-4 flex flex-col gap-2 min-h-[300px]">
            <p className="text-xs text-gray-400 font-['Source_Sans_3'] mb-2">Content Blocks</p>
            {blocks.map((block, idx) => (
              <BlockEditor
                key={block.id}
                block={block}
                onChange={(updated) => updateBlock(block.id, updated)}
                onDelete={() => deleteBlock(block.id)}
                onMoveUp={() => moveBlock(block.id, "up")}
                onMoveDown={() => moveBlock(block.id, "down")}
                isFirst={idx === 0}
                isLast={idx === blocks.length - 1}
              />
            ))}
            <AddBlockMenu onAdd={addBlock} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          {/* Thumbnail */}
          <div className="border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-bold font-['Source_Sans_3'] text-black mb-3 flex items-center gap-2">
              <Image size={14} /> Thumbnail
            </h3>
            {thumbnailPreview ? (
              <div className="relative mb-3">
                <img src={thumbnailPreview} alt="Thumbnail" className="w-full aspect-video object-cover rounded-lg" />
                <button
                  onClick={() => { setThumbnailUrl(""); setThumbnailPreview(""); }}
                  className="absolute top-2 right-2 w-6 h-6 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full aspect-video bg-gray-100 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-200 transition-colors mb-3"
              >
                {uploading ? (
                  <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Upload size={20} className="text-gray-400" />
                    <span className="text-xs text-gray-400 font-['Source_Sans_3']">Click to upload</span>
                  </>
                )}
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <input
              type="text"
              value={thumbnailUrl}
              onChange={(e) => handleThumbnailUrlChange(e.target.value)}
              placeholder="Or paste image URL..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-['Source_Sans_3'] focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Metadata */}
          <div className="border border-gray-200 rounded-xl p-4 flex flex-col gap-3">
            <h3 className="text-sm font-bold font-['Source_Sans_3'] text-black flex items-center gap-2">
              <Settings size={14} /> Post Settings
            </h3>
            <div>
              <label className="text-xs text-gray-500 font-['Source_Sans_3'] block mb-1">Topic / Category</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Beauty, Poise, Mindset"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-['Source_Sans_3'] focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 font-['Source_Sans_3'] block mb-1">Episode #</label>
              <input
                type="number"
                value={episode}
                onChange={(e) => setEpisode(e.target.value)}
                placeholder="e.g. 5"
                min="1"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-['Source_Sans_3'] focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 font-['Source_Sans_3'] block mb-1">Hashtags (comma-separated)</label>
              <input
                type="text"
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
                placeholder="#GrayHair, #BeautyTips"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-['Source_Sans_3'] focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Posts List ───────────────────────────────────────────────────────────────
function PostsList({ onEdit }: { onEdit: (id: number) => void; onNew: () => void }) {
  const { data, isLoading } = trpc.admin.listPosts.useQuery({ page: 1, limit: 50 });
  const utils = trpc.useUtils();
  const deletePost = trpc.admin.deletePost.useMutation({
    onSuccess: () => {
      utils.admin.listPosts.invalidate();
      toast.success("Post deleted");
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  const posts = data?.items || [];

  if (posts.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <FileText size={40} className="mx-auto mb-3 opacity-30" />
        <p className="font-['Source_Sans_3']">No posts yet. Create your first post!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-sm transition-shadow"
        >
          {post.thumbnailUrl && (
            <img src={post.thumbnailUrl} alt="" className="w-16 h-12 object-cover rounded-lg flex-shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm font-['Source_Sans_3'] text-black truncate">{post.title}</h3>
            <div className="flex items-center gap-3 mt-0.5">
              {post.topic && (
                <span className="text-xs text-gray-400 font-['Source_Sans_3']">{post.topic}</span>
              )}
              {post.episode && (
                <span className="text-xs text-gray-400 font-['Source_Sans_3']">Ep. {post.episode}</span>
              )}
                <span className={`text-xs px-2 py-0.5 rounded-full font-['Source_Sans_3'] ${post.publishedAt ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                {post.publishedAt ? "Published" : "Draft"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/blogcast/${post.slug}`}>
              <button className="p-2 text-gray-400 hover:text-black transition-colors" title="Preview">
                <Eye size={16} />
              </button>
            </Link>
            <button
              onClick={() => deletePost.mutate({ id: post.id })}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Admin Login Form ─────────────────────────────────────────────────────────
function AdminLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const utils = trpc.useUtils();
  const loginMutation = trpc.auth.adminLogin.useMutation({
    onSuccess: () => {
      utils.auth.me.invalidate();
    },
    onError: (err) => {
      setError(err.message || "Invalid credentials");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    loginMutation.mutate({ username, password });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-normal font-['Italianno'] text-black mb-1">Simply Sharon</h1>
          <p className="text-gray-500 font-['Source_Sans_3'] text-sm">Admin Dashboard</p>
        </div>
        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
          <Settings size={28} className="text-white" />
        </div>
        <h2 className="text-xl font-bold font-['Source_Sans_3'] text-black mb-6 text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold font-['Source_Sans_3'] text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-['Source_Sans_3'] text-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold font-['Source_Sans_3'] text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-['Source_Sans_3'] text-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter password"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm font-['Source_Sans_3'] text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full py-3 bg-black text-white font-bold font-['Source_Sans_3'] rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loginMutation.isPending ? "Signing in…" : "Sign In"}
          </button>
        </form>
        <Link href="/">
          <p className="mt-4 text-sm text-gray-400 hover:text-black cursor-pointer font-['Source_Sans_3'] transition-colors text-center">
            ← Back to website
          </p>
        </Link>
      </div>
    </div>
  );
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────
type AdminView = "dashboard" | "posts" | "new-post";

export default function Admin() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [view, setView] = useState<AdminView>("dashboard");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLoginForm />;
  }

  const isAdmin = user?.role === "admin";

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X size={28} className="text-red-500" />
          </div>
          <h2 className="text-xl font-bold font-['Source_Sans_3'] text-black mb-2">Access Denied</h2>
          <p className="text-gray-500 text-sm font-['Source_Sans_3'] mb-6">
            You don't have admin privileges. Please contact the site owner.
          </p>
          <p className="text-xs text-gray-400 font-['Source_Sans_3'] mb-4">Signed in as: {user?.name || user?.email}</p>
          <button
            onClick={() => logout()}
            className="w-full py-3 border border-gray-300 text-black font-bold font-['Source_Sans_3'] rounded-lg hover:bg-gray-50 transition-colors"
          >
            Sign Out
          </button>
          <Link href="/">
            <p className="mt-4 text-sm text-gray-400 hover:text-black cursor-pointer font-['Source_Sans_3'] transition-colors">
              ← Back to website
            </p>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-3xl font-normal font-['Italianno'] text-black">Simply Sharon</h1>
          <p className="text-xs text-gray-400 font-['Source_Sans_3'] mt-0.5">Admin Dashboard</p>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1">
          {[
            { id: "dashboard" as AdminView, label: "Dashboard", icon: <Settings size={16} /> },
            { id: "posts" as AdminView, label: "All Posts", icon: <FileText size={16} /> },
            { id: "new-post" as AdminView, label: "New Post", icon: <Plus size={16} /> },
          ].map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setView(id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-['Source_Sans_3'] transition-colors text-left ${
                view === id ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user?.name || "Admin")}`}
              alt={user?.name || "Admin"}
              className="w-8 h-8 rounded-full"
            />
            <div className="min-w-0">
              <p className="text-xs font-bold font-['Source_Sans_3'] text-black truncate">{user?.name || "Admin"}</p>
              <p className="text-xs text-gray-400 font-['Source_Sans_3'] truncate">{user?.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/">
              <button className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-xs text-gray-500 hover:text-black border border-gray-200 rounded-lg transition-colors font-['Source_Sans_3']">
                <Eye size={12} /> Site
              </button>
            </Link>
            <button
              onClick={() => logout()}
              className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-xs text-gray-500 hover:text-red-500 border border-gray-200 rounded-lg transition-colors font-['Source_Sans_3']"
            >
              <LogOut size={12} /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-8">
        {view === "dashboard" && (
          <div>
            <h2 className="text-2xl font-bold font-['Source_Sans_3'] text-black mb-2">Welcome back, {user?.name?.split(" ")[0] || "Sharon"}</h2>
            <p className="text-gray-500 font-['Source_Sans_3'] mb-8">Here's an overview of your content.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                { label: "Total Posts", value: "—", icon: <FileText size={20} /> },
                { label: "Published", value: "—", icon: <Eye size={20} /> },
                { label: "Drafts", value: "—", icon: <EyeOff size={20} /> },
              ].map(({ label, value, icon }) => (
                <div key={label} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                    {icon}
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-['Source_Sans_3'] text-black">{value}</p>
                    <p className="text-xs text-gray-400 font-['Source_Sans_3']">{label}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold font-['Source_Sans_3'] text-black">Recent Posts</h3>
                <button onClick={() => setView("posts")} className="text-sm text-gray-400 hover:text-black font-['Source_Sans_3'] transition-colors">
                  View all →
                </button>
              </div>
              <PostsList onEdit={() => {}} onNew={() => setView("new-post")} />
            </div>
          </div>
        )}

        {view === "posts" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-['Source_Sans_3'] text-black">All Posts</h2>
              <button
                onClick={() => setView("new-post")}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-bold font-['Source_Sans_3'] rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Plus size={14} /> New Post
              </button>
            </div>
            <PostsList onEdit={() => {}} onNew={() => setView("new-post")} />
          </div>
        )}

        {view === "new-post" && (
          <div>
            <h2 className="text-2xl font-bold font-['Source_Sans_3'] text-black mb-6">New Post</h2>
            <PostEditor onBack={() => setView("posts")} />
          </div>
        )}
      </main>
    </div>
  );
}
