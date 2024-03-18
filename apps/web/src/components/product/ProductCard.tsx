import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';

interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
}

function ProductCard({
  name,
  description,
  price,
  imageUrl,
  stock,
}: ProductCardProps) {
  return (
    <>
      <Card
        maxW="200px"
        maxH="sm"
        variant={'elevated'}
        border={'2px'}
        borderColor={'#4CAF50'}
      >
        <CardBody overflow={'hidden'}>
          <Center>
            <Image
              src={imageUrl}
              alt={name}
              borderRadius="lg"
              w={'100px'}
              h={'100px'}
            />
          </Center>
          <Stack mt="6" spacing="3">
            <Heading size="sm">{name}</Heading>
            <Text fontSize={'xs'} noOfLines={3}>
              {description}
            </Text>
            <Text color="blue.600" fontSize="xl">
              {price}
            </Text>
            <Text fontSize="xs">Qty: {stock}</Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue">
              Detail
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
}

export default ProductCard;
