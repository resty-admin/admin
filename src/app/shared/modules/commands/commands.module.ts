import { NgModule } from "@angular/core";

import { COMMANDS_COMPONENTS } from "./components";

@NgModule({
	declarations: COMMANDS_COMPONENTS,
	exports: COMMANDS_COMPONENTS
})
export class CommandsModule {}
