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
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface ProfileProps {
  sessionCookie?: string;
}

const profileFormSchema = z.object({
  name: z.string().min(3, { message: 'Silakan masukkan nama anda' }),
  username: z.string().min(3, { message: 'Silakan masukkan username anda' }),
  phone: z.string().min(3, { message: 'Silakan masukkn nomor handphone anda' }),
});

export function ProfileForm(props: ProfileProps) {
  const router = useRouter();
  const { sessionCookie } = props;
  const [sessionData, setSessionData] = useState<any>({});

  useEffect(() => {
    getSessionClient(sessionCookie).then((data) => {
      if (data) setSessionData(data);
    });
  }, [sessionCookie]);

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
              'Authorization': `Bearer ${userToken}`,
            },
          },
        )
        .then((res) => res.data)
        .catch((err) => console.log(err));

      console.log(response);
      if (response.success === true) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className='p-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input placeholder={sessionData?.name} {...field} />
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
            name="phone"
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
          <Button variant="outline" type="submit">
            Update Profile
          </Button>
        </form>
      </Form>
    </Card>
  );
}
