// import { User } from '@prisma/client';

// export type SafeUser = Omit<
//   User,
//   'createdAt' | 'updateAt' | 'emailVerified'
// > & {
//   createdAt: string;
//   updateAt: string;
//   emailVerified: string | null;
// };

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};
