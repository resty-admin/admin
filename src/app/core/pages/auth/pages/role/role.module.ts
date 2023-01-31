import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { I18nModule } from "@shared/modules/i18n";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { LinkModule } from "@shared/ui/link";
import { TypographyModule } from "@shared/ui/typography";

import { RoleComponent } from "./layout/role.component";
import { ROLE_PROVIDERS } from "./providers";
import { RoleRoutingModule } from "./role-routing.module";

@NgModule({
	declarations: [RoleComponent],
	imports: [CommonModule, RoleRoutingModule, I18nModule, LinkModule, TypographyModule, IconModule, ImageModule],
	providers: ROLE_PROVIDERS
})
export class RoleModule {}
