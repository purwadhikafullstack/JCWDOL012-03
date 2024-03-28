import { Request, Response } from 'express';

export const logoutSuperAdmin = (req: Request, res: Response) => {
  try {
    res.clearCookie('SuperAdminCookie');
    return res.status(200).json({
      code: 200,
      message: 'Successfuly sign out',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'internal server error',
    });
  }
};
