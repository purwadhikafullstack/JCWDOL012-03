import Image from 'next/image';
import styles from './page.module.css';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Hero from '@/components/route/Hero';
import ProductList from '@/components/route/ProductList';

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <ProductList />
      <Footer />
    </div>
  );
}
