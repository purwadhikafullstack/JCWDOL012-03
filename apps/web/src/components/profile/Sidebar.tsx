'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { getSessionClient } from '@/services/client';
import {
  HomeIcon,
  IdCardIcon,
  LockClosedIcon,
  DoubleArrowRightIcon,
  PersonIcon,
} from '@radix-ui/react-icons';

const sidebarNavUser = [
  {
    title: 'Profile',
    href: '/profile',
    icon: <PersonIcon />,
  },
  {
    title: 'Alamat Pengiriman',
    href: '/profile/address',
    icon: <HomeIcon />,
  },
  {
    title: 'Voucher',
    href: '/profile/voucher',
    icon: <IdCardIcon />,
  },
  {
    title: 'Ganti Password',
    href: '/profile/password',
    icon: <LockClosedIcon />,
  },
];

const sidebarNavAdmin = [
  {
    title: 'Daftar Toko',
    href: '/profile/admin/store-list',
    icon: <HomeIcon />,
  },
  {
    title: 'Daftar Store Admin',
    href: '/profile/admin/store-admin-list',
    icon: <PersonIcon />,
  },
];

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  sessionCookie?: string;
}

export function SidebarNav({
  className,
  sessionCookie,
  ...props
}: SidebarNavProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [sessionData, setSessionData] = useState<any>({});

  useEffect(() => {
    getSessionClient(sessionCookie).then((data) => {
      if (data) setSessionData(data);
    });
  }, [sessionCookie]);

  const handleOpenSidebar = () => {
    setIsOpen(!isOpen);
    console.log(sessionData.role);
  };

  const isSuperAdmin = sessionData.role === 'superadmin';

  return (
    <div
      className={`lg:flex lg:relative absolute bg-background lg:-translate-x-0 ease-in transition-all flex-col lg:max-w-[400px] max-w-[400px] p-4 gap-4 border rounded-md min-h-full justify-between z-20 bg-white pt-0 lg:pt-4 ${
        isOpen ? '-translate-x-0' : '-translate-x-[225px]'
      } `}
    >
      <Button
        onClick={handleOpenSidebar}
        variant="outline"
        className={`lg:hidden w-12 px-0 z-10 absolute transition-all top-30 -right-12 ${
          isOpen ? '' : '-right-12'
        }`}
      >
        <DoubleArrowRightIcon />
      </Button>

      <nav
        className={cn('flex flex-col lg:space-y-1 pt-3', className)}
        {...props}
      >
        <CardTitle className="ml-4 mb-2">Info Pengguna</CardTitle>
        <div className="flex flex-col pb-8">
          {sidebarNavUser.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                pathname === item.href
                  ? 'bg-muted hover:bg-muted'
                  : 'hover:bg-transparent hover:underline',
                'justify-start',
              )}
            >
              <span className="flex items-center">
                {item.icon}
                <span className="ml-2">{item.title}</span>
              </span>
            </Link>
          ))}
        </div>
        {isSuperAdmin && (
          <>
            <CardTitle className="ml-4 mb-2 pb-2">Info Admin</CardTitle>
            <div className="flex flex-col pb-4">
              {sidebarNavAdmin.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    pathname === item.href
                      ? 'bg-muted hover:bg-muted'
                      : 'hover:bg-transparent hover:underline',
                    'justify-start',
                  )}
                >
                  <span className="flex items-center">
                    {item.icon}
                    <span className="ml-2">{item.title}</span>
                  </span>
                </Link>
              ))}
            </div>
          </>
        )}
      </nav>
    </div>
  );
}
