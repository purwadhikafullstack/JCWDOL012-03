import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import UserSignInForm from '@/components/auth/SignInForm';

export default function SignInPage() {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative hidden min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'absolute right-4 top-4 md:right-8 md:top-8',
          )}
        >
          Kembali ke halaman utama
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Berbelanja bahan makanan sehari-hari di FreshMart adalah
                pilihan terbaik&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Selamat datang di FreshMart
              </h1>
              <p className="text-sm text-muted-foreground">
                Masukkan email dan password anda untuk Login
              </p>
            </div>
            <UserSignInForm />
          </div>
        </div>
      </div>
    </>
  );
}
