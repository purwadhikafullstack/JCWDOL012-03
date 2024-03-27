'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import CreateStore from './CreateStore';
import { useRouter } from 'next/navigation';

// Interface untuk user
interface User {
  role: string;
}

// Interface untuk toko
interface Store {
  id: number;
  name: string;
  location: Location[];
}

interface Location {
  id: number;
  name: string;
}

// Props untuk ShowStoreList
interface ShowStoreListProps {
  sessionCookie?: string;
}

// Komponen ShowStoreList
const ShowStoreList: React.FC<ShowStoreListProps> = ({ sessionCookie }) => {
  const [stores, setStores] = useState<Store[]>([]);
  const [showCreateStoreForm, setShowCreateStoreForm] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const router = useRouter();

  // Fetch daftar toko saat komponen dimount
  useEffect(() => {
    async function fetchStoreList() {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/admin/store-list',
        );
        if (response.status === 200) {
          setStores(response.data.data);
        } else {
          throw new Error('Failed to fetch store list');
        }
      } catch (error) {
        console.error('Error fetching store list:', error);
      }
    }

    fetchStoreList();
  }, []);

  // Fungsi untuk menangani klik tombol "Buat Toko"
  const handleCreateStoreClick = () => {
    setShowCreateStoreForm(true);
    setShowButton(false);
  };

  // Fungsi untuk membatalkan pembuatan toko
  const handleCancelCreateStore = () => {
    setShowCreateStoreForm(false);
    setShowButton(true);
  };

  // Fungsi untuk menangani kesuksesan pembuatan toko
  const onSuccess = () => {
    router.refresh();
    router.push('/profile/admin/store-list');
  };

  return (
    <>
      <Card className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Nama Toko</TableCell>
              <TableCell>Lokasi</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(stores) &&
              stores.map((store, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{store.name}</TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <Link href={`/profile/admin/store/${store.id}`} passHref>
                      <Button variant="outline" >Atur Toko</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>
      {showCreateStoreForm && (
        <CreateStore
          sessionCookie={sessionCookie || ''}
          onSuccess={onSuccess}
          onCancel={handleCancelCreateStore}
        />
      )}
      <div>
        {showButton && (
          <Button variant='outline' onClick={handleCreateStoreClick}>Buat Toko</Button>
        )}
      </div>
    </>
  );
};

export default ShowStoreList;
