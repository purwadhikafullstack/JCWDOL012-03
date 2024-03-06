'use client';
import {
  Button,
  Center,
  HStack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TableCategoryList() {
  const [dataCategory, setDataCategory] = useState([]);

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
            {dataCategory.map((item) => (
              <Tr key={item.id}>
                <Td>{item.name}</Td>
                <HStack>
                  <Button colorScheme="teal" size={'sm'}>
                    Edit
                  </Button>
                  <Button colorScheme="red" size={'sm'}>
                    Delete
                  </Button>
                </HStack>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TableCategoryList;
