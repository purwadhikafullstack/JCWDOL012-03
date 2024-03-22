<<<<<<< HEAD
import { AddressForm } from "@/components/profile/address/AddressForm";
=======
import { ProfileForm } from "@/components/profile/ProfileForm"
>>>>>>> adb62195e206f27bd7b7bd45023f2bbd77c803f1
import { cookies } from 'next/headers';


const page = () => {
  const sessionCookie: string | undefined = cookies().get('user-token')?.value;
  return (
    <div className="space-y-6">
      <div>
<<<<<<< HEAD
        <h3 className="text-lg font-medium">Alamat</h3>
      </div>
      <AddressForm sessionCookie={sessionCookie}/>
=======
        <h3 className="text-lg font-medium">Profile</h3>
      </div>
      <ProfileForm sessionCookie={sessionCookie}/>
>>>>>>> adb62195e206f27bd7b7bd45023f2bbd77c803f1
    </div>
  )
}

export default page;