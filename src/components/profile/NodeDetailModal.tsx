import React, { useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  UserCheck, 
  FileText, 
  Network, 
  ArrowDown, 
  ArrowUp,
  Award
} from 'lucide-react';
import { GovernanceNode, CATEGORY_STYLES, DISDIKBUD_REGULATION_INFO } from '../../data/governanceData';

interface NodeDetailModalProps {
  node: GovernanceNode | null;
  onClose: () => void;
  onSelectNode: (nodeId: string) => void;
  allNodes: GovernanceNode[];
}

export const NodeDetailModal: React.FC<NodeDetailModalProps> = ({
  node,
  onClose,
  onSelectNode,
  allNodes
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (node) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [node, onClose]);

  if (!node) return null;

  const style = CATEGORY_STYLES[node.category];
  const parentNode = node.parentId ? allNodes.find(n => n.id === node.parentId) : null;
  const childNodes = node.subordinates 
    ? allNodes.filter(n => node.subordinates?.includes(n.id))
    : [];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-institution-950 text-white p-5 sm:p-6 flex items-start justify-between border-b border-institution-800">
          <div className="space-y-1.5 pr-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-white/10 text-slate-200 border border-white/15">
                {node.badge || node.role}
              </span>
              <span className="text-xs text-amber-300 font-medium">
                {node.lineType === 'dashed' ? 'Garis Koordinasi (Konsultatif)' : 'Garis Komando Struktural'}
              </span>
            </div>
            <h3 id="modal-title" className="text-lg sm:text-xl font-extrabold text-white font-sans tracking-tight">
              {node.title}
            </h3>
            <p className="text-xs text-slate-300">
              {DISDIKBUD_REGULATION_INFO.branch}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none shrink-0"
            aria-label="Tutup lembar rincian jabatan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-slate-800 text-sm">
          
          {/* Pejabat & Legal Basis */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-institution-900 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <UserCheck className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Pejabat / Penanggung Jawab
                </span>
                <h4 className="text-base font-bold text-slate-950 font-sans">
                  {node.person}
                </h4>
                {node.nip && (
                  <p className="text-xs font-mono text-slate-600">
                    NIP. {node.nip}
                  </p>
                )}
                {node.department && (
                  <p className="text-xs text-blue-900 font-medium">
                    Unit: {node.department}
                  </p>
                )}
              </div>
            </div>

            <div className="border-t border-slate-200/80 pt-2.5 flex items-start gap-2 text-xs text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span className="leading-relaxed">Landasan Hukum: {DISDIKBUD_REGULATION_INFO.legalBasis}</span>
            </div>
          </div>

          {/* Tugas Pokok dan Fungsi (Tupoksi) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-950">
              <FileText className="w-4 h-4 text-institution-900" />
              <h4 className="font-bold text-sm uppercase tracking-wider font-sans">
                Tugas Pokok & Fungsi (Tupoksi Resmi)
              </h4>
            </div>

            <ul className="space-y-2">
              {node.tupoksi.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-800 leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                  <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-900 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Garis Hierarki Hubungan (Atasan & Bawahan) */}
          <div className="space-y-3 pt-2 border-t border-slate-200">
            <div className="flex items-center gap-2 text-slate-950">
              <Network className="w-4 h-4 text-institution-900" />
              <h4 className="font-bold text-sm uppercase tracking-wider font-sans">
                Jalur Relasi & Tanggung Jawab
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Atasan Langsung */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                  <ArrowUp className="w-3.5 h-3.5 text-blue-700" />
                  <span>Atasan Langsung / Jalur Laporan:</span>
                </div>
                {parentNode ? (
                  <button
                    onClick={() => onSelectNode(parentNode.id)}
                    className="text-left w-full hover:bg-white p-2 rounded-lg border border-transparent hover:border-slate-200 transition-colors group cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
                  >
                    <span className="text-xs font-bold text-institution-900 group-hover:text-blue-700 block">
                      {parentNode.title}
                    </span>
                    <span className="text-xs text-slate-600 block">
                      {parentNode.person}
                    </span>
                  </button>
                ) : (
                  <span className="text-xs text-slate-700 block italic p-2">
                    {node.reportsToText || "Regulator Tingkat Provinsi"}
                  </span>
                )}
              </div>

              {/* Garis Bawahan / Unit Terkait */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                  <ArrowDown className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Mengoordinasikan:</span>
                </div>
                {childNodes.length > 0 ? (
                  <div className="max-h-32 overflow-y-auto space-y-1 pr-1">
                    {childNodes.map(child => (
                      <button
                        key={child.id}
                        onClick={() => onSelectNode(child.id)}
                        className="text-left w-full hover:bg-white p-2 rounded-lg border border-transparent hover:border-slate-200 transition-colors group cursor-pointer block focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
                      >
                        <span className="text-xs font-bold text-slate-900 group-hover:text-blue-700 block truncate">
                          {child.title}
                        </span>
                        <span className="text-xs text-slate-600 block truncate">
                          {child.person}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-slate-500 block italic p-2">
                    Unit pelaksana teknis operasional
                  </span>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-mono">
            <Award className="w-4 h-4 text-amber-600" />
            <span>SKANSA: Center of Excellence</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-institution-900 hover:bg-institution-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
          >
            Tutup Informasi
          </button>
        </div>
      </div>
    </div>
  );
};

export default NodeDetailModal;
