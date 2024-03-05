import Container from '@/components/Container';
import Header from '@/components/header/Header';
import ProfileLayout from '@/components/profile/ProfileLayout';
import React from 'react';

const page = () => {
  return (
    <div>
      <Header />
      <Container>
        <ProfileLayout />
      </Container>
    </div>
  );
};

export default page;
