'use client';

import { ExternalLink, Play, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

const demoImages = [
  {
    src: '/blocks/showcase/showcase-1-light.jpg',
    darkSrc: '/blocks/showcase/showcase-1-dark.jpg',
    title: 'Automatic Layer Separation',
  },
  {
    src: '/blocks/showcase/showcase-2-light.jpg',
    darkSrc: '/blocks/showcase/showcase-2-dark.jpg',
    title: 'Smart Object Manipulation',
  },
  {
    src: '/blocks/showcase/showcase-3-light.jpg',
    darkSrc: '/blocks/showcase/showcase-3-dark.jpg',
    title: 'Professional Image Editing',
  },
];

export default function IframeDemo() {
  const t = useTranslations('HomePage.hero');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % demoImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + demoImages.length) % demoImages.length
    );
  };

  return (
    <div className="inset-shadow-2xs ring-muted/50 dark:inset-shadow-white/20 bg-muted/50 relative mx-auto max-w-6xl overflow-hidden rounded-2xl border shadow-lg shadow-zinc-950/15 ring-1">
      {/* Demo Images Carousel */}
      <div className="relative aspect-[16/9] w-full bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
        {/* Image */}
        <Image
          src={demoImages[currentImageIndex].src}
          alt={demoImages[currentImageIndex].title}
          fill
          className="object-cover transition-opacity duration-500 dark:hidden"
          priority
        />
        <Image
          src={demoImages[currentImageIndex].darkSrc}
          alt={demoImages[currentImageIndex].title}
          fill
          className="object-cover transition-opacity duration-500 hidden dark:block"
          priority
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
          <Sparkles className="h-12 w-12 text-primary mb-4" />

          <h3 className="text-3xl font-bold text-white text-center mb-4">
            {demoImages[currentImageIndex].title}
          </h3>

          <p className="text-lg text-gray-200 text-center mb-8 max-w-2xl">
            {t('description')}
          </p>

          {/* CTA Button */}
          <a
            href="https://huggingface.co/spaces/Qwen/Qwen-Image-Layered"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-white font-semibold transition-all hover:bg-primary/90 hover:scale-105 hover:shadow-lg"
          >
            <Play className="h-5 w-5 fill-current" />
            Try Demo on HuggingFace
            <ExternalLink className="h-5 w-5" />
          </a>

          {/* Carousel Navigation */}
          <div className="flex items-center gap-4 mt-8">
            <button
              type="button"
              onClick={prevImage}
              className="rounded-full bg-white/10 p-2 text-white backdrop-blur-sm hover:bg-white/20 transition"
              aria-label="Previous image"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Indicators */}
            <div className="flex gap-2">
              {demoImages.map((_, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentImageIndex
                      ? 'w-8 bg-primary'
                      : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextImage}
              className="rounded-full bg-white/10 p-2 text-white backdrop-blur-sm hover:bg-white/20 transition"
              aria-label="Next image"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Auto-play indicator */}
          <p className="text-sm text-gray-300 mt-6">
            Auto-playing demo • Click button to try live demo
          </p>
        </div>
      </div>
    </div>
  );
}
