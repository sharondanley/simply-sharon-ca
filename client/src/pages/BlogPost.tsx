/**
 * Simply Sharon - Blog Post Page
 * Design: Clean white content area with elegant typography
 * Fonts: Italianno (script headings), Source Sans 3 (body/buttons), Helvetica (paragraphs)
 */

import { Link } from "wouter";

const ASSETS = {
  navbar: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/111-531_3c5a2f93.webp",
  breadcrumbIcon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/111-551_82d1e49d.webp",
  sharonPortrait: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/114-683_95699440.webp",
  videoThumbnail: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/116-7_9373465d.webp",
  heartEmoji: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/116-21_1dd24f05.webp",
  footer: "https://d2xsxph8kpxj0f.cloudfront.net/310519663293754909/S7VRvsAR3NFvJQTWWaYkyz/116-36_04d51412.webp",
};

export default function BlogPost() {
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
            <div className="w-[280px] md:w-[707px] h-0 border-[3.5px] md:border-[3.5px] border-black"></div>
          </div>
        </div>

        {/* Post Intro Section */}
        <div className="px-0 md:px-[116px] flex flex-col gap-16 md:gap-[129px]">
          {/* Intro Text + Image */}
          <div className="flex flex-col md:flex-row items-start gap-8 md:gap-[46px]">
            <div className="flex-1 flex flex-col gap-6 md:gap-7">
              {/* Post Info */}
              <div className="p-2.5">
                <p className="text-lg md:text-[32px] font-normal font-['Source_Sans_3'] text-neutral-400 leading-relaxed">
                  Aug 12, 2025 | Ep 5<br />
                  By: Sharon Danley, Master Beauty Mentor
                </p>
              </div>
              {/* Opening Paragraph */}
              <p className="text-xl md:text-4xl font-normal text-black leading-relaxed" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                Over the years, many of you have followed my reflections under the banner of Personal Mastery—a space where we explored beauty, resilience, and what it means to live from the inside out. Today, I'm thrilled to share that this blog, like all of us, is evolving.
              </p>
              {/* H2 */}
              <h3 className="text-2xl md:text-5xl font-bold text-black leading-tight" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                Welcome To Timeless Self Mastery
              </h3>
              {/* Subtitle */}
              <p className="text-xl md:text-4xl font-normal text-black leading-relaxed" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                This refreshed title reflects the same heart and soul, now expressed with even greater clarity for where we are today.
              </p>
            </div>
            {/* Portrait */}
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

        {/* Comment Section Placeholder */}
        <div className="w-full h-48 md:h-[718px] px-0 md:px-[116px] bg-[#e1e1e1]" />

      </main>

      {/* ── Footer ── */}
      <footer className="w-full">
        <img
          src={ASSETS.footer}
          alt="Connect with Sharon"
          className="w-full h-auto block"
        />
      </footer>

    </div>
  );
}
