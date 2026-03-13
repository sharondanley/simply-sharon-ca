/**
 * Blogcast Archive Page
 * Lists all published posts with search, sort, and pagination.
 * Styled to match the Simply Sharon design system.
 */

import { useState, useEffect } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Search, ChevronLeft, ChevronRight, SortAsc, Menu, X, Mail, Youtube, Facebook } from "lucide-react";

const heroBg = {
  background: "linear-gradient(135deg, #2a2a2e 0%, #3d3d42 30%, #4a4a50 50%, #3a3a40 70%, #2e2e34 100%)",
};

const NAV_ITEMS = [
  { label: "Blogcast", href: "/blogcast" },
  { label: "Make-Betters", href: "/#make-betters" },
  { label: "Poise", href: "/#poise" },
  { label: "About", href: "/#about" },
  { label: "Archives", href: "/blogcast" },
  { label: "Contact", href: "/#contact" },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <>
      <nav className="w-full flex items-center justify-between px-8 md:px-12 py-5" style={heroBg}>
        <Link href="/" className="flex items-center gap-3 no-underline">
          <div className="w-12 h-12 rounded-full border-2 border-white/80 flex items-center justify-center bg-white/10 flex-shrink-0">
            <span className="text-white text-xl font-['Italianno'] leading-none">S</span>
          </div>
          <span className="text-white text-3xl font-normal font-['Italianno'] leading-none whitespace-nowrap">SimplySharon</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_ITEMS.map((item) => (
            <Link key={item.label} href={item.href}>
              <span className="text-white text-base lg:text-lg font-normal font-['Source_Sans_3'] hover:text-gray-300 transition-colors cursor-pointer whitespace-nowrap">{item.label}</span>
            </Link>
          ))}
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-10 h-10 flex items-center justify-center text-white" aria-label="Toggle navigation">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center gap-8 md:hidden" onClick={() => setMobileOpen(false)}>
          <button className="absolute top-5 right-5 text-white" onClick={() => setMobileOpen(false)}><X size={28} /></button>
          <span className="text-white text-[56px] font-normal font-['Italianno'] mb-4">Simply Sharon</span>
          {NAV_ITEMS.map((item) => (
            <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)}>
              <span className="text-white text-3xl font-bold font-['Source_Sans_3'] hover:text-gray-300 transition-colors cursor-pointer">{item.label}</span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

function SiteFooter() {
  return (
    <footer id="contact" className="w-full relative overflow-hidden" style={heroBg}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 80% at 75% 40%, rgba(180,180,190,0.18) 0%, transparent 70%)" }} />
      <div className="relative z-10 max-w-[1100px] mx-auto px-8 md:px-16 py-16 flex flex-col md:flex-row gap-12 justify-between items-start">
        <div className="flex flex-col gap-6 flex-1">
          <h2 className="text-white" style={{ fontFamily: "Italianno, cursive", fontSize: "clamp(40px, 4vw, 64px)" }}>Connect with Sharon</h2>
          <div className="flex items-center gap-4">
            <a href="mailto:info@SimplySharon.ca" className="w-10 h-10 rounded-full border border-white/60 flex items-center justify-center text-white hover:bg-white/20 transition-colors"><Mail size={18} /></a>
            <a href="https://www.facebook.com/SharonDanleyBeauty" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/60 flex items-center justify-center text-white hover:bg-white/20 transition-colors"><Facebook size={18} /></a>
            <a href="https://www.youtube.com/@SimplySharonTips" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/60 flex items-center justify-center text-white hover:bg-white/20 transition-colors"><Youtube size={18} /></a>
          </div>
          <div className="flex flex-col gap-4 text-white font-['Source_Sans_3']">
            <div className="flex gap-4"><span className="font-bold text-lg w-24 flex-shrink-0">Email:</span><a href="mailto:info@SimplySharon.ca" className="text-lg hover:text-gray-300 underline">info@SimplySharon.ca</a></div>
            <div className="flex gap-4"><span className="font-bold text-lg w-24 flex-shrink-0">YouTube:</span><a href="https://www.youtube.com/@SimplySharonTips" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-gray-300 underline">YouTube.com/@SimplySharonTips</a></div>
            <div className="flex gap-4"><span className="font-bold text-lg w-24 flex-shrink-0">Facebook:</span><div className="flex flex-col gap-2"><a href="https://www.facebook.com/groups/GoinGray.LovinIt" target="_blank" rel="noopener noreferrer" className="text-base hover:text-gray-300 underline">Facebook.com/groups/GoinGray.LovinIt</a><a href="https://www.facebook.com/SharonDanleyBeauty" target="_blank" rel="noopener noreferrer" className="text-base hover:text-gray-300 underline">Facebook.com/SharonDanleyBeauty</a></div></div>
          </div>
          <p className="text-white/60 text-sm font-['Source_Sans_3'] max-w-[600px] mt-4">Not monetized, sponsored, or compensated. Shared freely to inspire a <strong className="text-white/80">legacy of giving in honour of my children Andrea &amp; Matthew Main</strong>.</p>
          <p className="text-white/50 text-sm font-['Source_Sans_3']">© 2025 Sharon Danley | All images, content and design created by Sharon Danley.</p>
          <Link href="/admin"><span className="text-white/30 text-xs hover:text-white/60 transition-colors cursor-pointer font-['Source_Sans_3']">Admin Login</span></Link>
        </div>
      </div>
    </footer>
  );
}

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/75-344_8b8c1a79.webp";
const PLACEHOLDER_THUMB = "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/81-436_a928ba59.webp";

// Sample seed posts for when the DB is empty (demo data)
const SEED_POSTS = [
  {
    id: -1, slug: "gray-is-gorgeous-own-your-way", title: "Gray is Gorgeous — Own Your Way",
    subtitle: "Embracing silver hair with confidence and style",
    summary: "Discover how to transition to gray hair gracefully, with tips on toning, styling, and owning your silver with pride. Sharon shares her personal journey and expert advice.",
    thumbnailUrl: PLACEHOLDER_THUMB, hashtags: ["#GrayHair", "#NaturalBeauty", "#AgingGracefully"],
    topic: "Beauty", episode: 1, authorName: "Sharon Danley", publishedAt: new Date("2025-11-01"), createdAt: new Date("2025-11-01"),
  },
  {
    id: -2, slug: "vocal-power-speak-with-strength", title: "Vocal Power: Speak with Strength",
    subtitle: "Simple exercises to strengthen and captivate",
    summary: "Your voice is one of your most powerful tools. Learn easy daily exercises that keep your voice limber, clear, and commanding in any situation — from business meetings to family gatherings.",
    thumbnailUrl: PLACEHOLDER_THUMB, hashtags: ["#VocalPower", "#PublicSpeaking", "#Confidence"],
    topic: "Poise", episode: 2, authorName: "Sharon Danley", publishedAt: new Date("2025-11-15"), createdAt: new Date("2025-11-15"),
  },
  {
    id: -3, slug: "makeup-ordinary-to-extraordinary", title: "Makeup: Ordinary to Extraordinary",
    subtitle: "Transform your look with simple techniques",
    summary: "Step-by-step guidance on enhancing your natural features with makeup that celebrates your age rather than hiding it. Perfect for women 50+ who want to look polished without looking overdone.",
    thumbnailUrl: PLACEHOLDER_THUMB, hashtags: ["#Makeup", "#BeautyTips", "#MatureBeauty"],
    topic: "Makeup", episode: 3, authorName: "Sharon Danley", publishedAt: new Date("2025-12-01"), createdAt: new Date("2025-12-01"),
  },
  {
    id: -4, slug: "wardrobe-wisdom-timeless-style", title: "Wardrobe Wisdom: Timeless Style",
    subtitle: "Dressing for your body, lifestyle, and personality",
    summary: "Build a wardrobe that works for your real life. Sharon breaks down the key pieces every woman needs, how to dress for your body type, and how to create a signature style that feels authentically you.",
    thumbnailUrl: PLACEHOLDER_THUMB, hashtags: ["#Wardrobe", "#Style", "#FashionOver50"],
    topic: "Style", episode: 4, authorName: "Sharon Danley", publishedAt: new Date("2025-12-15"), createdAt: new Date("2025-12-15"),
  },
  {
    id: -5, slug: "inner-u-cultivating-positive-mindset", title: "Inner U: Cultivating a Positive Mindset",
    subtitle: "Overcoming limiting beliefs and embracing your power",
    summary: "Your thoughts shape your reality. Learn practical strategies to identify and overcome limiting beliefs, build emotional resilience, and create a compelling vision for your future.",
    thumbnailUrl: PLACEHOLDER_THUMB, hashtags: ["#Mindset", "#PersonalGrowth", "#InnerStrength"],
    topic: "Mindset", episode: 5, authorName: "Sharon Danley", publishedAt: new Date("2026-01-01"), createdAt: new Date("2026-01-01"),
  },
];

type SortOption = "title" | "date" | "topic";

function ArticleCard({ post }: { post: typeof SEED_POSTS[0] }) {
  const hashtags = Array.isArray(post.hashtags) ? post.hashtags : [];
  const date = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "";

  return (
    <Link href={`/blogcast/${post.slug}`}>
      <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full">
        {/* Thumbnail */}
        <div className="relative overflow-hidden aspect-video bg-gray-100">
          <img
            src={post.thumbnailUrl || PLACEHOLDER_THUMB}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {post.topic && (
            <span className="absolute top-3 left-3 bg-black text-white text-xs font-bold px-3 py-1 rounded-full font-['Source_Sans_3']">
              {post.topic}
            </span>
          )}
          {post.episode && (
            <span className="absolute top-3 right-3 bg-white/90 text-black text-xs font-bold px-3 py-1 rounded-full font-['Source_Sans_3']">
              Ep. {post.episode}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-3 flex-1">
          <div>
            <h3 className="text-black text-xl font-bold font-['Source_Sans_3'] leading-tight group-hover:underline line-clamp-2">
              {post.title}
            </h3>
            {post.subtitle && (
              <p className="text-gray-600 text-sm font-['Source_Sans_3'] mt-1 line-clamp-1">
                {post.subtitle}
              </p>
            )}
          </div>

          {post.summary && (
            <p className="text-gray-700 text-sm leading-relaxed line-clamp-3 flex-1" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
              {post.summary}
            </p>
          )}

          {/* Hashtags */}
          {hashtags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
              {hashtags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded font-['Source_Sans_3']">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <span className="text-xs text-gray-400 font-['Source_Sans_3']">{post.authorName}</span>
            <span className="text-xs text-gray-400 font-['Source_Sans_3']">{date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
    if (totalPages <= 7) return i + 1;
    if (page <= 4) return i + 1;
    if (page >= totalPages - 3) return totalPages - 6 + i;
    return page - 3 + i;
  });

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-300 text-sm font-['Source_Sans_3'] disabled:opacity-40 hover:bg-gray-50 transition-colors"
      >
        <ChevronLeft size={16} /> Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-10 h-10 rounded-lg text-sm font-bold font-['Source_Sans_3'] transition-colors ${
            p === page
              ? "bg-black text-white"
              : "border border-gray-300 text-black hover:bg-gray-50"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-300 text-sm font-['Source_Sans_3'] disabled:opacity-40 hover:bg-gray-50 transition-colors"
      >
        Next <ChevronRight size={16} />
      </button>
    </div>
  );
}

export default function BlogcastArchive() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("date");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Reset to page 1 when search/sort changes
  useEffect(() => { setPage(1); }, [debouncedSearch, sortBy]);

  const { data, isLoading } = trpc.posts.list.useQuery({
    page,
    limit: 15,
    search: debouncedSearch || undefined,
    sortBy,
  });

  // Use real data or seed data for demo
  const posts = (data?.items && data.items.length > 0) ? data.items : SEED_POSTS;
  const total = data?.total ?? SEED_POSTS.length;
  const totalPages = Math.ceil(total / 15);

  return (
    <div className="min-h-screen bg-white">
      {/* ── Navbar ── */}
      <Navbar />

      {/* ── Header ── */}
      <section className="w-full bg-gradient-to-b from-gray-50 to-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-black text-7xl font-normal font-['Italianno'] mb-4">Blogcast</h1>
          <p className="text-black text-2xl font-bold font-['Source_Sans_3'] mb-3">Wisdom You Can Read, Listen, or Watch</p>
          <p className="text-gray-600 text-lg" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
            Thoughtful explorations of beauty, wellness, and wisdom for confident aging
          </p>
        </div>
      </section>

      {/* ── Search & Sort Controls ── */}
      <section className="w-full bg-white border-b border-gray-100 py-5 px-6 sticky top-[73px] z-20 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-lg">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm font-['Source_Sans_3'] focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <SortAsc size={18} className="text-gray-500" />
            <span className="text-sm text-gray-500 font-['Source_Sans_3']">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-['Source_Sans_3'] focus:outline-none focus:ring-2 focus:ring-black bg-white"
            >
              <option value="date">Date</option>
              <option value="title">Title</option>
              <option value="topic">Topic</option>
            </select>
          </div>

          {/* Result count */}
          <span className="text-sm text-gray-400 font-['Source_Sans_3'] whitespace-nowrap">
            {total} article{total !== 1 ? "s" : ""}
          </span>
        </div>
      </section>

      {/* ── Article Grid ── */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-xl h-80 animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl font-['Source_Sans_3']">No articles found.</p>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="mt-4 text-black underline text-sm font-['Source_Sans_3']"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <ArticleCard key={post.id} post={post as any} />
            ))}
          </div>
        )}

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </section>

      {/* ── Footer ── */}
      <SiteFooter />
    </div>
  );
}
