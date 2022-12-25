import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { TextareaComponent } from "./layout/textarea.component";

@NgModule({
	declarations: [TextareaComponent],
	imports: [CommonModule, ReactiveFormsModule],
	exports: [TextareaComponent]
})
export class TextareaModule {}
