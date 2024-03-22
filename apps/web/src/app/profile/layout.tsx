import React from 'react';
import { SidebarNav } from '@/components/profile/Sidebar';
import Header from '@/components/header/Header';
import { cookies } from 'next/headers';

const sidebarNavItems = [
  {
    title: 'Profile',
    href: '/profile',
  },
  {
    title: 'Alamat Pengiriman',
    href: '/profile/address',
  },
  {
    title: 'Voucher',
    href: '/profile/voucher',
  },
  {
    title: 'Ganti Password',
    href: '/profile/password',
  }
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    const sessionCookie: string | undefined = cookies().get('user-token')?.value;
  return (
    <>
      <Header sessionCookie={sessionCookie} />
      <div className="hidden space-y-6 p-10 pb-16 sm:block">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} sessionCookie={sessionCookie}/>
          </aside>
          <div className="flex-1 lg:w-full">
          {React.cloneElement(children as React.ReactElement, { sessionCookie })}
            </div>
        </div>
      </div>
    </>
  );
}
