import React, { useRef, useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Bus, ExternalLink, MessageSquare, Navigation } from 'lucide-react';
import { SCHOOL_INFO } from '../../data/schoolData';
import { SkeletonMap } from '../common/Skeleton';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ContactMapSection: React.FC = () => {
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);
  const googleMapsDirectionsUrl = "https://www.google.com/maps/dir/?api=1&destination=-7.3986,109.6531";
  const googleMapsPlaceUrl = "https://maps.google.com/?q=-7.3986,109.6531+(SMK+Negeri+1+Bawang)";

  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 bg-slate-50/70 border-b border-slate-200/70 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={containerRef} className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Contact & Transportation Guide (6 Cols) */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 space-y-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-blue-800 font-bold text-xs uppercase tracking-wider">
                  <MapPin className="w-4 h-4 text-blue-700" />
                  <span>AKSESIBILITAS & KAMPUS UTAMA</span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
                  Lokasi Kampus & Pelayanan Resmi
                </h2>
                
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Kampus terpadu SMK Negeri 1 Bawang terletak strategis di tepi jalan raya nasional poros Banjarnegara - Purwokerto, sangat mudah dijangkau kendaraan pribadi maupun angkutan umum.
                </p>
              </div>

            {/* Address & Landmark Card */}
            <div className="space-y-5 text-xs sm:text-sm">
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-start space-x-3.5">
                  <MapPin className="w-5 h-5 text-blue-800 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-950 text-sm sm:text-base block">
                      Alamat Kampus Terpadu:
                    </span>
                    <span className="text-slate-700 leading-relaxed block mt-1">
                      {SCHOOL_INFO.address.street}, Desa Pucang, Kecamatan {SCHOOL_INFO.address.district}, {SCHOOL_INFO.address.regency}, {SCHOOL_INFO.address.province} {SCHOOL_INFO.address.postalCode}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-semibold text-slate-500">Patokan / Landmark:</span>
                  <span className="bg-blue-100/70 text-blue-900 font-bold px-2.5 py-0.5 rounded-md text-[11px]">
                    Sebelah SMA Negeri 1 Bawang
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    (Kanan jalan dari arah Purwokerto)
                  </span>
                </div>
              </div>

              {/* Direct Contact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="tel:0286591407"
                  className="p-4 sm:p-5 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200/80 hover:border-blue-300 transition-colors group block"
                >
                  <div className="flex items-center space-x-2 text-blue-800 mb-1.5">
                    <Phone className="w-4 h-4 text-blue-700" />
                    <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-blue-900">
                      Telepon Tata Usaha:
                    </span>
                  </div>
                  <span className="text-slate-700 font-mono font-bold text-sm sm:text-base block">
                    (0286) 591407
                  </span>
                </a>

                <a
                  href={`https://wa.me/${SCHOOL_INFO.contact.whatsapp.replace(/[^0-9]/g, '')}?text=Halo%20SMKN%201%20Bawang,%20saya%20ingin%20bertanya%20informasi%20sekolah.`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 sm:p-5 rounded-2xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200/80 hover:border-emerald-300 transition-colors group block"
                >
                  <div className="flex items-center space-x-2 text-emerald-800 mb-1.5">
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-emerald-900">
                      WhatsApp Resmi:
                    </span>
                  </div>
                  <span className="text-slate-700 font-mono font-bold text-sm sm:text-base block">
                    +62 812-2859-1407
                  </span>
                </a>
              </div>

              {/* Public Transport Guidance */}
              <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs sm:text-sm text-blue-950 space-y-2">
                <div className="flex items-center space-x-2 font-bold">
                  <Bus className="w-4 h-4 text-blue-700" />
                  <span>Panduan Rute Angkutan Umum:</span>
                </div>
                <p className="text-slate-700 pl-6 leading-relaxed">
                  Naik Mikrobus / Bus AKAP jurusan <strong>Purwokerto - Wonosobo</strong> (turun tepat di depan Halte Pucang / Gerbang Utama SMK Negeri 1 Bawang).
                </p>
              </div>

              {/* Action Buttons & Service Hours */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm text-slate-500">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-slate-400" />
                  Jam Pelayanan TU: Senin - Jumat 07.00 - 15.30 WIB
                </span>

                <div className="flex items-center space-x-2">
                  <a
                    href={googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-blue-800 hover:text-blue-950 inline-flex items-center bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 mr-1.5 text-blue-700" />
                    <span>Petunjuk Arah</span>
                  </a>

                  <a
                    href={googleMapsPlaceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-slate-700 hover:text-slate-950 inline-flex items-center bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
                  >
                    <span>Buka Maps</span>
                    <ExternalLink className="w-3 h-3 ml-1 text-slate-500" />
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Interactive Google Map Embed Visual (6 Cols) */}
          <div className="lg:col-span-6 bg-slate-100 min-h-[380px] lg:min-h-[500px] relative border-t lg:border-t-0 lg:border-l border-slate-200 overflow-hidden">
            {/* Blueprint Wireframe Map Skeleton */}
            <div className={`absolute inset-0 z-10 transition-opacity duration-700 ease-out ${
              isMapLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}>
              <SkeletonMap />
            </div>

            <iframe
              title="Peta Lokasi Resmi SMK Negeri 1 Bawang Banjarnegara"
              src="https://maps.google.com/maps?q=SMK+Negeri+1+Bawang,+Jl.+Raya+Pucang+No.+132,+Bawang,+Banjarnegara,+Jawa+Tengah&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '420px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
              onLoad={() => setIsMapLoaded(true)}
            />
          </div>

        </div>
      </div>
    </div>
  </section>
);
};
