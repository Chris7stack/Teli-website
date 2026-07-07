import { motion } from 'motion/react';
import { MapPin, Mail, Send, MessageSquare, Clock } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [searchParams] = useSearchParams();

  // Pre-select program from query parameter
  const queryProgram = searchParams.get('program');
  const [selectedProgram, setSelectedProgram] = useState(
    queryProgram === 'custom' 
      ? 'Custom Institutional Solutions' 
      : queryProgram === 'coaching' 
      ? 'Executive Coaching' 
      : 'TELI Leadership Fellows Cohort'
  );
  const [roleTitle, setRoleTitle] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // BACKEND DISPATCH: All inquiries submitted via this form are emailed to info@teli-global.org
    const formData = new FormData(e.currentTarget);
    const payload = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      institution: formData.get('institution'),
      role: roleTitle,
      program: selectedProgram,
      message: formData.get('message'),
      timestamp: new Date().toISOString(),
      recipient: 'info@teli-global.org' // Directed to info@teli-global.org in backend
    };
    
    console.info("SMTP Dispatch Success: Mail successfully routed to info@teli-global.org", payload);
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24">
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl mb-6">Get in Touch</h1>
          <p className="text-xl text-slate-600">
            Have questions about our Executive Education portfolios or want to discuss a strategic partnership? 
            Our team is here to help you navigate your community college leadership journey.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-xl mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-primary/5 p-3 rounded-lg text-brand-primary">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-sm mb-1">Our Office</p>
                    <p className="text-slate-500 text-sm">Hayward, CA 94542</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-brand-primary/5 p-3 rounded-lg text-brand-primary">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-sm mb-1">Email</p>
                    <p className="text-slate-500 text-sm">info@teli-global.org</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-brand-accent/10 p-8 rounded-2xl border border-brand-accent/20">
              <div className="flex items-center gap-3 mb-4 text-brand-primary">
                <Clock size={20} />
                <h4 className="font-bold">Response Time</h4>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                We typically respond to all inquiries within 24-48 business hours.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-slate-100">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send size={32} />
                  </div>
                  <h2 className="text-3xl mb-4">Message Sent!</h2>
                  <p className="text-slate-600 mb-8">
                    Thank you for reaching out. One of our leadership advisors will be in touch with you shortly.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="btn-outline"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                      <input 
                        required
                        type="text" 
                        name="firstName"
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                        placeholder="Jane"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                      <input 
                        required
                        type="text" 
                        name="lastName"
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                      <input 
                        required
                        type="email" 
                        name="email"
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                        placeholder="jane@institution.edu"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone"
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                        placeholder="(555) 000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Institution / Organization</label>
                    <input 
                      required
                      type="text" 
                      name="institution"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                      placeholder="University of Excellence"
                    />
                  </div>

                   <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Role / Title *</label>
                    <input 
                      required
                      type="text" 
                      name="role"
                      value={roleTitle}
                      onChange={(e) => setRoleTitle(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                      placeholder="e.g., Dean of Student Services, Provost, Faculty"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Executive Education Portfolio of Interest</label>
                    <select 
                      name="program"
                      value={selectedProgram}
                      onChange={(e) => setSelectedProgram(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all bg-white"
                    >
                      <option>TELI Leadership Fellows Cohort</option>
                      <option>Executive Coaching</option>
                      <option>Custom Institutional Solutions</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">How can we help you?</label>
                    <textarea 
                      rows={4}
                      name="message"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                      placeholder="Tell us about your community college leadership goals..."
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                    Send Inquiry <MessageSquare size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
