import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";
import { JwtGuard, RoleGuard } from "@features/auth";
import { ADMIN_ROUTES } from "@shared/constants";

import { AuthComponent } from "./layout/auth.component";

export const AUTH_ROUTES: Route[] = [
	{
		path: "",
		component: AuthComponent,
		data: {
			animation: "authPage"
		},
		children: [
			{
				...ADMIN_ROUTES.SIGN_IN,
				loadChildren: () => import("./pages/sign-in/sign-in.module").then((m) => m.SignInModule)
			},
			{
				...ADMIN_ROUTES.ROLE,
				loadChildren: () => import("./pages/role/role.module").then((m) => m.RoleModule)
			},
			{
				...ADMIN_ROUTES.SIGN_UP,
				loadChildren: () => import("./pages/sign-up/sign-up.module").then((m) => m.SignUpModule),
				canActivate: [RoleGuard]
			},
			{
				...ADMIN_ROUTES.FORGOT_PASSWORD,
				loadChildren: () => import("./pages/forgot-password/forgot-password.module").then((m) => m.ForgotPasswordModule)
			},
			{
				...ADMIN_ROUTES.RESET_PASSWORD,
				loadChildren: () => import("./pages/reset-password/reset-password.module").then((m) => m.ResetPasswordModule),
				canActivate: [JwtGuard]
			},
			{
				...ADMIN_ROUTES.VERIFICATION_CODE,
				loadChildren: () =>
					import("./pages/verification-code/verification-code.module").then((m) => m.VerificationCodeModule),
				canActivate: [JwtGuard]
			},
			{
				...ADMIN_ROUTES.GOOGLE,
				loadChildren: () => import("./pages/google/google.module").then((m) => m.GoogleModule),
				canActivate: [RoleGuard]
			},
			{
				...ADMIN_ROUTES.TELEGRAM,
				loadChildren: () => import("./pages/telegram/telegram.module").then((m) => m.TelegramModule),
				canActivate: [RoleGuard]
			},
			{
				path: "**",
				redirectTo: ADMIN_ROUTES.SIGN_IN.path
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(AUTH_ROUTES)],
	exports: [RouterModule]
})
export class AuthRoutingModule {}
