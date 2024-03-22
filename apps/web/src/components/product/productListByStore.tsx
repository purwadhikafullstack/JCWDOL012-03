'use client';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import React, { useEffect, useState } from 'react';
import { Box, Button, Center, Grid, Heading, VStack } from '@chakra-ui/react';
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

function ProductListByStore() {
  const [getData, setGetData] = useState<ProductData[]>([]);
  useEffect(() => {
    fetchProduct();
  }, []);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const fetchProduct = async (page = 1, limit = 6) => {
    const response = await axios.get(
      `http://localhost:9296/api/product/getAllProduct?page=${page}&limit=${limit}`,
    );
    // Mengonversi harga menjadi format IDR sebelum menyimpan ke state
    const dataWithIDRPrice = response.data.data.map((product: ProductData) => ({
      ...product,
      price: formatToIDR(product.price),
    }));
    setGetData(dataWithIDRPrice);
    console.log(dataWithIDRPrice);

    setPagination(response.data.pagination);
  };

  const handlePageChange = (page: number) => {
    fetchProduct(page);
  };

  return (
    <>
      <Box h={'100vh'}>
        <Center mt={4}>
          <VStack>
            <Heading>{getData[0].store.name}</Heading>
            <Box mt={4} h={1} w="60%" bg={'#7DBE3C'} borderRadius="full" />
          </VStack>
        </Center>
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
                imageUrl={`http://localhost:9296/${product.image[0].url}`}
                // imageUrl={`http://localhost:9296/public//bayam2.jpg`}
              />
            ))}
          </Grid>
        </Box>
        <Center>
          <Box mt={'50px'}>
            {pagination && (
              <Box>
                <Button
                  isDisabled={pagination.currentPage === 1}
                  onClick={() => handlePageChange(pagination.prevPage ?? 1)}
                >
                  Previous
                </Button>
                <span>{`Page ${pagination.currentPage} of ${pagination.totalPages}`}</span>
                <Button
                  isDisabled={pagination.currentPage === pagination.totalPages}
                  onClick={() => handlePageChange(pagination.nextPage ?? 1)}
                >
                  Next
                </Button>
              </Box>
            )}
          </Box>
        </Center>
      </Box>
      {/* <Footer /> */}
    </>
  );
}

export default ProductListByStore;
