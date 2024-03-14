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

export default function UpdateEmailForm() {
  const router = useRouter();

  // Hapus penggunaan verificationFormSchema dari useForm
  const form = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (values: any) => {
    try {
      const token =
        new URLSearchParams(window.location.search).get('token') || '';

      const response = await axios
        .put(
          'http://localhost:8000/api/profile/update-email',
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
            <Button variant="outline" type="submit" className="my-1">
              Update Email
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
}
