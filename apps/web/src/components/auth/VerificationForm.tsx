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

const verificationFormSchema = z.object({
  name: z.string().min(3, { message: 'Silakan masukkan nama anda' }),
  username: z.string().min(6, { message: 'Silakan masukkan username anda' }),
  password: z
    .string()
    .min(6, { message: 'Password minimal terdiri dari 6 karakter' }),
  refCode: z.string().optional(),
});

export default function VerificationForm() {
  const router = useRouter();
  const [nameValue, setNameValue] = useState<string>('');
  const [usernameValue, setUsernameValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [refCodeValue, setRefCodeValue] = useState<string>('');

  const form = useForm<z.infer<typeof verificationFormSchema>>({
    resolver: zodResolver(verificationFormSchema),
    defaultValues: {
      name: nameValue,
      username: usernameValue,
      password: passwordValue,
      refCode: refCodeValue,
    },
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
          'http://localhost:8000/api/register/verification',
          JSON.stringify(values),
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
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
                name="name"
                render={({ field }: any) => (
                  <FormItem>
                    <FormControl>
                      <Input type="text" placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }: any) => (
                  <FormItem>
                    <FormControl>
                      <Input type="text" placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
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
              /> */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }: any) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="refCode"
                render={({ field }: any) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Kode Referral (Jika ada)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button variant="outline" type="submit" className="my-1">
              Verifikasi
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
}
