import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get the required roles from the `@Roles` decorator
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }

    // Extract the user's role from the request headers
    const request = context.switchToHttp().getRequest();
    const userRole = request.headers['role']; // Assume the role is passed in the `role` header

    if (!userRole) {
      return false; // Deny access if no role is provided
    }

    // Check if the user's role matches any of the required roles
    return requiredRoles.includes(userRole);
  }
}