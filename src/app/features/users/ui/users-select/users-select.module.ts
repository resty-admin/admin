import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { I18nModule } from "@shared/modules/i18n";

import { UsersSelectComponent } from "./layout/users-select.component";
import { USERS_SELECT_PROVIDERS } from "./providers";

@NgModule({
	declarations: [UsersSelectComponent],
	imports: [CommonModule, FormsModule, I18nModule],
	providers: USERS_SELECT_PROVIDERS,
	exports: [UsersSelectComponent]
})
export class UsersSelectModule {}
