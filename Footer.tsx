import { Link } from 'react-router-dom';
import { MapPin, Mail } from 'lucide-react';
import { TeliLogo } from './TeliLogo';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex items-center mb-6 group transition-transform duration-300 hover:scale-102">
            <TeliLogo className="h-14 md:h-16" theme="footer" />
          </Link>
          <p className="text-sm leading-relaxed">
            Empowering community college leaders to become more creative and transformative change agents in their colleges and communities.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/" className="hover:text-brand-accent transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-brand-accent transition-colors">About Us</Link></li>
            <li><Link to="/programs" className="hover:text-brand-accent transition-colors">Leadership Programs</Link></li>
            <li><Link to="/contact" className="hover:text-brand-accent transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Leadership Programs</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/programs" className="hover:text-brand-accent transition-colors">TELI Leadership Fellows</Link></li>
            <li><Link to="/programs" className="hover:text-brand-accent transition-colors">Executive Coaching</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Contact Info</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-brand-accent shrink-0" />
              <span>Hayward, CA 94542</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-brand-accent shrink-0" />
              <span>info@teli-global.org</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col md:row justify-between items-center gap-4 text-xs">
        <p>© {new Date().getFullYear()} Transformative Education Leadership Institute. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/admin-portal" className="hover:text-white">Admin Portal</Link>
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Accessibility</a>
        </div>
      </div>
    </footer>
  );
}
