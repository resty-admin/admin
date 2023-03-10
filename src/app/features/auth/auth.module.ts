import { NgModule } from "@angular/core";
import { RoleDirective } from "@features/auth/directives";

@NgModule({
	declarations: [RoleDirective],
	exports: [RoleDirective]
})
export class AuthModule {}
