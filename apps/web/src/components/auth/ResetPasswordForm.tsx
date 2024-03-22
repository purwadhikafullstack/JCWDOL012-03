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
  FormLabel,
} from '@/components/ui/form';
import Link from 'next/link';
import * as z from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

const verificationFormSchema = z.object({
  newPassword: z
    .string()
    .min(6, { message: 'Password minimal terdiri dari 6 karakter' }),
  confirmPassword: z
    .string()
    .min(6, { message: 'Password minimal terdiri dari 6 karakter' }),
});

export default function ResetPasswordForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof verificationFormSchema>>({
    resolver: zodResolver(verificationFormSchema),
  });

  const getTokenFromQuery = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('token') || '';
  };

  const token = getTokenFromQuery();

  const onSubmit = async (values: z.infer<typeof verificationFormSchema>) => {
    try {
      const response = await axios
        .post(
          'http://localhost:8000/api/auth/change-password',
          JSON.stringify(values),
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
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
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password Baru</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Konfirmasi Password Baru</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            </div>
            <Button variant="outline" type="submit" className="my-1">
              Ganti Password
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
}
