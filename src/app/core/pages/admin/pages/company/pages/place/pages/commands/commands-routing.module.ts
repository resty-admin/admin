import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { CommandsSkeletonComponent } from "./components";
import { COMMANDS_PAGE } from "./constants";
import { CommandsComponent } from "./layout/commands.component";
import { CommandsResolver } from "./resolvers";

export const COMMANDS_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: CommandsComponent,
		data: {
			animation: COMMANDS_PAGE
		},
		resolve: {
			commands: CommandsResolver
		},
		skeleton: {
			component: CommandsSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(COMMANDS_ROUTES)],
	exports: [RouterModule]
})
export class CommandsRoutingModule {}
