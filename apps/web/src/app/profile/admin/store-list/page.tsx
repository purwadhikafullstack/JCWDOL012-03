import ShowStoreList from '@/components/admin/ShowStoreList';
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
        <h3 className="text-lg font-medium pt-8 lg:pt-1">
          Daftar Toko FreshMart
        </h3>
      </div>
      <ShowStoreList sessionCookie={sessionCookie} />
    </div>
  );
};

export default page;
