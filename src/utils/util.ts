import { SetMetadata } from '@nestjs/common';

export const sendErrorResponse = (
  response: any,
  statusCode: number,
  errorData: any,
) => {
  return response.status(statusCode).json({
    success: false,
    message: errorData.message,
    error_code: statusCode,
    data: errorData.data,
  });
};

export const Role = {
  Admin: "Admin",
  User: "User",
}

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);