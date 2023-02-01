import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { CommandsPageSkeletonComponent } from "./components";
import { CommandsComponent } from "./layout/commands.component";
import { CommandsPageResolver } from "./resolvers";

export const COMMANDS_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: CommandsComponent,
		data: {
			animation: "commandsPage"
		},
		resolve: {
			commands: CommandsPageResolver
		},
		skeleton: {
			component: CommandsPageSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(COMMANDS_ROUTES)],
	exports: [RouterModule]
})
export class CommandsRoutingModule {}
