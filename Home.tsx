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
                Transforming <span className="text-brand-primary">Leadership</span> in Higher Education.
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
                The Transformative Education Leadership Institute (TELI) cultivates the skills, practical experiences, and global networks necessary for community college leaders to ethically and effectively guide their institutions through changing educational and policy landscapes.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/programs" className="btn-primary flex items-center gap-2">
                  Explore Leadership Programs <ArrowRight size={18} />
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

      {/* Modern Leadership Challenge Section */}
      <section className="py-20 border-y border-slate-200/80 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Contextualizing the Mission */}
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-primary bg-brand-primary/5 px-3.5 py-1.5 rounded-full inline-block mb-4">
                The Higher Ed Challenge
              </span>
              <h2 className="text-3xl md:text-4xl text-slate-900 leading-tight mb-6 font-sans tracking-tight font-semibold">
                Navigating a Shifting Educational Landscape
              </h2>
              <p className="text-slate-600 leading-relaxed text-[15px]">
                Today’s institutions face complex technological accelerations, policy fluctuations, 
                and pressing demands for equitable student success. The Transformative Education Leadership Institute 
                equips faculty and administrators with the practical tools and global perspectives to ethically 
                and effectively guide their colleges.
              </p>
            </div>

            {/* Right Column: Three core focuses */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  number: "01",
                  title: "Ethical Advocacy",
                  desc: "Upholding institutional integrity and fostering academic freedom during complex social and policy transitions."
                },
                {
                  number: "02",
                  title: "Adaptive Foresight",
                  desc: "Leveraging innovative, just-in-time curriculum to proactively integrate AI, manage crises, and lead teams."
                },
                {
                  number: "03",
                  title: "Global Alliances",
                  desc: "Connecting with U.S. and international peers and dedicated mentors for a lifetime of shared insight."
                }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-xs font-extrabold text-brand-primary bg-brand-primary/10 px-2.5 py-1 rounded-md inline-block mb-4">
                      {item.number}
                    </span>
                    <h3 className="font-sans font-bold text-slate-900 text-base mb-2">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mt-2">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Visionary Founders Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-primary bg-brand-primary/5 px-4 py-1.5 rounded-full inline-block">
                Our Founders & Developers
              </span>
              <h2 className="text-4xl text-slate-900 leading-tight font-sans tracking-tight font-bold">
                Conceived by Visionary Higher Ed Leaders
              </h2>
              <p className="text-slate-600 leading-relaxed text-[16px]">
                TELI was established and designed by a prestigious group of community college chancellors, presidents, and dedicated academic mentors. Armed with decades of experience leading complex, multi-campus institutions, they have crafted a curriculum tailored to address the modern challenges of ethical leadership and community impact.
              </p>
              <div className="pt-4">
                <Link 
                  to="/about#board-officers" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg uppercase tracking-wider group"
                >
                  Meet Our Board
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Pillars/Features Column */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: <Users className="w-6 h-6 text-brand-primary" />,
                  title: "Distinguished Leadership",
                  desc: "Developed by actual institutional heads who understand the day-to-day realities and political dimensions of running accessible colleges."
                },
                {
                  icon: <Award className="w-6 h-6 text-brand-primary" />,
                  title: "Advocates of Public Good",
                  desc: "Committed to preserving academic freedom, program viability, and equitable support systems across community college systems."
                },
                {
                  icon: <BookOpen className="w-6 h-6 text-brand-primary" />,
                  title: "Pioneering Curriculum",
                  desc: "Creating a responsive, just-in-time Leadership Programs framework that directly addresses technological acceleration and workforce shifts."
                },
                {
                  icon: <TrendingUp className="w-6 h-6 text-brand-primary" />,
                  title: "Catalysts for Mentorship",
                  desc: "Fostering cross-border, lifelong support networks that empower fellows to serve as courageous, ethical change agents."
                }
              ].map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="inline-flex p-3.5 bg-brand-primary/5 rounded-xl mb-5">
                      {card.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 font-serif">
                      {card.title}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
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
                Join our next cohort of transformative community college leaders. Applications are now open for the 2027 TELI Leadership Fellows cohort.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/apply" className="px-8 py-4 bg-brand-accent text-brand-primary rounded-xl font-bold hover:bg-white transition-colors shadow-lg">
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
