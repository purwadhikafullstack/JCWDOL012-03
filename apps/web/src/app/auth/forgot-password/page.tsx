import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
<<<<<<< HEAD
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

export default function SignInPage() {
=======
import UserSignUpForm from '@/components/form/SignUpForm';

export default function AuthenticationPage() {
>>>>>>> adb62195e206f27bd7b7bd45023f2bbd77c803f1
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
<<<<<<< HEAD
            'absolute right-4 top-4 md:right-8 md:top-8',
=======
            'absolute left-4 top-4 md:left-8 md:top-8',
>>>>>>> adb62195e206f27bd7b7bd45023f2bbd77c803f1
          )}
        >
          Kembali ke halaman utama
        </Link>
<<<<<<< HEAD
=======
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Selamat datang di FreshMart
              </h1>
              <p className="text-sm text-muted-foreground">
                Silakan masukkan email anda untuk registrasi
              </p>
            </div>
            <UserSignUpForm />
          </div>
        </div>
>>>>>>> adb62195e206f27bd7b7bd45023f2bbd77c803f1
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
<<<<<<< HEAD
                &ldquo;Berbelanja bahan makanan sehari-hari di FreshMart adalah
                pilihan terbaik&rdquo;
=======
                &ldquo;FreshMart selalu mempersiapkan bahan makanan dengan
                kualitas terbaik bagi kebutuhan anda&rdquo;
>>>>>>> adb62195e206f27bd7b7bd45023f2bbd77c803f1
              </p>
            </blockquote>
          </div>
        </div>
<<<<<<< HEAD
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
              Reset Password
              </h1>
              <p className="text-sm text-muted-foreground">
              Masukkan email akun anda
              </p>
            </div>
            <ForgotPasswordForm/>
          </div>
        </div>
=======
>>>>>>> adb62195e206f27bd7b7bd45023f2bbd77c803f1
      </div>
    </>
  );
}
