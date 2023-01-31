import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslocoModule } from "@shared/modules/i18n";
import { SkeletonModule } from "@shared/ui/skeleton";
import { TypographyModule } from "@shared/ui/typography";

import { NOTIFICATIONS_COMPONENTS } from "./components";
import { NotificationsComponent } from "./layout/notifications.component";
import { NotificationsRoutingModule } from "./notifications-routing.module";
import { NOTIFICATIONS_PROVIDERS } from "./providers";

@NgModule({
	declarations: [NotificationsComponent, ...NOTIFICATIONS_COMPONENTS],
	imports: [CommonModule, NotificationsRoutingModule, TypographyModule, TranslocoModule, SkeletonModule],
	providers: NOTIFICATIONS_PROVIDERS
})
export class NotificationsModule {}
