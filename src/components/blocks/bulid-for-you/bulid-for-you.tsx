'use client';

import { AnimatedGroup } from '@/components/tailark/motion/animated-group';
import { TextEffect } from '@/components/tailark/motion/text-effect';
import { useTranslations } from 'next-intl';
import {
  Palette,
  ShoppingBag,
  Gamepad2,
  Video,
  Glasses,
  BookOpen,
  Mic,
  Building2,
} from 'lucide-react';

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

interface AudienceItem {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  useCases: string[];
  priority: number;
}

export default function BuildForYouSection() {
  const t = useTranslations('HomePage.buildForYou');

  const audienceData: AudienceItem[] = [
    {
      id: 1,
      icon: <Palette className="h-6 w-6" />,
      title: t('audience1.title'),
      description: t('audience1.description'),
      useCases: [
        t('audience1.useCase1'),
        t('audience1.useCase2'),
        t('audience1.useCase3'),
      ],
      priority: 5,
    },
    {
      id: 2,
      icon: <ShoppingBag className="h-6 w-6" />,
      title: t('audience2.title'),
      description: t('audience2.description'),
      useCases: [
        t('audience2.useCase1'),
        t('audience2.useCase2'),
        t('audience2.useCase3'),
      ],
      priority: 5,
    },
    {
      id: 3,
      icon: <Gamepad2 className="h-6 w-6" />,
      title: t('audience3.title'),
      description: t('audience3.description'),
      useCases: [
        t('audience3.useCase1'),
        t('audience3.useCase2'),
        t('audience3.useCase3'),
      ],
      priority: 5,
    },
    {
      id: 4,
      icon: <Video className="h-6 w-6" />,
      title: t('audience4.title'),
      description: t('audience4.description'),
      useCases: [
        t('audience4.useCase1'),
        t('audience4.useCase2'),
        t('audience4.useCase3'),
      ],
      priority: 4,
    },
    {
      id: 5,
      icon: <Glasses className="h-6 w-6" />,
      title: t('audience5.title'),
      description: t('audience5.description'),
      useCases: [
        t('audience5.useCase1'),
        t('audience5.useCase2'),
      ],
      priority: 4,
    },
    {
      id: 6,
      icon: <BookOpen className="h-6 w-6" />,
      title: t('audience6.title'),
      description: t('audience6.description'),
      useCases: [
        t('audience6.useCase1'),
        t('audience6.useCase2'),
      ],
      priority: 3,
    },
    {
      id: 7,
      icon: <Mic className="h-6 w-6" />,
      title: t('audience7.title'),
      description: t('audience7.description'),
      useCases: [
        t('audience7.useCase1'),
        t('audience7.useCase2'),
      ],
      priority: 3,
    },
    {
      id: 8,
      icon: <Building2 className="h-6 w-6" />,
      title: t('audience8.title'),
      description: t('audience8.description'),
      useCases: [
        t('audience8.useCase1'),
        t('audience8.useCase2'),
      ],
      priority: 3,
    },
  ];

  return (
    <section id="build-for-you" className="bg-muted/30 px-4 py-24">
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
              {t('description')}
            </p>
          </div>

          {/* Core Audience - Priority 5 */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <h3 className="text-xl font-semibold">{t('coreAudience')}</h3>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {audienceData
                .filter((item) => item.priority === 5)
                .map((item) => (
                  <div
                    key={item.id}
                    className="group relative overflow-hidden rounded-2xl border bg-background/50 backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                  >
                    {/* Icon */}
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {item.icon}
                    </div>

                    {/* Title */}
                    <h4 className="text-xl font-semibold mb-3">{item.title}</h4>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4">
                      {item.description}
                    </p>

                    {/* Use Cases */}
                    <ul className="space-y-2 text-sm">
                      {item.useCases.map((useCase, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-muted-foreground"
                        >
                          <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                          {useCase}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>

          {/* Extended Audience - Priority 3-4 */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[1, 2, 3, 4].map((star) => (
                  <svg
                    key={star}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <h3 className="text-xl font-semibold">{t('extendedAudience')}</h3>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {audienceData
                .filter((item) => item.priority < 5)
                .map((item) => (
                  <div
                    key={item.id}
                    className="group relative overflow-hidden rounded-2xl border bg-background/50 backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                  >
                    {/* Icon */}
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {item.icon}
                    </div>

                    {/* Title */}
                    <h4 className="text-lg font-semibold mb-3">{item.title}</h4>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4">
                      {item.description}
                    </p>

                    {/* Use Cases */}
                    <ul className="space-y-2 text-sm">
                      {item.useCases.map((useCase, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-muted-foreground"
                        >
                          <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                          {useCase}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
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
