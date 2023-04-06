import { SetMetadata } from "@nestjs/common"

// key for get metadata in guard
export const ROLES_KEY = 'roles'

// decorator function that get strings arrau
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles)