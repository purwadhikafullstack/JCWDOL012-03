import { AvatarForm } from '@/components/profile/AvatarForm';
import { EmailForm } from '@/components/profile/EmailForm';
import { ProfileForm } from '@/components/profile/ProfileForm';
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
        <h3 className="text-lg font-medium pt-8 lg:pt-1">Profile</h3>
      </div>
      <div className="md:flex justify-items-center sm:gap-4">
        <div className="pb-4 mx-auto flex justify-center">
          <AvatarForm sessionCookie={sessionCookie} />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <ProfileForm sessionCookie={sessionCookie} />
          <EmailForm sessionCookie={sessionCookie} />
        </div>
      </div>
    </div>
  );
};

export default page;
