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
  // Hero section assets (from hero-section Figma export - correct assets)
  heroLogo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/hero-logo-correct_3c19972d.webp",
  heroSharon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/hero-sharon-correct_0a0b4071.webp",
  // Hero (legacy - kept for mobile)
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
  makeBetterGallery: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/make-better-gallery_6a98b124.webp",
  makeBetterDesktop: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/84-446_3212980c.webp",
  makeBetterMobile: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/1-54_8e41af54.webp",
  rlmbGallery: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/rlmb-gallery_ec0a1627.webp",
  rlmbBefore: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/rlmb-before_8c536842.webp",
  rlmbBusiness: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/rlmb-business_676435c9.webp",
  rlmbEvening: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/rlmb-evening_cf80d24c.webp",
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
      {/* ── Desktop Navbar ── */}
      {/* Outer wrapper: full width, 108px tall, clips overflow, centers the scaled inner bar */}
      <div
        className="w-full hidden md:block relative z-30"
        style={{ height: "108px", overflow: "visible" }}
      >
        {/* Inner bar: fixed at 1920px wide (Figma design width), scaled down to fit viewport */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "1920px",
            height: "108px",
            transform: "scale(min(1, calc(100vw / 1920)))",
            transformOrigin: "top left",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: "60px",
            paddingRight: "60px",
          }}
        >
          {/* brand-logo: flex row, gap 15px, 336×108px — fixed left */}
          <Link href="/" className="flex items-center no-underline flex-shrink-0" style={{ gap: "15px", height: "108px" }}>
            {/* site-logo: 75×108px */}
            <img
              src={ASSETS.heroLogo}
              alt="Simply Sharon Logo"
              style={{ width: "75px", height: "108px", objectFit: "contain" }}
            />
            {/* site-name: Italianno 64px/80px */}
            <span
              style={{
                fontFamily: "Italianno, cursive",
                fontWeight: 400,
                fontSize: "64px",
                lineHeight: "80px",
                color: "#FFFFFF",
                whiteSpace: "nowrap",
              }}
            >
              SimplySharon
            </span>
          </Link>

          {/* navlink-group: centered in remaining space — flex:1, justify-content:center, gap 26px */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "26px",
            }}
          >
            {NAV_ITEMS.map((item) => (
              <Link key={item.label} href={item.href}>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: "40px",
                    lineHeight: "48px",
                    color: "#FFFFFF",
                    filter: "drop-shadow(0px 4px 4px rgba(0,0,0,0.25))",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                  }}
                  className="hover:opacity-80 transition-opacity"
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile Navbar ── */}
      <nav
        className="w-full z-30 flex md:hidden items-center justify-between px-5"
        style={{ height: "64px", background: "transparent" }}
      >
        <Link href="/" className="flex items-center no-underline" style={{ gap: "10px" }}>
          <img src={ASSETS.heroLogo} alt="Simply Sharon Logo" style={{ width: "40px", height: "58px", objectFit: "contain" }} />
          <span style={{ fontFamily: "Italianno, cursive", fontSize: "36px", lineHeight: "45px", color: "#FFFFFF" }}>
            SimplySharon
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-10 h-10 flex items-center justify-center text-white"
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
// Figma: background: url(Darker-right-1.jpg) — dark charcoal with diagonal light ray from upper-right
// The Figma shows a dark gray background (#2e2e36 approx) with a bright diagonal streak from top-right
const heroBg = {
  background: "#2e2e38",
};

// Diagonal light ray overlay - matches the Figma's Darker-right-1.jpg light streak
const heroRayOverlay = {
  background: "linear-gradient(145deg, transparent 20%, rgba(160,160,170,0.22) 40%, rgba(200,200,210,0.28) 50%, rgba(160,160,170,0.18) 60%, transparent 75%)",
  position: "absolute" as const,
  inset: 0,
  pointerEvents: "none" as const,
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="w-full bg-white flex flex-col items-center overflow-hidden">

      {/* ── Navbar + Hero Section (dark bg) ── */}
      {/* hero-section: flex col, center items, padding 49px top / 109px bottom, gap 60px */}
      <section
        id="hero"
        className="w-full relative overflow-hidden flex-col items-center"
        style={{
          ...heroBg,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "49px",
          paddingBottom: "109px",
          gap: "60px",
        }}
      >
        {/* Diagonal light ray overlay matching Figma's Darker-right-1.jpg */}
        <div style={heroRayOverlay} />

        {/* Navbar */}
        <Navbar />

        {/* ── Desktop Hero Content (exact Figma CSS) ── */}
        {/* hero-content: flex row, gap 64px, 1488px wide, 791px tall */}
        <div
          className="hidden md:flex relative z-10 items-center"
          style={{
            width: "1488px",
            maxWidth: "calc(100vw - 40px)",
            gap: "64px",
          }}
        >
          {/* hero-text-group: flex col, gap 20px, 1039×791px */}
          <div
            className="flex flex-col items-center"
            style={{ gap: "20px", flex: "0 0 auto" }}
          >
            {/* heading-title: Italianno 140px/175px */}
            <div style={{ padding: "10px" }}>
              <h1
                style={{
                  fontFamily: "Italianno, cursive",
                  fontWeight: 400,
                  fontSize: "140px",
                  lineHeight: "175px",
                  color: "#FFFFFF",
                  margin: 0,
                }}
              >
                Simlpy Sharon.ca
              </h1>
            </div>

            {/* heading-subtitle: Italianno 90px/112px */}
            <div style={{ padding: "0 10px" }}>
              <h2
                style={{
                  fontFamily: "Italianno, cursive",
                  fontWeight: 400,
                  fontSize: "90px",
                  lineHeight: "112px",
                  color: "#FFFFFF",
                  margin: 0,
                  whiteSpace: "nowrap",
                }}
              >
                Healthy Beauty &amp; Confident Aging
              </h2>
            </div>

            {/* Body-Text-Group: Source Sans Pro 60px/75px, centered */}
            <div style={{ padding: "10px" }}>
              <p
                style={{
                  fontFamily: "'Source Sans Pro', 'Source Sans 3', sans-serif",
                  fontWeight: 400,
                  fontSize: "60px",
                  lineHeight: "75px",
                  color: "#FFFFFF",
                  textAlign: "center",
                  margin: 0,
                  width: "1019px",
                  maxWidth: "100%",
                }}
              >
                Achieve Radiant Beauty, Glowing Health<br />
                Meaningful Aging<br />
                with Simplicity, Strength, Style &amp; Grace
              </p>
            </div>

            {/* Call-to-Action: Italianno 90px/112px, first line margin -18px */}
            <div className="flex flex-col items-center" style={{ alignSelf: "stretch" }}>
              <p
                style={{
                  fontFamily: "Italianno, cursive",
                  fontWeight: 400,
                  fontSize: "90px",
                  lineHeight: "112px",
                  color: "#FFFFFF",
                  textAlign: "center",
                  margin: "-18px 0 0 0",
                  alignSelf: "stretch",
                }}
              >
                Design Your Life with Purpose
              </p>
              <p
                style={{
                  fontFamily: "Italianno, cursive",
                  fontWeight: 400,
                  fontSize: "90px",
                  lineHeight: "112px",
                  color: "#FFFFFF",
                  textAlign: "center",
                  margin: 0,
                  alignSelf: "stretch",
                }}
              >
                for a Compelling Destiny
              </p>
            </div>
          </div>

          {/* hero-image: 453×586px, Sharon photo (transparent bg PNG/WebP) */}
          <div style={{ padding: "10px", flexShrink: 0 }}>
            <img
              src={ASSETS.heroSharon}
              alt="Sharon Danley"
              style={{
                width: "453px",
                height: "585.78px",
                objectFit: "contain",
                objectPosition: "top center",
              }}
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
      {/* Desktop Blogcast — 1920px wide, scales like navbar */}
      <div className="w-full hidden md:block relative" style={{ height: "1286px" }}>
        <section
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "1920px",
            height: "1286px",
            transform: "scale(min(1, calc(100vw / 1920)))",
            transformOrigin: "top left",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: "95px",
            gap: "23px",
          }}
        >
          {/* section-header: 938×231px, flex col, gap 5px, padding 10px */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "10px",
              gap: "5px",
              width: "938px",
              height: "231px",
            }}
          >
            {/* blogcast-title: 918×120px, px 156px, flex row center */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: "0px 156px",
                gap: "10px",
                width: "918px",
                height: "120px",
              }}
            >
              <span
                style={{
                  fontFamily: "Italianno, cursive",
                  fontWeight: 400,
                  fontSize: "96px",
                  lineHeight: "120px",
                  textAlign: "center",
                  color: "#000000",
                }}
              >
                Blogcast
              </span>
              <img src={ASSETS.newTag} alt="New" style={{ width: "80px", height: "80px" }} />
            </div>
            {/* section-subtitle: 918×86px, px 42px py 13px */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: "13px 42px",
                gap: "10px",
                width: "918px",
                height: "86px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Source Sans Pro', 'Source Sans 3', sans-serif",
                  fontWeight: 400,
                  fontSize: "48px",
                  lineHeight: "60px",
                  textAlign: "center",
                  color: "#000000",
                  width: "834px",
                  height: "60px",
                }}
              >
                Wisdom You Can Read, Listen, or Watch
              </span>
            </div>
          </div>

          {/* intro-text: 1162×120px, px 63px py 10px */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px 63px",
              gap: "15px",
              width: "1162px",
              height: "120px",
            }}
          >
            <span
              style={{
                fontFamily: "'Source Sans Pro', 'Source Sans 3', sans-serif",
                fontWeight: 400,
                fontSize: "40px",
                lineHeight: "50px",
                textAlign: "center",
                color: "#000000",
                width: "1036px",
                height: "100px",
              }}
            >
              Thoughtful explorations of beauty, wellness, and wisdom for confident aging — in the format that works for you
            </span>
          </div>

          {/* blogcast-showcase: 1866×794px, bg #D9D9D9, px 19px py 48px, gap 25px */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "48px 19px",
              gap: "25px",
              width: "1866px",
              height: "794px",
              background: "#D9D9D9",
            }}
          >
            {/* blogcast-features-info: 1167×698px, flex col, gap 51px */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "0px",
                gap: "51px",
                width: "1167px",
                height: "698px",
              }}
            >
              {/* content-formats-blocks: 1167×350px, flex row, gap 33px */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "0px",
                  gap: "33px",
                  width: "1167px",
                  height: "350px",
                }}
              >
                {/* read-block: 356×350px */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "29px 0px",
                    gap: "33px",
                    width: "356px",
                    height: "350px",
                  }}
                >
                  <img src={ASSETS.readIcon} alt="Read" style={{ width: "80px", height: "80px" }} />
                  <span style={{ fontFamily: "'Source Sans Pro', 'Source Sans 3', sans-serif", fontWeight: 700, fontSize: "40px", lineHeight: "50px", textAlign: "center", color: "#000000" }}>Read</span>
                  <span style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: "28px", lineHeight: "32px", textAlign: "center", color: "#000000", width: "356px", height: "96px" }}>
                    Deep dives into beauty myths, practical advice, and inspiring stories
                  </span>
                </div>
                {/* listen-block: 366×350px */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "29px 0px",
                    gap: "33px",
                    width: "366px",
                    height: "350px",
                  }}
                >
                  <img src={ASSETS.listenIcon} alt="Listen" style={{ width: "80px", height: "80px" }} />
                  <span style={{ fontFamily: "'Source Sans Pro', 'Source Sans 3', sans-serif", fontWeight: 700, fontSize: "40px", lineHeight: "50px", textAlign: "center", color: "#000000" }}>Listen</span>
                  <span style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: "28px", lineHeight: "32px", textAlign: "center", color: "#000000", width: "354px", height: "96px", padding: "0px 6px" }}>
                    Empowering conversations on personal growth, wisdom, and holistic health
                  </span>
                </div>
                {/* watch-block: 330×350px */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "29px 0px",
                    gap: "33px",
                    width: "330px",
                    height: "350px",
                  }}
                >
                  <img src={ASSETS.watchIcon} alt="Watch" style={{ width: "80px", height: "80px" }} />
                  <span style={{ fontFamily: "'Source Sans Pro', 'Source Sans 3', sans-serif", fontWeight: 700, fontSize: "40px", lineHeight: "50px", textAlign: "center", color: "#000000" }}>Watch</span>
                  <span style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: "28px", lineHeight: "32px", textAlign: "center", color: "#000000", width: "306px", height: "96px", padding: "0px 12px" }}>
                    Visual tutorials and real talk about living with strength and grace
                  </span>
                </div>
              </div>

              {/* social-proof: 891×140px, px 54px py 20px */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "20px 54px",
                  gap: "10px",
                  width: "891px",
                  height: "140px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Source Sans Pro', 'Source Sans 3', sans-serif",
                    fontWeight: 400,
                    fontSize: "40px",
                    lineHeight: "50px",
                    textAlign: "center",
                    color: "#000000",
                    width: "783px",
                    height: "100px",
                  }}
                >
                  Join women who are embracing their authentic beauty and living with purpose
                </span>
              </div>

              {/* cta-link: 510×106px, px 20px py 23px */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "23px 20px",
                  gap: "10px",
                  width: "510px",
                  height: "106px",
                }}
              >
                <Link href="/blogcast">
                  <span
                    style={{
                      fontFamily: "'Source Sans Pro', 'Source Sans 3', sans-serif",
                      fontWeight: 700,
                      fontSize: "48px",
                      lineHeight: "60px",
                      textAlign: "center",
                      color: "#000000",
                      width: "470px",
                      height: "60px",
                      cursor: "pointer",
                    }}
                    className="hover:underline"
                  >
                    Explore the Blogcast →
                  </span>
                </Link>
              </div>
            </div>

            {/* author image: 608×602px */}
            <img
              src={ASSETS.blogcastAuthor}
              alt="Sharon Danley"
              style={{ width: "608px", height: "602px", objectFit: "cover", flexShrink: 0 }}
            />
          </div>
        </section>
      </div>

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
      {/* Desktop Make-Betters — 1920px wide, scales like navbar */}
      <div id="make-betters" className="w-full hidden md:block relative" style={{ height: "1554px" }}>
        <section
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "1920px",
            height: "1554px",
            transform: "scale(min(1, calc(100vw / 1920)))",
            transformOrigin: "top left",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "53px",
            paddingBottom: "91px",
            paddingLeft: "42px",
            gap: "89px",
            background: "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 40%, #3a3535 70%, #4a3f3f 100%)",
          }}
        >
          {/* section-header: 1305×190px */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "10px",
              width: "1305px",
              height: "190px",
            }}
          >
            {/* blogcast-title: 1285×120px, px 156px */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: "0px 156px",
                gap: "10px",
                width: "1285px",
                height: "120px",
              }}
            >
              <span
                style={{
                  fontFamily: "Italianno, cursive",
                  fontWeight: 400,
                  fontSize: "96px",
                  lineHeight: "120px",
                  textAlign: "center",
                  color: "#FFFFFF",
                  width: "973px",
                }}
              >
                Pay-Forward Digital Make-Betters
              </span>
            </div>
            {/* section-subtitle: 1285×71px, px 42px py 13px */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: "13px 42px",
                gap: "10px",
                width: "1285px",
                height: "71px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Source Sans Pro', 'Source Sans 3', sans-serif",
                  fontWeight: 400,
                  fontSize: "48px",
                  lineHeight: "60px",
                  textAlign: "center",
                  color: "#FFFFFF",
                  width: "1201px",
                }}
              >
                Enhance Your Natural Beauty
              </span>
            </div>
          </div>

          {/* make-better-showcase: 1920×1131px, flex row, gap 107px */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: "0px",
              gap: "107px",
              width: "1920px",
              height: "1131px",
            }}
          >
            {/* section-texts: 669×1059px, flex col, gap 45px */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "0px",
                gap: "45px",
                width: "669px",
                height: "1059px",
              }}
            >
              {/* narrative-text-block: 669×799px, p 10px */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  padding: "10px",
                  gap: "10px",
                  width: "669px",
                  height: "799px",
                }}
              >
                <p
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: 400,
                    fontSize: "36px",
                    lineHeight: "41px",
                    color: "#FFFFFF",
                    width: "649px",
                    margin: 0,
                  }}
                >
                  Make-Betters “enhance” your natural look simply and realistically through expert instruction from a Master Artist, rather than unrealistic “Make-Overs”.
                  <br /><br />
                  With practice, simple products and tools, and personal video instruction, you can easily replicate your refreshed look.
                  <br /><br />
                  Instead of a fee, simply “Pay-Forward” your time, talent, or treasure, in honour of my Children, Andrea &amp; Matthew Main, to a person or group in need.
                  <br /><br />
                  Send your digital photo to Sharon for a “Photoshop Spa” treatment, a “how-to” YouTube video, and a digital copy to use with credit — free with your “Pay-Forward” promise.
                </p>
              </div>

              {/* make-better-links: 553×179px, py 28px, gap 33px */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  padding: "28px 0px",
                  gap: "33px",
                  width: "553px",
                  height: "179px",
                }}
              >
                <Link href="/make-betters">
                  <span
                    style={{
                      fontFamily: "'Source Sans Pro', 'Source Sans 3', sans-serif",
                      fontWeight: 700,
                      fontSize: "36px",
                      lineHeight: "45px",
                      textAlign: "center",
                      textDecoration: "underline",
                      color: "#FFFFFF",
                      width: "553px",
                      display: "block",
                      cursor: "pointer",
                    }}
                  >
                    Here’s how to submit your photo →
                  </span>
                </Link>
                <Link href="/make-betters">
                  <span
                    style={{
                      fontFamily: "'Source Sans Pro', 'Source Sans 3', sans-serif",
                      fontWeight: 700,
                      fontSize: "36px",
                      lineHeight: "45px",
                      textAlign: "center",
                      textDecoration: "underline",
                      color: "#FFFFFF",
                      width: "553px",
                      display: "block",
                      cursor: "pointer",
                    }}
                  >
                    Digital &amp; Live Video Make-Betters →
                  </span>
                </Link>
              </div>
            </div>

            {/* make-better-gallery: 621×1140px, px 10px py 8px */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "8px 10px",
                gap: "10px",
                width: "621px",
                height: "1140px",
              }}
            >
              <img
                src={ASSETS.makeBetterGallery}
                alt="Make-Better before and after gallery"
                style={{
                  width: "613.04px",
                  alignSelf: "stretch",
                  objectFit: "cover",
                  flexShrink: 0,
                }}
              />
            </div>
          </div>
        </section>
      </div>
      {/* Mobile Make-Betters */}
      <section id="make-betters-mobile" className="w-full md:hidden">
        <img src={ASSETS.makeBetterMobile} alt="Pay-Forward Digital Make-Betters" className="w-full h-auto block" />
      </section>

      {/* ── Real Life Make-Betters Section ── */}
      {/* Desktop: 1920px wide, scales like other sections */}
      <div className="w-full hidden md:block relative" style={{ height: "2381px" }}>
        <section
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "1920px",
            height: "2381px",
            transform: "scale(min(1, calc(100vw / 1920)))",
            transformOrigin: "top left",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "47px 202px",
            background: "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 40%, #3a3535 70%, #4a3f3f 100%)",
          }}
        >
          {/* section-header: 1516×140px */}
          <div
            style={{
              alignSelf: "stretch",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              overflow: "hidden",
            }}
          >
            {/* blogcast-title: 1496×120px, px 156px */}
            <div
              style={{
                alignSelf: "stretch",
                padding: "0px 156px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  fontFamily: "Italianno, cursive",
                  fontWeight: 400,
                  fontSize: "96px",
                  lineHeight: "120px",
                  textAlign: "center",
                  color: "#FFFFFF",
                  width: "651px",
                }}
              >
                Real Life Make-Betters
              </span>
            </div>
          </div>

          {/* image-gallery: 1516×1092px */}
          <div
            style={{
              alignSelf: "stretch",
              height: "1092px",
              padding: "10px 0px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "10px",
            }}
          >
            <img
              src={ASSETS.rlmbGallery}
              alt="Real Life Make-Betters gallery"
              style={{
                alignSelf: "stretch",
                height: "1044.47px",
                objectFit: "cover",
              }}
            />
          </div>

          {/* testimonial: 1269×267px, flex col, gap 37px, items-end */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-end",
              gap: "37px",
              width: "1269px",
              height: "267px",
            }}
          >
            {/* quote: 1269×138px */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                width: "1269px",
                height: "138px",
              }}
            >
              <p
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "40px",
                  lineHeight: "46px",
                  textAlign: "center",
                  color: "#FFFFFF",
                  width: "1269px",
                  margin: 0,
                }}
              >
                “I’ve had my makeup professionally done for years — and by some very good artists, but you are definitely the best I’ve ever experienced. You really get it. Thank you so much Sharon.”
              </p>
            </div>
            {/* quote-citation: 534×92px, justify-end */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                gap: "10px",
                width: "534px",
                height: "92px",
              }}
            >
              <p
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 400,
                  fontSize: "40px",
                  lineHeight: "46px",
                  textAlign: "center",
                  color: "#FFFFFF",
                  width: "534px",
                  margin: 0,
                }}
              >
                Carol Off, Journalist, Author<br />CBC Co-host, “As it Happens”
              </p>
            </div>
          </div>

          {/* testimonial-highlight: 1384×788px, flex row, gap 141px, pt 74px */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "74px",
              gap: "141px",
              width: "1384px",
              height: "788px",
            }}
          >
            {/* image-showcase: Before */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "75px",
              }}
            >
              <img
                src={ASSETS.rlmbBefore}
                alt="Before Make-Better"
                style={{ alignSelf: "stretch", height: "540.08px", objectFit: "cover" }}
              />
              <span
                style={{
                  alignSelf: "stretch",
                  textAlign: "center",
                  color: "#FFFFFF",
                  fontSize: "48px",
                  lineHeight: "60px",
                  fontFamily: "'Source Sans Pro', 'Source Sans 3', sans-serif",
                  fontWeight: 400,
                }}
              >
                Before
              </span>
            </div>
            {/* image-showcase: Business */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "75px",
              }}
            >
              <img
                src={ASSETS.rlmbBusiness}
                alt="Business Make-Better"
                style={{ alignSelf: "stretch", height: "541.73px", objectFit: "cover" }}
              />
              <span
                style={{
                  alignSelf: "stretch",
                  textAlign: "center",
                  color: "#FFFFFF",
                  fontSize: "48px",
                  lineHeight: "60px",
                  fontFamily: "'Source Sans Pro', 'Source Sans 3', sans-serif",
                  fontWeight: 400,
                }}
              >
                Business
              </span>
            </div>
            {/* image-showcase: Evening */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "75px",
              }}
            >
              <img
                src={ASSETS.rlmbEvening}
                alt="Evening Make-Better"
                style={{ alignSelf: "stretch", height: "526.61px", objectFit: "cover" }}
              />
              <span
                style={{
                  alignSelf: "stretch",
                  textAlign: "center",
                  color: "#FFFFFF",
                  fontSize: "48px",
                  lineHeight: "60px",
                  fontFamily: "'Source Sans Pro', 'Source Sans 3', sans-serif",
                  fontWeight: 400,
                }}
              >
                Evening
              </span>
            </div>
          </div>
        </section>
      </div>
      {/* Mobile Real-Life Make-Betters */}
      <section className="w-full md:hidden">
        <img src={ASSETS.realLifeMakeBettersMobile} alt="Real Life Make-Betters" className="w-full h-auto block" />
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
