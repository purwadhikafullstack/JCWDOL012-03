import { jwtDecode } from 'jwt-decode';
import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../utils/errorHandler';
import prisma from '@/prisma';
import generateVerificationLink from '@/utils/linkGenerator';
import sendMail from '@/utils/sendMail';
import ejs from 'ejs';
import path from 'path';
