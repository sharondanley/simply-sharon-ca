/**
 * Simply Sharon - Home Page
 * Design: Elegant beauty/wellness brand for mature women
 * Fonts: Italianno (script headings), Source Sans 3 (body/buttons)
 * Colors: Dark charcoal/gray backgrounds, white text on dark, black text on white
 */

import { useState } from "react";
import { Link } from "wouter";
import { ChevronDown, ChevronUp, Menu, X, Mail, Youtube, Facebook } from "lucide-react";

// ─── Nav Items ───────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: "Blogcast", href: "/blogcast" },
  { label: "Make-Betters", href: "/#make-betters" },
  { label: "Poise", href: "/#poise" },
  { label: "About", href: "/#about" },
  { label: "Archives", href: "/blogcast" },
  { label: "Contact", href: "/#contact" },
];

// ─── CDN asset URLs ───────────────────────────────────────────────────────────
const ASSETS = {
  // Hero
  sharonHero: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/81-436_a928ba59.webp",
  heroMobile: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/1-3_a429c158.webp",
  // Blogcast
  blogcastAuthor: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/81-436_a928ba59.webp",
  newTag: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/84-444_91d05244.webp",
  readIcon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/75-402_6a012431.webp",
  listenIcon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/75-407_26aece65.webp",
  watchIcon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/75-412_5f44d0f8.webp",
  // Mobile blogcast images
  blogcastMobileLeft: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/1-29_a3fcdaf5.webp",
  blogcastMobileRight: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/1-30_386acd72.webp",
  // Full-section images (kept as images - complex photo grids without individual assets)
  makeBetterDesktop: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/84-446_3212980c.webp",
  makeBetterMobile: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/1-54_8e41af54.webp",
  realLifeMakeBettersDesktop: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/92-3_2de42173.webp",
  realLifeMakeBettersMobile: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/1-72_0756d509.webp",
  grayIsGorgeousDesktop: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/93-53_88b9047e.webp",
  grayIsGorgeousMobile: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/1-91_08f34d98.webp",
  // About Sharon portrait
  aboutSharonPortrait: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/1-207_8eccdfae.webp",
  aboutSharonMobile: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/1-201_7973673f.webp",
  collageDesktop: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/106-400_fadc236a.webp",
  collageMobile: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/1-253_1c63c9e9.webp",
  // LAST-ing Impressions showcase images (desktop)
  lookImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/96-126_b2845828.webp",
  actImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/98-354_89e725eb.webp",
  speakImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/98-369_bd54c0cb.webp",
  thinkImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/98-383_39b1a4be.webp",
  // LAST-ing Impressions showcase images (mobile)
  lookImageMobile: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/1-124_a99e112e.webp",
  actImageMobile: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/1-156_abc5e1a3.webp",
  speakImageMobile: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/1-168_821ab89e.webp",
  thinkImageMobile: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/1-180_31a8533c.webp",
  // Playlist button icons (desktop - 53x53)
  makeupIcon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/93-72_b822432b.webp",
  beautyTipsIcon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/96-110_ad680728.webp",
  hairstylesIcon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/96-115_3c87141d.webp",
  wardrobeIcon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/96-120_c7151129.webp",
  digitalMakeBettersIcon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/96-227_e88969ba.webp",
  hairExtensionsIcon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/96-232_2ffabb73.webp",
  performancePrecisionIcon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/98-325_b2fca39a.webp",
  vocalPowerIcon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/98-365_ce09b4c0.webp",
  bossOfMeIcon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/98-379_c5dd95ad.webp",
  innerUIcon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/98-386_3239e00a.webp",
  modernEtiquetteIcon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/98-391_ae5a20ae.webp",
  // Mobile playlist icons (25x25)
  hairstylesMobileIcon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/1-130_0871a8f2.webp",
  beautyTipsMobileIcon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/1-136_2271976a.webp",
  wardrobeMobileIcon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/1-143_17380f72.webp",
  makeupMobileIcon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/1-149_cdd7b30b.webp",
  performanceMobileIcon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/1-162_7b41dda8.webp",
  vocalMobileIcon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/1-174_8e64fdcd.webp",
  modernEtiquetteMobileIcon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/1-186_36c55a13.webp",
  bossOfMeMobileIcon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/1-191_a5709166.webp",
  innerUMobileIcon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/1-196_1459df3c.webp",
};

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop + Mobile Navbar */}
      <nav
        className="w-full absolute top-0 left-0 z-30 flex items-center justify-between px-8 md:px-12 py-5"
        style={{ background: "transparent" }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 no-underline">
          <div className="w-14 h-14 rounded-full border-2 border-white/80 flex items-center justify-center overflow-hidden bg-white/10 backdrop-blur-sm flex-shrink-0">
            {/* Silhouette icon - stylized S */}
            <span className="text-white text-2xl font-['Italianno'] leading-none">S</span>
          </div>
          <span className="text-white text-3xl md:text-4xl font-normal font-['Italianno'] leading-none whitespace-nowrap">
            SimplySharon
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_ITEMS.map((item) => (
            <Link key={item.label} href={item.href}>
              <span className="text-white text-base lg:text-lg font-normal font-['Source_Sans_3'] hover:text-gray-300 transition-colors cursor-pointer whitespace-nowrap">
                {item.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center text-white"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile full-screen overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center gap-8 md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <button
            className="absolute top-5 right-5 text-white"
            onClick={() => setMobileOpen(false)}
          >
            <X size={28} />
          </button>
          <span className="text-white text-[56px] font-normal font-['Italianno'] mb-4">
            Simply Sharon
          </span>
          {NAV_ITEMS.map((item) => (
            <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)}>
              <span className="text-white text-3xl font-bold font-['Source_Sans_3'] hover:text-gray-300 transition-colors cursor-pointer">
                {item.label}
              </span>
            </Link>
          ))}
          <Link href="/admin" onClick={() => setMobileOpen(false)}>
            <span className="text-gray-400 text-sm mt-8 hover:text-white transition-colors cursor-pointer">
              Admin Login
            </span>
          </Link>
        </div>
      )}
    </>
  );
}

// ─── Collapsible Gallery Accordion ───────────────────────────────────────────
const GALLERY_CATEGORIES = [
  {
    label: "Makeup",
    items: ["Ordinary to Extraordinary", "Golden Girls", "Eyebrows", "Bridal", "Males"],
  },
  {
    label: "SFX",
    items: ["Characters 1", "Characters 2", "Film", "TV", "Bus. SFX", "Facepainting"],
  },
  {
    label: "Hairstyling",
    items: ["Historical/Fashion/Character", "Updos", "Short & Long", "Vintage", "Thin Hair Help"],
  },
];

function GalleryAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="w-full flex flex-col gap-3 mt-6">
      <p className="text-center text-black text-2xl font-bold font-['Source_Sans_3'] mb-2">
        Sharon's Photo Gallery Links Below
      </p>
      {GALLERY_CATEGORIES.map((cat, idx) => (
        <div key={cat.label} className="border border-black rounded-lg overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 transition-colors"
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
          >
            <span className="text-black text-xl font-bold font-['Source_Sans_3']">{cat.label}</span>
            {openIdx === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {openIdx === idx && (
            <div className="px-6 py-4 bg-gray-50 flex flex-wrap gap-3">
              {cat.items.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-['Source_Sans_3'] text-black hover:bg-black hover:text-white transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  {item}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Playlist Buttons ─────────────────────────────────────────────────────────
function DesktopPlaylistButton({ icon, label }: { icon: string; label: string }) {
  return (
    <button className="px-[23px] py-4 rounded-[98px] outline outline-[3px] outline-offset-[-3px] outline-black flex justify-start items-center gap-2.5 hover:bg-black hover:text-white transition-colors group">
      <img src={icon} alt="" className="w-[53px] h-[53px] flex-shrink-0" />
      <span className="text-black text-[32px] font-bold font-['Source_Sans_3'] group-hover:text-white whitespace-nowrap">
        {label}
      </span>
    </button>
  );
}

function MobilePlaylistButton({ icon, label }: { icon: string; label: string }) {
  return (
    <button className="px-2 py-1 rounded-[18px] outline outline-2 outline-offset-[-2px] outline-black inline-flex justify-start items-center gap-2 hover:bg-black hover:text-white transition-colors group">
      <img src={icon} alt="" className="w-[25px] h-[25px] flex-shrink-0" />
      <span className="text-black text-2xl font-bold font-['Source_Sans_3'] group-hover:text-white whitespace-nowrap">
        {label}
      </span>
    </button>
  );
}

// ─── Hero Background Style ────────────────────────────────────────────────────
const heroBg = {
  background: "linear-gradient(135deg, #2a2a2e 0%, #3d3d42 30%, #4a4a50 50%, #3a3a40 70%, #2e2e34 100%)",
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="w-full bg-white flex flex-col items-center overflow-hidden">

      {/* ── Navbar + Hero Section (dark bg) ── */}
      <section
        id="hero"
        className="w-full relative overflow-hidden"
        style={heroBg}
      >
        {/* Diagonal light ray overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 80% at 75% 40%, rgba(180,180,190,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Navbar */}
        <Navbar />

        {/* Desktop Hero Content */}
        <div className="hidden md:flex w-full max-w-[1400px] mx-auto px-12 pt-32 pb-24 items-center justify-between relative z-10">
          {/* Left: Text */}
          <div className="flex flex-col gap-6 max-w-[600px]">
            <h1
              className="text-white leading-tight"
              style={{ fontFamily: "Italianno, cursive", fontSize: "clamp(56px, 5vw, 80px)" }}
            >
              Simlpy Sharon.ca
            </h1>
            <h2
              className="text-white"
              style={{ fontFamily: "Italianno, cursive", fontSize: "clamp(32px, 3vw, 48px)" }}
            >
              Healthy Beauty &amp; Confident Aging
            </h2>
            <p className="text-white text-xl md:text-2xl font-normal font-['Source_Sans_3'] leading-relaxed">
              Achieve Radiant Beauty, Glowing Health<br />
              Meaningful Aging with{" "}
              <strong>Simplicity, Strength, Style, Grace</strong>
            </p>
            <p
              className="text-white mt-2"
              style={{ fontFamily: "Italianno, cursive", fontSize: "clamp(28px, 2.5vw, 40px)" }}
            >
              Design Your Life with Purpose<br />
              for a Compelling Destiny
            </p>
          </div>

          {/* Right: Sharon portrait */}
          <div className="flex-shrink-0 ml-8">
            <img
              src={ASSETS.sharonHero}
              alt="Sharon Danley"
              className="w-[320px] h-[380px] object-cover object-top rounded-sm"
              style={{ filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.5))" }}
            />
          </div>
        </div>

        {/* Mobile Hero */}
        <div className="md:hidden w-full relative z-10 pt-20 pb-10">
          <img
            src={ASSETS.heroMobile}
            alt="Simply Sharon - Healthy Beauty & Confident Aging"
            className="w-full h-auto block"
          />
        </div>
      </section>

      {/* ── Blogcast Section ── */}
      {/* Desktop Blogcast */}
      <section className="w-full pl-[42px] pb-[95px] hidden md:flex flex-col justify-center items-center gap-[23px]">
        <div className="p-2.5 flex flex-col justify-start items-start gap-[5px] overflow-hidden">
          <div className="self-stretch px-[156px] inline-flex justify-center items-center gap-2.5 overflow-hidden">
            <span className="text-center text-black text-8xl font-normal font-['Italianno']">Blogcast</span>
            <img src={ASSETS.newTag} alt="New" className="w-20 h-20" />
          </div>
          <div className="self-stretch px-[42px] py-[13px] inline-flex justify-center items-center gap-2.5 overflow-hidden">
            <span className="text-center text-black text-4xl font-bold font-['Source_Sans_3']">
              Wisdom You Can Read, Listen, or Watch
            </span>
          </div>
        </div>
        <div className="px-[63px] py-2.5 inline-flex justify-center items-center gap-[15px] overflow-hidden">
          <span className="w-[1036px] text-center text-black text-[40px] font-normal font-['Source_Sans_3']">
            Thoughtful explorations of beauty, wellness, and wisdom for confident aging — in the format that works for you
          </span>
        </div>
        <div className="px-[19px] py-12 bg-[#d9d9d9] inline-flex justify-start items-center gap-[25px]">
          <div className="w-[1167px] inline-flex flex-col justify-start items-center gap-[51px]">
            <div className="self-stretch inline-flex justify-center items-center gap-[33px]">
              <div className="w-[356px] self-stretch py-[29px] inline-flex flex-col justify-start items-center gap-[33px]">
                <img src={ASSETS.readIcon} alt="Read" className="w-20 h-20" />
                <span className="text-center text-black text-[40px] font-bold font-['Source_Sans_3']">Read</span>
                <span className="flex-1 text-center text-black text-[28px] font-normal" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
                  Deep dives into beauty myths, practical advice, and inspiring stories
                </span>
              </div>
              <div className="w-[366px] self-stretch py-[29px] inline-flex flex-col justify-start items-center gap-[33px]">
                <img src={ASSETS.listenIcon} alt="Listen" className="w-20 h-20" />
                <span className="text-center text-black text-[40px] font-bold font-['Source_Sans_3']">Listen</span>
                <span className="flex-1 text-center text-black text-[28px] font-normal" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
                  Empowering conversations on personal growth, wisdom, and holistic health
                </span>
              </div>
              <div className="w-[330px] self-stretch py-[29px] inline-flex flex-col justify-start items-center gap-[33px]">
                <img src={ASSETS.watchIcon} alt="Watch" className="w-20 h-20" />
                <span className="text-center text-black text-[40px] font-bold font-['Source_Sans_3']">Watch</span>
                <span className="flex-1 text-center text-black text-[28px] font-normal" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
                  Visual tutorials and real talk about living with strength and grace
                </span>
              </div>
            </div>
            <div className="px-[54px] py-5 inline-flex justify-center items-center gap-2.5 overflow-hidden">
              <span className="text-center text-black text-[32px] font-bold font-['Source_Sans_3']">
                Join women who are embracing their authentic beauty and living with purpose
              </span>
            </div>
            <div className="px-5 py-[23px] inline-flex justify-center items-center gap-2.5 overflow-hidden">
              <Link href="/blogcast">
                <span className="text-center text-black text-5xl font-bold font-['Source_Sans_3'] cursor-pointer hover:underline">
                  Explore the Blogcast →
                </span>
              </Link>
            </div>
          </div>
          <img src={ASSETS.blogcastAuthor} alt="Sharon Danley" className="w-[482px] h-[496px] object-cover" />
        </div>
      </section>

      {/* Mobile Blogcast */}
      <section className="w-full py-2.5 md:hidden flex flex-col justify-start items-start gap-2.5">
        <div className="self-stretch p-2.5 flex flex-col justify-start items-start gap-[5px] overflow-hidden">
          <div className="self-stretch px-[156px] inline-flex justify-center items-center gap-2.5 overflow-hidden">
            <span className="text-center text-black text-[64px] font-normal font-['Italianno']">Blogcast</span>
          </div>
          <div className="self-stretch h-[153px] px-[42px] py-[13px] inline-flex justify-center items-center gap-2.5 overflow-hidden">
            <span className="text-center text-black text-4xl font-bold font-['Source_Sans_3']">
              Wisdom You Can Read, Listen, or Watch
            </span>
          </div>
        </div>
        <div className="w-full px-[13px] py-2.5 bg-white inline-flex justify-start items-start gap-[25px] overflow-hidden">
          <img src={ASSETS.blogcastMobileLeft} alt="" className="w-[159px] h-[172px] object-cover" />
          <img src={ASSETS.blogcastMobileRight} alt="" className="w-[180px] h-[172px] object-cover" />
        </div>
        <div className="w-full px-[19px] py-2.5 bg-white flex flex-col justify-start items-start gap-2.5 overflow-hidden">
          <div className="self-stretch px-[37px] py-2.5 inline-flex justify-center items-center gap-2.5 overflow-hidden">
            <span className="text-center text-black text-[32px] font-normal font-['Source_Sans_3']">
              Thoughtful explorations of beauty, wellness, and wisdom for confident aging — in the format that works for you
            </span>
          </div>
          <div className="self-stretch py-2.5 bg-[#d9d9d9] flex flex-col justify-start items-start gap-[33px] overflow-hidden">
            <div className="self-stretch py-[29px] flex flex-col justify-start items-center gap-[33px]">
              <img src={ASSETS.readIcon} alt="Read" className="w-20 h-20" />
              <span className="w-20 text-center text-black text-4xl font-bold font-['Source_Sans_3']">Read</span>
              <span className="flex-1 text-center text-black text-[32px] font-normal" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
                Deep dives into beauty myths, practical advice, and inspiring stories
              </span>
            </div>
            <div className="self-stretch py-[29px] flex flex-col justify-start items-center gap-[33px]">
              <img src={ASSETS.listenIcon} alt="Listen" className="w-20 h-20" />
              <span className="self-stretch text-center text-black text-4xl font-bold font-['Source_Sans_3']">Listen</span>
              <span className="flex-1 text-center text-black text-[32px] font-normal" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
                Empowering conversations on personal growth, wisdom, and holistic health
              </span>
            </div>
            <div className="self-stretch py-[29px] flex flex-col justify-start items-center gap-[33px]">
              <img src={ASSETS.watchIcon} alt="Watch" className="w-20 h-20" />
              <span className="self-stretch text-center text-black text-4xl font-bold font-['Source_Sans_3']">Watch</span>
              <span className="flex-1 text-center text-black text-[32px] font-normal" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
                Visual tutorials and real talk about living with strength and grace
              </span>
            </div>
          </div>
          <div className="self-stretch px-[54px] py-5 inline-flex justify-center items-center gap-2.5 overflow-hidden">
            <span className="w-[323px] text-center text-black text-2xl font-bold font-['Source_Sans_3']">
              Join women who are embracing their authentic beauty and living with purpose
            </span>
          </div>
          <div className="self-stretch px-5 py-[23px] bg-white inline-flex justify-center items-center gap-2.5 overflow-hidden">
            <Link href="/blogcast">
              <span className="flex-1 text-center text-black text-2xl font-bold font-['Source_Sans_3'] cursor-pointer hover:underline">
                Explore the Blogcast →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Pay-Forward Digital Make-Betters Section ── */}
      <section id="make-betters" className="w-full">
        <img src={ASSETS.makeBetterDesktop} alt="Pay-Forward Digital Make-Betters" className="w-full h-auto block hidden md:block" />
        <img src={ASSETS.makeBetterMobile} alt="Pay-Forward Digital Make-Betters" className="w-full h-auto block md:hidden" />
      </section>

      {/* ── Real Life Make-Betters Section ── */}
      <section className="w-full">
        <img src={ASSETS.realLifeMakeBettersDesktop} alt="Real Life Make-Betters" className="w-full h-auto block hidden md:block" />
        <img src={ASSETS.realLifeMakeBettersMobile} alt="Real Life Make-Betters" className="w-full h-auto block md:hidden" />
      </section>

      {/* ── Gray is Gorgeous Section ── */}
      <section className="w-full">
        <img src={ASSETS.grayIsGorgeousDesktop} alt="Gray is Gorgeous! Own-it Your Way" className="w-full h-auto block hidden md:block" />
        <img src={ASSETS.grayIsGorgeousMobile} alt="Gray is Gorgeous! Own-it Your Way" className="w-full h-auto block md:hidden" />
      </section>

      {/* ── Enjoy Positive LAST-ing Impressions Section ── */}
      {/* Desktop */}
      <section id="poise" className="w-full px-[109px] py-[60px] hidden md:flex flex-col justify-start items-start gap-[51px] bg-white">
        <div className="self-stretch p-2.5 flex flex-col justify-start items-start gap-[5px] overflow-hidden">
          <div className="self-stretch px-[156px] inline-flex justify-center items-center gap-2.5 overflow-hidden">
            <span className="text-center text-black text-8xl font-normal font-['Italianno']">
              Enjoy Positive LAST-ing Impressions
            </span>
          </div>
          <div className="self-stretch px-[42px] py-[13px] inline-flex justify-center items-center gap-2.5 overflow-hidden">
            <span className="text-center text-black text-4xl font-bold font-['Source_Sans_3']">
              Look, Act, Speak, Think - Your Best
            </span>
          </div>
        </div>

        {/* LOOK */}
        <div className="self-stretch min-h-[456px] pr-10 flex justify-start items-center gap-[95px]">
          <div className="p-2.5 outline outline-1 outline-offset-[-1px] outline-black flex justify-start items-center gap-2.5 flex-shrink-0">
            <img src={ASSETS.lookImage} alt="Look" className="w-[311px] h-[311px] object-cover" />
          </div>
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-[33px]">
            <div className="self-stretch p-2.5 inline-flex justify-center items-center gap-2.5">
              <span className="flex-1 text-black text-[32px] font-normal font-['Source_Sans_3']">
                LOOK – Embrace simple techniques that enhance your natural beauty, hairstyles that frame your face and suit your body type, and wardrobe wisdom with timeless pieces that work for your body frame, preferences and lifestyle. Check these Playlists.
              </span>
            </div>
            <div className="self-stretch inline-flex justify-start items-start gap-11 flex-wrap content-start">
              <DesktopPlaylistButton icon={ASSETS.makeupIcon} label="Makeup" />
              <DesktopPlaylistButton icon={ASSETS.beautyTipsIcon} label="Best Beauty Tips" />
              <DesktopPlaylistButton icon={ASSETS.hairstylesIcon} label="Hairstyles" />
              <DesktopPlaylistButton icon={ASSETS.wardrobeIcon} label="Wardrobe" />
              <DesktopPlaylistButton icon={ASSETS.digitalMakeBettersIcon} label="Digital Make-Betters" />
              <DesktopPlaylistButton icon={ASSETS.hairExtensionsIcon} label="Hair Extensions" />
            </div>
          </div>
        </div>

        {/* ACT */}
        <div className="self-stretch min-h-[456px] pr-10 flex justify-start items-center gap-[95px]">
          <div className="p-2.5 outline outline-1 outline-offset-[-1px] outline-black flex justify-start items-center gap-2.5 flex-shrink-0">
            <img src={ASSETS.actImage} alt="Act" className="w-[311px] h-[311px] object-cover" />
          </div>
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-[51px]">
            <div className="self-stretch p-2.5 inline-flex justify-center items-center gap-2.5">
              <span className="flex-1 text-black text-[32px] font-normal" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
                ACT – Move and interact with confident posture, purposeful body language and facial expression to polish strong, flexible and striking presentation skills that shine in every situation, ensuring your message resonates with any audience.
              </span>
            </div>
            <div className="self-stretch inline-flex justify-start items-start gap-11 flex-wrap content-start">
              <DesktopPlaylistButton icon={ASSETS.performancePrecisionIcon} label="Performance Precision" />
            </div>
          </div>
        </div>

        {/* SPEAK */}
        <div className="self-stretch min-h-[456px] pr-10 flex justify-start items-center gap-[95px]">
          <div className="p-2.5 outline outline-1 outline-offset-[-1px] outline-black flex justify-start items-center gap-2.5 flex-shrink-0">
            <img src={ASSETS.speakImage} alt="Speak" className="w-[311px] h-[311px] object-cover" />
          </div>
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-[51px]">
            <div className="self-stretch p-2.5 inline-flex justify-center items-center gap-2.5">
              <span className="flex-1 text-black text-[32px] font-normal" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
                SPEAK – Stretch and strengthen your voice with simple, fun exercises to keep it limber and captivating with "Strength &amp; Style" for business, video chats, storytelling or public speaking. These techniques enhance vocal clarity, ensuring your voice commands attention.
              </span>
            </div>
            <div className="self-stretch inline-flex justify-start items-start gap-11 flex-wrap content-start">
              <DesktopPlaylistButton icon={ASSETS.vocalPowerIcon} label="Vocal Power" />
            </div>
          </div>
        </div>

        {/* THINK */}
        <div className="self-stretch min-h-[456px] pr-10 flex justify-start items-center gap-[95px]">
          <div className="p-2.5 outline outline-1 outline-offset-[-1px] outline-black flex justify-start items-center gap-2.5 flex-shrink-0">
            <img src={ASSETS.thinkImage} alt="Think" className="w-[311px] h-[311px] object-cover" />
          </div>
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-[51px]">
            <div className="self-stretch p-2.5 inline-flex justify-center items-center gap-2.5">
              <span className="flex-1 text-black text-[32px] font-normal" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
                THINK – Master your wisdom, character and interactions by cultivating positive thoughts and overcoming limited beliefs to empower your daily life. You are what you focus on, so consistently practicing emotional and spiritual fitness, creates a powerful present and compelling future.
              </span>
            </div>
            <div className="self-stretch inline-flex justify-start items-start gap-11 flex-wrap content-start">
              <DesktopPlaylistButton icon={ASSETS.bossOfMeIcon} label="I'm the boss of me" />
              <DesktopPlaylistButton icon={ASSETS.innerUIcon} label="Inner U" />
              <DesktopPlaylistButton icon={ASSETS.modernEtiquetteIcon} label="Modern Etiquette" />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile LAST-ing Impressions */}
      <section className="w-full md:hidden flex flex-col justify-start items-center gap-[29px]">
        <div className="self-stretch flex flex-col justify-start items-start gap-[21px]">
          <div className="self-stretch flex flex-col justify-center items-center gap-2.5">
            <span className="w-[378px] text-center text-black text-[64px] font-normal font-['Italianno']">
              Enjoy Positive LAST-ing Impressions
            </span>
          </div>
          <div className="self-stretch inline-flex justify-center items-center gap-2.5">
            <span className="flex-1 text-center text-black text-4xl font-bold font-['Source_Sans_3']">
              Look, Act, Speak, Think - Your Best
            </span>
          </div>
        </div>
        <div className="self-stretch px-[19px] flex flex-col justify-start items-start gap-5">
          {/* LOOK card */}
          <div className="self-stretch px-6 py-[39px] bg-[#939393] flex flex-col justify-start items-center gap-[34px]">
            <span className="text-center text-black text-[32px] font-bold font-['Source_Sans_3']">LOOK</span>
            <img src={ASSETS.lookImageMobile} alt="Look" className="w-[251px] h-[251px] object-cover" />
            <span className="w-[304px] text-center text-black text-[27px] font-normal font-['Source_Sans_3']">
              Embrace simple techniques that enhance your natural beauty. Check these Playlists.
            </span>
            <div className="self-stretch inline-flex flex-col justify-start items-start gap-2">
              <MobilePlaylistButton icon={ASSETS.hairstylesMobileIcon} label="Hairstyles" />
              <MobilePlaylistButton icon={ASSETS.beautyTipsMobileIcon} label="Best Beauty Tips" />
              <div className="inline-flex justify-start items-center gap-[21px]">
                <MobilePlaylistButton icon={ASSETS.wardrobeMobileIcon} label="wardrobe" />
                <MobilePlaylistButton icon={ASSETS.makeupMobileIcon} label="Makeup" />
              </div>
            </div>
          </div>
          {/* ACT card */}
          <div className="self-stretch px-6 py-[39px] bg-[#939393] flex flex-col justify-start items-center gap-[27px]">
            <span className="text-center text-black text-[32px] font-bold font-['Source_Sans_3']">ACT</span>
            <img src={ASSETS.actImageMobile} alt="Act" className="w-[241px] h-[241px] object-cover" />
            <span className="w-[304px] text-center text-black text-[32px] font-normal font-['Source_Sans_3']">
              Move and interact with confident posture, purposeful body language and facial expression to polish strong
            </span>
            <div className="flex flex-col justify-center items-center gap-5">
              <MobilePlaylistButton icon={ASSETS.performanceMobileIcon} label="Performance Precision" />
            </div>
          </div>
          {/* SPEAK card */}
          <div className="self-stretch px-6 py-[39px] bg-[#939393] flex flex-col justify-center items-center gap-2.5">
            <span className="text-center text-black text-[32px] font-bold font-['Source_Sans_3']">SPEAK</span>
            <img src={ASSETS.speakImageMobile} alt="Speak" className="w-[249px] h-[249px] object-cover" />
            <div className="py-4 inline-flex justify-center items-center gap-2.5">
              <span className="w-[304px] text-center text-black text-[32px] font-normal font-['Source_Sans_3']">
                Stretch and strengthen your voice with simple, fun exercises<br />
                These techniques enhance vocal clarity, ensuring your voice commands attention
              </span>
            </div>
            <div className="flex flex-col justify-center items-center gap-5">
              <MobilePlaylistButton icon={ASSETS.vocalMobileIcon} label="Vocal Power" />
            </div>
          </div>
          {/* THINK card */}
          <div className="self-stretch px-[71px] py-[39px] bg-[#939393] flex flex-col justify-start items-center gap-[34px]">
            <span className="text-center text-black text-[32px] font-bold font-['Source_Sans_3']">THINK</span>
            <img src={ASSETS.thinkImageMobile} alt="Think" className="w-[249px] h-[249px] object-cover" />
            <span className="w-[304px] text-center text-black text-[32px] font-normal font-['Source_Sans_3']">
              Master your wisdom, character and interactions by cultivating positive thoughts and overcoming limited beliefs
            </span>
            <div className="flex flex-col justify-center items-center gap-5">
              <MobilePlaylistButton icon={ASSETS.modernEtiquetteMobileIcon} label="Modern Etiquette" />
              <MobilePlaylistButton icon={ASSETS.bossOfMeMobileIcon} label="I'm the boss of me" />
              <MobilePlaylistButton icon={ASSETS.innerUMobileIcon} label="Inner U" />
            </div>
          </div>
        </div>
        <div className="w-[368px] text-center text-black text-2xl font-normal" style={{ fontFamily: "Inter, sans-serif" }}>
          Visual Polish, Vocal Power, Personal Strength &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Master Your Authenticity—Start Today!
        </div>
      </section>

      {/* ── About Sharon Section (rebuilt as HTML) ── */}
      <section
        id="about"
        className="w-full relative overflow-hidden hidden md:block"
        style={heroBg}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 80% at 75% 40%, rgba(180,180,190,0.18) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-[1100px] mx-auto px-12 py-16 flex flex-col gap-10">
          {/* Title */}
          <div className="text-center">
            <h2
              className="text-white"
              style={{ fontFamily: "Italianno, cursive", fontSize: "clamp(48px, 4vw, 72px)" }}
            >
              Gray is Gorgeous! Own-it Your Way
            </h2>
            <p className="text-white text-2xl font-bold font-['Source_Sans_3'] mt-2">
              Sharon's Journey to Gray Hair Freedom
            </p>
          </div>

          {/* Bio content */}
          <div className="flex gap-12 items-start">
            {/* Left: Bio text */}
            <div className="flex-1 flex flex-col gap-5">
              <p className="text-white text-xl font-['Source_Sans_3'] leading-relaxed">
                I'm Sharon Danley, a Master Makeup &amp; Hair Artist with over 45 years experience helping empower women to embrace their natural beauty and inner strength.
              </p>
              <p className="text-white text-xl font-['Source_Sans_3'] leading-relaxed">
                I've spent 25 years in the business sector during the "Mad Men" era, 18 years in front of, and 15 years behind, the camera and microphone in Film, TV &amp; Stage. I ran my own casting company, mobile bridal service, and corporate services for business executives. I'm a veteran trainer and seminar leader, and have taught vocal presence, modelling, and acting along the way.
              </p>
              {/* Right: Portrait - shown inline on smaller desktops */}
              <div className="float-right ml-8 mb-4 hidden lg:block">
                <img
                  src={ASSETS.aboutSharonPortrait}
                  alt="Sharon Danley"
                  className="w-[220px] h-[260px] object-cover object-top"
                  style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.4))" }}
                />
              </div>
              <p className="text-white text-xl font-['Source_Sans_3'] leading-relaxed">
                From professional makeovers to accessible techniques, I've help thousands enhance their look and presence with "Simplicity &amp; Style", building confidence through timeless practices.
              </p>
              <p className="text-white text-xl font-['Source_Sans_3'] leading-relaxed">
                My journey hasn't been without challenges—I've overcome significant barriers, immense personal hurdles and extensive loss including my precious children, Andrea &amp; Matthew Main.
              </p>
              <p className="text-white text-xl font-['Source_Sans_3'] leading-relaxed">
                Through these experiences, I've cultivated strategies for mental, spiritual and emotional resilience, focusing on wisdom and positivity that I continue to apply in my daily life, inspiring my work with "Authenticity &amp; Grace".
              </p>
              <p className="text-white text-xl font-['Source_Sans_3'] leading-relaxed">
                The warm "welcome back" from my community recently has reaffirmed my purpose; to share these insights and encourage women to age confidently with "Strength &amp; Grace".
              </p>
              <p className="text-white text-xl font-['Source_Sans_3'] leading-relaxed">
                Through Simply Sharon, I blend beauty, wellness and wisdom to guide you on a meaningful journey of self-discovery and growth. Join me and be part of our growing community.
              </p>
              <div className="mt-4">
                <a
                  href="#"
                  className="text-white text-xl font-bold font-['Source_Sans_3'] underline hover:text-gray-300 transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  Select clients &amp; Testimonials →
                </a>
              </div>
            </div>

            {/* Right: Portrait (large screens) */}
            <div className="flex-shrink-0 hidden lg:block">
              <img
                src={ASSETS.aboutSharonPortrait}
                alt="Sharon Danley"
                className="w-[260px] h-[320px] object-cover object-top"
                style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.4))" }}
              />
            </div>
          </div>

          {/* Gallery Accordion */}
          <div className="mt-4">
            <div className="w-full flex flex-col gap-3">
              <p className="text-center text-white text-2xl font-['Source_Sans_3'] mb-2">
                Sharon's Photo Gallery Links Below
              </p>
              {GALLERY_CATEGORIES.map((cat, idx) => (
                <GalleryAccordionDark key={cat.label} cat={cat} idx={idx} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile About Sharon */}
      <section className="w-full md:hidden">
        <img src={ASSETS.aboutSharonMobile} alt="Meet Sharon" className="w-full h-auto block" />
        {/* Gallery Accordion - Mobile */}
        <div className="w-full px-4 py-6 bg-white">
          <GalleryAccordion />
        </div>
      </section>

      {/* ── Glimpse Behind the Scenes Section ── */}
      <section className="w-full max-w-[1302px] mx-auto pt-[76px] pb-[55px] hidden md:flex flex-col justify-start items-center gap-[42px]">
        <div className="p-2.5 flex flex-col justify-start items-start gap-[5px] overflow-hidden">
          <div className="self-stretch px-[156px] inline-flex justify-center items-center gap-2.5 overflow-hidden">
            <span className="text-center text-black text-8xl font-normal font-['Italianno']">Glimpse Behind the Scenes</span>
          </div>
          <div className="self-stretch px-[42px] py-[13px] inline-flex justify-center items-center gap-2.5 overflow-hidden">
            <span className="text-center text-black text-4xl font-bold font-['Source_Sans_3']">Where Art Transforms</span>
          </div>
        </div>
        <div className="self-stretch flex flex-col justify-start items-center gap-[86px]">
          <div className="w-[1046px] h-[524px] p-2.5 flex flex-col justify-start items-start gap-2.5">
            <img
              src={ASSETS.collageDesktop}
              alt="Behind the Scenes Collage"
              className="self-stretch h-[581px] object-cover cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => window.open(ASSETS.collageDesktop, "_blank")}
            />
          </div>
          <button
            className="p-2.5 inline-flex justify-center items-center gap-2.5"
            onClick={() => window.open(ASSETS.collageDesktop, "_blank")}
          >
            <span className="text-center text-[#4e4e4e] text-[32px] font-normal" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
              Click to Enlarge
            </span>
          </button>
        </div>
      </section>

      {/* Mobile Behind the Scenes */}
      <section className="w-full md:hidden pt-12 pb-6 flex flex-col justify-start items-start gap-[69px]">
        <div className="self-stretch flex flex-col justify-start items-start gap-[21px]">
          <div className="self-stretch flex flex-col justify-center items-center gap-2.5">
            <span className="w-[378px] text-center text-black text-[64px] font-normal font-['Italianno']">
              Glimpse Behind the Scenes
            </span>
          </div>
          <div className="self-stretch inline-flex justify-center items-center gap-2.5">
            <span className="flex-1 text-center text-black text-4xl font-bold font-['Source_Sans_3']">Where Art Transforms</span>
          </div>
        </div>
        <div className="self-stretch flex flex-col justify-start items-center gap-px">
          <div className="self-stretch p-2.5 flex flex-col justify-start items-start gap-2.5">
            <img
              src={ASSETS.collageMobile}
              alt="Behind the Scenes Collage"
              className="self-stretch h-[216px] object-cover cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => window.open(ASSETS.collageMobile, "_blank")}
            />
          </div>
          <button
            className="p-2.5 inline-flex justify-center items-center gap-2.5"
            onClick={() => window.open(ASSETS.collageMobile, "_blank")}
          >
            <span className="text-center text-[#4e4e4e] text-xl font-normal" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
              Click to Enlarge
            </span>
          </button>
        </div>
      </section>

      {/* ── Footer Section (rebuilt as HTML) ── */}
      <footer
        id="contact"
        className="w-full relative overflow-hidden"
        style={heroBg}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 80% at 75% 40%, rgba(180,180,190,0.18) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-[1100px] mx-auto px-8 md:px-16 py-16 flex flex-col md:flex-row gap-12 justify-between items-start">
          {/* Left: Contact info */}
          <div className="flex flex-col gap-6 flex-1">
            <h2
              className="text-white"
              style={{ fontFamily: "Italianno, cursive", fontSize: "clamp(40px, 4vw, 64px)" }}
            >
              Connect with Sharon
            </h2>

            {/* Social icons row */}
            <div className="flex items-center gap-4">
              <a
                href="mailto:info@SimplySharon.ca"
                className="w-10 h-10 rounded-full border border-white/60 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
              <a
                href="https://www.facebook.com/SharonDanleyBeauty"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/60 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.youtube.com/@SimplySharonTips"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/60 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>

            {/* Contact details */}
            <div className="flex flex-col gap-4 text-white font-['Source_Sans_3']">
              <div className="flex gap-4">
                <span className="font-bold text-lg w-24 flex-shrink-0">Email:</span>
                <a href="mailto:info@SimplySharon.ca" className="text-lg hover:text-gray-300 underline transition-colors">
                  info@SimplySharon.ca
                </a>
              </div>
              <div className="flex gap-4">
                <span className="font-bold text-lg w-24 flex-shrink-0">YouTube:</span>
                <a
                  href="https://www.youtube.com/@SimplySharonTips"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg hover:text-gray-300 underline transition-colors"
                >
                  YouTube.com/@SimplySharonTips
                </a>
              </div>
              <div className="flex gap-4">
                <span className="font-bold text-lg w-24 flex-shrink-0">Facebook:</span>
                <div className="flex flex-col gap-2">
                  <div>
                    <span className="text-base text-white/70">Private Group: </span>
                    <a
                      href="https://www.facebook.com/groups/GoinGray.LovinIt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base hover:text-gray-300 underline transition-colors"
                    >
                      Facebook.com/groups/GoinGray.LovinIt
                    </a>
                    <p className="text-sm text-white/70 mt-1">
                      For biological women going gray; please confirm your agreement to the join question.
                    </p>
                  </div>
                  <div>
                    <span className="text-base text-white/70">Public Page: </span>
                    <a
                      href="https://www.facebook.com/SharonDanleyBeauty"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base hover:text-gray-300 underline transition-colors"
                    >
                      Facebook.com/SharonDanleyBeauty
                    </a>
                    <p className="text-sm text-white/70 mt-1">
                      For everyone, including those who've completed their gray hair journey.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-white/60 text-sm font-['Source_Sans_3'] max-w-[600px] mt-4">
              Not monetized, sponsored, or compensated. Shared freely to inspire a{" "}
              <strong className="text-white/80">legacy of giving in honour of my children Andrea &amp; Matthew Main</strong>{" "}
              and to encourage paying it forward in your own way.
            </p>

            {/* Copyright */}
            <p className="text-white/50 text-sm font-['Source_Sans_3']">
              © 2025 Sharon Danley | All images, content and design created by Sharon Danley.
            </p>

            {/* Admin link */}
            <Link href="/admin">
              <span className="text-white/30 text-xs hover:text-white/60 transition-colors cursor-pointer font-['Source_Sans_3']">
                Admin Login
              </span>
            </Link>
          </div>

          {/* Right: Illustrated silhouette (decorative) */}
          <div className="hidden md:flex flex-shrink-0 items-end justify-end self-stretch">
            <div
              className="w-[140px] h-[280px] opacity-60"
              style={{
                background: "linear-gradient(180deg, transparent 0%, rgba(200,200,210,0.3) 100%)",
                borderRadius: "50% 50% 0 0",
                clipPath: "ellipse(50% 60% at 50% 60%)",
              }}
            />
          </div>
        </div>
      </footer>

    </div>
  );
}

// ─── Dark-themed Gallery Accordion (for About section) ───────────────────────
function GalleryAccordionDark({ cat, idx }: { cat: { label: string; items: string[] }; idx: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/30 rounded-lg overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-6 py-4 bg-white/10 hover:bg-white/20 transition-colors text-white"
        onClick={() => setOpen(!open)}
      >
        <span className="text-white text-xl font-bold font-['Source_Sans_3']">{cat.label}</span>
        {open ? <ChevronUp size={20} className="text-white" /> : <ChevronDown size={20} className="text-white" />}
      </button>
      {open && (
        <div className="px-6 py-4 bg-white/5 flex flex-wrap gap-3">
          {cat.items.map((item) => (
            <a
              key={item}
              href="#"
              className="px-4 py-2 bg-white/10 border border-white/30 rounded-full text-sm font-['Source_Sans_3'] text-white hover:bg-white hover:text-black transition-colors"
              onClick={(e) => e.preventDefault()}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
