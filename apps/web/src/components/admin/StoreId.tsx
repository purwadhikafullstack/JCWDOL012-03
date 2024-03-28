'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardDescription } from '@/components/ui/card';
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
import CreateStorePoint from './form/CreateStorePoint';
import { getSessionClient } from '@/services/client';
import { useRouter } from 'next/navigation';

interface StoreIdProps {
  sessionCookie?: string;
}

export function StoreId(props: StoreIdProps) {
  const { sessionCookie } = props;
  const router = useRouter();
  const [store, setStore] = useState<any>(null);
  const [sessionData, setSessionData] = useState<any>({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getSessionClient(sessionCookie).then((data) => {
      if (data) setSessionData(data);
    });
  }, [sessionCookie]);

  const onSuccess = () => {
    router.push('/profile');
    router.refresh();
  };

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

  const handleCancelCreatePoint = () => {
    setShowForm(false);
  };

  return (
    <div>
      <Card className="p-4">
        {store ? (
          <div>
            <CardDescription>ID Toko: {store.id}</CardDescription>
            <CardDescription>Nama Toko: {store.name}</CardDescription>
            <ul>
              {store.location.map((location: any, index: number) => ( // Menggunakan map untuk melakukan iterasi
                <li key={index}>
                  Latitude: {location.latitude}, Longitude: {location.longitude} {/* Menampilkan latitude dan longitude */}
                </li>
              ))}
            </ul>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Atur Toko</Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Atur Toko</AlertDialogTitle>
                  <AlertDialogDescription>
                    Apakah anda yakin ingin menghapus alamat ini?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Hapus Alamat</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <CreateStorePoint
              sessionCookie={sessionCookie || ''}
              onSuccess={onSuccess}
              onCancel={handleCancelCreatePoint}
            />
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Card>
    </div>
  );
}

export default StoreId;
