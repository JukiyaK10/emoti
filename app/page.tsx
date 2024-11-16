'use client'

import { Button } from "@/components/ui/button";
import Header from '@/components/layout/header';
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { PostCard, PostData } from "@/components/layout/postcard";

const Page = () => {
  const [date, setDate] = useState<Date>();
  const [showCard, setShowCard] = useState(false);
  const [posts, setPosts] = useState<PostData[]>([]);

  const handleSubmit = (newPost: PostData) => {
    setPosts(prev => [...prev, newPost]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 左側: 投稿一覧 */}
          <div className="space-y-4">
            {posts.map((post, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-start space-x-4">
                  <img src={post.imagePath} alt="感情の表現" className="w-20 h-20 rounded" />
                  <div>
                    <p className="text-gray-700">{post.text}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      <div>喜び: {post.emotions.joy}%</div>
                      <div>怒り: {post.emotions.anger}%</div>
                      <div>悲しみ: {post.emotions.sadness}%</div>
                      <div>驚き: {post.emotions.surprise}%</div>
                      <div>恐れ: {post.emotions.fear}%</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* 右側: カレンダー */}
          <div>
            <Calendar 
              mode='single'
              selected={date} 
              onSelect={setDate}
              initialFocus
            />
          </div>
        </div>
      </div>

      <Button 
        className="fixed z-50 bottom-8 right-8 py-5 px-8 rounded-full"
        onClick={() => setShowCard(true)}
      >
        つぶやく
      </Button>

      {showCard && (
        <PostCard 
          onClose={() => setShowCard(false)} 
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default Page;
