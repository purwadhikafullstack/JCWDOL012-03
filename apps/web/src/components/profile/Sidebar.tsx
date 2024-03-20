'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardHeader } from '../ui/card';
import { getSessionClient } from '@/services/client';
import { PersonIcon } from '@radix-ui/react-icons';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  sessionCookie?: string;
  items: {
    href: string;
    title: string;
    icon: JSX.Element;
  }[];
}

export function SidebarNav({
  className,
  items,
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
  };

  return (
    <div
      className={`lg:flex lg:relative absolute bg-background lg:-translate-x-0 ease-in transition-all flex-col lg:max-w-[500px] max-w-[500px] min-h-full p-4 gap-4 border rounded-md justify-between z-20 bg-white pt-0 lg:pt-4 ${
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
        O
      </Button>

      <nav
        className={cn(
          'flex flex-col lg:space-y-1 pt-3',
          className,
        )}
        {...props}
      >
        {items.map((item) => (
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
      </nav>
    </div>
  );
}
