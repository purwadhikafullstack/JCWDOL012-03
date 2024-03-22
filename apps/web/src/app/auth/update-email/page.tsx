import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import VerificationForm from '@/components/auth/VerificationForm';
import UpdateEmailForm from '@/components/auth/UpdateEmailForm';

export default function UpdateMailPage() {
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
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Selamat datang di FreshMart
              </h1>
              <p className="text-sm text-muted-foreground">
                Silakan klik tombol dibawah ini untuk mengubah email anda
              </p>
            </div>
            <UpdateEmailForm />
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
