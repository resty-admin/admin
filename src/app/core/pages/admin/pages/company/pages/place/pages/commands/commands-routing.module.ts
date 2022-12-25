import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { CommandsComponent } from "./layout/commands.component";

export const COMMANDS_ROUTES: Route[] = [
	{
		path: "",
		component: CommandsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(COMMANDS_ROUTES)],
	exports: [RouterModule]
})
export class CommandsRoutingModule {}
