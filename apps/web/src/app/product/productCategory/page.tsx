'use client';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import React from 'react';
import { Box, Button, Center, Text } from '@chakra-ui/react';
import TableCategoryList from '@/components/tableCategoryList';
import { useRouter } from 'next/navigation';

function ProductCategory() {
  const router = useRouter();

  const handleNext = () => {
    router.push('/product/productCategory/create');
  };
  return (
    <>
      <Header />
      <Box h={'100vh'}>
        <Center mt={10}>
          <Text
            fontSize={'3xl'}
            fontWeight={'bold'}
            fontStyle={'italic'}
            color={'#FFA000'}
          >
            Category List
          </Text>
        </Center>
        <Center mt={4}>
          <Box w={'60%'} bg={'#7DBE3C'} h={'6px'} borderRadius={'full'} />
        </Center>
        <Center mt={10}>
          <Button colorScheme="blue" onClick={handleNext}>
            Create
          </Button>
        </Center>
        <Center>
          <TableCategoryList />
        </Center>
      </Box>
      <Footer />
    </>
  );
}

export default ProductCategory;
