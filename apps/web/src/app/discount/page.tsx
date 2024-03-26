'use client';
import CustomToast from '@/components/ToastCustom';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { formatToIDR } from '@/lib/utils';
import DiscountMenu from '@/components/discountMenu/discountMenu';

interface Pagination {
  currentPage: number;
  prevPage: number | null;
  nextPage: number | null;
  totalPages: number;
}

interface Discount {
  id: number;
  discountName: string;
  discountType: string;
  maxDiscountValue: number | null;
  minPurchaseAmount: number | null;
  limit: number | null;
  product: {
    name: string;
    store: {
      name: string;
    };
  };
}

function DiscountPage() {
  const [getData, setGetData] = useState<Discount[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const router = useRouter();
  const [toastProps, setToastProps] = useState<{
    title: string;
    description?: string;
    status?: 'success' | 'error';
  } | null>(null);

  useEffect(() => {
    fetchDiscount();
  }, []);

  const fetchDiscount = async (page = 1, limit = 5) => {
    try {
      const response = await axios.get(
        `http://localhost:9296/api/discount/getAllDiscount?page=${page}&limit=${limit}`,
      );
      setGetData(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      console.log('failed to fetch', error);
    }
  };

  const handlePageChange = (page: number) => {
    fetchDiscount(page);
  };

  const handleEdit = (id: number) => {
    router.push(`/discount/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    await axios.patch(
      `http://localhost:9296/api/discount/deleteDiscountById/${id}`,
    );
    fetchDiscount();
    setToastProps({
      title: 'Success',
      description: 'Product Category Succesfully Created',
      status: 'success',
    });
    setTimeout(() => {
      setToastProps(null);
    }, 3000);
  };

  return (
    <>
      <Header />
      <Box h={'100vh'} display="flex" flexDirection="column" overflow={'auto'}>
        <Box mt={'100px'}>
          <VStack>
            <Center>
              <Heading textColor={'#FFA000'} fontSize={30} fontStyle={'italic'}>
                DISCOUNT MANAGEMENT
              </Heading>
            </Center>
            <Box mt={4} h={1} w="60%" bg={'#7DBE3C'} borderRadius="full" />
          </VStack>
        </Box>
        <Center>
          <Box mx={10} w={'60%'} mt={10}>
            <TableContainer>
              <Table size={'sm'}>
                <Thead>
                  <Tr>
                    <Th>Discount Name</Th>
                    <Th>Discount Type</Th>
                    <Th>Max Discount Value</Th>
                    <Th>Min Purchase Amount</Th>
                    <Th>Limit Usage</Th>
                    <Th>Product</Th>
                    <Th>Store</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {getData.map((item) => (
                    <Tr key={item.id}>
                      <td>{item.discountName}</td>
                      <td>{item.discountType}</td>
                      <td>
                        {item.maxDiscountValue
                          ? formatToIDR(item.maxDiscountValue)
                          : '-'}
                      </td>
                      <td>
                        {item.minPurchaseAmount
                          ? formatToIDR(item.minPurchaseAmount)
                          : '-'}
                      </td>
                      <td>{item.limit ? item.limit : '-'}</td>
                      <td>{item.product?.name ? item.product.name : '-'}</td>
                      <td>{item.product?.store?.name}</td>
                      <Td>
                        <HStack>
                          <Button
                            colorScheme="teal"
                            size="xs"
                            onClick={() => handleEdit(item.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            colorScheme="red"
                            size="xs"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </Button>
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Center>
        <Center>
          <Box>
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
        <Center>
          <Box mx={'30px'}>
            <DiscountMenu />
          </Box>
        </Center>
      </Box>
      <Footer />
      {toastProps && <CustomToast {...toastProps} />}
    </>
  );
}

export default DiscountPage;
