import type { OnInit } from "@angular/core";
import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { AuthService } from "@features/auth";
import type { UserRoleEnum } from "@graphql";
import { take } from "rxjs";

@Directive({
	selector: "[appRole]"
})
export class RoleDirective implements OnInit {
	@Input("appRole") roles: UserRoleEnum[] = [];

	constructor(
		private readonly _authService: AuthService,
		private readonly _templateRef: TemplateRef<any>,
		private readonly _viewContainer: ViewContainerRef
	) {}

	ngOnInit() {
		this._authService.me$.pipe(take(1)).subscribe((user: any) => {
			const hasRole = this.roles.includes(user?.role);
			// Отображаем или скрываем блок в зависимости от того, есть ли у пользователя нужная роль
			if (hasRole) {
				this._viewContainer.createEmbeddedView(this._templateRef);
			} else {
				this._viewContainer.clear();
			}
		});
	}
}
