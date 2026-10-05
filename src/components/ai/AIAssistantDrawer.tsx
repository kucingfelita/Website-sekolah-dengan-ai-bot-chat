import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  RotateCcw, 
  ShieldCheck, 
  ArrowRight,
  PhoneCall,
  MessageSquare,
  Bot,
  MoreVertical,
  Copy,
  Check,
  Download,
  Volume2,
  VolumeX,
  Info
} from 'lucide-react';
import { ChatMessage } from '../../types';
import { askSchoolAssistant } from '../../services/aiService';
import { SCHOOL_INFO } from '../../data/schoolData';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
  initialPrompt?: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome-1",
    sender: "assistant",
    text: "Selamat datang di **Layanan Informasi Resmi SMK Negeri 1 Bawang (SKANSA) Banjarnegara**.\n\nSaya siap memberikan rujukan data terverifikasi seputar:\n• **Penerimaan Murid Baru (SPMB 2026/2027)** & kepastian **Bebas SPP (Rp 0)**\n• **8 Program Keahlian** (PPLG, TJKT, AKL, MPLB, PM, Busana, Perikanan, Elektronika)\n• Pembelajaran industri di **Teaching Factory (TeFa)**\n• Layanan administrasi dan portal digital sekolah.\n\nAda informasi yang ingin Anda ketahui?",
    timestamp: "Baru saja",
    suggestedLinks: [
      { label: "8 Program Keahlian", url: "#/program-keahlian" },
      { label: "Info SPMB 2026 (Bebas SPP)", url: "#/spmb" }
    ]
  }
];

const SUGGESTED_QUESTIONS = [
  "Berapa biaya SPP per bulan?",
  "Apa syarat berkas SPMB 2026?",
  "Apa saja 8 jurusan di sini?",
  "Bagaimana prospek kerja lulusan PPLG?",
  "Berapa nomor telepon Tata Usaha?"
];

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  initialPrompt
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialPrompt && initialPrompt.trim()) {
        setTimeout(() => {
          handleSendMessage(initialPrompt);
        }, 120);
      } else {
        setTimeout(() => inputRef.current?.focus(), 80);
      }
      scrollToBottom();
    } else {
      stopSpeech();
      setIsMenuOpen(false);
    }
  }, [isOpen, initialPrompt]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  // Support closing drawer and menu with Escape key (R-32)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showInfoModal) {
          setShowInfoModal(false);
        } else if (isMenuOpen) {
          setIsMenuOpen(false);
        } else if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isMenuOpen, showInfoModal, onClose]);

  // Close dropdown menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
    }
  };

  const handleSpeakText = (msgId: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingMsgId === msgId) {
      stopSpeech();
      return;
    }

    stopSpeech();
    const cleanText = text.replace(/[*#•_-]/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'id-ID';
    utterance.rate = 1.0;

    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    setSpeakingMsgId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isThinking) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsThinking(true);

    try {
      const response = await askSchoolAssistant(query, messages);
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: "assistant",
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedLinks: response.links,
        engineSource: response.source
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: `assistant-err-${Date.now()}`,
          sender: "assistant",
          text: "Mohon maaf atas gangguan ini. Untuk informasi langsung, silakan hubungi Kantor Tata Usaha SMKN 1 Bawang di nomor telepon (0286) 591407 atau kunjungi loket layanan kampus.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedLinks: [
            { label: "Buka Panduan SPMB", url: "#/spmb" }
          ]
        }
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleResetChat = () => {
    stopSpeech();
    setMessages(INITIAL_MESSAGES);
    setIsMenuOpen(false);
  };

  const handleCopySingle = async (msgId: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMsgId(msgId);
      setTimeout(() => setCopiedMsgId(null), 2000);
    } catch {
      // Fallback
    }
  };

  const handleCopyAll = async () => {
    try {
      const transcript = messages
        .map(m => `[${m.timestamp}] ${m.sender === 'user' ? 'Penanya' : 'Tanya SKANSA'}:\n${m.text}`)
        .join('\n\n---\n\n');
      await navigator.clipboard.writeText(transcript);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2200);
    } catch {
      // Fallback
    }
  };

  const handleDownloadTranscript = () => {
    const header = `TRANSKRIP PERCAKAPAN TANYA SKANSA\nSMK Negeri 1 Bawang Banjarnegara (NPSN: ${SCHOOL_INFO.npsn})\nWaktu Unduh: ${new Date().toLocaleString('id-ID')}\nWebsite: https://smkn1bawang.sch.id\n=======================================================\n\n`;
    const body = messages
      .map(m => `[${m.timestamp}] ${m.sender === 'user' ? 'PENANYA' : 'ASISTEN RESMI SKANSA'}:\n${m.text}\n`)
      .join('\n-------------------------------------------------------\n\n');
    
    const blob = new Blob([header + body], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transkrip-tanya-skansa-${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setIsMenuOpen(false);
  };

  const renderFormattedText = (rawText: string) => {
    const paragraphs = rawText.split('\n');
    return paragraphs.map((para, i) => {
      if (!para.trim()) return <div key={i} className="h-2" />;

      const isBullet = para.trim().startsWith('•') || para.trim().startsWith('-');
      const cleanPara = isBullet ? para.replace(/^[\s•\-*]+/, '') : para;

      const parts = cleanPara.split(/(\*\*.*?\*\*)/g);
      const formattedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} className="font-bold text-slate-950">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (isBullet) {
        return (
          <div key={i} className="flex items-start space-x-2 my-1 pl-0.5">
            <span className="text-blue-700 font-bold shrink-0 mt-1">•</span>
            <span className="text-xs sm:text-sm text-slate-800 leading-relaxed">{formattedParts}</span>
          </div>
        );
      }

      return (
        <p key={i} className="text-xs sm:text-sm text-slate-800 leading-relaxed mb-1.5">
          {formattedParts}
        </p>
      );
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end select-none animate-in fade-in slide-in-from-bottom-4 duration-200">
      
      {/* Floating Institutional Chat Window */}
      <div 
        className="w-[440px] max-w-[calc(100vw-32px)] h-[620px] max-h-[calc(100vh-80px)] bg-white rounded-3xl border-2 border-slate-300 shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150 relative"
      >
        
        {/* Dignified Header - Royal Blue with Live Status */}
        <div className="p-4 bg-blue-900 text-white flex items-center justify-between border-b border-blue-950 relative z-20">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img 
                src="/images/brand/cropped-SMK-N-1-Bawang.png" 
                onError={(e) => { (e.target as HTMLImageElement).src = '/logo-smk.png'; }}
                alt="Logo Resmi SMK Negeri 1 Bawang" 
                className="w-10 h-10 object-contain shrink-0 bg-white p-1 rounded-xl shadow-2xs" 
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-blue-900 rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white font-sans">
                  Tanya SKANSA
                </h3>
                <span className="text-[9px] font-bold bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-full">
                  Resmi
                </span>
              </div>
              <p className="text-[11px] text-blue-200 flex items-center gap-1 font-mono">
                <span>NPSN: {SCHOOL_INFO.npsn}</span>
                <span>•</span>
                <span className="text-emerald-300 font-sans font-medium">Online 24 Jam</span>
              </p>
            </div>
          </div>

          {/* Header Action Buttons (Three-Dots Menu, Reset, Close) */}
          <div className="flex items-center space-x-1" ref={menuRef}>
            
            {/* Three-Dots Menu Button */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-xl transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-hidden ${
                  isMenuOpen ? 'bg-white/20 text-white' : 'text-blue-100 hover:text-white hover:bg-white/10'
                }`}
                title="Pilihan Lainnya"
                aria-label="Menu Opsi Chatbot"
                aria-expanded={isMenuOpen}
              >
                <MoreVertical className="w-5 h-5" />
              </button>

              {/* Three-Dots Popover Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-30 animate-in fade-in zoom-in-95 duration-100 text-slate-800">
                  <div className="px-3 py-1.5 border-b border-slate-100 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                      Menu Chatbot
                    </span>
                  </div>

                  <button
                    onClick={handleResetChat}
                    className="w-full px-3.5 py-2 text-left text-xs font-semibold hover:bg-blue-50 hover:text-blue-900 flex items-center space-x-2.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4 text-blue-700 shrink-0" />
                    <span>Mulai Obrolan Baru</span>
                  </button>

                  <button
                    onClick={handleCopyAll}
                    className="w-full px-3.5 py-2 text-left text-xs font-semibold hover:bg-blue-50 hover:text-blue-900 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-2.5">
                      <Copy className="w-4 h-4 text-blue-700 shrink-0" />
                      <span>Salin Semua Obrolan</span>
                    </div>
                    {copiedAll && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        Tersalin!
                      </span>
                    )}
                  </button>

                  <button
                    onClick={handleDownloadTranscript}
                    className="w-full px-3.5 py-2 text-left text-xs font-semibold hover:bg-blue-50 hover:text-blue-900 flex items-center space-x-2.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-blue-700 shrink-0" />
                    <span>Unduh Transkrip (.txt)</span>
                  </button>

                  <div className="my-1.5 border-t border-slate-100" />

                  <a
                    href="https://wa.me/6281228591407?text=Halo%20Admin%20SMKN%201%20Bawang%2C%20saya%20ingin%20bertanya%20seputar%20informasi%20sekolah"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full px-3.5 py-2 text-left text-xs font-semibold hover:bg-emerald-50 hover:text-emerald-950 flex items-center space-x-2.5 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Hubungi WhatsApp Resmi</span>
                  </a>

                  <a
                    href="tel:0286591407"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full px-3.5 py-2 text-left text-xs font-semibold hover:bg-blue-50 hover:text-blue-900 flex items-center space-x-2.5 transition-colors cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4 text-blue-700 shrink-0" />
                    <span>Telepon Tata Usaha</span>
                  </a>

                  <div className="my-1.5 border-t border-slate-100" />

                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setShowInfoModal(true);
                    }}
                    className="w-full px-3.5 py-2 text-left text-xs font-semibold hover:bg-slate-50 text-slate-600 flex items-center space-x-2.5 transition-colors cursor-pointer"
                  >
                    <Info className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>Tentang Layanan Ini</span>
                  </button>
                </div>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-hidden"
              title="Tutup Jendela"
              aria-label="Tutup Jendela Asisten"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Verification Guarantee Ribbon */}
        <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center justify-between text-[11px] text-slate-700">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="font-medium">Data resmi Kurikulum & Tata Usaha</span>
          </div>
          <a 
            href="tel:0286591407" 
            className="text-blue-800 hover:underline font-bold flex items-center"
          >
            <PhoneCall className="w-3 h-3 mr-1 text-blue-700" />
            TU: (0286) 591407
          </a>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/60">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-2.5 ${
                msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                  msg.sender === 'user'
                    ? 'bg-blue-800 text-white shadow-2xs'
                    : 'bg-blue-900 text-amber-300 shadow-2xs'
                }`}
              >
                {msg.sender === 'user' ? 'Anda' : 'S'}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-2xs ${
                  msg.sender === 'user'
                    ? 'bg-blue-900 text-white rounded-tr-none'
                    : 'bg-white text-slate-900 border border-slate-200/90 rounded-tl-none'
                }`}
              >
                {renderFormattedText(msg.text)}

                {/* Direct Action Chips */}
                {msg.suggestedLinks && msg.suggestedLinks.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {msg.suggestedLinks.map((link, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          onClose();
                          onNavigate(link.url);
                        }}
                        className="inline-flex items-center space-x-1 px-3 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-bold border border-blue-200 transition-colors cursor-pointer"
                      >
                        <span>{link.label}</span>
                        <ArrowRight className="w-3 h-3 text-blue-700 ml-1" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Message Meta & Action Tools */}
                <div className="flex items-center justify-between mt-2.5 pt-1.5 border-t border-slate-100/80">
                  {msg.sender === 'assistant' ? (
                    <div className="flex items-center gap-1.5">
                      {msg.engineSource === 'gemini' ? (
                        <span className="text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 flex items-center gap-1 font-mono text-[10px]">
                          <Bot className="w-2.5 h-2.5 text-blue-600" /> Gemini Flash
                        </span>
                      ) : (
                        <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100/80 flex items-center gap-1 font-mono text-[10px]">
                          <span className="text-amber-500 font-bold">✓</span> SRS Terverifikasi
                        </span>
                      )}

                      {/* Copy Single Message Button */}
                      <button
                        onClick={() => handleCopySingle(msg.id, msg.text)}
                        className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                        title="Salin jawaban ini"
                        aria-label="Salin teks jawaban"
                      >
                        {copiedMsgId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>

                      {/* Text-to-Speech Button */}
                      <button
                        onClick={() => handleSpeakText(msg.id, msg.text)}
                        className={`p-1 rounded transition-colors cursor-pointer ${
                          speakingMsgId === msg.id 
                            ? 'text-blue-700 bg-blue-50 animate-pulse' 
                            : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                        }`}
                        title={speakingMsgId === msg.id ? "Hentikan suara" : "Dengarkan jawaban ini"}
                        aria-label="Bacakan jawaban"
                      >
                        {speakingMsgId === msg.id ? (
                          <VolumeX className="w-3 h-3 text-red-600" />
                        ) : (
                          <Volume2 className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  ) : (
                    <div />
                  )}

                  <span
                    className={`text-[10px] font-mono ${
                      msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Interactive Bouncing 3-Dots Typing Indicator */}
          {isThinking && (
            <div className="flex items-start space-x-2.5">
              <div className="w-7 h-7 rounded-full bg-blue-900 text-amber-300 flex items-center justify-center shrink-0 text-xs font-bold">
                S
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-2xs">
                <div className="flex items-center space-x-2.5 text-xs text-slate-600 font-medium">
                  {/* Three-dots animation */}
                  <div className="flex space-x-1.5 items-center">
                    <span className="w-2 h-2 bg-blue-700 rounded-full animate-bounce [animation-delay:0s]"></span>
                    <span className="w-2 h-2 bg-blue-700 rounded-full animate-bounce [animation-delay:0.18s]"></span>
                    <span className="w-2 h-2 bg-blue-700 rounded-full animate-bounce [animation-delay:0.36s]"></span>
                  </div>
                  <span className="text-slate-500 font-mono text-[11px]">Memeriksa arsip informasi resmi...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Question Chips */}
        <div className="px-3 py-2 border-t border-slate-100 bg-white">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 px-1 font-mono">
            Topik Populer:
          </p>
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="text-[11px] whitespace-nowrap bg-slate-50 hover:bg-blue-50 hover:text-blue-900 text-slate-700 px-3 py-1 rounded-full border border-slate-200/80 transition-colors shrink-0 font-medium cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <div className="p-3 border-t border-slate-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Tanyakan syarat SPMB, jurusan, SPP, dsb..."
              disabled={isThinking}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:bg-white focus:border-blue-700 transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isThinking}
              className="p-2.5 bg-blue-900 text-white rounded-xl hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-hidden"
              title="Kirim Pertanyaan"
              aria-label="Kirim Pertanyaan"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5 px-1 font-mono">
            <span>Rujukan data resmi BAN-SM & Kurikulum</span>
            <span className="text-emerald-700 font-bold font-sans">Bebas SPP Rp 0</span>
          </div>
        </div>

        {/* Info Modal / Dialog */}
        {showInfoModal && (
          <div 
            className="absolute inset-0 z-40 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
            onClick={() => setShowInfoModal(false)}
          >
            <div 
              className="bg-white rounded-2xl p-5 max-w-sm w-full space-y-4 border border-slate-200 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center space-x-2">
                  <Info className="w-4 h-4 text-blue-700" />
                  <h4 className="font-bold text-sm text-slate-900 font-sans">Tentang Tanya SKANSA</h4>
                </div>
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
                  aria-label="Tutup info"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs text-slate-600 leading-relaxed font-sans">
                <p>
                  <strong>Tanya SKANSA</strong> adalah asisten cerdas resmi SMK Negeri 1 Bawang Banjarnegara yang dirancang untuk memberikan informasi terverifikasi secara instan.
                </p>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 space-y-1 text-[11px]">
                  <div>• <strong>NPSN</strong>: {SCHOOL_INFO.npsn}</div>
                  <div>• <strong>Status</strong>: SMK Pusat Keunggulan (CoE)</div>
                  <div>• <strong>Akreditasi</strong>: A (BAN-SM)</div>
                  <div>• <strong>Biaya Pendidikan</strong>: Rp 0 (Bebas SPP)</div>
                </div>
                <p className="text-[11px] text-slate-500">
                  Untuk konfirmasi berkas pendaftaran fisik atau kebutuhan legalisir, silakan hubungi loket Tata Usaha langsung pada jam kerja (Senin - Jumat 07.00 - 15.30 WIB).
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="px-4 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Mengerti
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
