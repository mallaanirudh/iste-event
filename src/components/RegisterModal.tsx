"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Terminal } from 'lucide-react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  teamName: string;
  leadName: string;
  leadEmail: string;
  leadPhone: string;
  member2Name: string;
  member3Name: string;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [formData, setFormData] = useState<FormData>({
    teamName: '',
    leadName: '',
    leadEmail: '',
    leadPhone: '',
    member2Name: '',
    member3Name: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isChecked, setIsChecked] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [passId, setPassId] = useState('');
  const [copied, setCopied] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        teamName: '',
        leadName: '',
        leadEmail: '',
        leadPhone: '',
        member2Name: '',
        member3Name: '',
      });
      setErrors({});
      setIsChecked(false);
      setIsSuccess(false);
      setPassId('');
      setCopied(false);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<FormData> = {};
    let isValid = true;

    if (!formData.teamName.trim()) { newErrors.teamName = 'REQUIRED'; isValid = false; }
    if (!formData.leadName.trim()) { newErrors.leadName = 'REQUIRED'; isValid = false; }
    if (!formData.leadEmail.trim()) { newErrors.leadEmail = 'REQUIRED'; isValid = false; }
    if (!formData.leadPhone.trim()) { newErrors.leadPhone = 'REQUIRED'; isValid = false; }
    if (!formData.member2Name.trim()) { newErrors.member2Name = 'REQUIRED'; isValid = false; }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    // Generate Pass ID
    const randomHex = () => Math.floor(Math.random() * 65536).toString(16).padStart(4, '0').toUpperCase();
    setPassId(`SQ1-${randomHex()}-${randomHex()}`);
    setIsSuccess(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(passId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const InputField = ({ label, name, type = 'text', required = false }: { label: string, name: keyof FormData, type?: string, required?: boolean }) => (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-[#00FF41] uppercase flex justify-between">
        <span>{label}{required && <span className="text-[#FF003C] ml-1">*</span>}</span>
        {errors[name] && <span className="text-[#FF003C] animate-pulse">{errors[name]}</span>}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className={`bg-[#050505] border ${errors[name] ? 'border-[#FF003C]' : 'border-[#00FF41]/50'} text-[#00FF41] px-3 py-2 outline-none focus:border-[#00F0FF] focus:shadow-[0_0_8px_rgba(0,240,255,0.3)] transition-all`}
        autoComplete="off"
        spellCheck="false"
      />
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050505]/90 backdrop-blur-sm font-mono"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-lg bg-[#0a0a0a] border border-[#00FF41] shadow-[0_0_20px_rgba(0,255,65,0.15)] rounded-sm overflow-hidden flex flex-col"
          >
            {/* Title Bar */}
            <div className="bg-[#050505] border-b border-[#00FF41] px-3 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF003C]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFB000]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#00FF41]"></div>
                </div>
              </div>
              <div className="text-[#00FF41] text-xs md:text-sm font-bold flex items-center gap-2">
                <Terminal size={14} />
                SECURE_REGISTRATION_TERMINAL
              </div>
              <div className="w-12"></div> {/* Spacer for centering */}
            </div>

            {/* Content */}
            <div className="p-6 relative">
              {/* Scanline overlay */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,255,65,0.03)_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] opacity-30 mix-blend-overlay"></div>
              
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <InputField label="Team Name" name="teamName" required />
                    </div>
                    <InputField label="Team Lead Name" name="leadName" required />
                    <InputField label="Lead Email" name="leadEmail" type="email" required />
                    <InputField label="Lead Phone" name="leadPhone" required />
                    <InputField label="Member 2 Name" name="member2Name" required />
                    <div className="md:col-span-2">
                      <InputField label="Member 3 Name (Optional)" name="member3Name" />
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-[#00FF41]/30">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center mt-0.5">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={isChecked}
                          onChange={(e) => setIsChecked(e.target.checked)}
                        />
                        <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${isChecked ? 'bg-[#00FF41] border-[#00FF41]' : 'border-[#00FF41]/50 group-hover:border-[#00FF41] bg-[#050505]'}`}>
                          {isChecked && <Check size={14} className="text-[#050505]" />}
                        </div>
                      </div>
                      <span className="text-xs text-[#00FF41]/80 group-hover:text-[#00FF41] transition-colors leading-relaxed">
                        I understand that the internet is lying and I will trust no unverified link.
                      </span>
                    </label>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-xs text-[#00FF41]/70 hover:text-[#00FF41] transition-colors uppercase"
                    >
                      [CANCEL]
                    </button>
                    <button
                      type="submit"
                      disabled={!isChecked}
                      className={`px-6 py-2 text-xs font-bold uppercase transition-all flex items-center gap-2 ${
                        isChecked 
                          ? 'bg-[#050505] text-[#00FF41] border border-[#00FF41] hover:bg-[#00FF41] hover:text-[#050505] hover:shadow-[0_0_15px_rgba(0,255,65,0.4)]' 
                          : 'bg-[#050505] text-[#00FF41]/30 border border-[#00FF41]/30 cursor-not-allowed'
                      }`}
                    >
                      [TRANSMIT_REGISTRATION]
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 relative z-10 text-center gap-6">
                  <div className="text-xs text-[#00F0FF] mb-2 animate-pulse">
                    STATUS: REGISTERED // ACCESS GRANTED
                  </div>
                  
                  <div className="p-6 bg-[#050505] border border-[#00FF41] relative group overflow-hidden w-full">
                    {/* Inner scanline specifically for the ID box */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,255,65,0.1)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] mix-blend-overlay"></div>
                    <div className="text-xs text-[#00FF41]/50 mb-2 uppercase tracking-widest">Access Pass ID</div>
                    <div className="text-3xl md:text-4xl font-bold text-[#00FF41] drop-shadow-[0_0_10px_rgba(0,255,65,0.8)] tracking-wider">
                      {passId}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 mt-4 w-full">
                    <button
                      onClick={handleCopy}
                      className="flex-1 px-4 py-3 bg-[#050505] text-[#00F0FF] border border-[#00F0FF] hover:bg-[#00F0FF] hover:text-[#050505] transition-colors text-xs font-bold uppercase flex items-center justify-center gap-2"
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                      {copied ? '[COPIED TO CLIPBOARD]' : '[COPY PASS ID]'}
                    </button>
                    <button
                      onClick={onClose}
                      className="flex-1 px-4 py-3 bg-[#00FF41] text-[#050505] font-bold text-xs uppercase hover:bg-[#00FF41]/90 transition-colors"
                    >
                      [CLOSE TERMINAL]
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
