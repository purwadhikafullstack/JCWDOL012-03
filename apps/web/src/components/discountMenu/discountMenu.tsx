import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Grid,
  HStack,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { IoIosCreate } from 'react-icons/io';

export default function DiscountMenu() {
  return (
    <>
      <Box
        mx={['10px', '20px', '30px', '40px']}
        px={[0, 4, 8, 12]}
        mt={['10px', '20px', '30px', '40px']}
      >
        <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))">
          <HStack gap={10} flexDirection={['column', 'row', 'row', 'row']}>
            <Card
              maxW="250px"
              maxH="sm"
              variant={'elevated'}
              bgGradient="linear(#FFC561 ,#FFA000)"
            >
              <CardBody>
                <Stack mt="6">
                  <Center>
                    <Heading
                      py={2}
                      px={6}
                      size="sm"
                      fontStyle={'italic'}
                      color={'#F9F9F9'}
                    >
                      DISCOUNT PRODUCT
                    </Heading>
                  </Center>
                </Stack>
              </CardBody>
              <CardFooter>
                <Center>
                  <Button variant="outline" colorScheme="green">
                    <IoIosCreate /> Create
                  </Button>
                </Center>
              </CardFooter>
            </Card>
            <Card
              maxW="250px"
              maxH="sm"
              variant={'elevated'}
              bgGradient="linear(#FFC561 ,#FFA000)"
            >
              <CardBody>
                <Stack mt="6">
                  <Center>
                    <Heading size="sm" fontStyle={'italic'} color={'#F9F9F9'}>
                      DISCOUNT w/ MAX PURCHASE AMOUNT
                    </Heading>
                  </Center>
                </Stack>
              </CardBody>
              <CardFooter>
                <Center>
                  <Button variant="outline" colorScheme="green">
                    <IoIosCreate /> Create
                  </Button>
                </Center>
              </CardFooter>
            </Card>
            <Card
              maxW="250px"
              maxH="sm"
              variant={'elevated'}
              bgGradient="linear(#FFC561 ,#FFA000)"
            >
              <CardBody>
                <Stack mt="6">
                  <Center>
                    <Heading size="sm" fontStyle={'italic'} color={'#F9F9F9'}>
                      DISCOUNT BUY ONE GET ONE
                    </Heading>
                  </Center>
                </Stack>
              </CardBody>
              <CardFooter>
                <Center>
                  <Button variant="outline" colorScheme="green">
                    <IoIosCreate /> Create
                  </Button>
                </Center>
              </CardFooter>
            </Card>
          </HStack>
        </Grid>
      </Box>
    </>
  );
}
