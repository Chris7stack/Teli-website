import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ClipboardList, User, Building, Landmark, GraduationCap, 
  BookOpen, Compass, FileText, Upload, CheckCircle, 
  ArrowRight, ArrowLeft, Loader2, AlertCircle, Info, ShieldCheck
} from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  institution: string;
  role: string;
  experience: string;
  statement: string;
  challenges: string;
  mentorPreference: string;
}

export default function Apply() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    institution: '',
    role: '',
    experience: '1-3',
    statement: '',
    challenges: '',
    mentorPreference: '',
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeBase64, setResumeBase64] = useState<string>('');
  const [resumeName, setResumeName] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [appRefId, setAppRefId] = useState('');

  // Handle standard text inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) { // 8MB Max size
        alert('File size exceeds the 8MB limit.');
        return;
      }
      setResumeFile(file);
      setResumeName(file.name);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setResumeBase64(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // Validation helpers per step
  const validateStep1 = () => {
    return (
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.institution.trim() !== '' &&
      formData.role.trim() !== ''
    );
  };

  const validateStep2 = () => {
    return (
      formData.statement.trim().length >= 10 &&
      formData.challenges.trim().length >= 10
    );
  };

  const handleNextStep = () => {
    if (step === 1 && !validateStep1()) {
      alert('Please fill out all required fields.');
      return;
    }
    if (step === 2 && !validateStep2()) {
      alert('Please complete the written statements (at least 10 characters long).');
      return;
    }
    setStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate a random Reference ID for the candidate
  const generateRefId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'TELI-2027-';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      alert('Please upload your professional resume / CV to complete the application.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    const generatedId = generateRefId();
    const payload = {
      ...formData,
      resumeName,
      resumeBase64,
      appRefId: generatedId,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application. Please check your inputs.');
      }

      setAppRefId(generatedId);
      setSubmitSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Submission error:', err);
      setSubmitError(err.message || 'We encountered an error processing your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepsList = [
    { num: 1, title: "Academic & Career Background" },
    { num: 2, title: "Statement & Responses" },
    { num: 3, title: "CV Upload & Confirm" }
  ];

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Banner Section */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-primary bg-brand-primary/5 px-4 py-1.5 rounded-full inline-block mb-4">
            Cohort 2027 Executive Fellowship
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-slate-900 mb-4">
            TELI Leadership Fellows Program
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Take a defining step in your professional community college leadership journey. Complete the form 
            below to apply for the fully sponsored 2027 cohort.
          </p>
        </div>

        {/* Progress Tracker (Steps Indicator) */}
        {!submitSuccess && (
          <div className="mb-10 bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {stepsList.map((s, idx) => (
                <div key={s.num} className="flex items-center gap-3 w-full sm:w-auto">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs transition-all ${
                    step === s.num 
                      ? 'bg-brand-primary text-white ring-4 ring-brand-primary/15'
                      : step > s.num
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 text-slate-400'
                  }`}>
                    {step > s.num ? '✓' : s.num}
                  </div>
                  <div className="text-left">
                    <p className={`text-[11px] uppercase tracking-wider font-bold ${step === s.num ? 'text-brand-primary' : 'text-slate-400'}`}>Step 0{s.num}</p>
                    <p className="text-xs font-semibold text-slate-700">{s.title}</p>
                  </div>
                  {idx < stepsList.length - 1 && (
                    <div className="hidden lg:block w-12 h-0.5 bg-slate-100 mx-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Success Card */}
        {submitSuccess ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200/80 shadow-md text-center space-y-6"
          >
            <div className="mx-auto w-16 h-16 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center shadow-xs">
              <CheckCircle size={36} />
            </div>
            
            <div className="space-y-3">
              <h2 className="text-3xl font-serif font-bold text-slate-900">Application Submitted Successfully!</h2>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                Thank you for applying to the TELI Leadership Fellows Program. Your candidate profiles and resume have been securely locked into our roster database.
              </p>
            </div>

            <div className="max-w-sm mx-auto bg-slate-50 p-6 rounded-2xl border border-slate-150 space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Application Reference ID</span>
                <span className="block font-mono text-lg font-bold text-brand-primary">{appRefId}</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                Please save this reference number for correspondence. Our Selection and Governance board will review applications and follow up by November 2026.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/" className="text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-6 py-3 rounded-xl transition-all">
                Return to Home
              </Link>
              <Link to="/admin-portal" className="text-xs font-bold text-brand-primary bg-brand-primary/5 hover:bg-brand-primary/10 border border-brand-primary/10 px-6 py-3 rounded-xl transition-all">
                Access Admin Dashboard
              </Link>
            </div>
          </motion.div>
        ) : (
          /* APPLICATION FORM CARDS */
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
            
            {/* Header branding */}
            <div className="bg-slate-900 px-6 py-5 md:px-10 flex items-center gap-4 border-b border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                <ClipboardList size={22} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Cohort 2027 Registration Portal</h3>
                <p className="text-[11px] text-slate-400">Transformative Education Leadership Institute Intake</p>
              </div>
            </div>

            {/* Step Content */}
            <div className="p-6 md:p-10 space-y-6">
              
              {/* STEP 1: Personal & Career Background */}
              {step === 1 && (
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-2 text-brand-primary pb-2 border-b border-slate-100">
                    <User size={18} />
                    <h4 className="font-bold text-xs uppercase tracking-wider">Candidate & Academic Identity</h4>
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
                        placeholder="John"
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
                        placeholder="Doe"
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
                        placeholder="john.doe@college.edu"
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
                        placeholder="(510) 555-0199"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none text-xs transition-all bg-slate-50"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-brand-primary pt-4 pb-2 border-b border-slate-100">
                    <Building size={18} />
                    <h4 className="font-bold text-xs uppercase tracking-wider">Institutional Profile</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Institution Name *</label>
                      <input 
                        type="text" 
                        name="institution" 
                        required
                        value={formData.institution}
                        onChange={handleInputChange}
                        placeholder="Chabot-Las Positas Community College"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none text-xs transition-all bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Current Role / Title *</label>
                      <input 
                        type="text" 
                        name="role" 
                        required
                        value={formData.role}
                        onChange={handleInputChange}
                        placeholder="Dean of Counseling & Student Services"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none text-xs transition-all bg-slate-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Leadership Experience Level *</label>
                    <select 
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none text-xs transition-all bg-slate-50 font-medium"
                    >
                      <option value="1-3">1 to 3 Years (Emerging Leader)</option>
                      <option value="4-7">4 to 7 Years (Mid-level Administrator)</option>
                      <option value="8-12">8 to 12 Years (Senior Director / Dean)</option>
                      <option value="13+">13+ Years (Executive / Vice President)</option>
                    </select>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Written Responses */}
              {step === 2 && (
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-2 text-brand-primary pb-2 border-b border-slate-100">
                    <BookOpen size={18} />
                    <h4 className="font-bold text-xs uppercase tracking-wider">Candidate Statements</h4>
                  </div>

                  <div className="bg-brand-primary/5 p-4 rounded-xl border border-brand-primary/10 flex gap-3 text-brand-primary text-xs leading-relaxed font-medium">
                    <Info size={16} className="shrink-0 text-brand-primary mt-0.5" />
                    <span>Your written responses are an integral component of the cohort review process. Please provide comprehensive, thoughtful answers highlighting your vision.</span>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">
                      Statement of Purpose * (Minimum 10 characters)
                    </label>
                    <p className="text-[11px] text-slate-400 mb-2 leading-normal">
                      Describe your leadership philosophy and how participating in the TELI Fellowship aligns with your career goals and service to community colleges.
                    </p>
                    <textarea 
                      name="statement"
                      required
                      rows={5}
                      value={formData.statement}
                      onChange={handleInputChange}
                      placeholder="My leadership philosophy revolves around..."
                      className="w-full p-4 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none text-xs transition-all bg-slate-50 leading-relaxed font-sans"
                    ></textarea>
                    <p className="text-right text-[10px] text-slate-400 font-mono">
                      Character count: {formData.statement.length}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">
                      Addressing Institutional Challenges Response * (Minimum 10 characters)
                    </label>
                    <p className="text-[11px] text-slate-400 mb-2 leading-normal">
                      Identify a critical operational or strategic hurdle currently faced by your college and discuss how equity-centered leadership can address it.
                    </p>
                    <textarea 
                      name="challenges"
                      required
                      rows={5}
                      value={formData.challenges}
                      onChange={handleInputChange}
                      placeholder="One of the principal challenges our college encounters today is..."
                      className="w-full p-4 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none text-xs transition-all bg-slate-50 leading-relaxed font-sans"
                    ></textarea>
                    <p className="text-right text-[10px] text-slate-400 font-mono">
                      Character count: {formData.challenges.length}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: CV Upload & Preferences */}
              {step === 3 && (
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-2 text-brand-primary pb-2 border-b border-slate-100">
                    <Compass size={18} />
                    <h4 className="font-bold text-xs uppercase tracking-wider">Mentorship & CV Submission</h4>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Preferred Mentor Specialty (Optional)</label>
                    <p className="text-[11px] text-slate-400 mb-2 leading-normal">
                      If accepted, what specific leadership specialty or domain would you prefer your professional mentor to represent?
                    </p>
                    <input 
                      type="text" 
                      name="mentorPreference" 
                      value={formData.mentorPreference}
                      onChange={handleInputChange}
                      placeholder="e.g., Equity-Centered Finance, State Policy Legislation, Student Success Initiatives"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none text-xs transition-all bg-slate-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">Professional Resume / CV *</label>
                    <p className="text-[11px] text-slate-400 mb-2 leading-normal">
                      Upload your current professional resume or curriculum vitae. PDF or Word Document formats supported (Maximum size: 8MB).
                    </p>

                    <div className="border-2 border-dashed border-slate-200 hover:border-brand-primary/50 rounded-2xl p-8 text-center bg-slate-50/50 hover:bg-slate-50 transition-all relative flex flex-col items-center justify-center">
                      <input 
                        type="file" 
                        accept=".pdf,.docx,.doc"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      
                      {resumeFile ? (
                        <div className="space-y-3">
                          <div className="mx-auto w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center border border-emerald-100">
                            <FileText size={24} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800">{resumeName}</p>
                            <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                              {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB • File Ready
                            </p>
                          </div>
                          <span className="inline-block text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100/50">
                            Selected
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="mx-auto w-12 h-12 bg-slate-100 text-slate-400 rounded-xl flex items-center justify-center">
                            <Upload size={22} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-700">Drag and drop file here, or click to browse</p>
                            <p className="text-[10px] text-slate-400 mt-1">PDF or Word files up to 8MB are accepted</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-150 space-y-2 text-xs leading-normal">
                    <div className="flex gap-2 items-center text-slate-700 font-bold">
                      <ShieldCheck size={16} className="text-brand-primary" />
                      <span>Administrative Submission Policy</span>
                    </div>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      Your application will be locked directly into our local administration database. 
                      No public exposure occurs. You can review or request deletion of your records anytime.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Server Submit Error Output */}
              {submitError && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex gap-3 text-red-700 text-xs font-medium">
                  <AlertCircle size={16} className="shrink-0 text-red-500 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}
            </div>

            {/* Bottom Form Actions */}
            <div className="bg-slate-50 border-t border-slate-100 py-4 px-6 md:px-10 flex justify-between items-center">
              {step > 1 ? (
                <button 
                  type="button"
                  onClick={handlePrevStep}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-all flex items-center gap-1.5 disabled:opacity-40"
                >
                  <ArrowLeft size={14} /> Back
                </button>
              ) : (
                <div /> // placeholder for alignment
              )}

              {step < 3 ? (
                <button 
                  type="button"
                  onClick={handleNextStep}
                  className="btn-primary py-2.5 px-6 rounded-xl flex items-center gap-1.5 text-xs font-bold"
                >
                  Continue <ArrowRight size={14} />
                </button>
              ) : (
                <button 
                  type="submit"
                  disabled={isSubmitting || !resumeFile}
                  className="btn-primary py-3 px-8 rounded-xl flex items-center justify-center gap-2 text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-brand-primary/10"
                >
                  {isSubmitting ? (
                    <>Submitting Application... <Loader2 size={16} className="animate-spin" /></>
                  ) : (
                    <>Submit Application Portfolio <CheckCircle size={16} /></>
                  )}
                </button>
              )}
            </div>

          </form>
        )}
        
      </div>
    </div>
  );
}
