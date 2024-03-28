import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import React from 'react';
import {
  Box,
  Center,
  VStack,
  Text,
  Grid,
  GridItem,
  Card,
  CardBody,
  Stack,
  Heading,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TabIndicator,
} from '@chakra-ui/react';
import StoreList from '@/components/StoreList';
import CreateStoreAdmin from '@/components/crudStoreAdmin/CreateStoreAdmin';
import GetDelUpdStoreAdmin from '@/components/crudStoreAdmin/GetDelUpdStoreAdmin';

function AdminDashboard() {
  return (
    <>
      <Header />
      <Box h="100vh">
        <Tabs variant="soft-rounded" colorScheme="green" ml={4} mt={4}>
          <TabList>
            <Tab>Store List</Tab>
            <Tab>Store Admin Management</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <StoreList />
            </TabPanel>
            <TabPanel>
              <Tabs position="relative" variant="unstyled">
                <TabList>
                  <Tab>Store Admin List</Tab>
                  <Tab>Create</Tab>
                </TabList>
                <TabIndicator
                  mt="-1.5px"
                  height="2px"
                  bg="blue.500"
                  borderRadius="1px"
                />
                <TabPanels>
                  <TabPanel>
                    <GetDelUpdStoreAdmin />
                  </TabPanel>
                  <TabPanel>
                    <CreateStoreAdmin />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      <Footer />
    </>
  );
}

export default AdminDashboard;
