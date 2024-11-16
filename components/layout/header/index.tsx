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
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* ロゴ */}
        <Link href="/" className="flex items-center text-xl font-bold">
          <span>eMOTI</span>
        </Link>

        {/* ナビゲーションメニュー */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/dashboard" className="hover:text-gray-300 transition-colors">
            ダッシュボード
          </Link>
          <Link href="/projects" className="hover:text-gray-300 transition-colors">
            プロジェクト
          </Link>
          <Link href="/settings" className="hover:text-gray-300 transition-colors">
            設定
          </Link>
        </nav>

        {/* ユーザーアバター */}
        <div className="flex items-center">
          <Avatar className="cursor-pointer hover:opacity-80 transition-opacity">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
