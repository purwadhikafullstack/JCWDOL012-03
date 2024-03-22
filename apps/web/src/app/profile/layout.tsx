import React from 'react';
import { SidebarNav } from '@/components/profile/Sidebar';
import Header from '@/components/header/Header';
import { cookies } from 'next/headers';
import {
  HomeIcon,
  IdCardIcon,
  LockClosedIcon,
  PersonIcon,
} from '@radix-ui/react-icons';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const sessionCookie: string | undefined = cookies().get('user-token')?.value;

  return (
    <>
      <Header sessionCookie={sessionCookie} />
      <div className="space-y-6 pt-5 p-10 pb-16 sm:block">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav sessionCookie={sessionCookie} />
          </aside>
          <div className="flex-1 lg:w-full">
            {React.cloneElement(children as React.ReactElement, {
              sessionCookie,
            })}
          </div>
        </div>
      </div>
    </>
  );
}
