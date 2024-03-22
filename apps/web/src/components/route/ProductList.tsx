import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Button,
} from '@/components/ui/button';

const ProductList = () => {
  return (
    <div>
      <Card className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-5 mb-5">
          <h1>Kategori pilihan</h1>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </Card>
      <Card className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-5 mb-5">
          <h1>Produk yang sering dicari</h1>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </Card>
      <Button variant="outline">Semua Produk</Button>
    </div>
    
    
  );
};

export default ProductList;

// 'use client'

// import React, { useState, useEffect } from 'react';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import {
//   Button,
// } from '@/components/ui/button';

// const ProductList = () => {
//   const [nearestStore, setNearestStore] = useState(null);

//   useEffect(() => {
//     // Implement getCurrentLocation here to fetch data from the nearest store
//     // Example:
//     const getCurrentLocation = () => {
//       // Assuming getCurrentLocation returns a Promise that resolves to store data
//       return new Promise((resolve, reject) => {
//         // Your implementation to get current location data
//         navigator.geolocation.getCurrentPosition(
//           position => {
//             // Assuming you have a function to fetch store data based on location
//             const storeData = fetchNearestStoreData(position.coords.latitude, position.coords.longitude);
//             resolve(storeData);
//           },
//           error => {
//             reject(error);
//           }
//         );
//       });
//     };

//     getCurrentLocation()
//       .then(storeData => {
//         setNearestStore(storeData);
//       })
//       .catch(error => {
//         console.error('Error getting current location:', error);
//       });
//   }, []);

//   const fetchNearestStoreData = (latitude, longitude) => {
//     // Implement logic to fetch store data based on latitude and longitude
//     // You can use this function to fetch data from an API endpoint
//     // Replace this with your actual implementation
//     return {
//       // Example store data
//       name: 'Nearest Store',
//       products: [
//         { id: 1, name: 'Product 1', description: 'Description 1' },
//         { id: 2, name: 'Product 2', description: 'Description 2' },
//         { id: 3, name: 'Product 3', description: 'Description 3' },
//       ],
//     };
//   };

//   return (
//     <div>
//       {nearestStore && (
//         <>
//           <h1>{`Produk dari ${nearestStore.name}`}</h1>
//           <Card className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-5 mb-5">
//             {nearestStore.products.map(product => (
//               <Card key={product.id}>
//                 <CardHeader>
//                   <CardTitle>{product.name}</CardTitle>
//                   <CardDescription>{product.description}</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <p>Card Content</p>
//                 </CardContent>
//                 <CardFooter>
//                   <p>Card Footer</p>
//                 </CardFooter>
//               </Card>
//             ))}
//           </Card>
//           <Button variant="outline">Semua Produk</Button>
//         </>
//       )}
//     </div>
//   );
// };

// export default ProductList;