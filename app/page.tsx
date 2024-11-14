'use client'

import { Button } from "@/components/ui/button";
import Header from '@/components/layout/header';
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { setDate } from "date-fns";
import { PostCard } from "@/components/layout/postcard";

const Page = () => {
  const [date, setDate] = useState<Date>();
  const [showCard, setShowCard] = useState(false);

  const handleButtonClick = () => {
    setShowCard(!showCard);
  };

  return (
    <div className="flex flex-col items-end">
      <Header />
      <Button 
        className="absolute z-50 bottom-1 right-10 py-5 px-2"
        onClick={handleButtonClick}
      >
        つぶやく
      </Button>
      <Calendar 
        mode='single'
        selected={date} 
        onSelect={setDate}
        initialFocus
        className="mr-4"
      />
      {showCard && (
        <PostCard onClose={() => setShowCard(false)} />
      )}
    </div>
  );
}

export default Page;
