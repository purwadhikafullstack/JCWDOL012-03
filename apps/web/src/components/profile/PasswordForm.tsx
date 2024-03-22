'use client';

import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { getSessionClient } from '@/services/client';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface PasswordProps {
  sessionCookie?: string;
}

const passwordFormSchema = z.object({
  oldPassword: z
    .string()
    .min(6, { message: 'Password minimal terdiri dari 6 karakter' }),
  newPassword: z
    .string()
    .min(6, { message: 'Password minimal terdiri dari 6 karakter' }),
  confirmPassword: z
    .string()
    .min(6, { message: 'Password minimal terdiri dari 6 karakter' }),
});

export function PasswordForm(props: PasswordProps) {
  const router = useRouter();
  const { sessionCookie } = props;
  const [sessionData, setSessionData] = useState<any>({});

  useEffect(() => {
    getSessionClient(sessionCookie).then((data) => {
      if (data) setSessionData(data);
    });
  }, [sessionCookie]);

  const form = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    mode: 'onChange',
  });

  const onSubmit = async (values: z.infer<typeof passwordFormSchema>) => {
    try {
      const userToken = sessionCookie;
      const response = await axios
        .put(
          'http://localhost:8000/api/profile/update-password',
          JSON.stringify(values),
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userToken}`,
            },
          },
        )
        .then((res) => res.data)
        .catch((err) => console.log(err));

      console.log(response);
      if (response.success === true) {
        router.push('/profile');
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password Saat Ini</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <Button variant="outline" type="submit">
            Update Password
          </Button>
        </form>
      </Form>
    </Card>
  );
}
