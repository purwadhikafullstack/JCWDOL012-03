'use client';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import React, { useEffect, useState } from 'react';
import { Box, Center, Grid } from '@chakra-ui/react';
import ProductCard from '@/components/product/ProductCard';
import axios from 'axios';

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
  image: {
    id: number;
    url: string;
    productId: number;
  }[];
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
      <Center>
        <Box mt={4} h={1} w="60%" bg={'#7DBE3C'} borderRadius="full" />
      </Center>
      <Box h={'100vh'}>
        <Box
          mx={['10px', '20px', '30px', '40px']}
          px={[0, 4, 8, 12]}
          mt={['10px', '20px', '30px', '40px']}
        >
          <Grid
            templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
            rowGap={4}
          >
            {getData.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                stock={product.stock}
                imageUrl={`../../../../api/${product.image[0].url}`}
              />
            ))}
          </Grid>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default Product;
