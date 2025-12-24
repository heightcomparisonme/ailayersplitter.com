'use client';

import { AnimatedGroup } from '@/components/tailark/motion/animated-group';
import { TextEffect } from '@/components/tailark/motion/text-effect';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useTranslations } from 'next-intl';

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

export default function FaqSection() {
  const t = useTranslations('HomePage.faqs');

  // Generate all 20 FAQ items dynamically
  const faqItems = Array.from({ length: 20 }, (_, i) => ({
    id: `item-${i + 1}`,
    question: t(`items.item-${i + 1}.question`),
    answer: t(`items.item-${i + 1}.answer`),
  }));

  return (
    <section id="faqs" className="bg-muted/30 px-4 py-24">
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

          {/* FAQ Accordion */}
          <div className="mx-auto max-w-5xl">
            <Accordion
              type="single"
              collapsible
              className="w-full rounded-2xl border bg-background/50 backdrop-blur-sm shadow-lg"
            >
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-border/40 last:border-0"
                >
                  <AccordionTrigger className="cursor-pointer text-base font-semibold hover:no-underline hover:text-primary transition-colors px-6 py-4">
                    <span className="text-left">
                      {index + 1}. {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </AnimatedGroup>
      </div>
    </section>
  );
}
