'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomToast from '@/components/ToastCustom';
import { useRouter } from 'next/navigation';
import { ArrowBackIcon } from '@chakra-ui/icons';

interface EditStoreAdminPayload {
  params: {
    id: string;
  };
}

interface Store {
  id: string;
  name: string;
}

const EditStoreAdmin = ({ params }: EditStoreAdminPayload) => {
  const id = params.id;
  const [isLoading, setIsLoading] = useState(false);
  const [toastProps, setToastProps] = useState<{
    title: string;
    description?: string;
    status?: 'success' | 'error';
  } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    storeAdmin: {
      storeId: '',
    },
  });
  const router = useRouter();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(
      `http://localhost:9296/api/auth/getStoreAdminById/${id}`,
    );
    const { data } = response.data;

    setFormData(data);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(name);
  };

  const [storeListData, setStoreListData] = useState<Store[]>([]);
  // Mengambil data toko dari API
  useEffect(() => {
    const fetchStoreList = async () => {
      try {
        const response = await axios.get(
          'http://localhost:9296/api/auth/getStoreList',
        );
        setStoreListData(response.data.data);
      } catch (error) {
        console.error('Gagal mengambil data:', error);
      }
    };
    fetchStoreList();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        `http://localhost:9296/api/auth/editStoreAdmin/${id}`,
        formData,
      );
      if (response.data.code === 200) {
        setToastProps({
          title: 'Success',
          description: 'Store Admin Account Succesfully Updated',
          status: 'success',
        });
      }
    } catch (error) {
      setToastProps({
        title: 'Error',
        description: 'Store Admin Account Update Failed',
        status: 'error',
      });
    } finally {
      setIsLoading(false);

      setTimeout(() => {
        setToastProps(null);
      }, 3000);
      router.push('/adminDashboard');
    }
  };
  const handleBack = () => {
    router.push('/adminDashboard');
  };
  return (
    <>
      <Header />
      <VStack spacing={4} mt={10}>
        <Box px={10} py={5} bg={'#F9F9F9'} border="1px" borderRadius={'lg'}>
          <Center>
            <form onSubmit={handleSubmit}>
              <FormControl my={4} id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={formData.name}
                />
              </FormControl>

              <FormControl my={4} id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl my={4} id="phone" isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Store</FormLabel>
                {storeListData.length > 0 && (
                  <Select
                    name="storeId"
                    value={formData.storeId}
                    onChange={handleChange}
                  >
                    {storeListData.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Select>
                )}
              </FormControl>
              <Center>
                <Button mt={4} type="submit" colorScheme="teal">
                  {isLoading ? 'loading...' : 'Submit'}
                </Button>
              </Center>
            </form>
          </Center>
        </Box>
        <Button
          leftIcon={<ArrowBackIcon />}
          colorScheme="red"
          onClick={handleBack}
        >
          Back
        </Button>
        {toastProps && <CustomToast {...toastProps} />}
      </VStack>
      <Footer />
    </>
  );
};

export default EditStoreAdmin;
