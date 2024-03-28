import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

interface CreateFormProps {
  sessionCookie: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const addressFormSchema = z.object({
  city: z.string().min(4, {
    message: 'Minimal harus terdiri dari 4 karakter',
  }),
  zipCode: z.string().min(5, {
    message: 'Minimal harus terdiri dari 5 karakter',
  }),
});

const CreateStorePoint: React.FC<CreateFormProps> = ({
  sessionCookie,
  onSuccess,
  onCancel,
}) => {
  const handleCancelClick = () => {
    onCancel();
  };

  const router = useRouter();

  const getIdFromPath = () => {
    const path = window.location.pathname;
    const segments = path.split('/');
    return segments[segments.length - 1] || '';
  };
  const id = getIdFromPath();

  const form = useForm<z.infer<typeof addressFormSchema>>({
    resolver: zodResolver(addressFormSchema),
    mode: 'onChange',
  });

  const onSubmit = async (values: z.infer<typeof addressFormSchema>) => {
    try {
      const userToken = sessionCookie;
      await axios.post(
        `http://localhost:8000/api/location/add-store-point/${id}`,
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
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <Card className="p-4 m-4">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kota</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan kota" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kode Pos</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan kode pos" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <Button variant="outline" type="submit">
              <CheckCircledIcon className="mr-2 w-4" />
              Buat Alamat
            </Button>
            <Button variant="outline" onClick={handleCancelClick}>
              <CrossCircledIcon className="mr-2 w-4" />
              Batal Tambah Alamat
            </Button>
          </div>
        </form>
      </Card>
    </Form>
  );
};

export default CreateStorePoint;
