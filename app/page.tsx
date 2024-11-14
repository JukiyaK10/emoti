'use client'

import { Button } from "@/components/ui/button";
import Header from '@/components/layout/header';
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { setDate } from "date-fns";

// const handleBUttonClick: React.FC = () => {
//   const[showPost, setshowPost] =useState(falss);

//   const handleBUttonClick = () => {
//     setShowPost(!showPost);
// }

const Page = () => {
  const [date, setDate] = useState<Date>();
  return (
    <div className="flex flex-col items-end">
      <Header />
      <Button 
      className="absolute z-50 bottom-1 right-10 py-5 px-2 "
      >つぶやく</Button>
      <Calendar 
      mode='single'
      selected={date} 
      onSelect={setDate}
      initialFocus
      className="mr-4"
      />
    </div>
  );
}

export default Page;
