import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Key, Download, Search, FileText, RefreshCw, Eye, 
  Calendar, Building2, Briefcase, Mail, Phone, 
  ShieldCheck, ShieldAlert, ArrowLeft, ExternalLink, X 
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ContactSubmission {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  institution: string;
  role: string;
  program: string;
  message: string;
  timestamp: string;
}

interface ApplicationSubmission {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  institution: string;
  role: string;
  experience: string;
  statement: string;
  challenges: string;
  mentor_preference: string;
  resume_name: string;
  resume_base64: string;
  app_ref_id: string;
  timestamp: string;
}

export default function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'applications' | 'contacts'>('applications');
  
  const [applications, setApplications] = useState<ApplicationSubmission[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState<ApplicationSubmission | null>(null);
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);

  // Auto-login if password is saved in sessionStorage
 useEffect(() => {
  restoreSession();
}, []);

const restoreSession = async () => {
  setIsLoading(true);
  setErrorMsg('');

  try {
    const response = await fetch('/api/admin/submissions', {
      method: 'GET',
      credentials: 'same-origin',
    });

    if (response.status === 401) {
      setIsAuthenticated(false);
      return;
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || 'Unable to restore the administrative session.'
      );
    }

    setApplications(data.applications || []);
    setContacts(data.contacts || []);
    setIsAuthenticated(true);
  } catch (err: any) {
    setIsAuthenticated(false);
    setErrorMsg(err.message || 'Unable to restore session.');
  } finally {
    setIsLoading(false);
  }
};

const handleLoginSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  verifyPassword(password);
};

  const verifyPassword = async (pwdToVerify: string) => {
  setIsLoading(true);
  setErrorMsg('');

  try {
    const loginResponse = await fetch('/api/admin/login', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: pwdToVerify,
      }),
    });

    const loginData = await loginResponse.json();

    if (!loginResponse.ok) {
      throw new Error(
        loginData.error || 'Authentication failed.'
      );
    }

    const submissionsResponse = await fetch(
      '/api/admin/submissions',
      {
        method: 'GET',
        credentials: 'same-origin',
      }
    );

    const submissionsData =
      await submissionsResponse.json();

    if (!submissionsResponse.ok) {
      throw new Error(
        submissionsData.error ||
          'Unable to load administrative submissions.'
      );
    }

    setApplications(submissionsData.applications || []);
    setContacts(submissionsData.contacts || []);
    setIsAuthenticated(true);
    setPassword('');
  } catch (err: any) {
    setIsAuthenticated(false);
    setErrorMsg(
      err.message ||
        'Access denied. Invalid administrative password.'
    );
  } finally {
    setIsLoading(false);
  }
};

  const handleRefresh = async () => {
  await restoreSession();
};
    }
  };

  const handleLogout = async () => {
  try {
    await fetch('/api/admin/logout', {
      method: 'POST',
      credentials: 'same-origin',
    });
  } finally {
    setIsAuthenticated(false);
    setPassword('');
    setApplications([]);
    setContacts([]);
    setErrorMsg('');
  }
};

  // Resume Download Helper
  const downloadResume = (app: ApplicationSubmission) => {
    if (!app.resume_base64) {
      alert('No resume attached to this application.');
      return;
    }

    try {
      const base64Content = app.resume_base64;
      // Handle data URL split if present
      const rawBase64 = base64Content.includes('base64,') 
        ? base64Content.split('base64,')[1] 
        : base64Content;

      const byteCharacters = atob(rawBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      
      // Determine content type
      let contentType = 'application/octet-stream';
      if (app.resume_name.toLowerCase().endsWith('.pdf')) {
        contentType = 'application/pdf';
      } else if (app.resume_name.toLowerCase().endsWith('.docx')) {
        contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      }

      const blob = new Blob([byteArray], { type: contentType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = app.resume_name || `resume_${app.first_name}_${app.last_name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to parse or download resume file:', err);
      alert('Error parsing resume file download.');
    }
  };

  // Export Table to CSV
  const exportToCSV = () => {
    let csvContent = '';
    let fileName = '';

    if (activeTab === 'applications') {
      fileName = 'TELI_Fellowship_Applications.csv';
      const headers = [
        'ID', 'Ref ID', 'First Name', 'Last Name', 'Email', 'Phone', 
        'Institution', 'Role/Title', 'Experience (Years)', 'Mentor Preference', 
        'Statement of Purpose', 'Institutional Challenges', 'Resume Name', 'Submitted At'
      ];
      csvContent += headers.map(h => `"${h.replace(/"/g, '""')}"`).join(',') + '\n';

      applications.forEach(app => {
        const row = [
          app.id,
          app.app_ref_id,
          app.first_name,
          app.last_name,
          app.email,
          app.phone,
          app.institution,
          app.role,
          app.experience,
          app.mentor_preference,
          app.statement,
          app.challenges,
          app.resume_name,
          app.timestamp
        ];
        csvContent += row.map(v => `"${String(v || '').replace(/"/g, '""')}"`).join(',') + '\n';
      });
    } else {
      fileName = 'TELI_Contact_Inquiries.csv';
      const headers = [
        'ID', 'First Name', 'Last Name', 'Email', 'Phone', 
        'Institution', 'Role/Title', 'Portfolio of Interest', 'Message', 'Submitted At'
      ];
      csvContent += headers.map(h => `"${h.replace(/"/g, '""')}"`).join(',') + '\n';

      contacts.forEach(c => {
        const row = [
          c.id,
          c.first_name,
          c.last_name,
          c.email,
          c.phone,
          c.institution,
          c.role,
          c.program,
          c.message,
          c.timestamp
        ];
        csvContent += row.map(v => `"${String(v || '').replace(/"/g, '""')}"`).join(',') + '\n';
      });
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Filtering
  const filteredApps = applications.filter(app => {
    const q = searchQuery.toLowerCase();
    return (
      app.first_name.toLowerCase().includes(q) ||
      app.last_name.toLowerCase().includes(q) ||
      app.email.toLowerCase().includes(q) ||
      app.institution.toLowerCase().includes(q) ||
      app.app_ref_id.toLowerCase().includes(q) ||
      app.role.toLowerCase().includes(q)
    );
  });

  const filteredContacts = contacts.filter(c => {
    const q = searchQuery.toLowerCase();
    return (
      c.first_name.toLowerCase().includes(q) ||
      c.last_name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.institution.toLowerCase().includes(q) ||
      c.program.toLowerCase().includes(q) ||
      c.message.toLowerCase().includes(q)
    );
  });

  return (
    <div className="pt-24 md:pt-[110px] min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header Bar */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 md:px-12 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 text-slate-900 font-serif font-bold text-lg hover:opacity-80 transition-opacity">
            <span className="bg-brand-primary text-white w-8 h-8 rounded flex items-center justify-center font-bold font-serif">T</span>
            TELI Global Admin
          </Link>
          <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full border border-slate-200/80 font-mono font-medium">Submissions Engine</span>
        </div>
        
        {isAuthenticated && (
          <div className="flex items-center gap-4">
            <button 
              onClick={handleRefresh}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
              title="Refresh Submission Database"
            >
              <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
            </button>
            <button 
              onClick={handleLogout}
              className="text-xs font-bold text-slate-600 hover:text-red-600 bg-slate-100 hover:bg-red-50 border border-slate-200 hover:border-red-100 px-4 py-2 rounded-xl transition-all"
            >
              Sign Out
            </button>
          </div>
        )}
      </header>

      {/* Main Content Box */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        {!isAuthenticated ? (
          /* LOGIN PANEL */
          <div className="max-w-md mx-auto my-20">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200/80 shadow-sm"
            >
              <div className="text-center space-y-3 mb-8">
                <div className="mx-auto w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                  <ShieldCheck size={26} />
                </div>
                <h2 className="text-2xl font-serif font-bold text-slate-900">Administrative Sign In</h2>
                <p className="text-slate-500 text-sm max-w-xs mx-auto">
                  Enter your administrative access credentials to manage and export submissions securely.
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Access Password</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                      <Key size={16} />
                    </span>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all text-sm bg-slate-50"
                    />
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex gap-3 text-red-700 text-xs font-medium">
                    <ShieldAlert size={16} className="shrink-0 text-red-500" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="btn-primary w-full py-3.5 flex justify-center items-center gap-2 text-sm"
                >
                  {isLoading ? 'Verifying Credentials...' : 'Authenticate Access'}
                </button>
              </form>
            </motion.div>
          </div>
        ) : (
          /* SECURED ADMIN WORKSPACE */
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Dashboard Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Fellowship Applications</p>
                  <h3 className="text-3xl font-serif font-bold text-slate-900 mt-1">{applications.length}</h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-brand-primary/5 flex items-center justify-center text-brand-primary font-semibold">
                  {applications.length > 0 ? '✓' : '0'}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Contact Inquiries</p>
                  <h3 className="text-3xl font-serif font-bold text-slate-900 mt-1">{contacts.length}</h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 font-semibold">
                  {contacts.length > 0 ? '✉' : '0'}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Database Status</p>
                  <p className="text-sm font-semibold text-emerald-600 mt-2 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
                    Online & Active
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 text-sm font-mono font-bold">
                  SQLite
                </div>
              </div>
            </div>

            {/* Submissions Section Controls */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Custom Tabs */}
                <div className="flex gap-2 bg-slate-100 p-1 rounded-xl shrink-0 self-start">
                  <button 
                    onClick={() => { setActiveTab('applications'); setSearchQuery(''); }}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'applications' ? 'bg-white shadow-sm text-brand-primary' : 'text-slate-500 hover:text-slate-900'}`}
                  >
                    Fellowship Applications ({applications.length})
                  </button>
                  <button 
                    onClick={() => { setActiveTab('contacts'); setSearchQuery(''); }}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'contacts' ? 'bg-white shadow-sm text-brand-primary' : 'text-slate-500 hover:text-slate-900'}`}
                  >
                    Contact Inquiries ({contacts.length})
                  </button>
                </div>

                {/* Search Bar & Export Action */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                  <div className="relative flex-grow sm:w-64">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                      <Search size={14} />
                    </span>
                    <input 
                      type="text" 
                      placeholder={`Search ${activeTab === 'applications' ? 'applications' : 'inquiries'}...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none text-xs transition-all bg-white"
                    />
                  </div>

                  <button 
                    onClick={exportToCSV}
                    disabled={(activeTab === 'applications' ? filteredApps : filteredContacts).length === 0}
                    className="btn-primary py-2 px-4 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Download size={14} /> Export to CSV
                  </button>
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto">
                {activeTab === 'applications' ? (
                  /* Applications Table */
                  filteredApps.length > 0 ? (
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-wider bg-slate-50/20">
                          <th className="py-4 px-6">ID / Ref</th>
                          <th className="py-4 px-6">Applicant Name</th>
                          <th className="py-4 px-6">Institution / Current Role</th>
                          <th className="py-4 px-6">Exp (Yrs)</th>
                          <th className="py-4 px-6">Resume</th>
                          <th className="py-4 px-6 text-center">Submission Date</th>
                          <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {filteredApps.map(app => (
                          <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="py-4 px-6 font-mono font-medium text-slate-400">
                              <span className="text-slate-900 block font-bold">{app.app_ref_id}</span>
                              ID: {app.id}
                            </td>
                            <td className="py-4 px-6">
                              <span className="font-bold text-slate-900 block">{app.first_name} {app.last_name}</span>
                              <span className="text-slate-400 text-[11px] block">{app.email}</span>
                              {app.phone && <span className="text-slate-400 text-[11px] block">{app.phone}</span>}
                            </td>
                            <td className="py-4 px-6">
                              <span className="text-slate-800 block font-medium">{app.institution || 'None specified'}</span>
                              <span className="text-slate-400 text-[11px] block">{app.role || 'N/A'}</span>
                            </td>
                            <td className="py-4 px-6 font-medium text-slate-700">{app.experience || '—'} yrs</td>
                            <td className="py-4 px-6">
                              {app.resume_name ? (
                                <button 
                                  onClick={() => downloadResume(app)}
                                  className="inline-flex items-center gap-1 text-[11px] text-brand-primary hover:text-brand-accent hover:underline font-semibold bg-brand-primary/5 hover:bg-brand-primary/10 px-2 py-1 rounded border border-brand-primary/10 transition-all"
                                >
                                  <FileText size={11} /> {app.resume_name}
                                </button>
                              ) : (
                                <span className="text-slate-400 italic">No resume</span>
                              )}
                            </td>
                            <td className="py-4 px-6 text-center text-slate-500 font-mono text-[11px]">
                              {app.timestamp ? new Date(app.timestamp).toLocaleDateString() : 'N/A'}
                            </td>
                            <td className="py-4 px-6 text-right">
                              <button 
                                onClick={() => setSelectedApp(app)}
                                className="text-slate-500 hover:text-brand-primary hover:bg-slate-100 p-2 rounded-lg transition-all"
                                title="View Application Details"
                              >
                                <Eye size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="py-20 text-center">
                      <p className="text-slate-400 text-sm font-medium">No fellowship applications found matching "{searchQuery}"</p>
                    </div>
                  )
                ) : (
                  /* Contact Inquiries Table */
                  filteredContacts.length > 0 ? (
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-wider bg-slate-50/20">
                          <th className="py-4 px-6">ID</th>
                          <th className="py-4 px-6">Inquirer Name</th>
                          <th className="py-4 px-6">Institution / Current Role</th>
                          <th className="py-4 px-6">Portfolio Interest</th>
                          <th className="py-4 px-6">Message Preview</th>
                          <th className="py-4 px-6 text-center">Inquiry Date</th>
                          <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {filteredContacts.map(c => (
                          <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="py-4 px-6 font-mono text-slate-400">#{c.id}</td>
                            <td className="py-4 px-6">
                              <span className="font-bold text-slate-900 block">{c.first_name} {c.last_name}</span>
                              <span className="text-slate-400 text-[11px] block">{c.email}</span>
                              {c.phone && <span className="text-slate-400 text-[11px] block">{c.phone}</span>}
                            </td>
                            <td className="py-4 px-6">
                              <span className="text-slate-800 block font-medium">{c.institution || 'None specified'}</span>
                              <span className="text-slate-400 text-[11px] block">{c.role || 'N/A'}</span>
                            </td>
                            <td className="py-4 px-6">
                              <span className="bg-brand-primary/5 text-brand-primary border border-brand-primary/10 px-2 py-0.5 rounded-full font-medium text-[10px]">
                                {c.program}
                              </span>
                            </td>
                            <td className="py-4 px-6 max-w-xs truncate text-slate-500">
                              {c.message}
                            </td>
                            <td className="py-4 px-6 text-center text-slate-500 font-mono text-[11px]">
                              {c.timestamp ? new Date(c.timestamp).toLocaleDateString() : 'N/A'}
                            </td>
                            <td className="py-4 px-6 text-right">
                              <button 
                                onClick={() => setSelectedContact(c)}
                                className="text-slate-500 hover:text-brand-primary hover:bg-slate-100 p-2 rounded-lg transition-all"
                                title="View Contact Inquiry"
                              >
                                <Eye size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="py-20 text-center">
                      <p className="text-slate-400 text-sm font-medium">No contact inquiries found matching "{searchQuery}"</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* DETAIL MODALS */}
      <AnimatePresence>
        {selectedApp && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-brand-primary uppercase font-mono bg-brand-primary/5 px-2.5 py-1 rounded border border-brand-primary/10">
                    Application ID: {selectedApp.app_ref_id}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-slate-900 mt-2">
                    {selectedApp.first_name} {selectedApp.last_name}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedApp(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto space-y-6 text-sm leading-relaxed">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Email Address</span>
                    <a href={`mailto:${selectedApp.email}`} className="text-brand-primary hover:underline font-semibold block">{selectedApp.email}</a>
                  </div>
                  {selectedApp.phone && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Phone Number</span>
                      <span className="text-slate-700 font-medium block">{selectedApp.phone}</span>
                    </div>
                  )}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Institution</span>
                    <span className="text-slate-700 font-medium block">{selectedApp.institution || 'Not specified'}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Current Role / Title</span>
                    <span className="text-slate-700 font-medium block">{selectedApp.role || 'Not specified'}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Leadership Experience</span>
                    <span className="text-slate-700 font-medium block">{selectedApp.experience ? `${selectedApp.experience} Years` : 'Not specified'}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Mentor Preference</span>
                    <span className="text-slate-700 font-medium block">{selectedApp.mentor_preference || 'No preference'}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Statement of Purpose</h4>
                  <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 whitespace-pre-wrap text-slate-700 text-xs leading-relaxed max-h-48 overflow-y-auto">
                    {selectedApp.statement}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Institutional Challenges Response</h4>
                  <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 whitespace-pre-wrap text-slate-700 text-xs leading-relaxed max-h-48 overflow-y-auto">
                    {selectedApp.challenges}
                  </div>
                </div>

                {selectedApp.resume_name && (
                  <div className="pt-2">
                    <button 
                      onClick={() => downloadResume(selectedApp)}
                      className="btn-primary w-full py-3 text-xs flex justify-center items-center gap-2"
                    >
                      <Download size={14} /> Download Candidate Resume ({selectedApp.resume_name})
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {selectedContact && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-brand-primary uppercase font-mono bg-brand-primary/5 px-2.5 py-1 rounded border border-brand-primary/10">
                    Contact Inquiry #{selectedContact.id}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-slate-900 mt-2">
                    {selectedContact.first_name} {selectedContact.last_name}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedContact(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto space-y-5 text-sm leading-relaxed">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Email Address</span>
                    <a href={`mailto:${selectedContact.email}`} className="text-brand-primary hover:underline font-semibold block">{selectedContact.email}</a>
                  </div>
                  {selectedContact.phone && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Phone Number</span>
                      <span className="text-slate-700 font-medium block">{selectedContact.phone}</span>
                    </div>
                  )}
                  <div className="space-y-1 col-span-1 sm:col-span-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Institution & Role</span>
                    <span className="text-slate-700 font-medium block">
                      {selectedContact.role ? `${selectedContact.role} at ` : ''}
                      {selectedContact.institution || 'Not specified'}
                    </span>
                  </div>
                  <div className="space-y-1 col-span-1 sm:col-span-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Portfolio of Interest</span>
                    <span className="text-slate-700 font-semibold block">{selectedContact.program}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Inquiry Message</h4>
                  <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 whitespace-pre-wrap text-slate-700 text-xs leading-relaxed max-h-64 overflow-y-auto">
                    {selectedContact.message}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
