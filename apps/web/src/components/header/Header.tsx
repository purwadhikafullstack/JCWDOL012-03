'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from '/public/logo.png';
import Image from 'next/image';
import axios from 'axios';
import avatarIcon from '../../../public/assets/avatar.png';
import { useRouter, usePathname } from 'next/navigation';
import { getSessionClient } from '@/services/client';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Megaphone, PlusSquare, ShoppingCart, User } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface HeaderProps {
  sessionCookie?: string;
}

export default function Header(props: HeaderProps) {
  const { sessionCookie } = props;
  const router = useRouter();
  const pathname = usePathname();
  // const hiddenHeader = ['/auth/signin', '/auth/signup'];
  // const hideCreateButton = ['/create-event', '/event/[id]', '/event/[id]/edit'];
  const [sessionData, setSessionData] = useState<any>({});

  useEffect(() => {
    getSessionClient(sessionCookie).then((data) => {
      if (data) setSessionData(data);
    });
  }, [sessionCookie]);

  const handleLogout = async () => {
    await axios.post('http://localhost:8000/api/auth/logout', {
      withCredentials: true,
    });
    router.push('/');
    router.refresh();
  };

  // if (hiddenHeader.includes(pathname)) return null;
  return (
    <header className="flex sticky top-0 left-0 z-50 bg-slate-100 items-center justify-between w-full px-10 py-4 gap-2 border-bottom shadow-lg">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Image
                  src={Logo}
                  alt="logo"
                  width={24}
                  height={24}
                  className="md:mr-2 mr-0"
                />
                <p className="text-xl font-bold sm:flex hidden">FreshMart</p>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Input
        type="search"
        placeholder="Cari Produk"
        className="w-full mx-auto"
      />
      {!sessionCookie ? (
        <NavigationMenu className="flex justify-between">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Button asChild variant="secondary">
                <Link href="/auth/signin">Login</Link>
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button asChild variant="secondary">
                <Link href="/auth/signup">Daftar</Link>
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      ) : (
        <NavigationMenu className="flex justify-between">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Button asChild variant="secondary">
                <Link href="/cart" className="flex gap-1 items-center">
                  <ShoppingCart />
                  <p className="md:block hidden">Keranjang</p>
                </Link>
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon">
                    <Avatar>
                      <AvatarImage src="../../../public/assets/avatar.png" />
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 md:mr-0 mr-2 bg-white transition-all"
                  sideOffset={6}
                >
                  <DropdownMenuLabel>
                    <p>Halo, {sessionData?.name}!</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link className="w-full" href="/profile">
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Separator className="my-2 bg-slate-500" />
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link className="w-full" href="/products">
                        Semua Produk
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link className="w-full" href="/faq">
                        FAQ
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link className="w-full" href="/about">
                        Tentang Kami
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Separator className="my-2 bg-slate-500" />
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}
    </header>
  );
}
