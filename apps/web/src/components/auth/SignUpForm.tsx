'use client';
import * as React from 'react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import Link from 'next/link';
import * as z from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { signIn } from 'next-auth/react';

const formSchema = z.object({
  email: z.string().email({ message: 'Silakan masukkan email anda' }),
});

export default function UserSignUpForm() {
  const router = useRouter();
  const [emailValue, setEmailValue] = useState<string>('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: emailValue,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios
        .post(
          'http://localhost:8000/api/register/email',
          JSON.stringify(values),
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then((res) => res.data)
        .catch((err) => console.log(err));

      console.log(response);
      if (response.success === true) {
        router.push('/auth/signin');
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <div className="grid gap-6">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }: any) => (
                  <FormItem>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button variant="outline" type="submit" className="my-1">
              Daftar
            </Button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-background px-2 text-muted-foreground">
              Atau daftar dengan metode lain
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          type="button"
          onClick={() =>
            (window.location.href = 'http://localhost:8000/api/auth/google')
          }
        >
          <Icons.google className="mr-2 h-4 w-4" />
          Google
        </Button>
        <div className="relative flex justify-center text-xs">
          <span className="bg-background px-2 text-muted-foreground">
            Sudah punya akun?
            <Link href="/auth/signin"> Login disini</Link>
          </span>
        </div>
      </div>
    </Form>
  );
}
