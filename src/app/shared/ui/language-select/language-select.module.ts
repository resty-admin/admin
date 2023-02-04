import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SelectModule } from "@shared/ui/select";

import { LanguageSelectComponent } from "./layout/language-select.component";

@NgModule({
	declarations: [LanguageSelectComponent],
	imports: [CommonModule, SelectModule, ReactiveFormsModule],
	exports: [LanguageSelectComponent]
})
export class LanguageSelectModule {}
