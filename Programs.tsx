import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Calendar, MapPin, Users, Award, Target, Compass, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Programs() {
  return (
    <div className="pt-32 pb-24">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl mb-6 font-sans tracking-tight text-slate-900">Leadership Programs</h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Our Leadership Programs portfolios are designed to meet community college leaders where they are in their career journey, 
            delivering deep institutional impact, lifelong networks, and ethical, visionary leadership models.
          </p>
        </div>
      </section>

      {/* Program 1: TELI Fellows Program */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col lg:flex-row gap-12 items-start"
        >
          {/* Left Column */}
          <div className="flex-1">
            <h2 className="text-4xl mb-3 text-slate-900 font-sans tracking-tight">TELI Leadership Fellows</h2>
            <p className="text-brand-primary font-bold mb-8 italic text-lg">
              Cultivating the next generation of visionary community college leaders through Strategic Leadership.
            </p>

            {/* Checkmarks moved ABOVE the description */}
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl mb-8">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Core Leadership Competencies</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                  <CheckCircle2 size={18} className="text-brand-accent shrink-0" />
                  Purposeful and ethical leadership
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                  <CheckCircle2 size={18} className="text-brand-accent shrink-0" />
                  Building trust and navigating politics
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                  <CheckCircle2 size={18} className="text-brand-accent shrink-0" />
                  Effective use of artificial intelligence
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                  <CheckCircle2 size={18} className="text-brand-accent shrink-0" />
                  Global network of colleagues and mentors
                </li>
              </ul>
            </div>

            {/* Descriptive paragraphs */}
            <div className="space-y-6 text-slate-600 leading-relaxed mb-8 text-[15px]">
              <p>
                The mainstay of the Transformative Education Leadership Institute’s Leadership Programs portfolio is the distinguished <strong>TELI Leadership Fellows</strong> initiative, a one-year, primarily online journey designed to assist mid- to senior-level faculty and administrators, both in the U.S. and abroad, cultivate the Strategic Leadership, practical experiences, and Global Leadership networks necessary to ethically and effectively guide their institutions through changing educational and policy landscapes.
              </p>
              <p>
                The Inaugural TELI Leadership Fellows cohort will commence in February 2027 with an in-person orientation at the Bellwether Futures Assembly and will conclude in February 2028 at the ACCT National Legislative Summit. Apart from these orientation and culminating activities, TELI’s 12-module Strategic Leadership curriculum will be delivered online, one Saturday per month (excluding December).
              </p>
              <p>
                Topics included in the TELI Curriculum include an analysis of leadership styles, ethical leadership, planning for an uncertain future, measuring and evaluating student success, personnel management, effective communication, crisis management, building trust and navigating politics, and effective use of artificial intelligence.
              </p>
              <p>
                TELI Board Members, a Curriculum Coordinator, and Distinguished Practitioner Faculty will engage TELI Leadership Fellows through innovative, just-in-time curricula, case studies, assessments, and activities that empower them to become more creative and transformative change agents in their colleges and communities. TELI Leadership Fellows will also be paired with an executive mentor, who will be available throughout the year for guidance and perspective.
              </p>
            </div>

            <Link to="/apply" className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 shadow-md">
              Apply for the TELI Leadership Fellows Cohort <ArrowRight size={18} />
            </Link>
          </div>

          {/* Right Column (Aesthetic Cohort Journey / Highlights) */}
          <div className="flex-1 w-full lg:sticky lg:top-36">
            <div className="bg-gradient-to-br from-slate-900 via-brand-primary to-slate-950 text-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl -mr-20 -mt-20" />
              
              <h3 className="text-2xl font-sans tracking-tight mb-8 relative z-10 font-bold border-b border-white/10 pb-4">
                Fellowship Structure & Highlights
              </h3>
              
              <div className="space-y-8 relative z-10">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 text-brand-accent">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white mb-1">One-Year Cohort Journey</h4>
                    <p className="text-sm text-slate-300">Commencing February 2027 through February 2028 with a modular Saturday schedule designed for busy executives.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 text-brand-accent">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white mb-1">Dual National Assemblies</h4>
                    <p className="text-sm text-slate-300">In-person launches at the Bellwether Futures Assembly and culminating at the ACCT National Legislative Summit.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 text-brand-accent">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white mb-1">Executive Mentorship</h4>
                    <p className="text-sm text-slate-300">Direct, personalized pairing with renowned community college presidents, chancellors, and policy experts.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 text-brand-accent">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white mb-1">Strategic Action Project</h4>
                    <p className="text-sm text-slate-300">A customized, real-world capstone addressing an immediate digital, fiscal, or equity challenge at your home institution.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SEATS LIMITED TO 25 FELLOWS</span>
                <span>COHORT 2027</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Portfolio 2: Executive Coaching */}
      <section className="max-w-7xl mx-auto px-6 border-t border-slate-100 pt-24 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col lg:flex-row-reverse gap-12 items-center"
        >
          <div className="flex-1">
            <h2 className="text-3xl mb-4 text-slate-900 font-sans tracking-tight">Executive Coaching</h2>
            <p className="text-brand-primary font-bold mb-6 italic">
              Empowering mid-level rising stars and seasoned executives to navigate, adapt, and lead through institutional change.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Our confidential Executive Coaching service is custom-structured to address the unique challenges of the community college ecosystem, accelerating strategic readiness for mid-level rising stars and serving as an invaluable sounding board for established executives. Together, we ensure your leadership teams possess the agility and strategic foresight required to succeed in a rapidly changing educational landscape.
            </p>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {[
                "Highly personalized, confidential 1:1 mentorship",
                "Adaptive leadership strategies for digital & fiscal changes",
                "Career pathing & cabinet readiness for mid-level leaders",
                "Strategic crisis navigation & executive presence",
                "Objective performance alignment & structural goal-setting",
                "Innovative decision-making tools for shifting landscapes"
              ].map((feature, fIdx) => (
                <li key={fIdx} className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle2 size={18} className="text-brand-accent shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link to="/contact?program=coaching" className="btn-primary inline-flex items-center gap-2">
              Inquire About Coaching <ArrowRight size={18} />
            </Link>
          </div>

          {/* Left Column (Minimalist Quote / Aesthetic White Space Block) */}
          <div className="flex-1 w-full">
            <div className="border border-slate-200/60 p-10 md:p-16 rounded-3xl relative overflow-hidden flex flex-col justify-center h-full bg-slate-50/50 min-h-[420px]">
              <div className="max-w-md mx-auto text-center space-y-6">
                <span className="text-[64px] font-serif text-brand-accent leading-none block select-none -mb-4">“</span>
                <p className="text-xl md:text-2xl text-slate-700 font-sans tracking-tight leading-relaxed italic">
                  “The best way to predict the future is to create it.”
                </p>
                <div className="pt-6 border-t border-slate-200 w-44 mx-auto">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-900">— Peter F. Drucker</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Custom Solutions */}
      <section className="mt-32 bg-brand-primary py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-slate-900 opacity-90" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl text-white mb-6 font-sans tracking-tight">Need a Custom Solution?</h2>
          <p className="text-slate-300 mb-10 text-lg leading-relaxed">
            We partner with community colleges, school districts, and universities to design bespoke 
            Institutional Leadership & Strategic Leadership portfolios tailored to their specific goals and challenges.
          </p>
          <div className="flex justify-center">
            <Link to="/contact?program=custom" className="px-8 py-4 bg-brand-accent text-brand-primary rounded-xl font-bold hover:bg-white transition-colors shadow-lg">
              Inquire About Custom Solutions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
