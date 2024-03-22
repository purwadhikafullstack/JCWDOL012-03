<<<<<<< HEAD
import { AvatarForm } from '@/components/profile/AvatarForm';
import { EmailForm } from '@/components/profile/EmailForm';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { cookies } from 'next/headers';

=======
import { ProfileForm } from "@/components/profile/ProfileForm"
import { cookies } from 'next/headers';


>>>>>>> adb62195e206f27bd7b7bd45023f2bbd77c803f1
const page = () => {
  const sessionCookie: string | undefined = cookies().get('user-token')?.value;
  return (
    <div className="space-y-6">
      <div>
<<<<<<< HEAD
        <h3 className="text-lg font-medium pt-8 lg:pt-1">Profile</h3>
      </div>
      <AvatarForm sessionCookie={sessionCookie} />
      <ProfileForm sessionCookie={sessionCookie} />
      <EmailForm sessionCookie={sessionCookie} />
    </div>
  );
};

export default page;
=======
        <h3 className="text-lg font-medium">Profile</h3>
      </div>
      <ProfileForm sessionCookie={sessionCookie}/>
    </div>
  )
}

export default page;
>>>>>>> adb62195e206f27bd7b7bd45023f2bbd77c803f1
