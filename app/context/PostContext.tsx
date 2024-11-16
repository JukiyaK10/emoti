
'use client'

import React, { createContext, useState, useContext } from 'react';
import { PostData } from '@/components/layout/postcard';

interface PostContextType {
  posts: PostData[];
  addPost: (post: PostData) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export function PostProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<PostData[]>([]);

  const addPost = (post: PostData) => {
    setPosts(prev => [...prev, post]);
  };

  return (
    <PostContext.Provider value={{ posts, addPost }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
}