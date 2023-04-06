import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

// Guards in NestJS are used to protect routes by intercepting requests
// and making sure the requester has the required permissions to access the route.
// For authentication, guards are commonly used to check whether a user is authenticated
// and authorized to access certain endpoints, based on their role or other factors.

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  // canActivate return boolean to point access status
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // get request object
    const req = context.switchToHttp().getRequest();

    try {
      const authHeader = req.headers.authorization;
      // get token type (bearer)
      const bearer = authHeader.split(' ')[0];
      // get token
      const token = authHeader.split(' ')[1];

      // if from client get empty headers.authorization or token without type
      if (bearer !== 'Bearer' || !token)
        throw new UnauthorizedException({ message: "user isn't authed" });

      // uncrypt token
      const user = this.jwtService.verify(token);
      req.user = user;
      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: "user isn't authed" });
    }
  }
}
