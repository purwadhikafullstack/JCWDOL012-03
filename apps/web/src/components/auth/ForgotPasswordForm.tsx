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

const formSchema = z.object({
  email: z.string().email({ message: 'Silakan masukkan email anda' }),
});

export default function ForgotPasswordForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios
        .post(
          'http://localhost:8000/api/auth/reset-password',
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
              Kirim Link Reset Password
            </Button>
            <div className="relative flex justify-center text-xs mt-4">
              <span className="bg-background px-2 text-muted-foreground">
                Sudah ingat password akun anda?
                <Link href="/auth/signin"> Login disini</Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </Form>
  );
}
