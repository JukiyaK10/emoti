import React from 'react';
import Link from 'next/link';
import { Avatar } from '@radix-ui/react-avatar';

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
          <Avatar/>
        </div>
      </div>
    </header>
  );
};

export default Header;
