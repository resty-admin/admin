import { NgModule } from "@angular/core";

import { USERS_COMPONENTS } from "./components";

@NgModule({
	declarations: USERS_COMPONENTS,
	exports: USERS_COMPONENTS
})
export class UsersModule {}
