import React, { useState } from 'react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Mail, MessageSquare, Send, CheckCircle2, HelpCircle } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (route: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('tool-suggestion');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="py-8 sm:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', onClick: () => onNavigate('home') },
          { label: 'Contact Us' }
        ]}
      />

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-2xs">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Get in touch</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            Contact & Support
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Have a question, tax calculation feedback, or a suggestion for a new tool? We read every message.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Message Received!</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Thank you for reaching out to The Vector Tools team. We will review your inquiry and respond to <strong className="text-slate-900">{email}</strong> within 24–48 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setMessage('');
              }}
              className="mt-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
            >
              Send Another Note
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Topic / Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              >
                <option value="tool-suggestion">Suggest a New Tool</option>
                <option value="bug-report">Report a Bug / Calculation Error</option>
                <option value="data-update">Tax Rate / Regulatory Update</option>
                <option value="general">General Feedback / Inquiries</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Your Message
              </label>
              <textarea
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Let us know how we can help or what tool you'd like to see added next..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 resize-y"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-600">
          <div>
            <span className="font-bold text-slate-900 block mb-1">Direct Tool Support:</span>
            <span className="font-mono text-slate-800">support@thevectortools.online</span>
            <div className="text-[11px] text-slate-500 mt-1">Typical response within 24h</div>
          </div>
          <div>
            <span className="font-bold text-slate-900 block mb-1">Parent Company Inquiries:</span>
            <a href="mailto:thevectorrr@gmail.com" className="font-mono text-[#0057F3] hover:underline block">
              thevectorrr@gmail.com
            </a>
            <div className="text-[11px] text-slate-500 mt-1">+92 342 1090105</div>
          </div>
          <div>
            <span className="font-bold text-slate-900 block mb-1">The Vector Systems:</span>
            <a
              href="https://www.thevector.systems"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0057F3] font-bold hover:underline inline-flex items-center gap-1"
            >
              <span>www.thevector.systems ↗</span>
            </a>
            <div className="text-[11px] text-slate-500 mt-1">Peshawar, Pakistan · Working Globally</div>
          </div>
        </div>
      </div>
    </div>
  );
};
