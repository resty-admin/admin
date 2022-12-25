import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { IconModule } from "../icon";
import { ThemeToggleComponent } from "./layout/theme-toggle.component";

@NgModule({
	declarations: [ThemeToggleComponent],
	imports: [CommonModule, ReactiveFormsModule, IconModule],
	exports: [ThemeToggleComponent]
})
export class ThemeToggleModule {}
