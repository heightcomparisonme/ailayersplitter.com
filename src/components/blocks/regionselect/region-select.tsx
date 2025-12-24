'use client';

import { AnimatedGroup } from '@/components/tailark/motion/animated-group';
import { TextEffect } from '@/components/tailark/motion/text-effect';
import { useLocalePathname, useLocaleRouter } from '@/i18n/navigation';
import { LOCALES } from '@/i18n/routing';
import { Check } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

const LOCALE_PREFERENCE_COOKIE = 'NEXT_LOCALE_PREFERENCE';
const PREFERENCE_SECONDS = 60 * 60 * 24 * 365;

const REGION_DATA = {
  en: { labelKey: 'locales.en', countryCode: 'gb' },
  zh: { labelKey: 'locales.zh', countryCode: 'cn' },
} as const;

type RegionLocale = keyof typeof REGION_DATA;

const isRegionLocale = (value: string): value is RegionLocale =>
  value in REGION_DATA;

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 0.8,
      },
    },
  },
};

function setLocalePreference(locale: string) {
  if (typeof document === 'undefined') {
    return;
  }
  document.cookie = `${LOCALE_PREFERENCE_COOKIE}=${encodeURIComponent(locale)}; path=/; max-age=${PREFERENCE_SECONDS}; samesite=lax`;
}

export default function RegionSelect() {
  const currentLocale = useLocale();
  const t = useTranslations('RegionSelect');
  const router = useLocaleRouter();
  const pathname = useLocalePathname();

  const handleSelect = (locale: RegionLocale) => {
    setLocalePreference(locale);
    router.push(pathname, { locale });
  };

  return (
    <section id="region-select" className="bg-muted/30 px-4 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedGroup variants={transitionVariants}>
          {/* Section Title */}
          <div className="mx-auto max-w-3xl text-center mb-16">
            <TextEffect
              per="word"
              preset="fade-in-blur"
              speedSegment={0.3}
              as="h2"
              className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl"
            >
              {t('title')}
            </TextEffect>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {t('subtitle')}
            </p>
          </div>

          {/* Region Cards */}
          <div className="flex justify-center gap-6 flex-wrap">
            {LOCALES.map((localeKey) => {
              if (!isRegionLocale(localeKey)) return null;
              const data = REGION_DATA[localeKey];

              const label = t(data.labelKey);
              const isSelected = currentLocale === localeKey;

              return (
                <button
                  key={localeKey}
                  type="button"
                  onClick={() => handleSelect(localeKey)}
                  aria-pressed={isSelected}
                  className={`group relative flex items-center gap-3 rounded-2xl border bg-background/50 backdrop-blur-sm px-8 py-6 text-left transition-all duration-300 hover:shadow-xl hover:scale-[1.02] min-w-[200px] ${
                    isSelected
                      ? 'border-primary/40 bg-primary/10 shadow-lg'
                      : 'border-border/40 hover:border-border/80'
                  }`}
                >
                  {/* Flag */}
                  <span className="relative h-8 w-12 overflow-hidden rounded-lg shadow-md">
                    <img
                      src={`https://flagcdn.com/w80/${data.countryCode}.png`}
                      srcSet={`https://flagcdn.com/w160/${data.countryCode}.png 2x`}
                      alt={label}
                      className="h-full w-full object-cover transition group-hover:grayscale-0"
                      loading="lazy"
                    />
                    <span className="absolute inset-0 rounded-lg border border-border/40" />
                  </span>

                  {/* Language Label */}
                  <span className="text-base font-semibold">{label}</span>

                  {/* Check Icon */}
                  {isSelected ? (
                    <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="h-4 w-4" strokeWidth={3} />
                    </span>
                  ) : null}

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-primary/0 transition-colors duration-300 group-hover:border-primary/20" />
                </button>
              );
            })}
          </div>
        </AnimatedGroup>
      </div>
    </section>
  );
}
