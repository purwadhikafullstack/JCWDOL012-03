'use client';

import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import { getSessionClient } from '@/services/client';

interface AddressFormProps {
  sessionCookie?: string;
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

export function AddressForm(props: AddressFormProps) {
  const router = useRouter();
  const { sessionCookie } = props;
  const [sessionData, setSessionData] = useState<any>({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getSessionClient(sessionCookie).then((data) => {
      if (data) setSessionData(data);
    });
  }, [sessionCookie]);

  const form = useForm<z.infer<typeof addressFormSchema>>({
    resolver: zodResolver(addressFormSchema),
    mode: 'onChange',
  });

  const onSubmit = async (values: z.infer<typeof addressFormSchema>) => {
    try {
      const userToken = sessionCookie;
      const response = await axios.post(
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

      if (response.data.success === true) {
        router.push('/profile');
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="p-4">
      {sessionData?.addresses && sessionData.addresses.length > 0 && (
        <Card>
          {sessionData.addresses.map((address: any) => (
            <div key={address.id}>
              <p>Street: {address.street}</p>
              <p>City: {address.city}</p>
              <p>Province: {address.province}</p>
              <p>Zip Code: {address.zipCode}</p>
              <p>Notes: {address.notes}</p>
              <p>Is Primary: {address.isPrimary ? 'Ya' : 'Tidak'}</p>
            </div>
          ))}
        </Card>
      )}
      {sessionData?.addresses && sessionData.addresses.length === 0 ? (
        <>
          <p>Anda belum menambahkan alamat.</p>
          <Button onClick={() => setShowForm(true)}>Tambahkan Alamat</Button>
        </>
      ) : (
        <Form {...form}>
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
            <Button variant="outline" type="submit">
              Buat Alamat
            </Button>
          </form>
        </Form>
      )}
    </Card>
  );
}
