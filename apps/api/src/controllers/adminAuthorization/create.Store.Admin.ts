import { hash } from '@/Common/helper/bcrypt.helper';
import generateReferral from '@/Common/helper/generate.referral.helper';
import prisma from '@/prisma';
import { Request, Response } from 'express';

export const CreateStoreAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, storeId } = req.body;

    //cek role dari cookies
    //validasi superadmin
    // const getCookies = req.cookies.SuperAdminCookie;
    // const cookiesToDecode = jwtDecode<jwtPayload>(getCookies);
    // const idSuperAdmin = cookiesToDecode.role;

    // if (idSuperAdmin.role !== 'superadmin') {
    //   return res.status(401).json({
    //     code: 401,
    //     message: "you're not authorized",
    //   });
    // }

    const referral = generateReferral(name);
    // const hashPassword = hash(password);

    // ambil data store
    const store = await prisma.store.findUnique({
      where: {
        id: Number(storeId),
      },
    });

    // validasi email agar tidak sama
    const storeAdmin = await prisma.user.findMany({
      where: {
        role: 'storeadmin',
      },
    });
    const existingUser = storeAdmin.find((user) => user.email === email);
    if (existingUser) {
      return res.status(409).json({
        code: 409,
        message: 'email already used',
      });
    }

    // bikin user untuk dijadikan store admin
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
        refCode: referral,
        phone,
        role: 'storeadmin',
        avatar: 'test',
      },
    });

    const SAresult = await prisma.storeAdmin.create({
      data: {
        user: { connect: { id: user.id } }, //6
        store: { connect: { id: store?.id } }, //2
      },
    });

    console.log(user.id);

    return res.status(200).json({
      code: 200,
      success: true,
      message: 'store admin successfully created',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'internal server error',
    });
  }
};
