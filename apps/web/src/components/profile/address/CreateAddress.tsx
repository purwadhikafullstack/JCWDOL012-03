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
  street: z.string().min(4, {
    message: 'Minimal harus terdiri dari 4 karakter',
  }),
  city: z.string().min(4, {
    message: 'Minimal harus terdiri dari 4 karakter',
  }),
  province: z.string().min(4, {
    message: 'Minimal harus terdiri dari 4 karakter',
  }),
  zipCode: z.string().min(5, {
    message: 'Minimal harus terdiri dari 5 karakter',
  }),
  notes: z.string().optional(),
  isPrimary: z.boolean().optional(),
});

const CreateAddress: React.FC<CreateFormProps> = ({
  sessionCookie,
  onSuccess,
  onCancel,
}) => {
  const handleCancelClick = () => {
    onCancel(); // Panggil prop onCancel
  };

  const router = useRouter();

  const form = useForm<z.infer<typeof addressFormSchema>>({
    resolver: zodResolver(addressFormSchema),
    mode: 'onChange',
  });

  const onSubmit = async (values: z.infer<typeof addressFormSchema>) => {
    try {
      const userToken = sessionCookie;
      if (values.isPrimary === undefined) {
        values.isPrimary = false;
      }
      await axios.post(
        'http://localhost:8000/api/profile/create-address',
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
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jalan</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan jalan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            name="province"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Provinsi</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan provinsi" {...field} />
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
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catatan</FormLabel>
                <FormControl>
                  <Input placeholder="Info Detail Bangunan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isPrimary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jadikan Alamat Utama </FormLabel>
                <br />
                <FormControl>
                  <Checkbox
                    checked={field.value ?? false}
                    onCheckedChange={field.onChange}
                  />
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

export default CreateAddress;
