import { PasswordForm } from '@/components/profile/PasswordForm';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const page = () => {
  const sessionCookie: string | undefined = cookies().get('user-token')?.value;
  if (!sessionCookie) {
    redirect('/');
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium pt-8 lg:pt-1">Ganti Password</h3>
      </div>
      <PasswordForm sessionCookie={sessionCookie} />
    </div>
  );
};

export default page;