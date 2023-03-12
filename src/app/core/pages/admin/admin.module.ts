import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TippyDirective } from "@ngneat/helipopper";
import { I18nModule } from "@shared/modules/i18n";
import { PipesModule } from "@shared/modules/pipes";
import { ButtonModule } from "@shared/ui/button";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { MoreModule } from "@shared/ui/more";
import { NavigationSkeletonModule } from "@shared/ui/navigation-skeleton";
import { SelectModule } from "@shared/ui/select";

import { AdminRoutingModule } from "./admin-routing.module";
import { ADMIN_COMPONENTS } from "./components";
import { AdminComponent } from "./layout/admin.component";

@NgModule({
	declarations: [AdminComponent, ...ADMIN_COMPONENTS],
	imports: [
		CommonModule,
		AdminRoutingModule,
		NavigationSkeletonModule,
		I18nModule,
		IconModule,
		PipesModule,
		MoreModule,
		SelectModule,
		ButtonModule,
		TippyDirective,
		ImageModule
	]
})
export class AdminModule {}
