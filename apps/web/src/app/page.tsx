import Image from 'next/image';
import styles from './page.module.css';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Hero from '@/components/route/Hero';
import ProductList from '@/components/route/ProductList';
import Container from '@/components/Container';

export default function Home() {
  return (
    <div className="p-10">
      <Container>
        <Hero />
        <ProductList />
      </Container>
    </div>
  );
}
