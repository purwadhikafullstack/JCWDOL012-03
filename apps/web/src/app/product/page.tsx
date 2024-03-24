'use client';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import React, { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Heading,
  VStack,
} from '@chakra-ui/react';
import ProductCard from '@/components/product/ProductCard';
import axios from 'axios';
import ProductListByStore from '@/components/product/productListByStore';

const formatToIDR = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(amount);
};

interface ProductData {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  store: {
    name: string;
  };
  image: {
    id: number;
    url: string;
    productId: number;
  }[];
}


interface Pagination {
  currentPage: number;
  prevPage: number | null;
  nextPage: number | null;
  totalPages: number;
}

function Product() {
  const [getData, setGetData] = useState<ProductData[]>([]);
  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const response = await axios.get(
      'http://localhost:9296/api/product/getAllProduct',
    );
    // Mengonversi harga menjadi format IDR sebelum menyimpan ke state
    const dataWithIDRPrice = response.data.data.map((product: ProductData) => ({
      ...product,
      price: formatToIDR(product.price),
    }));
    setGetData(dataWithIDRPrice);
  };

  return (
    <>
      <Header />
      <ProductListByStore />
      {/* <Footer /> */}
    </>
  );
}

export default Product;
