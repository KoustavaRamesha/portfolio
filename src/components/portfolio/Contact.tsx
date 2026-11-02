import { profile } from "./data";
import SpecularButton from "../ui/SpecularButton";
import Lanyard from "./Lanyard";

export function Contact({ onReplay }: { onReplay: () => void }) {
  const rows = [
    { name: "Email", value: profile.email, href: `mailto:${profile.email}`, glyph: "✉" },
    { name: "Phone", value: profile.phone, href: profile.phoneHref, glyph: "☎" },
    { name: "GitHub", value: "KoustavaRamesha", href: profile.links.github, glyph: "</>" },
    { name: "LinkedIn", value: "Koustava Ramesha", href: profile.links.linkedin, glyph: "in" },
  ];

  return (
    <section id="contact" className="relative flex min-h-screen flex-col justify-center px-6 py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        {/* Left column: 3D interactive lanyard badge */}
        <div className="relative mx-auto w-full max-w-[22rem] lg:max-w-[26rem]">
          <div aria-hidden className="aurora absolute -inset-4 rounded-[40px] opacity-30 blur-2xl pointer-events-none" />
          <div style={{ width: '100%', height: '540px' }} className="relative z-10">
            <Lanyard
              frontImage="/avatar-sketch.jpg?v=3"
              backImage="/avatar-sketch.jpg?v=3"
              strapImage="/band.png"
              imageFit="cover"
              cardColor="#bea212"
              orientation="portrait"
              finish="matte"
              cornerRadius={0.3}
              size={0.5}
              anchor="center"
              strapLength={0.3}
              strapColor="#111111"
              strapWidth={0.4}
              metal="gold"
              gravity={0.8}
              damping={0.5}
              elasticity={0}
              breeze={0.8}
              interactive
              intro
            />
          </div>
        </div>

        {/* Right column: "Let's talk" section */}
        <div className="flex flex-col text-center md:text-left">
          <p className="eyebrow mb-3">Contact</p>
          <h2 className="headline tracking-tight text-5xl sm:text-7xl lg:text-8xl font-bold">
            Let's talk.
          </h2>

          <div className="mt-8 grid gap-3.5 text-left sm:grid-cols-2">
            {rows.map((r) => (
              <a
                key={r.name}
                href={r.href}
                target={r.name === "GitHub" || r.name === "LinkedIn" ? "_blank" : undefined}
                rel="noreferrer"
                className="glass group flex items-center gap-3.5 rounded-2xl p-4 transition-all duration-300 ease-spring hover:-translate-y-1 hover:border-foreground/20"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-sm font-bold group-hover:animate-wobble">
                  {r.glyph}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    {r.name}
                  </span>
                  <span className="block truncate text-sm font-semibold text-foreground">
                    {r.value}
                  </span>
                </span>
              </a>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-4">
            <SpecularButton
              size="lg"
              radius={18}
              tint="#ffffff"
              tintOpacity={0.04}
              textColor="#f5f5f5"
              lineColor="#ffffff"
              baseColor="#525252"
              intensity={1}
              idleIntensity={0.35}
              shineSize={10}
              shineFade={34}
              thickness={1.2}
              glow={1}
              followMouse
              proximity={250}
              onClick={() => {
                const link = document.createElement("a");
                link.href = profile.resume || "https://drive.google.com/file/d/1ZGmMFQdgqrDpmX7WN4GcvolzvsILVsr6/view?usp=sharing";
                link.target = "_blank";
                link.rel = "noopener noreferrer";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              View résumé ↗
            </SpecularButton>
          </div>
        </div>
      </div>

      {/* Footer area */}
      <div className="mt-20 flex flex-col items-center gap-6 text-center">
        <button
          onClick={onReplay}
          className="font-script text-2xl sm:text-3xl text-muted-foreground transition hover:text-foreground"
        >
          say hello again ↺
        </button>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
      </div>
    </section>
  );
}

/** Tiny dependency-free confetti burst. */
export function confetti() {
  const c = document.createElement("canvas");
  c.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:300";
  c.width = innerWidth; c.height = innerHeight; document.body.appendChild(c);
  const ctx = c.getContext("2d")!;
  const colors = ["#3b82f6", "#a855f7", "#ec4899", "#f59e0b", "#10b981"];
  const ps = Array.from({ length: 180 }, () => ({ x: innerWidth / 2, y: innerHeight / 2, vx: (Math.random() - 0.5) * 22, vy: Math.random() * -22 - 4, r: Math.random() * 6 + 3, c: colors[(Math.random() * 5) | 0]!, a: Math.random() * 6 }));
  let f = 0;
  const loop = () => {
    ctx.clearRect(0, 0, c.width, c.height);
    for (const p of ps) { p.vy += 0.5; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.a += 0.2; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.fillStyle = p.c; ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6); ctx.restore(); }
    if (++f < 160) requestAnimationFrame(loop); else c.remove();
  };
  loop();
}
