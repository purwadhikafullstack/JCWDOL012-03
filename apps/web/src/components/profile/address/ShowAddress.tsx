import React, { useState } from 'react';
import { Card, CardDescription, CardHeader } from '@/components/ui/card';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import UpdateAddress from './UpdateAddress';
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
import {
  HomeIcon,
  Pencil2Icon,
  SewingPinFilledIcon,
  TrashIcon,
} from '@radix-ui/react-icons';

interface Address {
  id: string;
  street: string;
  city: string;
  province: string;
  zipCode: string;
  notes?: string;
  isPrimary: boolean;
}

interface ShowAddressProps {
  addresses: Address[];
  sessionCookie: string;
  fetchAddresses: () => void; // Function to fetch addresses after updating
}

const ShowAddress: React.FC<ShowAddressProps> = ({
  addresses,
  sessionCookie,
  fetchAddresses,
}) => {
  const [editedAddress, setEditedAddress] = useState<Address | null>(null);

  const handleEdit = (id: string) => {
    const addressToEdit = addresses.find((address) => address.id === id);
    setEditedAddress(addressToEdit || null);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/profile/delete-address/${id}`,
      );
      // Handle deletion on the UI side, you may use state management or refetch the data
      console.log('Address deleted successfully');
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const handleSetDefaultAddress = async (id: string) => {
    try {
      const userToken = sessionCookie;
      await axios.put(
        `http://localhost:8000/api/profile/default-address/${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      // Handle success, maybe show a success message or update UI
      console.log('Address set as default successfully');
      // Fetch addresses again to reflect changes
      fetchAddresses();
    } catch (error) {
      console.error('Error setting default address:', error);
    }
  };

  const handleAddCurrentLocationPoint = async (id: string) => {
    try {
      const userToken = sessionCookie;
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        },
      );

      const { latitude, longitude } = position.coords;

      await axios.patch(
        `http://localhost:8000/api/location/current/${id}`,
        {
          latitude: latitude,
          longitude: longitude,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );

      console.log('Location point added successfully');
    } catch (error) {
      console.error('Error adding location point:', error);
    }
  };

  return (
    <div>
      <CardHeader className="-mb-5">Daftar Alamat</CardHeader>
      {addresses.map((address) => (
        <div key={address.id}>
          {editedAddress && editedAddress.id === address.id ? (
            <UpdateAddress
              key={address.id}
              address={editedAddress}
              onSuccess={() => setEditedAddress(null)}
              onCancel={() => setEditedAddress(null)}
              sessionCookie={sessionCookie}
            />
          ) : (
            <Card className="p-4 m-4">
              <CardDescription>Jalan: {address.street}</CardDescription>
              <CardDescription>Kota: {address.city}</CardDescription>
              <CardDescription>Provinsi: {address.province}</CardDescription>
              <CardDescription>Kode Pos: {address.zipCode}</CardDescription>
              {address.notes && (
                <CardDescription>Notes: {address.notes}</CardDescription>
              )}
              <CardDescription>
                Alamat Utama: {address.isPrimary ? 'Ya' : 'Tidak'}
              </CardDescription>
              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleEdit(address.id)}
                >
                  <Pencil2Icon className="mr-2 w-4" />
                  Ubah Alamat
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">
                      <TrashIcon className="mr-2 w-4" />
                      Hapus Alamat
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Hapus Alamat</AlertDialogTitle>
                      <AlertDialogDescription>
                        Apakah anda yakin ingin menghapus alamat ini?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(address.id)}
                      >
                        <TrashIcon className="mr-2 w-4" />
                        Hapus Alamat
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">
                      <SewingPinFilledIcon className="mr-2 w-4" />
                      Atur Titik Alamat
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Atur Titik Alamat</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tentukan titik alamat berdasarkan posisi yang anda
                        inginkan
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <AlertDialogAction
                        className="bg-black text-white"
                        onClick={() => handleAddCurrentLocationPoint(address.id)}
                      >
                        Posisi Saat Ini
                      </AlertDialogAction>
                      <AlertDialogAction
                      // onClick={() => }
                      >
                        Posisi Lain
                      </AlertDialogAction>
                      <AlertDialogCancel>Batalkan</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button
                  variant="outline"
                  onClick={() => handleSetDefaultAddress(address.id)}
                  style={{
                    display: address.isPrimary ? 'none' : '',
                  }}
                >
                  <HomeIcon className="mr-2 w-4" />
                  Set Alamat Utama
                </Button>
                CreateStorePoint
              </div>
            </Card>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShowAddress;
