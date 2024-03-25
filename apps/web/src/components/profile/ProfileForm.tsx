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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface ProfileProps {
  sessionCookie?: string;
}

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
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

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

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleUpdateProfile = () => {
    form.handleSubmit(onSubmit)();
  };

  return (
    <Card className="p-4">
      {!isFormOpen ? ( // Menampilkan data jika form tidak terbuka
        <div>
          <p>Nama: {sessionData?.name}</p>
          <p>Username: {sessionData?.username}</p>
          <p>No. Handphone: {sessionData?.phone}</p>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" onClick={handleOpenForm}>
              Ganti Profile
            </Button>
          </div>
        </div>
      ) : (
        // Menampilkan form jika form terbuka
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
            <div className="flex gap-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Update Profile</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Update Profile</AlertDialogTitle>
                    <AlertDialogDescription>
                      Apakah anda yakin ingin mengubah informasi profile anda?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction onClick={handleUpdateProfile}>Ya</AlertDialogAction>
                    <AlertDialogCancel onClick={handleCloseForm}>Tidak</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button variant="outline" onClick={handleCloseForm}>
                Batal Update Profile
              </Button>
            </div>
          </form>
        </Form>
      )}
    </Card>
  );
}
