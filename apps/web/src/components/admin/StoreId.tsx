'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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

const StoreId = () => {
  const [store, setStore] = useState<any>(null);
  //   const router = useRouter();
  //   const { id } = router.query;

  const getIdFromPath = () => {
    const path = window.location.pathname;
    const segments = path.split('/');
    return segments[segments.length - 1] || '';
  };
  const id = getIdFromPath();

  useEffect(() => {
    const fetchStoreById = async () => {
      try {
        if (id) {
          const response = await axios.get(
            `http://localhost:8000/api/admin/store/${id}`,
          );
          setStore(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching store data:', error);
      }
    };

    fetchStoreById();
  }, [id]);

  return (
    <div>
      <Card className="p-4">
        {store ? (
          <div>
            <p>ID Toko: {store.id}</p>
            <p>Nama Toko: {store.name}</p>
            <p>Lokasi: {store.location}</p>
            <p>Admin: {store.location}</p>
            <p>Pinpoint: {store.location}</p>
            {/* Tambahkan data lain yang ingin ditampilkan */}
            {/* <Button variant="outline" onClick={() => router.back()}>
              Kembali
            </Button> */}
            <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">Atur Toko</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Atur Toko
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                      Apakah anda yakin ingin menghapus alamat ini?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>
                        {/* <TrashIcon className="mr-2 w-4" /> */}
                        Hapus Alamat
                        </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
          </div>
          
        ) : (
          <p>Loading...</p>
        )}
      </Card>
    </div>
  );
};

export default StoreId;
