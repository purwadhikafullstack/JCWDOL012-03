'use client';

import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
=======
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/lib/utils';
>>>>>>> adb62195e206f27bd7b7bd45023f2bbd77c803f1
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import Image from 'next/image';
<<<<<<< HEAD
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import axios from 'axios';
=======
>>>>>>> adb62195e206f27bd7b7bd45023f2bbd77c803f1

interface ProfileProps {
  sessionCookie?: string;
}

<<<<<<< HEAD
const profileFormSchema = z
  .object({
    name: z
      .string()
      .min(4, {
        message: 'Minimal harus terdiri dari 4 karakter dan tidak ada angka',
      })
      .optional(),
    username: z
      .string()
      .min(4, { message: 'Minimal harus terdiri dari 4 karakter' })
      .optional(),
    phone: z
      .string()
      .min(6, { message: 'Minimal harus terdiri dari 6 angka' })
      .optional(),
  })
  .refine(
    (data) => {
      return (
        data.name !== undefined ||
        data.username !== undefined ||
        data.phone !== undefined
      );
    },
    {
      message: 'Setidaknya satu kolom harus diisi',
    },
  );

export function ProfileForm(props: ProfileProps) {
  const router = useRouter();
  const { sessionCookie } = props;
  const [sessionData, setSessionData] = useState<any>({});
=======
const profileFormSchema = z.object({
  avatar: z.string().optional(),
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: 'Please enter a valid URL.' }),
      }),
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  bio: 'I own a computer.',
  urls: [
    { value: 'https://shadcn.com' },
    { value: 'http://twitter.com/shadcn' },
  ],
};

export function ProfileForm(props: ProfileProps) {
  const { sessionCookie } = props;
  // const router = useRouter();
  // const pathname = usePathname();
  // const hiddenHeader = ['/auth/signin', '/auth/signup'];
  // const hideCreateButton = ['/create-event', '/event/[id]', '/event/[id]/edit'];
  const [sessionData, setSessionData] = useState<any>({});
  const [avatar, setAvatar] = useState<string | null>(null);
>>>>>>> adb62195e206f27bd7b7bd45023f2bbd77c803f1

  useEffect(() => {
    getSessionClient(sessionCookie).then((data) => {
      if (data) setSessionData(data);
    });
  }, [sessionCookie]);

<<<<<<< HEAD
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    mode: 'onChange',
  });

  const onSubmit = async (values: z.infer<typeof profileFormSchema>) => {
    try {
      const userToken = sessionCookie;
      const response = await axios
        .put(
          'http://localhost:8000/api/profile/update-info',
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input
                    pattern="[A-Za-z ]+"
                    placeholder={sessionData?.name}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    pattern="[a-z0-9]+"
                    placeholder={sessionData?.username}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>No. Handphone</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={sessionData?.phone}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="outline" type="submit">
            Update Profile
          </Button>
        </form>
      </Form>
    </Card>
=======
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { fields, append } = useFieldArray({
    name: 'urls',
    control: form.control,
  });

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle the file, for example, you can use FileReader to display the image preview.
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
              <FormControl>
                <Input placeholder={sessionData?.avatar} {...field} />
              </FormControl>
                {/* {sessionData?.avatar && (
                  <div>
                    <Image
                      src={sessionData?.avatar}
                      alt="Avatar Preview"
                      width={100}
                      height={100}
                    />
                  </div>
                )} */}
                {/* {field.value && !sessionData?.avatar && (
                  <div>
                    <Image
                      src={field.value}
                      alt="Current Avatar"
                      width={100}
                      height={100}
                    />
                  </div>
                )} */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder={sessionData?.username} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>No. Handphone</FormLabel>
              <FormControl>
                <Input placeholder={sessionData?.phone} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder={sessionData?.email} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage verified email addresses in your{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button variant="outline" type="submit">
          Update profile
        </Button>
      </form>
    </Form>
>>>>>>> adb62195e206f27bd7b7bd45023f2bbd77c803f1
  );
}
