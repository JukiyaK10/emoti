import React from 'react';
import Link from 'next/link';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex justify-center items-center px-4 relative">
        {/* ロゴ */}
        <Link href="/" className="flex items-center text-lg font-bold">
          <span>eMOTI</span>
        </Link>

        {/* Avatar を右端に配置 */}
        <div className="absolute right-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
         </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
