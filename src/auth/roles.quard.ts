import { ROLES_KEY } from './roles-auth.decorator';
import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from '@nestjs/core';

// Guards in NestJS are used to protect routes by intercepting requests
// and making sure the requester has the required permissions to access the route.
// For authentication, guards are commonly used to check whether a user is authenticated
// and authorized to access certain endpoints, based on their role or other factors.

@Injectable()
export class RolesGuard implements CanActivate {
    constructor (private jwtService: JwtService,
                 private reflector: Reflector) {}
    // canActivate return boolean to point access status
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                // pass two context args in order to reflector know which data use and process
                context.getHandler(),
                context.getClass()
            ])

            if (!requiredRoles) return true

            const req = context.switchToHttp().getRequest()
            const authHeader = req.headers.authorization
            // get token type (bearer)
            const bearer = authHeader.split(' ')[0]
            // get token
            const token = authHeader.split(' ')[1]

            // if from client get empty headers.authorization or token without type
            if (bearer !== 'Bearer' || !token) throw new UnauthorizedException({ message: "user isn't authed" })

            // uncrypt token
            const user = this.jwtService.verify(token)
            req.user = user
            // after uncrypt check if requiredRoles has role for permission to some endpoints
            return user.roles.some(role => requiredRoles.includes(role.value))

        } catch (e) {
            throw new HttpException("no access", HttpStatus.FORBIDDEN)
        }
    }

}