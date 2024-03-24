'use client';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import CustomToast from '@/components/ToastCustom';

function CreateProductCategory() {
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
      const response = await axios.post(
        `http://localhost:9296/api/product/createProductCategory`,
        formData,
      );

      if (response.data.code === 200) {
        setToastProps({
          title: 'Success',
          description: 'Product Category Succesfully Created',
          status: 'success',
        });
      }
    } catch (error) {
      setToastProps({
        title: 'Error',
        description: 'Product Category Already exist',
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
      <Box h={'100vh'}>
        <VStack spacing={4} mt={10}>
          <Box px={10} py={5} bg={'#F9F9F9'} border="1px" borderRadius={'lg'}>
            <Center>
              <form onSubmit={handleSubmit}>
                <FormControl my={4} id="name" isRequired>
                  <FormLabel>Product Category</FormLabel>
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
            Back
          </Button>
        </VStack>
      </Box>
      <Footer />
      {toastProps && <CustomToast {...toastProps} />}
    </>
  );
}

export default CreateProductCategory;
