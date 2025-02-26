import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    const requiredAction = this.reflector.get<string>('action', context.getHandler());

    if (!requiredRoles && !requiredAction) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authId = request.session.authId;
   
    if (!authId) {
      return false;
    }

    const permissions = await this.userService.getUserById(authId, 'permission');
    console.log('permissions:', permissions);

    
    const resourceActionsObj = JSON.parse(permissions.permission.resourceActions);

    if (requiredAction) {
      
      const actionPermission = resourceActionsObj.manageUser[requiredAction];

      if (actionPermission !== 1) {
        return false;
      }
    }

    return true;
  }
}
