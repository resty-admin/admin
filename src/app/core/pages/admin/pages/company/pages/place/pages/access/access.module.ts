import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { I18nModule } from "@shared/modules/i18n";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { SkeletonModule } from "@shared/ui/skeleton";
import { TypographyModule } from "@shared/ui/typography";

import { AccessRoutingModule } from "./access-routing.module";
import { ACCESS_COMPONENTS } from "./components";
import { AccessComponent } from "./layout/access.component";

@NgModule({
	declarations: [AccessComponent, ...ACCESS_COMPONENTS],
	imports: [CommonModule, AccessRoutingModule, SkeletonModule, TypographyModule, I18nModule, IconModule, ImageModule]
})
export class AccessModule {}
