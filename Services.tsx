import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
  const programs = [
    {
      id: "fellowship",
      title: "Fellowship Program",
      tagline: "Cultivating the next generation of visionary community college leaders.",
      description: "A year-long, intensive leadership residency designed for emerging administrators. Participants engage in peer-learning, mentorship with seasoned executives, and real-world institutional projects.",
      features: ["One-on-one executive mentorship", "Monthly leadership retreats", "Strategic project implementation", "Lifetime alumni network access"],
      img: "https://picsum.photos/seed/mentorship-education/800/600"
    },
    {
      id: "community-college",
      title: "Community College Leadership Development Program",
      tagline: "Empowering mid-level community college leaders for institutional excellence.",
      description: "A comprehensive development track specifically designed for mid-level community college leaders. This program focuses on expanding strategic leadership skills, navigating complex institutional dynamics, and preparing participants for senior executive roles within the community college system.",
      features: ["Strategic enrollment management", "Budgeting and fiscal responsibility", "Leading diverse faculty and staff", "Career pathing to senior leadership"],
      img: "https://picsum.photos/seed/campus-leadership/800/600"
    },
    {
      id: "professional",
      title: "Professional Development",
      tagline: "Continuous growth for established educational professionals.",
      description: "Short-term, high-impact workshops and certifications for faculty and staff. We provide the tools needed to stay ahead in a rapidly evolving educational environment.",
      features: ["Digital literacy for community college leaders", "Inclusive classroom management", "Data-driven decision making", "Emotional intelligence training"],
      img: "https://picsum.photos/seed/workshop-training/800/600"
    }
  ];

  return (
    <div className="pt-32 pb-24">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl mb-6">Programs & Services</h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Our programs are designed to meet community college leaders where they are in their career journey. 
            From intensive fellowships to community college leadership development, we provide the 
            comprehensive support needed for institutional transformation.
          </p>
        </div>
      </section>

      {/* Program List */}
      <section className="max-w-7xl mx-auto px-6 space-y-24">
        {programs.map((program, idx) => (
          <motion.div 
            key={program.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`flex flex-col lg:flex-row gap-12 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
          >
            <div className="flex-1">
              <h2 className="text-3xl mb-4">{program.title}</h2>
              <p className="text-brand-primary font-bold mb-6 italic">{program.tagline}</p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                {program.description}
              </p>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {program.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckCircle2 size={18} className="text-brand-accent shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                Inquire About This Program <ArrowRight size={18} />
              </Link>
            </div>

            <div className="flex-1 w-full">
              <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-video">
                <img 
                  src={program.img} 
                  alt={program.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/40 to-transparent" />
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Custom Solutions */}
      <section className="mt-32 bg-brand-primary py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl text-white mb-6">Need a Custom Solution?</h2>
          <p className="text-slate-300 mb-10 text-lg">
            We partner with community colleges, school districts, and universities to design bespoke leadership 
            development programs tailored to their specific institutional goals and challenges.
          </p>
          <Link to="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-brand-primary">
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
