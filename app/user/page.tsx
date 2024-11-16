'use client'

import Header from '@/components/layout/header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePosts } from '../context/PostContext';
import Image from 'next/image';  // 追加

const UserPage = () => {
  const { posts } = usePosts();

  return (
    <div className="pt-16">
      <Header />
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center space-y-4 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
          <Avatar className="h-32 w-32">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          
          <div className="text-center">
            <h2 className="text-xl font-bold">@username</h2>
            <div className="mt-2">
              <span className="text-lg font-semibold">もち数</span>
              <div className="text-3xl font-bold text-blue-600">123</div>
            </div>
          </div>

          <div className="w-full max-w-2xl mt-8">
            <h3 className="text-xl font-bold mb-4">過去のもち投げ</h3>
            {posts.map((post, index) => (
              <div key={index} className="bg-white/60 p-4 rounded-lg shadow-md mb-4">
                <div className="flex items-start gap-4">
                  <Image
                    src={post.imagePath}
                    alt="Emotion representation"
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="mb-2">{post.text}</p>
                    <div className="grid grid-cols-5 gap-2 text-sm">
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
        </div>
      </div>
    </div>
  );
};

export default UserPage;
