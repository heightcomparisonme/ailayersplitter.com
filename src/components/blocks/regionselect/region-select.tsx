'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { LOCALES, type Locale } from '@/i18n/routing';

const LOCALE_PREFERENCE_COOKIE = 'NEXT_LOCALE_PREFERENCE';
const PREFERENCE_SECONDS = 60 * 60 * 24 * 365;

function setLocalePreference(locale: string) {
  if (typeof document === 'undefined') {
    return;
  }
  document.cookie = `${LOCALE_PREFERENCE_COOKIE}=${encodeURIComponent(locale)}; path=/; max-age=${PREFERENCE_SECONDS}; samesite=lax`;
}

const REGION_DATA: Record<string, { label: string; countryCode: string }> = {
  "en": { label: "English", countryCode: "gb" },
  // "ar": { label: "العربية", countryCode: "sa" },
  "cn": { label: "简体中文", countryCode: "cn" },
  // "de": { label: "Deutsch", countryCode: "de" },
  // "es": { label: "Español", countryCode: "es" },
  // "fr": { label: "Français", countryCode: "fr" },
  // "jp": { label: "日本語", countryCode: "jp" },
  // "kr": { label: "한국어", countryCode: "kr" },
  // "nl": { label: "Nederlands", countryCode: "nl" },
  // "pl": { label: "Polski", countryCode: "pl" },
  // "pt": { label: "Português", countryCode: "pt" },
  // "ru": { label: "Русский", countryCode: "ru" },
  // "tw": { label: "繁體中文", countryCode: "tw" },
  // "vn": { label: "Tiếng Việt", countryCode: "vn" }
};

export default function RegionSelect() {
  const currentLocale = useLocale();
  const t = useTranslations('Rating');
  const router = useRouter();
  const pathname = usePathname();

  const handleSelect = (locale: string) => {
    setLocalePreference(locale);
    router.push(pathname, { locale: locale as Locale });
  };

  return (
    <div className="w-full max-w-6xl mx-auto mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 标题部分 */}
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold text-white">{t('regionTitle')}</h2>
        <p className="text-slate-400 text-sm mt-1">{t('regionSubtitle')}</p>
      </div>

      {/* --- 核心组件：平铺网格 --- */}
      <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {LOCALES.map((key) => {
            const data = REGION_DATA[key];
            if (!data) return null;
            
            const { label, countryCode } = data;
            const isSelected = currentLocale === key;
            
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`
                  group relative flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-left transition-all duration-300 ease-out outline-none
                  ${isSelected 
                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)]' 
                    : 'border-slate-800 bg-slate-800/40 text-slate-400 hover:border-slate-700 hover:bg-slate-800/60 hover:text-slate-200'}
                `}
              >
                {/* 国旗图片：使用 flagcdn */}
                <div className="relative w-5 h-3.5 flex-shrink-0 shadow-sm rounded-[2px] overflow-hidden">
                  <img
                    src={`https://flagcdn.com/w40/${countryCode}.png`}
                    srcSet={`https://flagcdn.com/w80/${countryCode}.png 2x`}
                    alt={label}
                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 border border-white/5 rounded-[2px]"></div>
                </div>

                {/* 语言名称 */}
                <span className={`text-xs font-medium truncate ${isSelected ? 'text-cyan-400' : ''}`}>
                  {label}
                </span>

                {/* 选中状态的角标对勾 */}
                {isSelected && (
                  <div className="absolute top-1.5 right-1.5 animate-in fade-in zoom-in duration-300">
                    <div className="bg-cyan-500 rounded-full p-0.5 shadow-sm">
                      <Check className="w-2 h-2 text-slate-900" strokeWidth={4} />
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
