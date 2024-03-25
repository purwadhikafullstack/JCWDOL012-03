'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ShowAddress from './ShowAddress';
import CreateAddress from './CreateAddress';
import { getSessionClient } from '@/services/client';
import { PlusCircledIcon } from '@radix-ui/react-icons';

interface AddressFormProps {
  sessionCookie?: string;
}

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

  const onSuccess = () => {
    router.push('/profile');
    router.refresh();
  };

  // Fungsi untuk menampilkan form CreateAddress
  const handleAddAddressClick = () => {
    setShowForm(true);
  };

  // Fungsi untuk menutup form CreateAddress
  const handleCancelCreateAddress = () => {
    setShowForm(false);
  };

  const fetchAddresses = async () => {
    try {
      const data = await getSessionClient(sessionCookie);
      if (data) setSessionData(data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  return (
    <>
      {sessionData?.addresses && sessionData.addresses.length > 0 && (
        <ShowAddress
          addresses={sessionData.addresses}
          sessionCookie={sessionCookie || ''}
          fetchAddresses={fetchAddresses}
        />
      )}
      {!showForm && sessionData.addresses?.length === 0 && (
        <div>
          <Button onClick={handleAddAddressClick}>
            Anda belum menambahkan alamat
          </Button>
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
      )}
    </>
  );
}
