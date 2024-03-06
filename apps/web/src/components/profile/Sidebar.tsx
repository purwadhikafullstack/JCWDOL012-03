'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardHeader } from '../ui/card';
import { getSessionClient } from '@/services/client';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  sessionCookie?: string;
  items: {
    href: string;
    title: string;
  }[];
}

export function SidebarNav({
  className,
  items,
  sessionCookie,
  ...props
}: SidebarNavProps) {
  const pathname = usePathname();
  const [sessionData, setSessionData] = useState<any>({});

  useEffect(() => {
    getSessionClient(sessionCookie).then((data) => {
      if (data) setSessionData(data);
    });
  }, [sessionCookie]);

  return (
    <Card>
      <nav
        className={cn(
          'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
          className,
        )}
        {...props}
      >
        {/* <CardHeader>Halo, {sessionData?.name}</CardHeader> */}
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
            {item.title}
          </Link>
        ))}
      </nav>
    </Card>
  );
}
