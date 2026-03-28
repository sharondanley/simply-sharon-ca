import { useState, useRef, useCallback } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Comment {
  id: string;
  author: string;
  initials: string;
  avatarUrl?: string;
  verified?: boolean;
  online?: boolean;
  content: string; // HTML string
  timestamp: string;
  timestampMs: number;
  likes: number;
  dislikes: number;
  userReaction: "like" | "dislike" | null;
  replies: Comment[];
}

// ─── Seed Data ────────────────────────────────────────────────────────────────

const SHARON_AVATAR =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/81-436_a928ba59.webp";

const INITIAL_COMMENTS: Comment[] = [
  {
    id: "1",
    author: "Floyd Miles",
    initials: "FM",
    online: false,
    content:
      "Actually, now that I try out the links on my message, above, none of them take me to the secure site. Only my shortcut on my desktop, which I created years ago.",
    timestamp: "6 hour",
    timestampMs: Date.now() - 6 * 60 * 60 * 1000,
    likes: 4,
    dislikes: 1,
    userReaction: null,
    replies: [],
  },
  {
    id: "2",
    author: "Albert Flores",
    initials: "AF",
    online: true,
    content:
      "Before installing this plugin please put back again your wordpress and site url back to http.",
    timestamp: "2 min",
    timestampMs: Date.now() - 2 * 60 * 1000,
    likes: 0,
    dislikes: 0,
    userReaction: null,
    replies: [
      {
        id: "2-1",
        author: "Sharon Danley",
        initials: "SD",
        avatarUrl: SHARON_AVATAR,
        verified: true,
        online: true,
        content:
          'Hi <span class="comment-mention">@Albert Flores</span> .Thanks for your reply.',
        timestamp: "18 sec",
        timestampMs: Date.now() - 18 * 1000,
        likes: 2,
        dislikes: 0,
        userReaction: null,
        replies: [],
      },
    ],
  },
  {
    id: "3",
    author: "Esther Howard",
    initials: "EH",
    online: false,
    content:
      "Thank you Sharon! This was incredibly helpful. I've been going gray for two years and your tips have given me so much confidence.",
    timestamp: "1 day",
    timestampMs: Date.now() - 24 * 60 * 60 * 1000,
    likes: 12,
    dislikes: 0,
    userReaction: null,
    replies: [],
  },
];

// ─── Smiley Reaction Icon (SVG) ───────────────────────────────────────────────

function SmileyIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 13s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2.5" />
      <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2.5" />
    </svg>
  );
}

// ─── Reaction Pill ────────────────────────────────────────────────────────────

function ReactionPill({
  likes,
  dislikes,
  userReaction,
  onReact,
}: {
  likes: number;
  dislikes: number;
  userReaction: "like" | "dislike" | null;
  onReact: (r: "like" | "dislike") => void;
}) {
  const total = likes + dislikes;
  const hasLikes = likes > 0;
  const hasDislikes = dislikes > 0;
  const hasAny = total > 0;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 0,
        border: "1px solid #e5e7eb",
        borderRadius: 20,
        padding: "3px 10px",
        height: 30,
        cursor: "default",
        userSelect: "none",
      }}
    >
      {/* Smiley button — opens a reaction picker (for now toggles like) */}
      <button
        onClick={() => onReact("like")}
        title="React"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          display: "flex",
          alignItems: "center",
          color: userReaction === "like" ? "#f59e0b" : "#6b7280",
          transition: "color 0.15s, transform 0.1s",
          lineHeight: 1,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1.15)";
          (e.currentTarget as HTMLElement).style.color = "#f59e0b";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLElement).style.color =
            userReaction === "like" ? "#f59e0b" : "#6b7280";
        }}
      >
        <SmileyIcon size={17} />
      </button>

      {/* Like count */}
      {hasLikes && (
        <span
          style={{
            fontSize: 13,
            color: userReaction === "like" ? "#1d4ed8" : "#374151",
            fontWeight: userReaction === "like" ? 600 : 400,
            marginLeft: 5,
          }}
        >
          {likes}
        </span>
      )}

      {/* Divider between like and dislike counts */}
      {hasLikes && hasDislikes && (
        <span
          style={{
            width: 1,
            height: 14,
            background: "#e5e7eb",
            margin: "0 6px",
            display: "inline-block",
          }}
        />
      )}

      {/* Dislike count */}
      {hasDislikes && (
        <>
          <button
            onClick={() => onReact("dislike")}
            title="Dislike"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center",
              color: userReaction === "dislike" ? "#dc2626" : "#6b7280",
              transition: "color 0.15s, transform 0.1s",
              lineHeight: 1,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            }}
          >
            <svg
              width={15}
              height={15}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 15s1.5-2 4-2 4 2 4 2" />
              <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2.5" />
              <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2.5" />
            </svg>
          </button>
          <span
            style={{
              fontSize: 13,
              color: userReaction === "dislike" ? "#dc2626" : "#374151",
              fontWeight: userReaction === "dislike" ? 600 : 400,
              marginLeft: 4,
            }}
          >
            {dislikes}
          </span>
        </>
      )}

      {/* If no reactions yet, show placeholder space */}
      {!hasAny && (
        <span style={{ width: 4, display: "inline-block" }} />
      )}
    </div>
  );
}

// ─── Rich Text Editor ─────────────────────────────────────────────────────────

function RichTextEditor({
  placeholder,
  onSend,
  autoFocus = false,
  compact = false,
}: {
  placeholder: string;
  onSend: (html: string) => void;
  autoFocus?: boolean;
  compact?: boolean;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  const execCmd = useCallback((cmd: string, value?: string) => {
    document.execCommand(cmd, false, value);
    editorRef.current?.focus();
  }, []);

  const handleInput = () => {
    const text = editorRef.current?.innerText ?? "";
    setIsEmpty(text.trim().length === 0);
  };

  const handleSend = () => {
    const html = editorRef.current?.innerHTML ?? "";
    const text = editorRef.current?.innerText ?? "";
    if (!text.trim()) return;
    onSend(html);
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
    }
    setIsEmpty(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      style={{
        border: "1px solid #d1d5db",
        borderRadius: 8,
        background: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        autoFocus={autoFocus}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        data-placeholder={placeholder}
        style={{
          minHeight: compact ? 56 : 88,
          padding: "14px 16px",
          outline: "none",
          fontSize: 15,
          color: "#111827",
          lineHeight: 1.6,
          fontFamily: "inherit",
        }}
        className="comment-editor"
      />
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 12px",
          borderTop: "1px solid #e5e7eb",
          background: "#f9fafb",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {[
            { cmd: "bold", label: "B", extraStyle: { fontWeight: 700 } },
            { cmd: "italic", label: "I", extraStyle: { fontStyle: "italic" } },
            { cmd: "underline", label: "U", extraStyle: { textDecoration: "underline" } },
            { cmd: "insertUnorderedList", label: "≡", extraStyle: {} },
          ].map(({ cmd, label, extraStyle }) => (
            <button
              key={cmd}
              onMouseDown={(e) => {
                e.preventDefault();
                execCmd(cmd);
              }}
              title={cmd}
              style={{
                width: 32,
                height: 32,
                border: "none",
                background: "transparent",
                borderRadius: 4,
                cursor: "pointer",
                fontSize: 14,
                color: "#374151",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                ...extraStyle,
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#e5e7eb")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "transparent")
              }
            >
              {label}
            </button>
          ))}
          {/* Mention button */}
          <button
            onMouseDown={(e) => e.preventDefault()}
            title="Mention"
            style={{
              width: 32,
              height: 32,
              border: "none",
              background: "transparent",
              borderRadius: 4,
              cursor: "pointer",
              fontSize: 15,
              color: "#6b7280",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 8,
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#e5e7eb")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "transparent")
            }
          >
            @
          </button>
        </div>
        <button
          onClick={handleSend}
          disabled={isEmpty}
          style={{
            padding: "7px 20px",
            borderRadius: 6,
            border: "none",
            background: isEmpty ? "#9ca3af" : "#374151",
            color: "#fff",
            fontSize: 14,
            fontWeight: 600,
            cursor: isEmpty ? "not-allowed" : "pointer",
            transition: "background 0.15s",
            letterSpacing: "0.01em",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

const AVATAR_COLORS: Record<string, string> = {
  FM: "#6b7280",
  AF: "#8b5cf6",
  EH: "#ec4899",
  SD: "#374151",
  YO: "#0ea5e9",
};

function Avatar({
  author,
  initials,
  avatarUrl,
  online,
  size = 40,
}: {
  author: string;
  initials: string;
  avatarUrl?: string;
  online?: boolean;
  size?: number;
}) {
  const bg = AVATAR_COLORS[initials] ?? "#6b7280";

  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={author}
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            background: bg,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: size * 0.36,
            fontWeight: 700,
            fontFamily: "inherit",
          }}
        >
          {initials}
        </div>
      )}
      {online !== undefined && (
        <span
          style={{
            position: "absolute",
            bottom: 1,
            right: 1,
            width: size * 0.27,
            height: size * 0.27,
            borderRadius: "50%",
            background: online ? "#22c55e" : "#9ca3af",
            border: "2px solid #fff",
          }}
        />
      )}
    </div>
  );
}

// ─── Three-dot Menu ───────────────────────────────────────────────────────────

function ThreeDotMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#9ca3af",
          padding: "2px 6px",
          borderRadius: 4,
          fontSize: 18,
          lineHeight: 1,
          letterSpacing: "0.05em",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.color = "#374151")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.color = "#9ca3af")
        }
      >
        ···
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "100%",
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            zIndex: 20,
            minWidth: 130,
            overflow: "hidden",
          }}
        >
          {["Report", "Copy link", "Hide"].map((item) => (
            <button
              key={item}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                width: "100%",
                padding: "9px 16px",
                background: "none",
                border: "none",
                textAlign: "left",
                fontSize: 13,
                cursor: "pointer",
                color: "#374151",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#f3f4f6")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "none")
              }
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Single Comment ───────────────────────────────────────────────────────────

function CommentItem({
  comment,
  depth = 0,
  onReply,
  onReact,
}: {
  comment: Comment;
  depth?: number;
  onReply: (parentId: string, html: string) => void;
  onReact: (id: string, reaction: "like" | "dislike") => void;
}) {
  const [showReplyEditor, setShowReplyEditor] = useState(false);

  const handleReplySend = (html: string) => {
    onReply(comment.id, html);
    setShowReplyEditor(false);
  };

  const avatarSize = depth > 0 ? 36 : 40;

  return (
    <div style={{ marginLeft: depth > 0 ? avatarSize + 12 : 0 }}>
      {/* Comment row */}
      <div
        style={{
          display: "flex",
          gap: 12,
          paddingTop: 16,
          paddingBottom: 12,
        }}
      >
        <Avatar
          author={comment.author}
          initials={comment.initials}
          avatarUrl={comment.avatarUrl}
          online={comment.online}
          size={avatarSize}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Author row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 6,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  fontWeight: 600,
                  fontSize: 14,
                  color: "#111827",
                  fontFamily: "inherit",
                }}
              >
                {comment.author}
              </span>
              {comment.verified && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="8" fill="#3b82f6" />
                  <path
                    d="M5 8l2 2 4-4"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <ThreeDotMenu />
          </div>

          {/* Content */}
          <div
            style={{
              fontSize: 14,
              color: "#111827",
              lineHeight: 1.65,
              fontFamily: "inherit",
              marginBottom: 10,
            }}
            dangerouslySetInnerHTML={{ __html: comment.content }}
          />

          {/* Action row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 13,
              color: "#6b7280",
            }}
          >
            <ReactionPill
              likes={comment.likes}
              dislikes={comment.dislikes}
              userReaction={comment.userReaction}
              onReact={(r) => onReact(comment.id, r)}
            />

            <button
              onClick={() => setShowReplyEditor((v) => !v)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                color: "#6b7280",
                padding: 0,
                fontWeight: 500,
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#111827")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#6b7280")
              }
            >
              Reply
            </button>

            <span
              style={{
                color: "#9ca3af",
                fontSize: 12,
                borderLeft: "1px solid #e5e7eb",
                paddingLeft: 12,
              }}
            >
              {comment.timestamp}
            </span>
          </div>

          {/* Reply editor */}
          {showReplyEditor && (
            <div style={{ marginTop: 12 }}>
              <RichTextEditor
                placeholder={`Reply to ${comment.author}...`}
                onSend={handleReplySend}
                autoFocus
                compact
              />
            </div>
          )}
        </div>
      </div>

      {/* Separator */}
      <div style={{ height: 1, background: "#f3f4f6" }} />

      {/* Nested replies */}
      {comment.replies.map((reply) => (
        <CommentItem
          key={reply.id}
          comment={reply}
          depth={depth + 1}
          onReply={onReply}
          onReact={onReact}
        />
      ))}
    </div>
  );
}

// ─── Main CommentSection ──────────────────────────────────────────────────────

export function CommentSection() {
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest");

  const totalCount = comments.reduce(
    (acc, c) => acc + 1 + c.replies.length,
    0
  );

  const sorted = [...comments].sort((a, b) => {
    if (sortBy === "latest") return b.timestampMs - a.timestampMs;
    return b.likes - b.dislikes - (a.likes - a.dislikes);
  });

  const addComment = (html: string) => {
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author: "You",
      initials: "YO",
      online: true,
      content: html,
      timestamp: "Just now",
      timestampMs: Date.now(),
      likes: 0,
      dislikes: 0,
      userReaction: null,
      replies: [],
    };
    setComments((prev) => [newComment, ...prev]);
  };

  const addReply = (parentId: string, html: string) => {
    const newReply: Comment = {
      id: `r-${Date.now()}`,
      author: "You",
      initials: "YO",
      online: true,
      content: html,
      timestamp: "Just now",
      timestampMs: Date.now(),
      likes: 0,
      dislikes: 0,
      userReaction: null,
      replies: [],
    };

    const updateReplies = (list: Comment[]): Comment[] =>
      list.map((c) => {
        if (c.id === parentId) {
          return { ...c, replies: [...c.replies, newReply] };
        }
        if (c.replies.length > 0) {
          return { ...c, replies: updateReplies(c.replies) };
        }
        return c;
      });

    setComments((prev) => updateReplies(prev));
  };

  const handleReact = (id: string, reaction: "like" | "dislike") => {
    const updateReaction = (list: Comment[]): Comment[] =>
      list.map((c) => {
        if (c.id === id) {
          const isSame = c.userReaction === reaction;
          const wasOpposite = c.userReaction !== null && c.userReaction !== reaction;
          return {
            ...c,
            userReaction: isSame ? null : reaction,
            likes:
              reaction === "like"
                ? isSame
                  ? c.likes - 1
                  : c.likes + 1
                : wasOpposite
                ? c.likes - 1
                : c.likes,
            dislikes:
              reaction === "dislike"
                ? isSame
                  ? c.dislikes - 1
                  : c.dislikes + 1
                : wasOpposite
                ? c.dislikes - 1
                : c.dislikes,
          };
        }
        if (c.replies.length > 0) {
          return { ...c, replies: updateReaction(c.replies) };
        }
        return c;
      });

    setComments((prev) => updateReaction(prev));
  };

  return (
    <div
      style={{
        maxWidth: 780,
        margin: "0 auto",
        padding: "0 0 60px",
        fontFamily: "'Source Sans 3', 'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}
    >
      {/* Global styles */}
      <style>{`
        .comment-editor:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        .comment-mention {
          background: #e5e7eb;
          color: #374151;
          border-radius: 4px;
          padding: 1px 5px;
          font-weight: 500;
        }
      `}</style>

      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: "#111827" }}>
            Comments
          </span>
          <span style={{ fontSize: 16, color: "#6b7280", fontWeight: 400 }}>
            {totalCount}
          </span>
        </div>

        {/* Sort toggle */}
        <div
          style={{
            display: "flex",
            border: "1px solid #d1d5db",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          {(["latest", "popular"] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => setSortBy(opt)}
              style={{
                padding: "6px 18px",
                border: "none",
                background: sortBy === opt ? "#374151" : "#fff",
                color: sortBy === opt ? "#fff" : "#374151",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                transition: "background 0.15s, color 0.15s",
              }}
            >
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* New comment editor */}
      <div style={{ marginBottom: 28 }}>
        <RichTextEditor placeholder="Hi @Sharon" onSend={addComment} />
      </div>

      {/* Comment list */}
      <div>
        {sorted.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReply={addReply}
            onReact={handleReact}
          />
        ))}
      </div>

      {/* Loading indicator */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          paddingTop: 24,
          color: "#9ca3af",
          fontSize: 13,
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ animation: "spin 1s linear infinite" }}
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        Loading
      </div>
    </div>
  );
}
