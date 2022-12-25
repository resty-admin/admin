import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { TelegramComponent } from "./layout/telegram.component";
import { TelegramRoutingModule } from "./telegram-routing.module";

@NgModule({
	declarations: [TelegramComponent],
	imports: [CommonModule, TelegramRoutingModule]
})
export class TelegramModule {}
