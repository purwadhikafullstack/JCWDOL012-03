'use client';

import React, { useEffect, useState } from 'react';
import avatarIcon from '../../../public/assets/avatar.png';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/lib/utils';
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
import { Card } from '../ui/card';

interface ProfileProps {
  sessionCookie?: string;
}

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

export function AvatarForm(props: ProfileProps) {
  const { sessionCookie } = props;

  const [sessionData, setSessionData] = useState<any>({});
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    getSessionClient(sessionCookie).then((data) => {
      if (data) setSessionData(data);
    });
  }, [sessionCookie]);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
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
        <Card className="w-[250px] h-[300px] p-4">
          <Card className="w-[170px] h-[170px] p-4 m-auto">
            <Image
              src={avatarIcon}
              // src={user.avatar || avatar ? user.avatar.url || avatar : avatarIcon}
              alt=""
              className="w-[120px] h-[120px] cursor-pointer m-auto"
              width={120}
              height={120}
            />
          </Card>
          <div className="flex flex-col gap-2 mt-4">
            <Button variant="outline" type="submit">
              Upload File
            </Button>
            <Button variant="outline" type="submit">
              Ganti Avatar
            </Button>
          </div>
        </Card>
        {/* <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
              <FormControl>
                <Input placeholder={sessionData?.avatar} {...field} />
              </FormControl> */}
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
        {/* </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
      </form>
    </Form>
  );
}
