'use client';
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface UserLocation {
  latitude: number;
  longitude: number;
}

interface StoreData {
  nearestStore: [];
  name: string;
}

const ProductList = () => {
  const router = useRouter();
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [storeData, setStoreData] = useState<StoreData | null>(null);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting user location:', error);
        },
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const getNearestStoreData = async (latitude: number, longitude: number) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/location/nearest-store?latitude=${latitude}&longitude=${longitude}`,
      );
      if (response.status === 200) {
        setStoreData(response.data);
        console.log(response.data.nearestStore.name);
      } else {
        throw new Error('Failed to fetch store data');
      }
    } catch (error) {
      console.error('Error sending location to API:', error);
    }
  };

  useEffect(() => {
    if (userLocation) {
      const { latitude, longitude } = userLocation;
      getNearestStoreData(latitude, longitude);
    }
  }, [userLocation]);

  const handleNext = () => {
    router.push('/product');
  };

  return (
    <div>
      <Card className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-5 mb-5"></Card>
      <Card className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-5 mb-5">
        <h1>Produk yang sering dicari</h1>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </Card>
      <Button variant="outline" onClick={handleNext}>
        Semua Produk
      </Button>
      {userLocation && (
        <div>
          <p>Latitude: {userLocation.latitude}</p>
          <p>Longitude: {userLocation.longitude}</p>
        </div>
      )}
      {storeData && (
        <div>
          <p>{storeData.nearestStore.name}</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
