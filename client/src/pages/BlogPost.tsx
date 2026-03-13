/**
 * Simply Sharon - Blog Post Page
 * Full blog post view with threaded comments, reactions, and character counter.
 * Fonts: Italianno (script headings), Source Sans 3 (body/buttons), Helvetica (paragraphs)
 */

import { useState, useMemo } from "react";
import { Link, useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import { Heart, ThumbsUp, Laugh, Reply, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

// ─── CDN Assets ──────────────────────────────────────────────────────────────
const ASSETS = {
  navbar: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/111-531_3c5a2f93.webp",
  breadcrumbIcon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/111-551_82d1e49d.webp",
  sharonPortrait: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/114-683_95699440.webp",
  videoThumbnail: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/116-7_9373465d.webp",
  heartEmoji: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/116-21_1dd24f05.webp",
  footer: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/116-36_04d51412.webp",
};

// ─── Session ID (for anonymous reactions) ────────────────────────────────────
function getSessionId(): string {
  let id = localStorage.getItem("ss_session_id");
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem("ss_session_id", id);
  }
  return id;
}

// ─── Types ───────────────────────────────────────────────────────────────────
type CommentData = {
  id: number;
  postId: number;
  parentId: number | null;
  authorName: string;
  avatarUrl: string | null;
  content: string;
  likeCount: number;
  createdAt: Date;
  reactions: Record<string, number>;
};

// ─── Constants ───────────────────────────────────────────────────────────────
const MAX_COMMENT_LENGTH = 2000;
const EMOJI_LIST = [
  { emoji: "❤️", label: "Love" },
  { emoji: "👍", label: "Like" },
  { emoji: "😂", label: "Haha" },
] as const;

// ─── Comment Form ─────────────────────────────────────────────────────────────
function CommentForm({
  postId,
  parentId,
  onSuccess,
  onCancel,
  placeholder = "Write a comment...",
  compact = false,
}: {
  postId: number;
  parentId?: number;
  onSuccess: () => void;
  onCancel?: () => void;
  placeholder?: string;
  compact?: boolean;
}) {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const utils = trpc.useUtils();

  const createComment = trpc.comments.create.useMutation({
    onSuccess: () => {
      setName("");
      setContent("");
      utils.comments.byPost.invalidate({ postId });
      onSuccess();
      toast.success("Comment posted!");
    },
    onError: () => toast.error("Failed to post comment. Please try again."),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    createComment.mutate({ postId, parentId, authorName: name.trim(), content: content.trim() });
  };

  const remaining = MAX_COMMENT_LENGTH - content.length;
  const isOverLimit = remaining < 0;

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-3 ${compact ? "" : "mt-2"}`}>
      <input
        type="text"
        placeholder="Your name *"
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={100}
        required
        className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-['Source_Sans_3'] focus:outline-none focus:ring-2 focus:ring-black ${compact ? "py-2" : ""}`}
      />
      <div className="relative">
        <textarea
          placeholder={placeholder}
          value={content}
          onChange={(e) => setContent(e.target.value.slice(0, MAX_COMMENT_LENGTH))}
          rows={compact ? 2 : 4}
          className={`w-full px-4 py-3 border rounded-lg text-sm font-['Source_Sans_3'] focus:outline-none focus:ring-2 resize-none ${
            isOverLimit ? "border-red-400 focus:ring-red-400" : "border-gray-300 focus:ring-black"
          }`}
        />
        <span
          className={`absolute bottom-3 right-3 text-xs font-['Source_Sans_3'] ${
            remaining < 100 ? (remaining < 20 ? "text-red-500 font-bold" : "text-orange-500") : "text-gray-400"
          }`}
        >
          {remaining}
        </span>
      </div>
      <div className="flex gap-2 justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm text-gray-500 hover:text-black font-['Source_Sans_3'] transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={createComment.isPending || !name.trim() || !content.trim() || isOverLimit}
          className="px-6 py-2 bg-black text-white text-sm font-bold font-['Source_Sans_3'] rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
        >
          {createComment.isPending ? "Posting..." : "Post Comment"}
        </button>
      </div>
    </form>
  );
}

// ─── Comment Item (recursive) ─────────────────────────────────────────────────
function CommentItem({
  comment,
  allComments,
  postId,
  depth = 0,
}: {
  comment: CommentData;
  allComments: CommentData[];
  postId: number;
  depth?: number;
}) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const sessionId = useMemo(() => getSessionId(), []);
  const utils = trpc.useUtils();

  const replies = allComments.filter((c) => c.parentId === comment.id);

  const likeComment = trpc.comments.like.useMutation({
    onSuccess: () => utils.comments.byPost.invalidate({ postId }),
  });

  const reactComment = trpc.comments.react.useMutation({
    onSuccess: () => {
      utils.comments.byPost.invalidate({ postId });
      setShowEmojiPicker(false);
    },
  });

  const timeAgo = (date: Date) => {
    const d = new Date(date);
    const diff = Date.now() - d.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days}d ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const reactions: Record<string, number> = comment.reactions || {};
  const totalReactions = Object.values(reactions).reduce((a, b) => a + b, 0);

  return (
    <div className={`flex gap-3 ${depth > 0 ? "ml-10 mt-3" : "mt-4"}`}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        <img
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(comment.authorName)}&backgroundColor=e0e0e0`}
          alt={comment.authorName}
          className="w-9 h-9 rounded-full bg-gray-200 object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="bg-gray-50 rounded-xl px-4 py-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-sm font-['Source_Sans_3'] text-black">{comment.authorName}</span>
            <span className="text-xs text-gray-400 font-['Source_Sans_3']">{timeAgo(comment.createdAt)}</span>
          </div>
          <p className="text-sm text-gray-800 leading-relaxed" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
            {comment.content}
          </p>
        </div>

        {/* Actions row */}
        <div className="flex items-center gap-4 mt-1.5 px-2 flex-wrap">
          {/* Like */}
          <button
            onClick={() => likeComment.mutate({ commentId: comment.id })}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 transition-colors font-['Source_Sans_3']"
          >
            <Heart size={13} />
            <span>{comment.likeCount > 0 ? comment.likeCount : ""} Like</span>
          </button>

          {/* Emoji reaction picker */}
          <div className="relative">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-yellow-500 transition-colors font-['Source_Sans_3']"
            >
              <span>😊</span>
              <span>React{totalReactions > 0 ? ` (${totalReactions})` : ""}</span>
            </button>
            {showEmojiPicker && (
              <div className="absolute bottom-full left-0 mb-1 bg-white border border-gray-200 rounded-xl shadow-lg p-2 flex gap-2 z-10">
                {EMOJI_LIST.map(({ emoji, label }) => {
                  const count = reactions[emoji] ?? 0;
                  return (
                    <button
                      key={emoji}
                      onClick={() => reactComment.mutate({ commentId: comment.id, sessionId, emoji })}
                      className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
                      title={label}
                    >
                      <span className="text-xl">{emoji}</span>
                      {count > 0 && <span className="text-xs text-gray-500 font-['Source_Sans_3']">{count}</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Reaction summary */}
          {totalReactions > 0 && (
            <div className="flex items-center gap-1">
              {Object.entries(reactions)
                .filter(([, count]) => count > 0)
                .map(([emoji, count]) => (
                  <span key={emoji} className="text-xs text-gray-500 font-['Source_Sans_3']">
                    {emoji}{count}
                  </span>
                ))}
            </div>
          )}

          {/* Reply */}
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-black transition-colors font-['Source_Sans_3']"
          >
            <Reply size={13} />
            <span>Reply</span>
          </button>

          {/* Toggle replies */}
          {replies.length > 0 && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-black transition-colors font-['Source_Sans_3']"
            >
              {showReplies ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              <span>{replies.length} {replies.length === 1 ? "reply" : "replies"}</span>
            </button>
          )}
        </div>

        {/* Reply form */}
        {showReplyForm && (
          <div className="mt-3 ml-2">
            <CommentForm
              postId={postId}
              parentId={comment.id}
              onSuccess={() => setShowReplyForm(false)}
              onCancel={() => setShowReplyForm(false)}
              placeholder={`Reply to ${comment.authorName}...`}
              compact
            />
          </div>
        )}

        {/* Nested replies */}
        {showReplies && replies.length > 0 && (
          <div>
            {replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                allComments={allComments}
                postId={postId}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Comment Section ──────────────────────────────────────────────────────────
function CommentSection({ postId }: { postId: number }) {
  const { data: comments = [], isLoading } = trpc.comments.byPost.useQuery({ postId });
  const rootComments = comments.filter((c) => !c.parentId);

  return (
    <div className="mt-12 pt-8 border-t-2 border-black">
      <h3 className="text-3xl font-bold font-['Source_Sans_3'] text-black mb-6">
        Comments ({comments.length})
      </h3>

      {/* New comment form */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
        <h4 className="text-lg font-bold font-['Source_Sans_3'] text-black mb-4">Leave a Comment</h4>
        <CommentForm
          postId={postId}
          onSuccess={() => {}}
          placeholder="Share your thoughts on this post..."
        />
      </div>

      {/* Comments list */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="w-9 h-9 rounded-full bg-gray-200 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-16 bg-gray-100 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      ) : rootComments.length === 0 ? (
        <p className="text-gray-400 text-center py-8 font-['Source_Sans_3']">
          Be the first to share your thoughts!
        </p>
      ) : (
        <div className="space-y-2">
          {rootComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment as CommentData}
              allComments={comments as CommentData[]}
              postId={postId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Blog Post Page ──────────────────────────────────────────────────────
export default function BlogPost() {
  // The demo post ID — in production, this comes from the slug lookup
  const DEMO_POST_ID = 1;

  return (
    <div className="w-full bg-white flex flex-col items-start">

      {/* ── Navbar ── */}
      <header className="w-full">
        <img
          src={ASSETS.navbar}
          alt="Simply Sharon Navigation"
          className="w-full h-auto block"
        />
      </header>

      {/* ── Main Content ── */}
      <main className="w-full px-4 md:px-[135px] bg-white flex flex-col gap-8 md:gap-[43px]">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 pt-4">
          <div className="p-2.5 flex items-center">
            <Link href="/">
              <img src={ASSETS.breadcrumbIcon} alt="Home" className="w-6 h-6 md:w-[29px] md:h-[29px] cursor-pointer" />
            </Link>
          </div>
          <div className="p-2.5 flex items-center">
            <span className="text-base md:text-2xl font-bold font-['Source_Sans_3'] text-black">
              home / Blogcast / The Art of Color Picking
            </span>
          </div>
        </nav>

        {/* Post Header */}
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center gap-1 px-4">
            <h1 className="text-[56px] md:text-8xl font-normal font-['Italianno'] text-black text-center leading-tight">
              The Blogcast
            </h1>
            <p className="text-2xl md:text-4xl font-bold font-['Source_Sans_3'] text-black text-center">
              Beauty · Wellness · Wisdom
            </p>
            <div className="pt-8 md:pt-[46px]">
              <h2 className="text-4xl md:text-[64px] font-bold font-['Source_Sans_3'] text-black text-center">
                WELCOME !
              </h2>
            </div>
            <div className="pt-4 md:pt-[27px] max-w-[1003px]">
              <p className="text-xl md:text-4xl font-normal font-['Source_Sans_3'] text-black text-center leading-relaxed">
                You're currently on the landing page of my new Blog Series. To read the most recent episode, just click "Archive" below. Each post is listed by Title and Episode # with the newest at the top. Enjoy exploring and thank you for being here.
              </p>
            </div>
          </div>
          {/* Separator */}
          <div className="py-8 md:py-9">
            <div className="w-[280px] md:w-[707px] h-0 border-[3.5px] border-black"></div>
          </div>
        </div>

        {/* Post Intro Section */}
        <div className="px-0 md:px-[116px] flex flex-col gap-16 md:gap-[129px]">
          <div className="flex flex-col md:flex-row items-start gap-8 md:gap-[46px]">
            <div className="flex-1 flex flex-col gap-6 md:gap-7">
              <div className="p-2.5">
                <p className="text-lg md:text-[32px] font-normal font-['Source_Sans_3'] text-neutral-400 leading-relaxed">
                  Aug 12, 2025 | Ep 5<br />
                  By: Sharon Danley, Master Beauty Mentor
                </p>
              </div>
              <p className="text-xl md:text-4xl font-normal text-black leading-relaxed" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                Over the years, many of you have followed my reflections under the banner of Personal Mastery—a space where we explored beauty, resilience, and what it means to live from the inside out. Today, I'm thrilled to share that this blog, like all of us, is evolving.
              </p>
              <h3 className="text-2xl md:text-5xl font-bold text-black leading-tight" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                Welcome To Timeless Self Mastery
              </h3>
              <p className="text-xl md:text-4xl font-normal text-black leading-relaxed" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                This refreshed title reflects the same heart and soul, now expressed with even greater clarity for where we are today.
              </p>
            </div>
            <div className="flex-shrink-0 flex justify-center w-full md:w-auto">
              <img
                src={ASSETS.sharonPortrait}
                alt="Sharon Danley"
                className="w-48 md:w-[372px] h-auto md:h-[483px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* Main Body Paragraphs */}
        <div className="px-0 md:px-[116px] py-2.5">
          <div className="text-xl md:text-4xl font-normal text-black leading-relaxed space-y-6" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            <p>The wisdom hasn't changed—but the context has. As women over 60, we're not fading into the background. We're editing, refining, and owning every part of our lives—body, mind, and spirit—with a deeper sense of purpose.</p>
            <p><strong>Timeless Self Mastery</strong> is about cultivating strength, simplicity, style & grace in a world that often misunderstands mature beauty. It's about honouring the path we've walked while staying curious, current, and courageously engaged.</p>
            <p>You'll find practical insights, soulful reflections, and thoughtful alternatives to what society tries to prescribe for aging. And yes—<strong>beauty rituals will still play a fundamental part</strong>, because they're not just surface work—they're soul work.</p>
            <p><strong>A Quick Note on the Podcast</strong><br />
            If you followed my earlier video reflections and conversations in "Sharon's Soapbox & Other Stuff" playlist on YouTube, you'll find them archived into my <strong>new Podcast:</strong></p>
          </div>
        </div>

        {/* Video Thumbnail */}
        <div className="p-2.5 flex flex-col items-center">
          <img
            src={ASSETS.videoThumbnail}
            alt="Going Gray & Lovin' It - Sharon Danley's Transition"
            className="w-full max-w-[756px] h-auto cursor-pointer hover:opacity-90 transition-opacity"
          />
        </div>

        {/* Continuation Paragraphs */}
        <div className="px-0 md:px-[116px] py-2.5">
          <div className="text-xl md:text-4xl font-normal text-black leading-relaxed space-y-6" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            <p>Those viewpoints and insights still carry weight, and I invite you to revisit them along with new material and more coming regularly.</p>
            <p>As you read the posts that follow—or listen on the Podcast—I invite you to linger with what resonates. This is more than content. It's a collection of real moments, seasoned insight, and beauty beyond the mirror. I'm so glad you're here.</p>
          </div>
        </div>

        {/* Bold CTA Paragraphs */}
        <div className="px-0 md:px-[116px] py-2.5">
          <p className="text-xl md:text-4xl font-bold text-black leading-relaxed" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            Want to stay updated? Click the RSS link below to subscribe.
          </p>
        </div>
        <div className="px-0 md:px-[116px] py-2.5">
          <p className="text-xl md:text-4xl font-bold text-black leading-relaxed" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            Previous posts will appear below in the "Archive" with the most recent first.
          </p>
        </div>
        <div className="px-0 md:px-[116px] py-2.5">
          <p className="text-xl md:text-4xl font-normal text-black leading-relaxed" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            Thank you for your openness to evolve. Here's to mastering not just the self—but doing so with grace, grit, and a little glam.
          </p>
        </div>

        {/* Episode's Closing Quote */}
        <div className="w-full max-w-[1650px] px-0 md:px-[116px] flex flex-col gap-6 md:gap-7">
          <h3 className="text-2xl md:text-5xl font-bold font-['Source_Sans_3'] text-black">
            Episode's Closing Quote
          </h3>
          <div className="bg-[#d9d9d9] rounded-[20px] py-8 md:py-[37px] flex flex-col gap-8 md:gap-[43px]">
            <div className="px-4 md:px-10 flex justify-center items-center">
              <p className="text-xl md:text-[40px] font-bold font-['Source_Sans_3'] text-black text-center leading-relaxed">
                "What you do speaks so loudly that I can't hear anything you say."
              </p>
            </div>
            <div className="px-8 md:px-[47px] flex justify-end">
              <p className="text-4xl md:text-[64px] font-normal font-['Italianno'] text-black">
                - Ralph Waldo Emerson
              </p>
            </div>
          </div>
        </div>

        {/* Signature */}
        <div className="px-0 md:px-[116px] flex flex-col gap-6 md:gap-[39px] pb-8">
          <div className="p-2.5">
            <p className="text-2xl md:text-[40px] font-bold font-['Source_Sans_3'] text-black">
              With Warmth & Wisdom,
            </p>
          </div>
          <div className="flex items-center">
            <div className="p-2.5">
              <span className="text-6xl md:text-8xl font-normal font-['Italianno'] text-black">Sharon</span>
            </div>
            <div className="p-2.5">
              <img src={ASSETS.heartEmoji} alt="❤️" className="w-10 h-10 md:w-[52px] md:h-[52px]" />
            </div>
          </div>
        </div>

        {/* ── Comment Section ── */}
        <div className="px-0 md:px-[116px] pb-16">
          <CommentSection postId={DEMO_POST_ID} />
        </div>

      </main>

      {/* ── Footer ── */}
      <footer className="w-full">
        <img
          src={ASSETS.footer}
          alt="Connect with Sharon"
          className="w-full h-auto block"
        />
        <div className="w-full bg-black py-3 flex justify-center items-center">
          <Link href="/admin">
            <span className="text-gray-500 text-xs hover:text-gray-300 transition-colors cursor-pointer font-['Source_Sans_3']">
              Admin Login
            </span>
          </Link>
        </div>
      </footer>

    </div>
  );
}
