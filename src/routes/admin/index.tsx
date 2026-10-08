import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Home,
  Info,
  Briefcase,
  Phone,
  BookOpen,
  Mic2,
  GraduationCap,
  FileText,
  Shield,
  Lightbulb,
  ArrowRight,
  Globe,
  Layers,
  PenLine,
} from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

const pages = [
  {
    label: "Home Page",
    description: "Hero, stats, services, testimonials, CTA sections",
    path: "/admin/pages/home",
    icon: Home,
    color: "from-blue-500 to-cyan-500",
    sections: 8,
  },
  {
    label: "About Page",
    description: "Story, mission, team, values, journey timeline",
    path: "/admin/pages/about",
    icon: Info,
    color: "from-violet-500 to-purple-600",
    sections: 6,
  },
  {
    label: "Work (Services) Page",
    description: "Business OS, 3 layers, audience tabs, process steps, FAQs",
    path: "/admin/pages/services",
    icon: Briefcase,
    color: "from-emerald-500 to-teal-600",
    sections: 7,
  },
  {
    label: "Contact Page",
    description: "Contact form, FAQs, response time info",
    path: "/admin/pages/contact",
    icon: Phone,
    color: "from-orange-500 to-amber-500",
    sections: 4,
  },
  {
    label: "Training Page",
    description: "Training programs, curriculum, rooms, quotes, industries",
    path: "/admin/pages/training",
    icon: GraduationCap,
    color: "from-pink-500 to-rose-600",
    sections: 7,
  },
  {
    label: "Book Page",
    description: "Book overview, purchase links, 10 takeaways, expert quotes, Chapter 1 lead capture",
    path: "/admin/pages/book",
    icon: BookOpen,
    color: "from-indigo-500 to-blue-600",
    sections: 7,
  },
  {
    label: "Podcast Page",
    description: "Episodes, guest info, platform links, newsletter & pitch CTA",
    path: "/admin/pages/podcast",
    icon: Mic2,
    color: "from-yellow-500 to-orange-500",
    sections: 7,
  },
  {
    label: "Insights Page",
    description: "Articles, thought leadership, blog posts",
    path: "/admin/pages/insights",
    icon: Lightbulb,
    color: "from-teal-500 to-green-500",
    sections: 3,
  },
  {
    label: "Privacy Policy",
    description: "Privacy policy content and legal text",
    path: "/admin/pages/privacy",
    icon: Shield,
    color: "from-slate-500 to-gray-600",
    sections: 2,
  },
  {
    label: "Terms of Service",
    description: "Terms and conditions legal text",
    path: "/admin/pages/terms",
    icon: FileText,
    color: "from-stone-500 to-slate-600",
    sections: 2,
  },
];

const stats = [
  { label: "Total Pages", value: "10", icon: Layers },
  { label: "Editable Sections", value: "43+", icon: PenLine },
  { label: "Live Site", value: "Vercel", icon: Globe },
];

function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl font-bold text-white"
        >
          Welcome back 👋
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-white/50 mt-1 text-sm"
        >
          Select any page below to start editing its content.
        </motion.p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="rounded-xl border border-white/8 bg-white/4 px-4 py-4 flex flex-col gap-1"
          >
            <stat.icon className="w-4 h-4 text-white/30 mb-1" />
            <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-white/40">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Pages grid */}
      <div>
        <h2 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">
          Pages — click to edit
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
          {pages.map((page, i) => (
            <motion.div
              key={page.path}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.04 }}
            >
              <Link
                to={page.path}
                className="group flex flex-col gap-3 rounded-2xl border border-white/8 bg-white/4 hover:bg-white/7 hover:border-white/15 p-5 transition-all duration-200"
              >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${page.color} flex items-center justify-center shrink-0 shadow-lg`}>
                  <page.icon className="w-5 h-5 text-white" />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-white text-sm">{page.label}</h3>
                    <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all duration-150 shrink-0" />
                  </div>
                  <p className="text-xs text-white/40 mt-1 leading-relaxed">{page.description}</p>
                </div>

                {/* Section count badge */}
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  <span className="text-[11px] text-white/30">{page.sections} sections</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
