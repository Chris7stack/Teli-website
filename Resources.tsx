import { motion } from 'motion/react';
import { FileText, Download, ExternalLink, Search, Filter } from 'lucide-react';

export default function Resources() {
  const resources = [
    { title: "2024 Education Leadership Trends", type: "Whitepaper", date: "Jan 2024", size: "2.4 MB" },
    { title: "Strategic Planning Template for Schools", type: "Tool", date: "Dec 2023", size: "1.1 MB" },
    { title: "Conflict Resolution in Higher Ed", type: "Guide", date: "Nov 2023", size: "3.8 MB" },
    { title: "Digital Transformation Roadmap", type: "Case Study", date: "Oct 2023", size: "5.2 MB" },
    { title: "Equity-Centered Policy Framework", type: "Whitepaper", date: "Sept 2023", size: "2.1 MB" },
    { title: "Effective Faculty Mentorship Models", type: "Guide", date: "Aug 2023", size: "1.5 MB" },
  ];

  return (
    <div className="pt-32 pb-24">
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="max-w-3xl">
          <h1 className="text-5xl mb-6">Insights & Resources</h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Access our library of research, tools, and best practices designed to support 
            community college leaders in their daily work and long-term strategic planning.
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-col md:row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search resources..." 
              className="w-full pl-12 pr-4 py-2 rounded-xl border border-slate-200 focus:border-brand-primary outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {['All', 'Whitepapers', 'Tools', 'Guides', 'Case Studies'].map((cat) => (
              <button 
                key={cat}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${cat === 'All' ? 'bg-brand-primary text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((res, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-slate-50 rounded-xl text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                  <FileText size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded">
                  {res.type}
                </span>
              </div>
              <h3 className="text-lg mb-4 group-hover:text-brand-primary transition-colors">{res.title}</h3>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-6">
                <span>{res.date}</span>
                <span>{res.size}</span>
              </div>
              <button className="w-full py-3 flex items-center justify-center gap-2 text-sm font-bold text-brand-primary border border-brand-primary/20 rounded-xl hover:bg-brand-primary hover:text-white transition-all">
                <Download size={16} /> Download PDF
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-6 mt-24">
        <div className="bg-slate-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>
          <h2 className="text-3xl mb-4 relative z-10">Stay Informed</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto relative z-10">
            Subscribe to our monthly newsletter for the latest insights in community college leadership 
            and updates on upcoming TELI programs.
          </p>
          <form className="max-w-md mx-auto flex gap-2 relative z-10">
            <input 
              type="email" 
              placeholder="your@email.com" 
              className="flex-grow px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white outline-none focus:border-brand-accent transition-all"
            />
            <button className="px-6 py-3 bg-brand-accent text-brand-primary font-bold rounded-xl hover:bg-white transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
