'use client';

import {
  Box,
  Button,
  Center,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CustomToast from '../ToastCustom';
import { useRouter } from 'next/navigation';

interface Pagination {
  currentPage: number;
  prevPage: number | null;
  nextPage: number | null;
  totalPages: number;
}
interface DataItem {
  id: number;
  name: string;
  email: string;
  role: string;
  storeAdmin: {
    store: {
      name: string;
    };
  };
}

const GetStoreAdmin = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [toastProps, setToastProps] = useState<{
    title: string;
    description?: string;
    status?: 'success' | 'error';
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchStoreAdmin();
  }, []);

  const fetchStoreAdmin = async (page = 1, limit = 5) => {
    try {
      const response = await axios.get(
        `http://localhost:9296/api/auth/getStoreAdmin?page=${page}&limit=${limit}`,
      );
      setData(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      console.log('failed to fetch', error);
    }
  };

  const handlePageChange = (page: number) => {
    fetchStoreAdmin(page);
  };

  const handleDelete = async (id: number) => {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `http://localhost:9296/api/auth/deleteStoreAdmin/${id}`,
      );
      if (response.data.code === 200) {
        setToastProps({
          title: 'Success',
          description: 'Store Admin Account successfully deleted',
          status: 'success',
        });
        fetchStoreAdmin();
      }
    } catch (error) {
      setToastProps({
        title: 'Error',
        description: 'failed to delete store admin account',
        status: 'error',
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setToastProps(null);
      }, 3000);
    }
  };

  const router = useRouter();
  const handleEdit = async (id: number) => {
    router.push(`adminDashboard/editStoreAdmin/${id}`);
  };

  return (
    <>
      <Center>
        <Box w="80%">
          <TableContainer>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Store</Th>
                  <Th>Role</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((item) => (
                  <Tr key={item.id}>
                    <Td>{item.name}</Td>
                    <Td>{item.email}</Td>
                    <Td>{item.storeAdmin?.store.name}</Td>
                    <Td>{item.role}</Td>
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
      {toastProps && <CustomToast {...toastProps} />}
    </>
  );
};

export default GetStoreAdmin;
