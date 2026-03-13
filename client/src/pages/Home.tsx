/**
 * Simply Sharon - Home Page
 * Design: Elegant beauty/wellness brand for mature women
 * Fonts: Italianno (script headings), Source Sans 3 (body/buttons), Helvetica (paragraphs)
 * Colors: Dark charcoal/gray backgrounds, white text on dark, black text on white
 * Layout: Full-width sections, responsive desktop-to-mobile
 * Desktop: 1920px wide sections, side-by-side layouts
 * Mobile: Stacked cards, gray bg showcase cards, smaller typography
 */

import { Link } from "wouter";

// CDN asset URLs
const ASSETS = {
  // Hero images: desktop vs mobile
  heroDesktop: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/75-344_8b8c1a79.webp",
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
  // Full-section images
  makeBetterDesktop: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/84-446_3212980c.webp",
  makeBetterMobile: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/1-54_8e41af54.webp",
  realLifeMakeBettersDesktop: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/92-3_2de42173.webp",
  realLifeMakeBettersMobile: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/1-72_0756d509.webp",
  grayIsGorgeousDesktop: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/93-53_88b9047e.webp",
  grayIsGorgeousMobile: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/1-91_08f34d98.webp",
  aboutSharonDesktop: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/98-315_ef8a8a45.webp",
  aboutSharonMobile: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/1-201_7973673f.webp",
  collageDesktop: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/106-400_fadc236a.webp",
  collageMobile: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/1-253_1c63c9e9.webp",
  footerDesktop: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/106-415_f27e6d8c.webp",
  footerMobile: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/1-256_115e40da.webp",
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

// Desktop playlist button (large, 53px icon, text-[32px])
function DesktopPlaylistButton({ icon, label }: { icon: string; label: string }) {
  return (
    <button className="px-[23px] py-4 rounded-[98px] outline outline-[3px] outline-offset-[-3px] outline-black flex justify-start items-center gap-2.5 hover:bg-black hover:text-white transition-colors group">
      <img src={icon} alt="" className="w-[53px] h-[53px] flex-shrink-0" />
      <span className="text-black text-[32px] font-bold font-['Source_Sans_3'] group-hover:text-white whitespace-nowrap">{label}</span>
    </button>
  );
}

// Mobile playlist button (small, 25px icon, text-2xl)
function MobilePlaylistButton({ icon, label }: { icon: string; label: string }) {
  return (
    <button className="px-2 py-1 rounded-[18px] outline outline-2 outline-offset-[-2px] outline-black inline-flex justify-start items-center gap-2 hover:bg-black hover:text-white transition-colors group">
      <img src={icon} alt="" className="w-[25px] h-[25px] flex-shrink-0" />
      <span className="text-black text-2xl font-bold font-['Source_Sans_3'] group-hover:text-white whitespace-nowrap">{label}</span>
    </button>
  );
}

export default function Home() {
  return (
    <div className="w-full bg-white flex flex-col items-center overflow-hidden">

      {/* ── Hero Section ── */}
      <section className="w-full">
        {/* Desktop hero */}
        <img
          src={ASSETS.heroDesktop}
          alt="Simply Sharon - Healthy Beauty & Confident Aging"
          className="w-full h-auto block hidden md:block"
        />
        {/* Mobile hero */}
        <img
          src={ASSETS.heroMobile}
          alt="Simply Sharon - Healthy Beauty & Confident Aging"
          className="w-full h-auto block md:hidden"
        />
      </section>

      {/* ── Blogcast Section ── */}
      {/* Desktop Blogcast */}
      <section className="w-full pl-[42px] pb-[95px] hidden md:flex flex-col justify-center items-center gap-[23px]">
        {/* Section Header */}
        <div className="p-2.5 flex flex-col justify-start items-start gap-[5px] overflow-hidden">
          <div className="self-stretch px-[156px] inline-flex justify-center items-center gap-2.5 overflow-hidden">
            <span className="text-center text-black text-8xl font-normal font-['Italianno']">Blogcast</span>
            <img src={ASSETS.newTag} alt="New" className="w-20 h-20" />
          </div>
          <div className="self-stretch px-[42px] py-[13px] inline-flex justify-center items-center gap-2.5 overflow-hidden">
            <span className="text-center text-black text-4xl font-bold font-['Source_Sans_3']">Wisdom You Can Read, Listen, or Watch</span>
          </div>
        </div>
        {/* Intro Text */}
        <div className="px-[63px] py-2.5 inline-flex justify-center items-center gap-[15px] overflow-hidden">
          <span className="w-[1036px] text-center text-black text-[40px] font-normal font-['Source_Sans_3']">Thoughtful explorations of beauty, wellness, and wisdom for confident aging — in the format that works for you</span>
        </div>
        {/* Showcase */}
        <div className="px-[19px] py-12 bg-[#d9d9d9] inline-flex justify-start items-center gap-[25px]">
          <div className="w-[1167px] inline-flex flex-col justify-start items-center gap-[51px]">
            {/* Read/Listen/Watch blocks */}
            <div className="self-stretch inline-flex justify-center items-center gap-[33px]">
              <div className="w-[356px] self-stretch py-[29px] inline-flex flex-col justify-start items-center gap-[33px]">
                <img src={ASSETS.readIcon} alt="Read" className="w-20 h-20" />
                <span className="text-center text-black text-[40px] font-bold font-['Source_Sans_3']">Read</span>
                <span className="flex-1 text-center text-black text-[28px] font-normal" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Deep dives into beauty myths, practical advice, and inspiring stories</span>
              </div>
              <div className="w-[366px] self-stretch py-[29px] inline-flex flex-col justify-start items-center gap-[33px]">
                <img src={ASSETS.listenIcon} alt="Listen" className="w-20 h-20" />
                <span className="text-center text-black text-[40px] font-bold font-['Source_Sans_3']">Listen</span>
                <span className="flex-1 text-center text-black text-[28px] font-normal" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Empowering conversations on personal growth, wisdom, and holistic health</span>
              </div>
              <div className="w-[330px] self-stretch py-[29px] inline-flex flex-col justify-start items-center gap-[33px]">
                <img src={ASSETS.watchIcon} alt="Watch" className="w-20 h-20" />
                <span className="text-center text-black text-[40px] font-bold font-['Source_Sans_3']">Watch</span>
                <span className="flex-1 text-center text-black text-[28px] font-normal" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Visual tutorials and real talk about living with strength and grace</span>
              </div>
            </div>
            {/* Social Proof */}
            <div className="px-[54px] py-5 inline-flex justify-center items-center gap-2.5 overflow-hidden">
              <span className="text-center text-black text-[32px] font-bold font-['Source_Sans_3']">Join women who are embracing their authentic beauty and living with purpose</span>
            </div>
            {/* CTA */}
            <div className="px-5 py-[23px] inline-flex justify-center items-center gap-2.5 overflow-hidden">
              <Link href="/blogcast">
                <span className="text-center text-black text-5xl font-bold font-['Source_Sans_3'] cursor-pointer hover:underline">Explore the Blogcast →</span>
              </Link>
            </div>
          </div>
          <img src={ASSETS.blogcastAuthor} alt="Sharon Danley" className="w-[482px] h-[496px] object-cover" />
        </div>
      </section>

      {/* Mobile Blogcast */}
      <section className="w-full py-2.5 md:hidden flex flex-col justify-start items-start gap-2.5">
        {/* Header */}
        <div className="self-stretch p-2.5 flex flex-col justify-start items-start gap-[5px] overflow-hidden">
          <div className="self-stretch px-[156px] inline-flex justify-center items-center gap-2.5 overflow-hidden">
            <span className="text-center text-black text-[64px] font-normal font-['Italianno']">Blogcast</span>
          </div>
          <div className="self-stretch h-[153px] px-[42px] py-[13px] inline-flex justify-center items-center gap-2.5 overflow-hidden">
            <span className="text-center text-black text-4xl font-bold font-['Source_Sans_3']">Wisdom You Can Read, Listen, or Watch</span>
          </div>
        </div>
        {/* Media grid */}
        <div className="w-full px-[13px] py-2.5 bg-white inline-flex justify-start items-start gap-[25px] overflow-hidden">
          <img src={ASSETS.blogcastMobileLeft} alt="" className="w-[159px] h-[172px] object-cover" />
          <img src={ASSETS.blogcastMobileRight} alt="" className="w-[180px] h-[172px] object-cover" />
        </div>
        {/* Content card */}
        <div className="w-full px-[19px] py-2.5 bg-white flex flex-col justify-start items-start gap-2.5 overflow-hidden">
          <div className="self-stretch px-[37px] py-2.5 inline-flex justify-center items-center gap-2.5 overflow-hidden">
            <span className="text-center text-black text-[32px] font-normal font-['Source_Sans_3']">Thoughtful explorations of beauty, wellness, and wisdom for confident aging — in the format that works for you</span>
          </div>
          {/* Feature list */}
          <div className="self-stretch py-2.5 bg-[#d9d9d9] flex flex-col justify-start items-start gap-[33px] overflow-hidden">
            <div className="self-stretch py-[29px] flex flex-col justify-start items-center gap-[33px]">
              <img src={ASSETS.readIcon} alt="Read" className="w-20 h-20" />
              <span className="w-20 text-center text-black text-4xl font-bold font-['Source_Sans_3']">Read</span>
              <span className="flex-1 text-center text-black text-[32px] font-normal" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Deep dives into beauty myths, practical advice, and inspiring stories</span>
            </div>
            <div className="self-stretch py-[29px] flex flex-col justify-start items-center gap-[33px]">
              <img src={ASSETS.listenIcon} alt="Listen" className="w-20 h-20" />
              <span className="self-stretch text-center text-black text-4xl font-bold font-['Source_Sans_3']">Listen</span>
              <span className="flex-1 text-center text-black text-[32px] font-normal" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Empowering conversations on personal growth, wisdom, and holistic health</span>
            </div>
            <div className="self-stretch py-[29px] flex flex-col justify-start items-center gap-[33px]">
              <img src={ASSETS.watchIcon} alt="Watch" className="w-20 h-20" />
              <span className="self-stretch text-center text-black text-4xl font-bold font-['Source_Sans_3']">Watch</span>
              <span className="flex-1 text-center text-black text-[32px] font-normal" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Visual tutorials and real talk about living with strength and grace</span>
            </div>
          </div>
          <div className="self-stretch px-[54px] py-5 inline-flex justify-center items-center gap-2.5 overflow-hidden">
            <span className="w-[323px] text-center text-black text-2xl font-bold font-['Source_Sans_3']">Join women who are embracing their authentic beauty and living with purpose</span>
          </div>
          <div className="self-stretch px-5 py-[23px] bg-white inline-flex justify-center items-center gap-2.5 overflow-hidden">
            <Link href="/blogcast">
              <span className="flex-1 text-center text-black text-2xl font-bold font-['Source_Sans_3'] cursor-pointer hover:underline">Explore the Blogcast →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Pay-Forward Digital Make-Betters Section ── */}
      <section className="w-full">
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
      <section className="w-full px-[109px] py-[60px] hidden md:flex flex-col justify-start items-start gap-[51px] bg-white">
        {/* Section Header */}
        <div className="self-stretch p-2.5 flex flex-col justify-start items-start gap-[5px] overflow-hidden">
          <div className="self-stretch px-[156px] inline-flex justify-center items-center gap-2.5 overflow-hidden">
            <span className="text-center text-black text-8xl font-normal font-['Italianno']">Enjoy Positive LAST-ing Impressions</span>
          </div>
          <div className="self-stretch px-[42px] py-[13px] inline-flex justify-center items-center gap-2.5 overflow-hidden">
            <span className="text-center text-black text-4xl font-bold font-['Source_Sans_3']">Look, Act, Speak, Think - Your Best</span>
          </div>
        </div>

        {/* LOOK */}
        <div className="self-stretch min-h-[456px] pr-10 flex justify-start items-center gap-[95px]">
          <div className="p-2.5 outline outline-1 outline-offset-[-1px] outline-black flex justify-start items-center gap-2.5 flex-shrink-0">
            <img src={ASSETS.lookImage} alt="Look" className="w-[311px] h-[311px] object-cover" />
          </div>
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-[33px]">
            <div className="self-stretch p-2.5 inline-flex justify-center items-center gap-2.5">
              <span className="flex-1 text-black text-[32px] font-normal font-['Source_Sans_3']">LOOK – Embrace simple techniques that enhance your natural beauty, hairstyles that frame your face and suit your body type, and wardrobe wisdom with timeless pieces that work for your body frame, preferences and lifestyle. Check these Playlists.</span>
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
              <span className="flex-1 text-black text-[32px] font-normal" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>ACT – Move and interact with confident posture, purposeful body language and facial expression to polish strong, flexible and striking presentation skills that shine in every situation, ensuring your message resonates with any audience.</span>
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
              <span className="flex-1 text-black text-[32px] font-normal" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>SPEAK – Stretch and strengthen your voice with simple, fun exercises to keep it limber and captivating with "Strength & Style" for business, video chats, storytelling or public speaking. These techniques enhance vocal clarity, ensuring your voice commands attention.</span>
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
              <span className="flex-1 text-black text-[32px] font-normal" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>THINK – Master your wisdom, character and interactions by cultivating positive thoughts and overcoming limited beliefs to empower your daily life. You are what you focus on, so consistently practicing emotional and spiritual fitness, creates a powerful present and compelling future.</span>
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
        {/* Header */}
        <div className="self-stretch flex flex-col justify-start items-start gap-[21px]">
          <div className="self-stretch flex flex-col justify-center items-center gap-2.5">
            <span className="w-[378px] text-center text-black text-[64px] font-normal font-['Italianno']">Enjoy Positive LAST-ing Impressions</span>
          </div>
          <div className="self-stretch inline-flex justify-center items-center gap-2.5">
            <span className="flex-1 text-center text-black text-4xl font-bold font-['Source_Sans_3']">Look, Act, Speak, Think - Your Best</span>
          </div>
        </div>

        {/* Showcase Cards */}
        <div className="self-stretch px-[19px] flex flex-col justify-start items-start gap-5">
          {/* LOOK card */}
          <div className="self-stretch px-6 py-[39px] bg-[#939393] flex flex-col justify-start items-center gap-[34px]">
            <span className="text-center text-black text-[32px] font-bold font-['Source_Sans_3']">LOOK</span>
            <img src={ASSETS.lookImageMobile} alt="Look" className="w-[251px] h-[251px] object-cover" />
            <span className="w-[304px] text-center text-black text-[27px] font-normal font-['Source_Sans_3']">Embrace simple techniques that enhance your natural beauty. Check these Playlists.</span>
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
            <span className="w-[304px] text-center text-black text-[32px] font-normal font-['Source_Sans_3']">Move and interact with confident posture, purposeful body language and facial expression to polish strong</span>
            <div className="flex flex-col justify-center items-center gap-5">
              <MobilePlaylistButton icon={ASSETS.performanceMobileIcon} label="Performance Precision" />
            </div>
          </div>

          {/* SPEAK card */}
          <div className="self-stretch px-6 py-[39px] bg-[#939393] flex flex-col justify-center items-center gap-2.5">
            <span className="text-center text-black text-[32px] font-bold font-['Source_Sans_3']">SPEAK</span>
            <img src={ASSETS.speakImageMobile} alt="Speak" className="w-[249px] h-[249px] object-cover" />
            <div className="py-4 inline-flex justify-center items-center gap-2.5">
              <span className="w-[304px] text-center text-black text-[32px] font-normal font-['Source_Sans_3']">Stretch and strengthen your voice with simple, fun exercises<br />These techniques enhance vocal clarity, ensuring your voice commands attention</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-5">
              <MobilePlaylistButton icon={ASSETS.vocalMobileIcon} label="Vocal Power" />
            </div>
          </div>

          {/* THINK card */}
          <div className="self-stretch px-[71px] py-[39px] bg-[#939393] flex flex-col justify-start items-center gap-[34px]">
            <span className="text-center text-black text-[32px] font-bold font-['Source_Sans_3']">THINK</span>
            <img src={ASSETS.thinkImageMobile} alt="Think" className="w-[249px] h-[249px] object-cover" />
            <span className="w-[304px] text-center text-black text-[32px] font-normal font-['Source_Sans_3']">Master your wisdom, character and interactions by cultivating positive thoughts and overcoming limited beliefs</span>
            <div className="flex flex-col justify-center items-center gap-5">
              <MobilePlaylistButton icon={ASSETS.modernEtiquetteMobileIcon} label="Modern Etiquette" />
              <MobilePlaylistButton icon={ASSETS.bossOfMeMobileIcon} label="I'm the boss of me" />
              <MobilePlaylistButton icon={ASSETS.innerUMobileIcon} label="Inner U" />
            </div>
          </div>
        </div>

        {/* Moto text */}
        <div className="w-[368px] text-center text-black text-2xl font-normal" style={{ fontFamily: 'Inter, sans-serif' }}>
          Visual Polish, Vocal Power, Personal Strength &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Master Your Authenticity—Start Today!
        </div>
      </section>

      {/* ── About Sharon / Gray is Gorgeous Own Your Way Section ── */}
      <section className="w-full">
        <img src={ASSETS.aboutSharonDesktop} alt="Gray is Gorgeous - Own Your Way" className="w-full h-auto block hidden md:block" />
        <img src={ASSETS.aboutSharonMobile} alt="Meet Sharon" className="w-full h-auto block md:hidden" />
      </section>

      {/* ── Glimpse Behind the Scenes Section ── */}
      {/* Desktop */}
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
              onClick={() => window.open(ASSETS.collageDesktop, '_blank')}
            />
          </div>
          <button
            className="p-2.5 inline-flex justify-center items-center gap-2.5"
            onClick={() => window.open(ASSETS.collageDesktop, '_blank')}
          >
            <span className="text-center text-[#4e4e4e] text-[32px] font-normal" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Click to Enlarge</span>
          </button>
        </div>
      </section>

      {/* Mobile Behind the Scenes */}
      <section className="w-full md:hidden pt-12 pb-6 flex flex-col justify-start items-start gap-[69px]">
        <div className="self-stretch flex flex-col justify-start items-start gap-[21px]">
          <div className="self-stretch flex flex-col justify-center items-center gap-2.5">
            <span className="w-[378px] text-center text-black text-[64px] font-normal font-['Italianno']">Glimpse Behind the Scenes</span>
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
              onClick={() => window.open(ASSETS.collageMobile, '_blank')}
            />
          </div>
          <button
            className="p-2.5 inline-flex justify-center items-center gap-2.5"
            onClick={() => window.open(ASSETS.collageMobile, '_blank')}
          >
            <span className="text-center text-[#4e4e4e] text-xl font-normal" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Click to Enlarge</span>
          </button>
        </div>
      </section>

      {/* ── Footer Section ── */}
      <footer className="w-full">
        <img src={ASSETS.footerDesktop} alt="Connect with Sharon" className="w-full h-auto block hidden md:block" />
        <img src={ASSETS.footerMobile} alt="Connect with Sharon" className="w-full h-auto block md:hidden" />
      </footer>

    </div>
  );
}
