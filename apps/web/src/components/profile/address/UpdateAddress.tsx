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

interface UpdateAddressProps {
  sessionCookie: string;
  address: Address;
  onSuccess: () => void;
  onCancel: () => void;
}

interface Address {
  id: string;
  street: string;
  city: string;
  province: string;
  zipCode: string;
  notes?: string;
  isPrimary: boolean;
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
  isPrimary: z.boolean(),
});

const UpdateAddress: React.FC<UpdateAddressProps> = ({
  sessionCookie,
  address,
  onCancel,
}) => {
  const handleCancelClick = () => {
    onCancel();
  };

  const router = useRouter();

  const form = useForm<z.infer<typeof addressFormSchema>>({
    resolver: zodResolver(addressFormSchema),
    mode: 'onChange',
    defaultValues: address,
  });

  const onSubmit = async (values: z.infer<typeof addressFormSchema>) => {
    try {
      const userToken = sessionCookie;
      await axios.put(
        `http://localhost:8000/api/profile/update-address/${address.id}`,
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

  const onSuccess = () => {
    router.refresh();
    router.push('/profile/address');
    onCancel();
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
                    checked={field.value}
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
              Simpan Perubahan
            </Button>
            <Button variant="outline" onClick={handleCancelClick}>
              <CrossCircledIcon className="mr-2 w-4" />
              Batal
            </Button>
          </div>
        </form>
      </Card>
    </Form>
  );
};

export default UpdateAddress;
