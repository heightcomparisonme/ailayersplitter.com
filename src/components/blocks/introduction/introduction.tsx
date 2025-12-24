import { AnimatedGroup } from '@/components/tailark/motion/animated-group';
import { TextEffect } from '@/components/tailark/motion/text-effect';
import { useTranslations } from 'next-intl';

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      y: 12,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export default function IntroductionSection() {
  const t = useTranslations('HomePage.introduction');

  return (
    <section id="introduction" className="bg-muted/30 px-4 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedGroup variants={transitionVariants}>
          {/* Section Title */}
          <div className="mx-auto max-w-3xl text-center">
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
              {t('description')}
            </p>
          </div>

          {/* Features Grid */}
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="bg-background/50 backdrop-blur-sm relative overflow-hidden rounded-xl border p-8 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4">
                  <div className="bg-primary/10 flex size-12 items-center justify-center rounded-lg">
                    <svg
                      className="text-primary size-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold">{t('feature1.title')}</h3>
                <p className="mt-3 text-muted-foreground">
                  {t('feature1.description')}
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-background/50 backdrop-blur-sm relative overflow-hidden rounded-xl border p-8 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4">
                  <div className="bg-primary/10 flex size-12 items-center justify-center rounded-lg">
                    <svg
                      className="text-primary size-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold">{t('feature2.title')}</h3>
                <p className="mt-3 text-muted-foreground">
                  {t('feature2.description')}
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-background/50 backdrop-blur-sm relative overflow-hidden rounded-xl border p-8 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4">
                  <div className="bg-primary/10 flex size-12 items-center justify-center rounded-lg">
                    <svg
                      className="text-primary size-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold">{t('feature3.title')}</h3>
                <p className="mt-3 text-muted-foreground">
                  {t('feature3.description')}
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-background/50 backdrop-blur-sm relative overflow-hidden rounded-xl border p-8 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4">
                  <div className="bg-primary/10 flex size-12 items-center justify-center rounded-lg">
                    <svg
                      className="text-primary size-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold">{t('feature4.title')}</h3>
                <p className="mt-3 text-muted-foreground">
                  {t('feature4.description')}
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-background/50 backdrop-blur-sm relative overflow-hidden rounded-xl border p-8 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4">
                  <div className="bg-primary/10 flex size-12 items-center justify-center rounded-lg">
                    <svg
                      className="text-primary size-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold">{t('feature5.title')}</h3>
                <p className="mt-3 text-muted-foreground">
                  {t('feature5.description')}
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-background/50 backdrop-blur-sm relative overflow-hidden rounded-xl border p-8 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4">
                  <div className="bg-primary/10 flex size-12 items-center justify-center rounded-lg">
                    <svg
                      className="text-primary size-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold">{t('feature6.title')}</h3>
                <p className="mt-3 text-muted-foreground">
                  {t('feature6.description')}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mx-auto mt-16 max-w-3xl text-center">
            <p className="text-muted-foreground">{t('bottomText')}</p>
          </div>
        </AnimatedGroup>
      </div>
    </section>
  );
}
