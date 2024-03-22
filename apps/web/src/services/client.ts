import axios from 'axios';

axios.defaults.withCredentials = true;

export interface SessionData {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  referral: string;
  role: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface ProfileUser {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    referral: string;
    phone: string;
    avatar: string;
    role: string;
    created_at: string;
    updated_at: string;
  }

export const getSessionClient = async (
    userToken: string | undefined,
  ): Promise<ProfileUser | undefined> => {
    try {
      if (!userToken) {
        return undefined;
      } else {
        const response = await axios
          .get('http://localhost:8000/api/auth/session', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userToken}`,
            },
          })
          .then((res) => res.data)
          .catch((err) => console.log(err));
  
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  export const getProfileUser = async (
    userToken: string | undefined,
  ): Promise<ProfileUser | undefined> => {
    try {
      if (!userToken) {
        return undefined;
      } else {
        const response = await axios
          .get('http://localhost:8000/api/user/data', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userToken}`,
            },
          })
          .then((res) => res.data)
          .catch((err) => console.log(err));
  
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };