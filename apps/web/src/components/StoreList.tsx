'use client';
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface dataPayload {
  id: number;
  name: string;
  location: [];
  admins: {
    user: {
      name: string;
    };
  };
  products: [];
  Order: [];
}

function StoreList() {
  const [getData, setGetData] = useState<dataPayload[]>([]);

  useEffect(() => {
    fetchStoreList();
  }, []);

  const fetchStoreList = async () => {
    const response = await axios.get(
      'http://localhost:9296/api/auth/getStoreList',
    );
    console.log(response.data.data.admins);
    setGetData(response.data.data);
  };
  return (
    <>
      <Box m={6}>
        <VStack>
          <Center>
            <Heading textColor={'#FFA000'} fontSize={30} fontStyle={'italic'}>
              STORE LIST
            </Heading>
          </Center>
          <Box mt={4} h={1} w="60%" bg={'#7DBE3C'} borderRadius="full" />
        </VStack>
      </Box>
      <Box px={20}>
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          {getData.map((items) => (
            <GridItem key={items.id} w={'100%'}>
              <Card
                maxW={'sm'}
                borderRadius={'lg'}
                border={'2px'}
                borderColor={'#4CAF50'}
              >
                <CardBody my={6}>
                  <Stack>
                    <Heading size={'lg'} textAlign={'center'}>
                      {items.name}
                    </Heading>
                    {/* <Text textAlign={'center'}>Store Admin:</Text> */}

                    <Center>
                      <Button colorScheme="orange" variant="outline" w={'50%'}>
                        Detail
                      </Button>
                    </Center>
                  </Stack>
                </CardBody>
              </Card>
            </GridItem>
          ))}
          {/* <GridItem w={'100%'}>
            <Card
              maxW={'xs'}
              borderRadius={'lg'}
              border={'2px'}
              borderColor={'#4CAF50'}
            >
              <CardBody my={6}>
                <Stack>
                  <Heading size={'lg'} textAlign={'center'}>
                    FreshMart | Jakarta
                  </Heading>
                  <Text textAlign={'center'}>Store Admin: aaa</Text>
                  <Center>
                    <Button colorScheme="orange" variant="outline" w={'50%'}>
                      Detail
                    </Button>
                  </Center>
                </Stack>
              </CardBody>
            </Card>
          </GridItem> */}
        </Grid>
      </Box>
    </>
  );
}

export default StoreList;
