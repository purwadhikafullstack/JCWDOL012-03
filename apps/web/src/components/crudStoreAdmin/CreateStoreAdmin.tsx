'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { VStack, Button, Center } from '@chakra-ui/react';
import CustomToast from '../ToastCustom';
import StoreAdminFormInput from './CreateStoreAdminInput';
import { validationSchema } from '../../common/helper/validationSchema';

interface Store {
  id: string;
  name: string;
}

const CreateStoreAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [storeListData, setStoreListData] = useState<Store[]>([]);
  const [toastProps, setToastProps] = useState<{
    title: string;
    description?: string;
    status?: 'success' | 'error';
  } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    storeId: '',
  });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  useEffect(() => {
    const fetchStoreList = async () => {
      try {
        const response = await axios.get(
          'http://localhost:9296/api/auth/getStoreList',
        );
        setStoreListData(response.data.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchStoreList();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      username: '',
      email: '',
      password: '',
      phone: '',
      storeId: '',
    });
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await validationSchema.validate(formData, { abortEarly: false });
      const response = await axios.post(
        'http://localhost:9296/api/auth/createStoreAdmin',
        formData,
      );
      if (response.data.code === 200) {
        setToastProps({
          title: 'Success',
          description: 'Store Admin Account Created Successfully!!',
          status: 'success',
        });
      }
      resetForm();
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        const newErrors: Partial<typeof formData> = {};
        error.inner.forEach((err: any) => {
          newErrors[err.path as keyof typeof formData] = err.message;
        });
        setErrors(newErrors);
      } else {
        setToastProps({
          title: 'Error',
          description: 'Failed To Create Store Admin',
          status: 'error',
        });
      }
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setToastProps(null);
      }, 3000);
    }
  };

  return (
    <>
      <VStack spacing={4}>
        <Center>
          <form onSubmit={handleSubmit}>
            <StoreAdminFormInput
              label="Name"
              name="name"
              value={formData.name}
              error={errors.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            <StoreAdminFormInput
              label="Username"
              name="username"
              value={formData.username}
              error={errors.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
            <StoreAdminFormInput
              label="Email"
              name="email"
              value={formData.email}
              error={errors.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            <StoreAdminFormInput
              label="Password"
              name="password"
              value={formData.password}
              error={errors.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            <StoreAdminFormInput
              label="Phone Number"
              name="phone"
              value={formData.phone}
              error={errors.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
            <StoreAdminFormInput
              label="Store"
              name="storeId"
              value={formData.storeId}
              error={errors.storeId}
              onChange={handleChange}
              placeholder="Select Store"
              options={storeListData}
            />
            <Button mt={4} type="submit" colorScheme="teal">
              {isLoading ? 'loading...' : 'Submit'}
            </Button>
          </form>
        </Center>
        {toastProps && <CustomToast {...toastProps} />}
      </VStack>
    </>
  );
};

export default CreateStoreAdmin;

// 'use client';
// import {
//   Box,
//   Button,
//   Center,
//   FormControl,
//   FormLabel,
//   Input,
//   Select,
//   VStack,
// } from '@chakra-ui/react';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import CustomToast from './ToastCustom';

// interface Store {
//   id: string;
//   name: string;
// }
// const CreateStoreAdmin = () => {
//   // set tampilan loading ketika submit ditekan
//   const [isLoading, setIsLoading] = useState(false);
//   // menngambil data store list untuk di menu form
//   const [storeListData, setStoreListData] = useState<Store[]>([]);
//   // Mengambil data toko dari API
//   useEffect(() => {
//     const fetchStoreList = async () => {
//       try {
//         const response = await axios.get(
//           'http://localhost:9296/api/auth/getStoreList',
//         );
//         setStoreListData(response.data.data);
//       } catch (error) {
//         console.error('Gagal mengambil data:', error);
//       }
//     };
//     fetchStoreList();
//   }, []);
//   // menyimpan data form dan mengirimkan ke API
//   const [toastProps, setToastProps] = useState<{
//     title: string;
//     description?: string;
//     status?: 'success' | 'error';
//   } | null>(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     phone: '',
//     storeId: '',
//   });
//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >,
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };
//   const resetForm = () => {
//     setFormData({
//       name: '',
//       email: '',
//       password: '',
//       phone: '',
//       storeId: '',
//     });
//   };
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       setIsLoading(true);
//       const response = await axios.post(
//         'http://localhost:9296/api/auth/createStoreAdmin',
//         formData,
//       );
//       if (response.data.code === 200) {
//         setToastProps({
//           title: 'Success',
//           description: 'Store Admin Account Created Succesfully!!',
//           status: 'success',
//         });
//       }
//       resetForm();
//     } catch (error) {
//       setToastProps({
//         title: 'Error',
//         description: 'Failed To Create Store Admin',
//         status: 'error',
//       });
//     } finally {
//       setIsLoading(false);
//       setTimeout(() => {
//         setToastProps(null); // Reset toastProps setelah beberapa waktu tertentu
//       }, 3000);
//     }
//   };

//   return (
//     <>
//       <VStack spacing={4}>
//         <Box px={10} py={5} bg={'#F9F9F9'} border="1px" borderRadius={'lg'}>
//           <Center>
//             <form onSubmit={handleSubmit}>
//               <FormControl my={4} id="name" isRequired>
//                 <FormLabel>Name</FormLabel>
//                 <Input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Enter your name"
//                 />
//               </FormControl>

//               <FormControl my={4} id="email" isRequired>
//                 <FormLabel>Email</FormLabel>
//                 <Input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Enter your email"
//                 />
//               </FormControl>

//               <FormControl my={4} id="password" isRequired>
//                 <FormLabel>Password</FormLabel>
//                 <Input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Enter your password"
//                 />
//               </FormControl>

//               <FormControl my={4} id="phone" isRequired>
//                 <FormLabel>Phone Number</FormLabel>
//                 <Input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   placeholder="Enter your phone number"
//                 />
//               </FormControl>

//               <FormControl>
//                 <FormLabel>Store</FormLabel>
//                 {storeListData.length > 0 && (
//                   <Select
//                     name="storeId"
//                     value={formData.storeId}
//                     onChange={handleChange}
//                     placeholder="Select Store"
//                   >
//                     {storeListData.map((item, index) => (
//                       <option key={index} value={item.id}>
//                         {item.name}
//                       </option>
//                     ))}
//                   </Select>
//                 )}
//               </FormControl>
//               <Center>
//                 <Button mt={4} type="submit" colorScheme="teal">
//                   {isLoading ? 'loading...' : 'Submit'}
//                 </Button>
//               </Center>
//             </form>
//           </Center>
//         </Box>
//         {toastProps && <CustomToast {...toastProps} />}
//       </VStack>
//     </>
//   );
// };

// export default CreateStoreAdmin;
