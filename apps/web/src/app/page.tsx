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
      </section>

      {/* Features Section */}
      <section className="py-24 px-8 border-t border-slate-900/50 bg-slate-950/50 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Engineering Suite</h2>
            <p className="text-slate-400">Everything you need to detail structures efficiently.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
