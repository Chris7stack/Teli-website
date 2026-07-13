import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Shield, Target, Heart, Users } from 'lucide-react';

export default function About() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [location]);

  const boardOfficers = [
    { 
      name: "Dr. Edward J. Valeau", 
      role: "President / CEO", 
      bio: "Dr. Edward J. Valeau is president emeritus of the Hartnell Community College District, where he served from 1995 to 2007. He is an internationally recognized expert on community college leadership development, policy formulation, and global higher education partnerships.", 
      img: "https://raw.githubusercontent.com/Chris7stack/Teli-website/813c0684fe46dfe15412d206d35d17d486ae5d8d/public/images/edward-valeau.jpeg"
    },
    { 
      name: "Dr. Belle Wheelan", 
      role: "Vice President for Client Recruitment and Relationships", 
      bio: "Dr. Belle Wheelan is past president of the Southern Association of Colleges and Schools Commission on Colleges and former Virginia secretary of education. Throughout her distinguished career, she has been a leading national advocate for academic access, equity, and student success.", 
      img: "https://raw.githubusercontent.com/Chris7stack/Teli-website/813c0684fe46dfe15412d206d35d17d486ae5d8d/public/images/Belle-Wheelan.jpeg"
    },
    { 
      name: "Dr. Michael Burke", 
      role: "Vice President for Curriculum Planning", 
      bio: "Dr. Michael Burke is chancellor emeritus of the Riverside Community College District. Throughout his outstanding career, he has served as president of several major colleges and spearheaded key system-wide curricular reform initiatives that continue to shape student success pathways.", 
      img: "https://raw.githubusercontent.com/Chris7stack/Teli-website/813c0684fe46dfe15412d206d35d17d486ae5d8d/public/images/michael-Burke.jpg"
    },
    { 
      name: "Dr. Dale F. Campbell", 
      role: "Vice President for Strategic Partnership Development and Planning", 
      bio: "Dr. Dale F. Campbell is professor emeritus of higher education administration at the University of Florida and founder of the Bellwether College Consortium. He is an esteemed scholar-practitioner whose pioneering research in national community college policy and institutional futures continues to guide educational leaders across the country.", 
      img: "https://raw.githubusercontent.com/Chris7stack/Teli-website/813c0684fe46dfe15412d206d35d17d486ae5d8d/public/images/Dale-Campbell.jpg"
    },
    { 
      name: "Dr. Karla Bailey", 
      role: "Secretary and Treasurer", 
      bio: "Dr. Karla Bailey is founder and CEO of the International Institute of Technology, Education, and Leadership and a Fulbright Specialist with the U.S. Department of State. She is an internationally recognized scholar-practitioner specializing in the governance, policy, and strategic integration of emerging technologies in education, with expertise spanning artificial intelligence, digital transformation, and institutional innovation. Her work has supported educational institutions across the United States and internationally in strengthening leadership, governance, and responsible innovation.", 
      img: "https://raw.githubusercontent.com/Chris7stack/Teli-website/813c0684fe46dfe15412d206d35d17d486ae5d8d/public/images/Karla-Bailey.jpg"
    },
    { 
      name: "Dr. Carrie B. Kisker", 
      role: "Fiscal Agent and Center Representative", 
      bio: "Dr. Carrie B. Kisker is an education researcher, consultant, and director of the Center for the Study of Community Colleges. As an influential scholar and author, her publications on institutional policy, structural governance, and student transfer pathways serve as essential blueprints for modern community colleges.", 
      img: "https://raw.githubusercontent.com/Chris7stack/Teli-website/813c0684fe46dfe15412d206d35d17d486ae5d8d/public/images/Carrie-Kisker.jpg"
    }
  ];

  const boardMembers = [
    { 
      name: "Dr. George Boggs", 
      bio: "Dr. George Boggs is president and CEO emeritus of the American Association of Community Colleges and superintendent/president emeritus of Palomar College. He is an internationally acclaimed authority and global voice on institutional governance, academic integrity, and student success.", 
      img: "https://raw.githubusercontent.com/Chris7stack/Teli-website/813c0684fe46dfe15412d206d35d17d486ae5d8d/public/images/george-boggs.jpg"
    },
    { 
      name: "Mr. J. Noah Brown", 
      bio: "Mr. J. Noah Brown is president and CEO emeritus of the Association of Community College Trustees (ACCT). He is an acclaimed author, policy strategist, and prominent national voice whose visionary work has modernized trustee governance and driven community college institutional growth.", 
      img: "https://raw.githubusercontent.com/Chris7stack/Teli-website/813c0684fe46dfe15412d206d35d17d486ae5d8d/public/images/TELI%20Logo%20white%20background%20Logo%20on%20left.png"
    },
    { 
      name: "Mr. Augustine (Augie) Gallego", 
      bio: "Mr. Augustine (Augie) Gallego is chancellor emeritus of the San Diego Community College District and past chairman of the American Association of Community Colleges. A recipient of numerous national distinctions, he is celebrated across the country for his lifelong, pioneering advocacy of equity, diversity, and educational access.", 
      img: "https://raw.githubusercontent.com/Chris7stack/Teli-website/813c0684fe46dfe15412d206d35d17d486ae5d8d/public/images/Augustine-Gallego.jpg"
    },
    { 
      name: "Dr. Jing Luan", 
      bio: "Dr. Jing Luan is president emeritus of the American International Recruitment Council and provost emeritus at San Mateo County Community College District. As a globally recognized expert, his groundbreaking work in predictive data analytics and international enrollment frameworks has established new benchmarks for institutional planning.", 
      img: "https://raw.githubusercontent.com/Chris7stack/Teli-website/813c0684fe46dfe15412d206d35d17d486ae5d8d/public/images/Jing-luan.jpg"
    },
    { 
      name: "Dr. Rosalind Raby", 
      bio: "Dr. Rosalind Raby is director of California Colleges for International Education and a senior lecturer at California State University, Northridge. As one of the world's foremost scholars in the field, her extensive research, policy guidance, and curricular frameworks have revolutionized international education across community college systems.", 
      img: "https://raw.githubusercontent.com/Chris7stack/Teli-website/813c0684fe46dfe15412d206d35d17d486ae5d8d/public/images/Rosalind-Raby.jpg"
    }
  ];

  return (
    <div className="pt-32 pb-24">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="border-b border-slate-200/60 pb-12 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-primary bg-brand-primary/5 px-4 py-1.5 rounded-full inline-block mb-4">
            Our Purpose & Commitment
          </span>
          <h1 className="text-5xl md:text-6xl text-slate-900 leading-tight">The TELI Mission</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Key Pull Quote/Highlight Column */}
          <div className="lg:col-span-5 bg-gradient-to-br from-brand-primary/5 to-transparent p-8 md:p-10 rounded-3xl border border-brand-primary/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-brand-accent" />
            <h2 className="text-2xl md:text-3xl font-serif text-brand-primary leading-relaxed italic">
              "Cultivating the skills, practical experiences, and global networks necessary for leaders to ethically and effectively guide their institutions through changing landscapes."
            </h2>
          </div>

          {/* Core Paragraphs Column */}
          <div className="lg:col-span-7 space-y-6 text-slate-600 leading-relaxed text-[17px]">
            <p>
              At a time when institutions of higher education in America and across the globe are grappling with rapidly shifting technological tools and workforce needs, threats to institutional autonomy, academic freedom, and freedom of expression, and pressure to eliminate programs and practices developed for the public good or to provide equitable support for all learners, the need to support emerging leaders in community colleges and other broadly accessible institutions in the U.S. and abroad is more pressing than ever.
            </p>
            <p className="border-l-2 border-brand-accent/40 pl-6 italic font-medium text-slate-700">
              The Transformative Education Leadership Institute (TELI) is dedicated to cultivating the skills, practical experiences, and global networks necessary for leaders to ethically and effectively guide their institutions through changing educational and policy landscapes.
            </p>
            <p>
              Through innovative, just-in-time curricula, case studies, and the fostering of deep connections across institutional and international borders, TELI empowers leaders to become more creative and transformative change agents in their colleges and communities. It's a journey of growth, inspiration, connection, and hope for a better future in higher education.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50 py-24 mb-24 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-secondary bg-brand-secondary/5 px-4 py-1.5 rounded-full inline-block mb-4">
              Our Pillars
            </span>
            <h2 className="text-4xl text-slate-900">Values that Guide Us</h2>
            <p className="text-slate-500 mt-3 text-lg">
              These fundamental principles inform our curriculum, mentorship, and vision for higher education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: <Shield className="text-brand-primary group-hover:text-white transition-colors" size={24} />, 
                title: "Integrity", 
                desc: "We foster ethical leadership in conflicted times, prioritizing transparent decision-making." 
              },
              { 
                icon: <Target className="text-brand-primary group-hover:text-white transition-colors" size={24} />, 
                title: "Excellence", 
                desc: "We cultivate critical leadership skills and experiences that deliver measurable, high-level institutional impact." 
              },
              { 
                icon: <Heart className="text-brand-primary group-hover:text-white transition-colors" size={24} />, 
                title: "Equity", 
                desc: "We believe leadership should reflect and serve all communities, ensuring equitable support for all learners." 
              },
              { 
                icon: <Users className="text-brand-primary group-hover:text-white transition-colors" size={24} />, 
                title: "Community", 
                desc: "We nurture deep, lifelong networks of support among TELI Fellows, distinguished alumni, and international mentors." 
              },
            ].map((value, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-start text-left"
              >
                <div className="inline-flex p-4 bg-brand-primary/5 rounded-2xl mb-6 group-hover:bg-brand-primary transition-all duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl mb-3 text-slate-900 font-serif font-bold">{value.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TELI Visionaries Title & Description */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <h1 className="text-5xl mb-6">TELI Visionaries</h1>
        <p className="text-xl text-slate-600 leading-relaxed max-w-4xl">
          TELI was founded by a team of visionary community college leaders dedicated to empowering community college leaders to be agents of transformative change in their colleges and communities.
        </p>
      </section>

      {/* Board Officers */}
      <section id="board-officers" className="max-w-7xl mx-auto px-6 mb-24 scroll-mt-24">
        <div className="mb-12">
          <h2 className="text-3xl">Board Officers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {boardOfficers.map((officer, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="relative mb-6 rounded-2xl overflow-hidden aspect-square bg-slate-50 flex items-center justify-center">
                <img 
                  src={officer.img} 
                  alt={officer.name} 
                  className={`w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500 ${
                    officer.img.includes('Logo') ? 'object-contain p-4 bg-white' : 'object-cover object-top'
                  }`}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-xl mb-1">{officer.name}</h3>
              <p className="text-brand-primary font-bold text-sm mb-3 uppercase tracking-wider">{officer.role}</p>
              <p className="text-slate-600 text-sm leading-relaxed">{officer.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Board Members */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl">Board Members</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {boardMembers.map((member, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="mb-4 rounded-full overflow-hidden aspect-square max-w-[160px] mx-auto border-4 border-white shadow-md flex items-center justify-center bg-slate-50">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className={`w-full h-full grayscale hover:grayscale-0 transition-all duration-500 ${
                    member.img.includes('Logo') ? 'object-contain p-1 bg-white' : 'object-cover object-top'
                  }`}
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="font-bold text-lg mb-2">{member.name}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

