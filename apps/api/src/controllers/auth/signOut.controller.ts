import { Request, Response } from 'express';

export const signoutUser = async (req: Request, res: Response) => {
  try {
    res.clearCookie('user-token');
    return res.status(200).json({
      code: 200,
      success: true,
      message: 'Sign Out berhasil',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      success: false,
      message: 'Error internal server',
    });
  }
};