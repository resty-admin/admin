import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";
import { ACCESS_TOKEN } from "src/app/shared/constants";

import { TelegramComponent } from "./layout/telegram.component";

export const TELEGRAM_ROUTES: Route[] = [
	{
		path: ``,
		pathMatch: "full",
		component: TelegramComponent
	},
	{
		path: `:${ACCESS_TOKEN}`,
		component: TelegramComponent
	},
	{
		path: "**",
		redirectTo: ""
	}
];

@NgModule({
	imports: [RouterModule.forChild(TELEGRAM_ROUTES)],
	exports: [RouterModule]
})
export class TelegramRoutingModule {}
