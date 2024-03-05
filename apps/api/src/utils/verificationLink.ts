// Import library atau modul yang diperlukan
import * as crypto from 'crypto';

// Fungsi untuk menghasilkan link
function generateVerificationLink(email: string): string {
  // Key rahasia untuk menambah keamanan link
  const secretKey = 'freshmart';

  const expirationTime = 60 * 60;

  // Membuat token unik menggunakan email dan waktu saat ini
  const token = crypto
    .createHmac('sha256', secretKey)
    .update(email + Date.now().toString())
    .digest('hex');

  // Menghitung waktu kadaluarsa dari sekarang
  const expirationTimestamp = Math.floor(Date.now() / 1000) + expirationTime;

  // Membuat link dengan token dan waktu kadaluarsa
  const verificationLink = `http://localhost:3000/auth/verification?token=${token}&expires=${expirationTimestamp}`;


  return verificationLink;
}

export default generateVerificationLink;
