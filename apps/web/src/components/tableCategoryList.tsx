'use client';
import {
  Button,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomToast from './ToastCustom';
import { useRouter } from 'next/navigation';

const TableCategoryList = () => {
  const [dataCategory, setDataCategory] = useState([]);
  const [toastProps, setToastProps] = useState<{
    title: string;
    description?: string;
    status?: 'success' | 'error';
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:9296/api/product/getProductCategory',
      );
      console.log(response.data.data);

      setDataCategory(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (categoryId: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:9296/api/product/deleteProductCategory/${categoryId}`,
      );
      if (response.data.code === 200) {
        setToastProps({
          title: 'Success',
          description: 'Category successfully deleted',
          status: 'success',
        });
        getData();
      }
    } catch (error) {
      setToastProps({
        title: 'Error',
        description: 'failed to delete category',
        status: 'error',
      });
    } finally {
      setTimeout(() => {
        setToastProps(null);
      }, 3000);
    }
  };

  const handleEdit = (categoryId: number) => {
    router.push(`productCategory/edit/${categoryId}`);
  };
  return (
    <>
      <TableContainer mt={10}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th textAlign={'center'}>Category</Th>
              <Th textAlign={'center'}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataCategory.length > 0 ? (
              dataCategory.map((item) => (
                <Tr key={item.id}>
                  <Td>{item.name}</Td>
                  <HStack>
                    <Button
                      colorScheme="teal"
                      size={'sm'}
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      colorScheme="red"
                      size={'sm'}
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </HStack>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={2} textAlign="center">
                  <Text fontStyle={'italic'}>Category Not Found</Text>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      {toastProps && <CustomToast {...toastProps} />}
    </>
  );
};
export default TableCategoryList;
