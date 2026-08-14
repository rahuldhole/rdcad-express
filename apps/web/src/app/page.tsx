import React from "react";
import Link from "next/link";
import { ArrowRight, GitBranch, Code, Layers, Cpu, Compass } from "lucide-react";

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-900/20 blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 text-sm font-medium text-blue-400 mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          RDCAD Express Open Source
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
          Parametric Structural <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Detailing Reimagined</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mb-12">
          An advanced suite of open-source engineering tools for generating accurate Bar Bending Schedules, DXF exports, and detailed structural designs instantly.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/bbs" className="group flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold transition-all hover:scale-105 shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]">
            Launch App
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href="https://github.com/rahuldhole/rdcad-express" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-semibold transition-all border border-slate-800 hover:border-slate-700">
            <GitBranch className="w-5 h-5" />
            View on GitHub
          </a>
        </div>
        <div className="mt-8">
          <a href="https://github.com/rahuldhole/rdcad-express/issues" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 hover:text-white transition flex items-center gap-2">
            Found a bug or have a suggestion? <span className="text-red-400 hover:text-red-300 underline decoration-red-400/30 underline-offset-4">Report an Issue</span>
          </a>
        </div>
      </section>

      {/* CAD Integration Section */}
      <section className="py-24 px-8 border-t border-slate-900/50 bg-slate-900/20 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold tracking-wide uppercase">
              Workflow Upgrade
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">Seamless AutoCAD Integration</h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Downloading DXF files is just the beginning. We provide a lightweight AutoLISP companion script that bridges the gap between RDCAD Express and your local AutoCAD environment.
            </p>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">✓</div>
                Instantly imports your most recent download
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">✓</div>
                Attaches block to cursor for immediate placement
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">✓</div>
                No file-browser navigation required
              </li>
            </ul>
            <div className="pt-4">
              <Link href="/download" className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition shadow-lg shadow-indigo-500/20">
                Learn How to Install
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="flex-1 w-full bg-slate-950 rounded-2xl border border-slate-800 p-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-500"></div>
            <div className="flex items-center gap-2 mb-4 text-slate-500 text-sm font-mono border-b border-slate-800/50 pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              <span className="ml-2">AutoCAD Command Line</span>
            </div>
            <div className="font-mono text-sm space-y-2">
              <div className="text-slate-400">Command: <span className="text-emerald-400">RDCAD_IMPORT</span></div>
              <div className="text-slate-500">Importing: C:\Users\Engineer\Downloads\Beam_B1_300x450.dxf</div>
              <div className="text-slate-500">Specify insertion point or [Basepoint/Scale/X/Y/Z/Rotate]:</div>
              <div className="text-blue-400 flex items-center gap-2 mt-4 animate-pulse">
                <span>_</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-8 border-t border-slate-900/50 bg-slate-950/50 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Engineering Suite</h2>
            <p className="text-slate-400">Everything you need to detail structures efficiently.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<Code className="w-8 h-8 text-blue-400" />}
              title="BBS Generator"
              description="Real-time parametric rebar weight calculations and scheduling."
              link="/bbs"
            />
            <FeatureCard 
              icon={<Layers className="w-8 h-8 text-emerald-400" />}
              title="Beam Detailing"
              description="Generate detailed beam reinforcements and exports."
              link="/beam"
            />
            <FeatureCard 
              icon={<Cpu className="w-8 h-8 text-purple-400" />}
              title="Column Detailing"
              description="Automated column schedules and link calculations."
              link="/column"
            />
            <FeatureCard 
              icon={<Compass className="w-8 h-8 text-amber-400" />}
              title="Foundation"
              description="Isolated footing calculations and base detailing."
              link="/foundation"
            />
            <FeatureCard 
              icon={<Layers className="w-8 h-8 text-rose-400" />}
              title="Slab Detailing"
              description="Two-way and one-way slab reinforcement generation."
              link="/slab"
            />
            <FeatureCard 
              icon={<Code className="w-8 h-8 text-cyan-400" />}
              title="Tank Detailing"
              description="Water tank structural components and drawings."
              link="/tank"
            />
            <FeatureCard 
              icon={<Layers className="w-8 h-8 text-orange-400" />}
              title="Stairs Detailing"
              description="Parametric dog-legged stair reinforcements and profiles."
              link="/stairs"
            />
            <FeatureCard 
              icon={<Code className="w-8 h-8 text-indigo-400" />}
              title="Grid Utils"
              description="Drafting utilities for grids, elevations, and revisions."
              link="/utilities"
            />
            <FeatureCard 
              icon={<Compass className="w-8 h-8 text-pink-400" />}
              title="Asset Library"
              description="Pre-built CAD blocks for architecture and plumbing."
              link="/library"
            />
            <FeatureCard 
              icon={<Cpu className="w-8 h-8 text-teal-400" />}
              title="Templates"
              description="Standardized title blocks and project templates."
              link="/templates"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-slate-900 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} RDCAD Express. Open Source under MIT License.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, link }: { icon: React.ReactNode, title: string, description: string, link: string }) {
  return (
    <Link href={link} className="block group p-8 rounded-2xl bg-slate-900/40 border border-slate-800/50 hover:bg-slate-900 hover:border-slate-700 transition-all">
      <div className="mb-6 p-4 rounded-xl bg-slate-950 inline-block group-hover:scale-110 transition-transform shadow-lg shadow-black/20">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </Link>
  );
}
