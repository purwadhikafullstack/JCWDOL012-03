import { useToast, UseToastOptions } from '@chakra-ui/react';
import { useEffect } from 'react';

interface CustomToastPayload {
  title: string;
  description?: string;
  status?: UseToastOptions['status'];
}

const CustomToast: React.FC<CustomToastPayload> = ({
  title,
  description,
  status = 'info',
}) => {
  const toast = useToast();

  useEffect(() => {
    if (title || description) {
      toast({
        title,
        description,
        status,
        duration: 2000,
        isClosable: true,
        position: 'bottom',
      });
    }
  }, [title, description, status, toast]);

  return null;
};

export default CustomToast;
