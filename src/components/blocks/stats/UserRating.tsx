'use client';

import { useState, useCallback, useEffect } from 'react';
import { Star, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranslations } from 'next-intl';

interface RatingData {
  totalRating: number;  // 总评分
  totalVotes: number;   // 总投票数
  ratings: number[];    // 所有评分记录
}

export default function UserRating() {
  const t = useTranslations('Rating');
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [submitted, setSubmitted] = useState(false);
  const [comment, setComment] = useState('');
  const [showSurvey, setShowSurvey] = useState(false);
  const [ratingData, setRatingData] = useState<RatingData>({
    totalRating: 23080, // 基数评分总和
    totalVotes: 5026,   // 基数投票人数
    ratings: []
  });

  // 从LocalStorage加载评分数据
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

  // 保存评分数据到LocalStorage
  const saveRatingData = useCallback((newData: RatingData) => {
    try {
      localStorage.setItem('userRatingData', JSON.stringify(newData));
    } catch (error) {
      console.error('Failed to save rating data:', error);
    }
  }, []);

  // 检查用户是否已经投票过（24小时内）
  const hasVotedRecently = useCallback(() => {
    try {
      const lastVoteTime = localStorage.getItem('userLastVoteTime');
      if (!lastVoteTime) return false;

      const now = Date.now();
      const lastVote = parseInt(lastVoteTime);
      const hoursSinceLastVote = (now - lastVote) / (1000 * 60 * 60);

      return hoursSinceLastVote < 24; // 24小时内不能重复投票
    } catch (error) {
      console.error('Failed to check vote time:', error);
      return false;
    }
  }, []);

  const handleRating = (value: number) => {
    setRating(value);

    // 检查是否已经投票过
    if (hasVotedRecently()) {
      // 显示已投票提示
      setSubmitted(true);
      return;
    }

    if (value < 3) {
      setShowSurvey(true);
    } else {
      // 更新评分数据
      const newTotalRating = ratingData.totalRating + value;
      const newTotalVotes = ratingData.totalVotes + 1;
      const newRatingData: RatingData = {
        totalRating: newTotalRating,
        totalVotes: newTotalVotes,
        ratings: [...ratingData.ratings, value]
      };

      setRatingData(newRatingData);
      saveRatingData(newRatingData);

      // 记录投票时间
      try {
        localStorage.setItem('userLastVoteTime', Date.now().toString());
      } catch (error) {
        console.error('Failed to save vote time:', error);
      }

      setSubmitted(true);
    }
  };

  const handleSubmitSurvey = () => {
    // 检查是否已经投票过
    if (!hasVotedRecently()) {
      // 更新评分数据
      const newTotalRating = ratingData.totalRating + rating;
      const newTotalVotes = ratingData.totalVotes + 1;
      const newRatingData: RatingData = {
        totalRating: newTotalRating,
        totalVotes: newTotalVotes,
        ratings: [...ratingData.ratings, rating]
      };

      setRatingData(newRatingData);
      saveRatingData(newRatingData);

      // 记录投票时间
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

  // 计算平均评分和显示的投票数
  const averageRating = ratingData.totalVotes > 0 ? (ratingData.totalRating / ratingData.totalVotes).toFixed(1) : '4.6';
  const displayVotes = ratingData.totalVotes;

  if (submitted) {
    return (
      <Card className="bg-slate-900/50 border-slate-800 p-8 text-center animate-in fade-in zoom-in duration-300">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="h-12 w-12 text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{t('thankYouTitle')}</h3>
        <p className="text-slate-400">{t('thankYouMessage')}</p>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-900/50 border-slate-800 p-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">{t('title')}</h3>
        <p className="text-slate-400">{t('subtitle')}</p>
      </div>

      {!showSurvey ? (
        <div className="flex flex-col items-center">
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => handleRating(star)}
                className="transition-transform hover:scale-110 active:scale-95"
              >
                <Star
                  className={`h-10 w-10 transition-colors ${
                    (hover || rating) >= star
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-slate-600'
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="flex flex-col items-center text-sm text-slate-500 mt-2">
            <span className="text-2xl font-bold text-white mb-1">{averageRating}</span>
            <span>{displayVotes.toLocaleString()} {t('votes')}</span>
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
          <p className="text-slate-300 font-medium">{t('surveyPrompt')}</p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t('surveyPlaceholder')}
            className="w-full bg-slate-800 border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500 transition-colors min-h-[100px]"
          />
          <Button
            onClick={handleSubmitSurvey}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 rounded-xl shadow-lg transition-all"
          >
            <Send className="h-4 w-4 mr-2" />
            {t('submitButton')}
          </Button>
        </div>
      )}
    </Card>
  );
}
