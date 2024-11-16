import Image from 'next/image';
import { useState } from 'react';

export interface PostData {
  text: string;
  emotions: {
    joy: number;
    anger: number;
    sadness: number;
    surprise: number;
    fear: number;
  };
  imagePath: string;  // 追加
}

const getEmotionImage = (emotions: {
  joy: number;
  anger: number;
  sadness: number;
  surprise: number;
  fear: number;
}) => {
  const maxEmotion = Math.max(
    emotions.joy,
    emotions.anger,
    emotions.sadness,
    emotions.surprise,
    emotions.fear
  );

  // すべての感情値が同じ場合
  const allEqual = Object.values(emotions).every(val => val === emotions.joy);
  if (allEqual) return '/moti/normal.jpeg';

  // 怒りが最大の場合
  if (maxEmotion === emotions.anger && emotions.anger > 20) {
    return '/moti/angry.jpeg';
  }

  return '/moti/normal.jpeg';
};

interface PostCardProps {
  onClose: () => void;
  onSubmit: (newPost: PostData) => void;
}

export function PostCard({ onClose, onSubmit }: PostCardProps) {
  const [text, setText] = useState('');
  const [emotions, setEmotions] = useState({
    joy: 0,
    anger: 0,
    sadness: 0,
    surprise: 0,
    fear: 0,
  });

  const handleEmotionChange = (emotion: keyof typeof emotions, value: number) => {
    setEmotions(prev => ({
      ...prev,
      [emotion]: value
    }));
  };

  const handleSubmit = () => {
    const imagePath = getEmotionImage(emotions);
    const newPost: PostData = {
      text: text,
      emotions: emotions,
      imagePath: imagePath
    };
    onSubmit(newPost);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border rounded-lg"
          placeholder="What's on your mind?"
        />
        
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-4">
            <span className="w-20">喜び:</span>
            <input
              type="range"
              min="0"
              max="100"
              value={emotions.joy}
              onChange={(e) => handleEmotionChange('joy', parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="w-12 text-right">{emotions.joy}%</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-20">怒り:</span>
            <input
              type="range"
              min="0"
              max="100"
              value={emotions.anger}
              onChange={(e) => handleEmotionChange('anger', parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="w-12 text-right">{emotions.anger}%</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-20">悲しみ:</span>
            <input
              type="range"
              min="0"
              max="100"
              value={emotions.sadness}
              onChange={(e) => handleEmotionChange('sadness', parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="w-12 text-right">{emotions.sadness}%</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-20">驚き:</span>
            <input
              type="range"
              min="0"
              max="100"
              value={emotions.surprise}
              onChange={(e) => handleEmotionChange('surprise', parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="w-12 text-right">{emotions.surprise}%</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-20">恐れ:</span>
            <input
              type="range"
              min="0"
              max="100"
              value={emotions.fear}
              onChange={(e) => handleEmotionChange('fear', parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="w-12 text-right">{emotions.fear}%</span>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <Image
            src={getEmotionImage(emotions)}
            alt="Emotion representation"
            width={200}
            height={200}
            className="rounded-lg"
          />
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Post
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}