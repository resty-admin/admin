import { AuthGuard } from "./auth/auth.guard";
import { JwtGuard } from "./jwt/jwt.guard";
import { RoleGuard } from "./role/role.guard";

export const AUTH_GUARDS = [AuthGuard, RoleGuard, JwtGuard];

export * from "./auth/auth.guard";
export * from "./jwt/jwt.guard";
export * from "./role/role.guard";
