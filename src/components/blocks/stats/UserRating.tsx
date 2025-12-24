'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, Send, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';

type RatingData = {
  totalRating: number;
  totalVotes: number;
  ratings: number[];
};

const STAR_VALUES = [1, 2, 3, 4, 5];

export default function UserRating() {
  const t = useTranslations('Rating');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [comment, setComment] = useState('');
  const [showSurvey, setShowSurvey] = useState(false);
  const [ratingData, setRatingData] = useState<RatingData>({
    totalRating: 23080,
    totalVotes: 5026,
    ratings: [],
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedData = localStorage.getItem('userRatingData');
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setRatingData(parsedData);
        }
      } catch (error) {
        console.error('Failed to load rating data:', error);
      }
    }
  }, []);

  const saveRatingData = useCallback((newData: RatingData) => {
    try {
      localStorage.setItem('userRatingData', JSON.stringify(newData));
    } catch (error) {
      console.error('Failed to save rating data:', error);
    }
  }, []);

  const hasVotedRecently = useCallback(() => {
    try {
      const lastVoteTime = localStorage.getItem('userLastVoteTime');
      if (!lastVoteTime) return false;

      const now = Date.now();
      const lastVote = Number.parseInt(lastVoteTime, 10);
      const hoursSinceLastVote = (now - lastVote) / (1000 * 60 * 60);

      return hoursSinceLastVote < 24;
    } catch (error) {
      console.error('Failed to check vote time:', error);
      return false;
    }
  }, []);

  const handleRating = (value: number) => {
    setRating(value);

    if (hasVotedRecently()) {
      setSubmitted(true);
      return;
    }

    if (value < 3) {
      setShowSurvey(true);
    } else {
      const newRatingData: RatingData = {
        totalRating: ratingData.totalRating + value,
        totalVotes: ratingData.totalVotes + 1,
        ratings: [...ratingData.ratings, value],
      };

      setRatingData(newRatingData);
      saveRatingData(newRatingData);

      try {
        localStorage.setItem('userLastVoteTime', Date.now().toString());
      } catch (error) {
        console.error('Failed to save vote time:', error);
      }

      setSubmitted(true);
    }
  };

  const handleSubmitSurvey = () => {
    if (!hasVotedRecently()) {
      const newRatingData: RatingData = {
        totalRating: ratingData.totalRating + rating,
        totalVotes: ratingData.totalVotes + 1,
        ratings: [...ratingData.ratings, rating],
      };

      setRatingData(newRatingData);
      saveRatingData(newRatingData);

      try {
        localStorage.setItem('userLastVoteTime', Date.now().toString());
      } catch (error) {
        console.error('Failed to save vote time:', error);
      }
    }

    setSubmitted(true);
    setShowSurvey(false);
    console.log('Survey Feedback:', { rating, comment });
  };

  const averageRating =
    ratingData.totalVotes > 0
      ? (ratingData.totalRating / ratingData.totalVotes).toFixed(1)
      : '4.6';
  const displayVotes = ratingData.totalVotes;

  if (submitted) {
    return (
      <Card className="bg-muted/40">
        <CardContent className="flex flex-col items-center gap-3 text-center">
          <CheckCircle2 className="h-10 w-10 text-emerald-500" />
          <div className="space-y-1">
            <p className="text-lg font-semibold">{t('thankYouTitle')}</p>
            <p className="text-sm text-muted-foreground">
              {t('thankYouMessage')}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-muted/30">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{t('title')}</CardTitle>
        <CardDescription>{t('subtitle')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!showSurvey ? (
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              {STAR_VALUES.map((star) => {
                const isActive = (hover || rating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => handleRating(star)}
                    className="transition-transform hover:scale-110 active:scale-95"
                  >
                    <Star
                      className={`h-9 w-9 transition-colors ${
                        isActive
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-muted-foreground/60'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold">{averageRating}</div>
              <div className="text-sm text-muted-foreground">
                {displayVotes.toLocaleString()} {t('votes')}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
            <p className="text-sm font-medium text-foreground">
              {t('surveyPrompt')}
            </p>
            <Textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder={t('surveyPlaceholder')}
              className="min-h-[120px]"
            />
            <Button onClick={handleSubmitSurvey} className="w-full gap-2">
              <Send className="h-4 w-4" />
              {t('submitButton')}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
