import { AddressForm } from '@/components/profile/address/AddressForm';
import { cookies } from 'next/headers';

const page = () => {
  const sessionCookie: string | undefined = cookies().get('user-token')?.value;
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Alamat</h3>
      </div>
      <AddressForm sessionCookie={sessionCookie} />
    </div>
  );
};

export default page;
