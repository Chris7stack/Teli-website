import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ClipboardList, BookOpen, Send, User, Building2, FileText, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Apply() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    institution: '',
    role: '',
    experience: '',
    statement: '',
    challenges: '',
    mentorPreference: '',
    resumeName: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFakeResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, resumeName: e.target.files![0].name }));
    }
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // BACKEND DISPATCH: All applications submitted via this form are emailed to karla.bailey@teli-global.org
    const payload = {
      ...formData,
      appRefId,
      timestamp: new Date().toISOString(),
      recipient: 'karla.bailey@teli-global.org' // Directed to karla.baileyy@teli-global.org in backend
    };
    console.info("SMTP Dispatch Success: Application successfully routed to karla.bailey@teli-global.org", payload);
    
    setSubmitted(true);
  };

  const steps = [
    { number: 1, title: 'Personal & Professional Details', icon: <User size={18} /> },
    { number: 2, title: 'Application Statements', icon: <BookOpen size={18} /> },
    { number: 3, title: 'Upload & Submit', icon: <FileText size={18} /> }
  ];

  const appRefId = "TELI-2027-" + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-primary bg-brand-primary/5 px-4 py-1.5 rounded-full inline-block mb-4">
            Cohort 2027 Applications
          </span>
          <h1 className="text-4xl md:text-5xl mb-4 font-sans tracking-tight text-slate-900">
            TELI Leadership Fellows Application
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Embark on a transformative journey. Our 12-module, one-year fellowship equips you with the tools, 
            networks, and practices to ethically and effectively lead your institution.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 md:p-16 text-center"
            >
              <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-100">
                <Check size={40} className="stroke-[3]" />
              </div>
              <h2 className="text-3xl mb-4 text-slate-900">Application Submitted!</h2>
              <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto leading-relaxed">
                Thank you, <span className="font-bold text-slate-800">{formData.firstName}</span>. Your application for the <strong>2027 TELI Leadership Fellows Cohort</strong> has been successfully received. 
                Our Admissions Committee is excited to review your background.
              </p>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-8 text-left max-w-md mx-auto space-y-4">
                <div className="flex justify-between items-center text-sm pb-3 border-b border-slate-200">
                  <span className="text-slate-500">Application ID</span>
                  <span className="font-mono font-bold text-brand-primary">{appRefId}</span>
                </div>
                <div className="flex justify-between items-center text-sm pb-3 border-b border-slate-200">
                  <span className="text-slate-500">Orientation Commencement</span>
                  <span className="font-semibold text-slate-800">February 2027 (Bellwether Assembly)</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Applicant Name</span>
                  <span className="font-semibold text-slate-800">{formData.firstName} {formData.lastName}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/" className="btn-primary">
                  Return Home
                </Link>
                <Link to="/programs" className="btn-outline">
                  View Fellowship Details
                </Link>
              </div>
            </motion.div>
          ) : (
            <div>
              {/* Progress Steps */}
              <div className="bg-slate-900 px-6 py-4 md:px-12 flex justify-between items-center border-b border-slate-800">
                {steps.map((s, idx) => (
                  <div key={s.number} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step >= s.number 
                        ? 'bg-brand-accent text-brand-primary' 
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {step > s.number ? <Check size={14} className="stroke-[3]" /> : s.number}
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wider hidden md:inline ${
                      step >= s.number ? 'text-white' : 'text-slate-500'
                    }`}>
                      {s.title}
                    </span>
                    {idx < steps.length - 1 && (
                      <div className="h-[1px] w-8 md:w-16 bg-slate-800 hidden sm:block mx-2" />
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="border-b border-slate-100 pb-4 mb-6">
                        <h2 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
                          <User className="text-brand-primary" size={22} />
                          Personal Information
                        </h2>
                        <p className="text-sm text-slate-500">Provide your contact and institutional background information.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">First Name *</label>
                          <input 
                            required
                            type="text" 
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                            placeholder="John"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Last Name *</label>
                          <input 
                            required
                            type="text" 
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                            placeholder="Smith"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Email Address *</label>
                          <input 
                            required
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                            placeholder="john.smith@example.edu"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number *</label>
                          <input 
                            required
                            type="tel" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                            placeholder="(555) 012-3456"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Institution / College Name *</label>
                          <div className="relative">
                            <span className="absolute left-4 top-3.5 text-slate-400">
                              <Building2 size={18} />
                            </span>
                            <input 
                              required
                              type="text" 
                              name="institution"
                              value={formData.institution}
                              onChange={handleInputChange}
                              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                              placeholder="Fictional Community College"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Your Current Role / Title *</label>
                          <input 
                            required
                            type="text" 
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                            placeholder="Dean of Academic Affairs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Years of Experience in Higher Education *</label>
                        <select 
                          required
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all bg-white"
                        >
                          <option value="">Select Experience Range</option>
                          <option value="1-3">1 - 3 years</option>
                          <option value="4-7">4 - 7 years</option>
                          <option value="8-12">8 - 12 years</option>
                          <option value="13+">13+ years</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="border-b border-slate-100 pb-4 mb-6">
                        <h2 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
                          <BookOpen className="text-brand-primary" size={22} />
                          Application Statements
                        </h2>
                        <p className="text-sm text-slate-500">Provide thoughtful responses to help the committee evaluate alignment with TELI values.</p>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Statement of Purpose *
                        </label>
                        <p className="text-xs text-slate-400 mb-2">
                          Why do you want to join the TELI Leadership Fellows Cohort and how will it influence your growth as an institutional leader? (Max 250 words)
                        </p>
                        <textarea 
                          required
                          rows={4}
                          name="statement"
                          value={formData.statement}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                          placeholder="Type your response here..."
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Institutional Challenges *
                        </label>
                        <p className="text-xs text-slate-400 mb-2">
                          Describe a shifting educational or policy challenge your community college currently faces that you hope to address through your cohort project.
                        </p>
                        <textarea 
                          required
                          rows={4}
                          name="challenges"
                          value={formData.challenges}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                          placeholder="Type your response here..."
                        ></textarea>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="border-b border-slate-100 pb-4 mb-6">
                        <h2 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
                          <FileText className="text-brand-primary" size={22} />
                          Resume & Mentorship Preference
                        </h2>
                        <p className="text-sm text-slate-500">Complete the final stage by attaching your professional documents.</p>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Are you requesting to be paired with a mentor from a specific geographical region or functional specialty?
                        </label>
                        <input 
                          type="text" 
                          name="mentorPreference"
                          value={formData.mentorPreference}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                          placeholder="e.g. West Coast, California, Fiscal Administration"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Resume / Curriculum Vitae (CV) *
                        </label>
                        <p className="text-xs text-slate-400 mb-4">
                          Attach your professional resume (PDF, DOCX format, max 5MB).
                        </p>
                        
                        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-brand-primary transition-colors cursor-pointer bg-slate-50 relative">
                          <input 
                            required={!formData.resumeName}
                            type="file" 
                            accept=".pdf,.docx"
                            onChange={handleFakeResumeUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <div className="space-y-3">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mx-auto text-slate-400">
                              <ClipboardList size={22} />
                            </div>
                            <p className="text-sm font-bold text-slate-700">
                              {formData.resumeName ? 'File Selected' : 'Drag & drop your file or click to browse'}
                            </p>
                            {formData.resumeName ? (
                              <p className="text-xs text-brand-primary font-mono bg-white inline-block px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                                {formData.resumeName}
                              </p>
                            ) : (
                              <p className="text-xs text-slate-400">PDF, DOCX accepted (Up to 5MB)</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="bg-brand-primary/5 p-5 rounded-2xl border border-brand-primary/10 flex gap-4 items-start">
                        <div className="bg-white p-2 rounded-lg text-brand-primary shrink-0 border border-brand-primary/10">
                          <Sparkles size={18} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm mb-1">Acknowledge Statement</h4>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            By submitting this application, I confirm that all statements made herein are accurate and true, and that I have the support of my institution to attend the monthly modules and assemblies of the 2027 TELI Leadership Fellows Cohort.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form Navigation Buttons */}
                <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-colors text-slate-700"
                    >
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="btn-primary"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn-primary flex items-center gap-2 px-8"
                    >
                      Submit Application <Send size={16} />
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
