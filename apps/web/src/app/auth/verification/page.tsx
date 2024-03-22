import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import VerificationForm from '@/components/auth/VerificationForm';

export default function VerificationPage() {
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
            'absolute left-4 top-4 md:left-8 md:top-8',
          )}
        >
          Kembali ke halaman utama
        </Link>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Selamat datang di FreshMart
              </h1>
              <p className="text-sm text-muted-foreground">
                Masukkan data yang diperlukan untuk verifikasi
              </p>
            </div>
            <VerificationForm />
          </div>
        </div>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;FreshMart selalu mempersiapkan bahan makanan dengan
                kualitas terbaik bagi kebutuhan anda&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </>
  );
}
