'use client';

import { AnimatedGroup } from '@/components/tailark/motion/animated-group';
import { TextEffect } from '@/components/tailark/motion/text-effect';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

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

interface ShowcaseItem {
  id: number;
  title: string;
  description: string;
  image: string;
  darkImage: string;
}

export default function ShowcaseSection() {
  const t = useTranslations('HomePage.showcase');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<ShowcaseItem | null>(null);

  const showcaseItems: ShowcaseItem[] = [
    {
      id: 1,
      title: t('item1.title'),
      description: t('item1.description'),
      image: '/blocks/showcase/showcase-1-light.jpg',
      darkImage: '/blocks/showcase/showcase-1-dark.jpg',
    },
    {
      id: 2,
      title: t('item2.title'),
      description: t('item2.description'),
      image: '/blocks/showcase/showcase-2-light.jpg',
      darkImage: '/blocks/showcase/showcase-2-dark.jpg',
    },
    {
      id: 3,
      title: t('item3.title'),
      description: t('item3.description'),
      image: '/blocks/showcase/showcase-3-light.jpg',
      darkImage: '/blocks/showcase/showcase-3-dark.jpg',
    },
  ];

  return (
    <section id="showcase" className="bg-background px-4 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedGroup variants={transitionVariants}>
          {/* Section Header */}
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

          {/* Showcase Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {showcaseItems.map((item, index) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl border bg-background/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedImage(item)}
              >
                {/* Image Container */}
                <div className="relative aspect-[2650/1440] w-full overflow-hidden rounded-2xl bg-muted">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110 dark:hidden"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <Image
                    src={item.darkImage}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110 hidden dark:block"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Zoom Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="rounded-full bg-black/50 p-3 backdrop-blur-sm">
                      <ZoomIn className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-200 leading-relaxed">{item.description}</p>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-primary/0 transition-colors duration-300 group-hover:border-primary/20" />
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mx-auto mt-16 max-w-3xl text-center">
            <p className="text-muted-foreground">{t('bottomText')}</p>
          </div>
        </AnimatedGroup>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl w-full">
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              aria-label="Close"
            >
              <X className="h-8 w-8" />
            </button>

            {/* Image */}
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                width={2650}
                height={1440}
                className="w-full h-auto object-contain dark:hidden"
                priority
              />
              <Image
                src={selectedImage.darkImage}
                alt={selectedImage.title}
                width={2650}
                height={1440}
                className="w-full h-auto object-contain hidden dark:block"
                priority
              />

              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-gray-200">{selectedImage.description}</p>
              </div>
            </div>

            {/* Instructions */}
            <p className="text-center text-gray-400 mt-4 text-sm">
              Click anywhere or press ESC to close
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
