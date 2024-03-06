import Image from 'next/image';
import styles from './page.module.css';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Hero from '@/components/route/Hero';
import ProductList from '@/components/route/ProductList';
import Container from '@/components/Container';
import { cookies } from 'next/headers';

export default function Home() {
  const sessionCookie: string | undefined = cookies().get('user-token')?.value;
  return (
    <div>
      <Header sessionCookie={sessionCookie} />
      <Container>
        <Hero />
        <ProductList />
      </Container>
      <Footer />
    </div>
  );
}
