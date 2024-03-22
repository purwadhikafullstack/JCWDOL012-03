'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getSessionClient } from '@/services/client';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';

interface StoreProps {
  sessionCookie?: string;
}

export function ShowStoreList(props: StoreProps) {
//   const router = useRouter();
//   const { sessionCookie } = props;
//   const [sessionData, setSessionData] = useState<any>({});
//     const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     getSessionClient(sessionCookie).then((data) => {
//       if (data) setSessionData(data);
//     });
//   }, [sessionCookie]);

//   const onSuccess = () => {
//     router.push('/profile');
//     router.refresh();
//   };

  //   const handleAddAddressClick = () => {
  //     setShowForm(true);
  //   };

  //   const handleCancelCreateAddress = () => {
  //     setShowForm(false);
  //   };

  //   const fetchAddresses = async () => {
  //     try {
  //       const data = await getSessionClient(sessionCookie);
  //       if (data) setSessionData(data);
  //     } catch (error) {
  //       console.error('Error fetching addresses:', error);
  //     }
  //   };

  return (
    <Card className="p-4">
      {/* {sessionData?.addresses && sessionData.addresses.length > 0 && (
        <ShowAddress
          addresses={sessionData.addresses}
          sessionCookie={sessionCookie || ''}
          fetchAddresses={fetchAddresses}
        />
      )}
      {!showForm && sessionData.addresses?.length === 0 && (
        <div>
          <Button onClick={handleAddAddressClick}>Anda belum menambahkan alamat</Button>
        </div>
      )}
      {showForm && (
        <CreateAddress
          sessionCookie={sessionCookie || ''}
          onSuccess={onSuccess}
          onCancel={handleCancelCreateAddress}
        />
      )}
      {!showForm && (
        <Button
          className="m-4"
          variant="outline"
          onClick={handleAddAddressClick}
        >
          <PlusCircledIcon className="mr-2 w-4" />
          Tambah Alamat Baru
        </Button>
      )} */}
      <Table>
          {/* <TableCaption>A list of your events.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30px]">No.</TableHead>
              <TableHead className="w-[200px]">Nama Toko</TableHead>
              <TableHead>Kota</TableHead>
              <TableHead>Store Admin</TableHead>
              <TableHead>Jumlah Produk</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {event?.map((event: any) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.title}</TableCell>
                <TableCell>{event.category}</TableCell>
                <TableCell>{formatDate(event.startDate)}</TableCell>
                <TableCell>{formatDate(event.endDate)}</TableCell>
                <TableCell>{event.status}</TableCell>
              </TableRow>
            ))} */}
            <TableRow>
                <TableCell>1</TableCell>
                <TableCell>FreshMart Jakarta</TableCell>
                <TableCell>Jakarta</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>50</TableCell>
                <TableCell>Aktif</TableCell>
                <TableCell>
                    <Button variant='outline'>Atur Toko</Button>
                    <Button variant='outline'>Hapus Toko</Button>
                </TableCell>
              </TableRow>
          </TableBody>
        </Table>
    </Card>
  );
}
