// utils/response.ts

import { Response } from 'express';

export const success = (res: Response, data = {}, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

export const error = (res: Response, message = 'Something went wrong', statusCode = 500, error = {}) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error
  });
};
