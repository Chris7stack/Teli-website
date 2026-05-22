import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Users, Award, BookOpen, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const heroImage = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop";

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(26,54,93,0.05),transparent_50%)]" />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-50 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-primary text-xs font-bold uppercase tracking-wider mb-6">
                <Award size={14} />
                Leading the Future of Education
              </div>
              <h1 className="text-5xl md:text-7xl mb-6 leading-[1.1]">
                Transforming <span className="text-brand-primary">Leadership</span> in Education.
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
                The Transformative Education Leadership Institute (TELI) provides world-class training 
                and development for community college leaders committed to excellence, equity, and innovation.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/services" className="btn-primary flex items-center gap-2">
                  Explore Programs <ArrowRight size={18} />
                </Link>
                <Link to="/about" className="btn-outline">
                  Learn Our Story
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-slate-100 flex items-center justify-center">
                <img 
                  src={heroImage} 
                  alt="Community College Leadership Transforming Education" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-primary/10" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners/Trust Section */}
      <section className="py-12 border-y border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">
            Trusted by Community College Institutions
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-55 hover:opacity-100 transition-opacity duration-500">
            {[
              'Multi-Campus Districts',
              'State College Systems',
              'International Education',
              'Global Technical Partners'
            ].map((name) => (
              <span key={name} className="text-base md:text-lg font-serif font-semibold text-brand-primary tracking-wide leading-tight text-center">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl mb-4">Our Core Pillars</h2>
            <p className="text-slate-600">
              We focus on three fundamental areas that drive transformative change in educational 
              environments, ensuring community college leaders are equipped for the challenges of tomorrow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="w-8 h-8 text-brand-primary" />,
                title: "Strategic Vision",
                desc: "Developing long-term roadmaps for institutional growth and academic excellence."
              },
              {
                icon: <Users className="w-8 h-8 text-brand-primary" />,
                title: "Collaborative Culture",
                desc: "Building high-performing teams and fostering environments of mutual respect and innovation."
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-brand-primary" />,
                title: "Sustainable Impact",
                desc: "Implementing data-driven strategies that ensure lasting positive outcomes for students and faculty."
              }
            ].map((pillar, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
              >
                <div className="mb-6">{pillar.icon}</div>
                <h3 className="text-xl mb-3">{pillar.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-brand-primary rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl text-white mb-6">Ready to Transform Your Leadership?</h2>
              <p className="text-slate-300 mb-10 max-w-2xl mx-auto text-lg">
                Join our next cohort of community college leaders. Applications for our Fellowship 
                Program are now open for the upcoming academic year.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="px-8 py-4 bg-brand-accent text-brand-primary rounded-xl font-bold hover:bg-white transition-colors shadow-lg">
                  Apply Now
                </Link>
                <Link to="/services" className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-bold hover:bg-white/20 transition-colors backdrop-blur-sm">
                  View All Programs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
