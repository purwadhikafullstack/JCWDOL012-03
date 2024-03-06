import Header from '@/components/Header';
import Footer from '@/components/Footer';
import React from 'react';
import { Box, Center, Text } from '@chakra-ui/react';
import TableCategoryList from '@/components/tableCategoryList';

function ProductCategory() {
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
        <Center>
          <TableCategoryList />
        </Center>
      </Box>
      <Footer />
    </>
  );
}

export default ProductCategory;
