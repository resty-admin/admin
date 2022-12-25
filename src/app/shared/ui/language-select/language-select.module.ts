import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { LanguageSelectComponent } from "./layout/language-select.component";

@NgModule({
	declarations: [LanguageSelectComponent],
	imports: [CommonModule],
	exports: [LanguageSelectComponent]
})
export class LanguageSelectModule {}
