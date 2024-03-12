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
  name: z.string().min(3, { message: 'Silakan masukkan nama anda' }),
  username: z.string().min(3, { message: 'Silakan masukkan username anda' }),
  email: z.string().email({ message: 'Silakan masukkan email anda' }),
  password: z
    .string()
    .min(6, { message: 'Password minimal terdiri dari 6 karakter' }),
  refCode: z.string().optional(),
});

export default function UserSignUpForm() {
  const router = useRouter();
  // const [nameValue, setNameValue] = useState<string>('');
  // const [usernameValue, setUsernameValue] = useState<string>('');
  const [emailValue, setEmailValue] = useState<string>('');
  // const [passwordValue, setPasswordValue] = useState<string>('');
  // const [refCodeValue, setRefCodeValue] = useState<string>('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // name: nameValue,
      // username: usernameValue,
      email: emailValue,
      // password: passwordValue,
      // refCode: refCodeValue,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios
        .post('http://localhost:8000/api/auth/signup', JSON.stringify(values), {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        })
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
              {/* <FormField
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
              /> */}
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
              {/* <FormField
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
              /> */}
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
        <Button variant="outline" type="button" onClick={() => signIn('google')}>
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
