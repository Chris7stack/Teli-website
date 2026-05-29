import { motion } from 'motion/react';
import { Shield, Target, Heart, Users } from 'lucide-react';

export default function About() {
  const boardOfficers = [
    { name: "Dr. Edward J. Valeau", role: "President/CEO", bio: "Providing visionary leadership and strategic direction for community college transformation.", img: "https://picsum.photos/seed/edward/400/400" },
    { name: "Dr. Karla Bailey", role: "Secretary and Treasurer", bio: "Overseeing financial administration, accounting, and institutional stewardship.", img: "https://picsum.photos/seed/karla/400/400" },
    { name: "Dr. Dale Campbell", role: "Vice President for Strategic Partnership Development and Planning", bio: "Spearheading regional and international strategic alliances and institutional planning.", img: "https://picsum.photos/seed/dale/400/400" },
    { name: "Dr. Michael Burke", role: "Vice President for Curriculum Planning", bio: "Designing state-of-the-art curricula tailored for transformative community college leaders.", img: "https://picsum.photos/seed/burke/400/400" },
    { name: "Dr. Belle Wheelan", role: "Vice President for Client Recruitment and Relationships", bio: "Managing key educational partnerships and recruiting prospective cohorts.", img: "https://picsum.photos/seed/belle/400/400" },
    { name: "Dr. Carrie B. Kisker", role: "Fiscal Agent and Center Representative", bio: "Coordinating resource distribution and representing the institute across fiscal networks.", img: "https://picsum.photos/seed/carrie/400/400" },
  ];

  const boardMembers = [
    { name: "Dr. George Boggs", role: "Board of Directors", img: "https://picsum.photos/seed/george/400/400" },
    { name: "J. Noah Brown", role: "Board of Directors", img: "https://picsum.photos/seed/noah/400/400" },
    { name: "Dr. Augustine Gallego", role: "Board of Directors", img: "https://picsum.photos/seed/augustine/400/400" },
    { name: "Dr. Jing Luan", role: "Board of Directors", img: "https://picsum.photos/seed/jing/400/400" },
    { name: "Dr. Rosalind Raby", role: "Board of Directors", img: "https://picsum.photos/seed/rosalind/400/400" },
  ];

  return (
    <div className="pt-32 pb-24">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl mb-6">Our Mission & People</h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            TELI was founded on the belief that strong, visionary leadership is the single most 
            important factor in the success of an educational institution. We are a collective of 
            experienced educators, administrators, and policy makers dedicated to nurturing the 
            next generation of community college leaders.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20 mb-24 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { icon: <Shield className="text-brand-primary" />, title: "Integrity", desc: "We uphold the highest ethical standards in all our programs." },
              { icon: <Target className="text-brand-primary" />, title: "Excellence", desc: "We strive for measurable impact and academic rigor." },
              { icon: <Heart className="text-brand-primary" />, title: "Equity", desc: "We believe leadership should reflect and serve all communities." },
              { icon: <Users className="text-brand-primary" />, title: "Community", desc: "We foster a lifelong network of support among our alumni." },
            ].map((value, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex p-4 bg-slate-50 rounded-2xl mb-6">{value.icon}</div>
                <h3 className="text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Board Officers */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl mb-2">Board Officers</h2>
            <p className="text-slate-500">The visionary leadership steering our institute.</p>
          </div>
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
              <div className="relative mb-6 rounded-2xl overflow-hidden aspect-square">
                <img 
                  src={officer.img} 
                  alt={officer.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
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
          <h2 className="text-3xl mb-2">Board Members</h2>
          <p className="text-slate-500">Distinguished professionals contributing to our mission.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {boardMembers.map((member, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="mb-4 rounded-full overflow-hidden aspect-square max-w-[160px] mx-auto border-4 border-white shadow-md">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="font-bold text-lg">{member.name}</h4>
              <p className="text-slate-500 text-sm">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
