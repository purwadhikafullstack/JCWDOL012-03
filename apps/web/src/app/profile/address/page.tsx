import { ProfileForm } from "@/components/profile/ProfileForm"
import { cookies } from 'next/headers';


const page = () => {
  const sessionCookie: string | undefined = cookies().get('user-token')?.value;
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
      </div>
      <ProfileForm sessionCookie={sessionCookie}/>
    </div>
  )
}

export default page;