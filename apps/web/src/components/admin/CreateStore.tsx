'use client'

import React from 'react';
import axios from 'axios';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons';

interface CreateFormProps {
  sessionCookie: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const storeFormSchema = z.object({
  name: z.string().min(4, {
    message: 'Minimal harus terdiri dari 4 karakter',
  }),
});

const CreateStore: React.FC<CreateFormProps> = ({
  sessionCookie,
  onSuccess,
  onCancel,
}) => {
    
  const handleCancelClick = () => {
    onCancel(); // Panggil prop onCancel
  };

  const router = useRouter();

  const form = useForm<z.infer<typeof storeFormSchema>>({
    resolver: zodResolver(storeFormSchema),
    mode: 'onChange',
  });

  const onSubmit = async (values: z.infer<typeof storeFormSchema>) => {
    try {
      const userToken = sessionCookie;
      await axios.post(
        'http://localhost:8000/api/admin/create-store',
        JSON.stringify(values),
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      onSuccess();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="p-4 ">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <label htmlFor="name" className="block">
            Nama Toko
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            {...form.register('name')}
          />
          {form.formState.errors.name && (
            <p className="text-red-500">{form.formState.errors.name.message}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" type="submit">
            <CheckCircledIcon className="mr-2 w-4" />
            Buat Toko
          </Button>
          <Button variant="outline" onClick={handleCancelClick}>
            <CrossCircledIcon className="mr-2 w-4" />
            Batal Tambah Toko
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CreateStore;