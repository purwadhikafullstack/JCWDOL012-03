'use client';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import CustomToast from '@/components/ToastCustom';

interface EditProductCategoryPayload {
  params: {
    id: string;
  };
}

function EditProductCategory({ params }: EditProductCategoryPayload) {
  const id = params.id;
  const [isLoading, setIsLoading] = useState(false);
  const [toastProps, setToastProps] = useState<{
    title: string;
    description?: string;
    status?: 'success' | 'error';
  } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
  });
  const router = useRouter();

  useEffect(() => {
    fetchCategoryExisting(parseInt(id));
  }, []);

  const fetchCategoryExisting = async (id: number) => {
    const response = await axios.get(
      `http://localhost:9296/api/product/getProductCategoryById/${id}`,
    );
    setFormData(response.data.data);
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
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `http://localhost:9296/api/product/updateProductCategory/${id}`,
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
      router.push('/product/productCategory');
    }
  };

  const handleBack = () => {
    router.push('/product/productCategory');
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
                />
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
          Back w
        </Button>
      </VStack>
      <Footer />
      {toastProps && <CustomToast {...toastProps} />}
    </>
  );
}

export default EditProductCategory;
