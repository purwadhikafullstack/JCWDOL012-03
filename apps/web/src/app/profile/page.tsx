import { AvatarForm } from '@/components/profile/AvatarForm';
import { EmailForm } from '@/components/profile/EmailForm';
import { PasswordForm } from '@/components/profile/PasswordForm';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { cookies } from 'next/headers';

const page = () => {
  const sessionCookie: string | undefined = cookies().get('user-token')?.value;
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium pt-8 lg:pt-1">Profile</h3>
      </div>
      <AvatarForm sessionCookie={sessionCookie} />
      <ProfileForm sessionCookie={sessionCookie} />
      <EmailForm sessionCookie={sessionCookie} />
      <PasswordForm sessionCookie={sessionCookie} />
    </div>
  );
};

export default page;
