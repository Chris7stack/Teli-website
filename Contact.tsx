import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, Mail, MessageSquare, Clock, Phone, 
  Send, Loader2, CheckCircle, AlertCircle, Building, BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  institution: string;
  role: string;
  program: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    institution: '',
    role: '',
    program: 'Executive Leadership Portfolio',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send inquiry. Please try again.');
      }

      setSubmitSuccess(true);
    } catch (err: any) {
      console.error('Contact submission error:', err);
      setSubmitError(err.message || 'An error occurred while submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-primary bg-brand-primary/5 px-4 py-1.5 rounded-full inline-block mb-4">
            Connect With Us
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-slate-900 mb-6">Get in Touch</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Have questions about our Executive Education portfolios or want to discuss a strategic partnership? 
            Our team is here to help you navigate your community college leadership journey.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Side Panel: Information Column (1/3 Width) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-8">
              <h3 className="text-xl font-serif font-bold text-slate-900 border-b border-slate-100 pb-4">Office Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-primary/5 p-3 rounded-xl text-brand-primary shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800 mb-1">Our Location</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      TELI Global Headquarters<br />
                      Hayward, California 94542
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-brand-primary/5 p-3 rounded-xl text-brand-primary shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800 mb-1">General Inquiries</h4>
                    <p className="text-slate-500 text-xs">
                      <a href="mailto:info@teli-global.org" className="hover:text-brand-primary hover:underline transition-colors font-medium">
                        info@teli-global.org
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-brand-primary/5 p-3 rounded-xl text-brand-primary shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800 mb-1">Operation Hours</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      Monday – Friday<br />
                      9:00 AM – 5:00 PM Pacific Time
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-brand-accent/10 p-8 rounded-3xl border border-brand-accent/20 space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-brand-primary flex items-center gap-1.5">
                <Clock size={16} /> Database Driven
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                Inquiries are saved into our database immediately and processed securely. You do not need to configure complex mail setups.
              </p>
            </div>
          </div>

          {/* Form Column (2/3 Width) */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {submitSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200/80 shadow-md text-center space-y-6"
                >
                  <div className="mx-auto w-16 h-16 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center">
                    <CheckCircle size={32} />
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-2xl font-serif font-bold text-slate-900">Inquiry Received</h2>
                    <p className="text-slate-500 text-sm max-w-md mx-auto">
                      Thank you for contacting TELI. Your inquiry was saved to our administrative system, and our advisory committee will reply via email soon.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex justify-center gap-4">
                    <button 
                      onClick={() => setSubmitSuccess(false)}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-brand-primary bg-brand-primary/5 hover:bg-brand-primary/10 transition-colors"
                    >
                      Send Another Inquiry
                    </button>
                    <Link 
                      to="/admin-portal" 
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200"
                    >
                      View Administrative Logs
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden"
                >
                  {/* Form Title Banner */}
                  <div className="bg-slate-900 px-6 py-5 md:px-10 flex items-center gap-4 border-b border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Inquiry Submission Form</h3>
                      <p className="text-[11px] text-slate-400">Direct Contact with TELI Executive Leadership</p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-6">
                    
                    <div className="flex items-center gap-2 text-brand-primary pb-2 border-b border-slate-100">
                      <BookOpen size={16} />
                      <h4 className="font-bold text-xs uppercase tracking-wider">Your Identity</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">First Name *</label>
                        <input 
                          type="text" 
                          name="firstName" 
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Jane"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none text-xs transition-all bg-slate-50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Last Name *</label>
                        <input 
                          type="text" 
                          name="lastName" 
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Smith"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none text-xs transition-all bg-slate-50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Email Address *</label>
                        <input 
                          type="email" 
                          name="email" 
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="jane.smith@institution.edu"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none text-xs transition-all bg-slate-50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Phone Number</label>
                        <input 
                          type="tel" 
                          name="phone" 
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(415) 555-0122"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none text-xs transition-all bg-slate-50"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-brand-primary pt-2 pb-2 border-b border-slate-100">
                      <Building size={16} />
                      <h4 className="font-bold text-xs uppercase tracking-wider">Institution Profile</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Institution Name</label>
                        <input 
                          type="text" 
                          name="institution" 
                          value={formData.institution}
                          onChange={handleInputChange}
                          placeholder="e.g. Ohlone Community College"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none text-xs transition-all bg-slate-50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Current Role / Title</label>
                        <input 
                          type="text" 
                          name="role" 
                          value={formData.role}
                          onChange={handleInputChange}
                          placeholder="e.g. Dean of Academic Affairs"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none text-xs transition-all bg-slate-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Portfolio of Interest *</label>
                      <select 
                        name="program"
                        value={formData.program}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none text-xs transition-all bg-slate-50 font-medium"
                      >
                        <option value="Executive Leadership Portfolio">Executive Leadership Portfolio</option>
                        <option value="Community College Trustees Program">Community College Trustees Program</option>
                        <option value="State Education Policy Initiatives">State Education Policy Initiatives</option>
                        <option value="General Question or Consultation">General Question or Consultation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Inquiry Message *</label>
                      <textarea 
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Detail your questions or outline how we can assist you..."
                        className="w-full p-4 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none text-xs transition-all bg-slate-50 leading-relaxed font-sans"
                      ></textarea>
                    </div>

                    {submitError && (
                      <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex gap-3 text-red-700 text-xs font-medium">
                        <AlertCircle size={16} className="shrink-0 text-red-500 mt-0.5" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="btn-primary w-full py-3.5 flex justify-center items-center gap-2 text-xs font-bold disabled:opacity-85 disabled:cursor-not-allowed shadow-md shadow-brand-primary/10"
                    >
                      {isSubmitting ? (
                        <>Submitting Inquiry... <Loader2 size={16} className="animate-spin" /></>
                      ) : (
                        <>Send Message Inquiry <Send size={14} /></>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
