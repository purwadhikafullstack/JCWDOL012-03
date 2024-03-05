import { useEffect } from 'react';
import { useRouter } from 'next/router';

const VerificationPage = () => {
  const router = useRouter();
  const { token, expires } = router.query;

  useEffect(() => {
    // Lakukan validasi atau logika lainnya berdasarkan token dan expires di sini
    console.log('Token:', token);
    console.log('Expires:', expires);

    // Contoh: Redirect ke halaman tertentu setelah verifikasi
    // router.push('/dashboard');

    // Pastikan untuk memasukkan dependency useEffect sesuai kebutuhan
  }, [token, expires]);

  return (
    <div>
      <h1>Verification Page</h1>
      <p>Token: {token}</p>
      <p>Expires: {expires}</p>
      {/* Tambahkan konten lainnya sesuai kebutuhan */}
    </div>
  );
};

export default VerificationPage;