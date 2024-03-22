'use client';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import {
  Select,
  Button,
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import CustomToast from '@/components/ToastCustom';
import { useRouter } from 'next/navigation';
import { ArrowBackIcon } from '@chakra-ui/icons';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

interface Category {
  id: string;
  name: string;
}

interface Store {
  id: string;
  name: string;
}

interface FormData {
  name: string;
  description: string;
  price: string;
  stock: string;
  storeId: string;
  categoryId: string;
  image: object;
}

const ProductForm = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    price: '',
    stock: '',
    storeId: '',
    categoryId: '',
    image: {},
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [toastProps, setToastProps] = useState<{
    title: string;
    description?: string;
    status?: 'success' | 'error';
  } | null>(null);
  const [sizeWarning, setSizeWarning] = useState(false);
  const [testError, setTestError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          'http://localhost:9296/api/product/getProductCategory',
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error('Gagal mengambil data:', error);
      }
    };
    const fetchStore = async () => {
      try {
        const response = await axios.get(
          'http://localhost:9296/api/auth/getStoreList',
        );
        setStores(response.data.data);
      } catch (error) {
        console.error('Gagal mengambil data:', error);
      }
    };
    fetchStore();
    fetchCategory();
  }, []);

  const handleChange = (e: any) => {
    const { name, value, type, files } = e.target;

    const updatedFormData = new FormData();

    // Jika input adalah file, tangani secara khusus
    if (type === 'file' && files && files.length === 1) {
      const image = files[0];
      setFormData({
        ...formData,
        image: image || '',
      });
      updatedFormData.set(name, image);
      console.log(image);

      if (files[0].size > 1048576) {
        return setSizeWarning(true);
      }

      setSizeWarning(false);
      // Buat URL preview untuk setiap gambar
      const imageUrl = URL.createObjectURL(image);
      setImagePreviews([imageUrl]);
      updatedFormData.set(name, image);
    } else {
      // Tangani input teks atau select biasa
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  console.log(formData);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:9296/api/product/createProduct',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      if (response.data.code === 200) {
        setToastProps({
          title: 'Success',
          description: 'Product Succesfully Created',
          status: 'success',
        });
      }
    } catch (error) {
      setToastProps({
        title: 'Error',
        description: `${testError}`,
        status: 'error',
      });
    } finally {
      setTimeout(() => {
        setFormData({
          name: '',
          description: '',
          price: '',
          stock: '',
          storeId: '',
          categoryId: '',
          image: {},
        });
        setImagePreviews([]);
        setToastProps(null);
      }, 3000);
      router.push('/product');
    }
  };

  const handleBack = () => {
    router.push('/product');
  };

  return (
    <>
      <Header />
      <Box
        m={10}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Box p={4} maxW="md" borderWidth="1px" borderRadius="lg">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <FormControl>
              <FormLabel>Name</FormLabel>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Stock</FormLabel>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Store</FormLabel>
              <Select
                name="storeId"
                value={formData.storeId}
                onChange={handleChange}
                placeholder="select a store"
                required
              >
                {stores.map((store) => (
                  <option key={store.id} value={store.id}>
                    {store.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Images</FormLabel>
              <Input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/png, image/gif, image/jpeg, image/jpg"
                required
              />
              <Box mt={4}>
                {imagePreviews.map((url, index) => (
                  <Image
                    key={index}
                    src={url}
                    alt={`Preview ${index + 1}`}
                    boxSize={'100px'}
                  />
                ))}
                <Text display={sizeWarning ? 'block' : 'none'}>
                  ukuran gambar melebihi 1MB
                </Text>
              </Box>
            </FormControl>
            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              isDisabled={sizeWarning === true}
            >
              Create Product
            </Button>
          </form>
        </Box>
        <Button
          leftIcon={<ArrowBackIcon />}
          colorScheme="red"
          onClick={handleBack}
          mt={4}
        >
          Back
        </Button>
        {toastProps && <CustomToast {...toastProps} />}
      </Box>
      <Footer />
    </>
  );
};

export default ProductForm;
