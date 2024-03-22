'use client';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { ChangeEvent, FormEvent, useState } from 'react';

interface FormData {
  discountName: string;
  discountType: string;
  discountValue: string;
  minPurchaseAmount: string;
  limit: string;
  maxDiscountValue: string;
}

const CreateDiscount: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    discountName: '',
    discountType: '',
    discountValue: '',
    minPurchaseAmount: '',
    limit: '',
    maxDiscountValue: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key as keyof FormData]);
    }

    try {
      const response = await axios.post('/api/discounts/:id', formDataToSend);

      if (response.status !== 200) {
        throw new Error('Failed to create discount');
      }

      console.log('Discount created:', response.data);
      // You can add any further actions here, like showing a success message or redirecting the user
    } catch (error) {
      console.error('Error creating discount');
      // Handle errors, maybe display them to the user
    }
  };
  return (
    <>
      <Flex justify="space-between" maxW="800px">
        <Box flex={1} p={4}>
          <form onSubmit={handleSubmit}>
            <FormControl id="discountName">
              <FormLabel>Discount Name:</FormLabel>
              <Input
                type="text"
                name="discountName"
                value={formData.discountName}
                onChange={handleChange}
                required
              />
            </FormControl>

            <FormControl id="discountType">
              <FormLabel>Discount Type:</FormLabel>
              <Select
                name="discountType"
                value={formData.discountType}
                onChange={handleChange}
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed</option>
              </Select>
            </FormControl>

            <FormControl id="discountValue">
              <FormLabel>Discount Value:</FormLabel>
              <Input
                type="number"
                name="discountValue"
                value={formData.discountValue}
                onChange={handleChange}
                required
              />
            </FormControl>

            <FormControl id="minPurchaseAmount">
              <FormLabel>Min Purchase Amount:</FormLabel>
              <Input
                type="number"
                name="minPurchaseAmount"
                value={formData.minPurchaseAmount}
                onChange={handleChange}
                required
              />
            </FormControl>

            <FormControl id="limit">
              <FormLabel>Limit:</FormLabel>
              <Input
                type="number"
                name="limit"
                value={formData.limit}
                onChange={handleChange}
                required
              />
            </FormControl>

            <FormControl id="maxDiscountValue">
              <FormLabel>Max Discount Value:</FormLabel>
              <Input
                type="number"
                name="maxDiscountValue"
                value={formData.maxDiscountValue}
                onChange={handleChange}
              />
            </FormControl>

            <Button type="submit">Submit</Button>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default CreateDiscount;
