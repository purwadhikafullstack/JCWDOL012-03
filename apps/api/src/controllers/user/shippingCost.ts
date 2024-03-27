import { Request, Response } from 'express';
import axios from 'axios';
require('dotenv').config();

export const shippingCost = async (req: Request, res: Response) => {
  try {
    const apiKey = process.env.RAJAONGKIR_API_KEY;
    const baseURL = 'https://api.rajaongkir.com/starter';
    const { origin, destination, weight, courier } = req.query;
    if (!origin || !destination || !weight || !courier) {
      return res.status(400).json({ message: 'Missing parameters' });
    }

    const response = await axios.post(
      `${baseURL}/cost`,
      {
        origin,
        destination,
        weight,
        courier,
      },
      {
        headers: {
          key: apiKey,
        },
      },
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching shipping cost:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
