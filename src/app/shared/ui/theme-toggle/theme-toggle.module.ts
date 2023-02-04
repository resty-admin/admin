import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { IconModule } from "../icon";
import { ThemeToggleComponent } from "./layout/theme-toggle.component";

@NgModule({
	declarations: [ThemeToggleComponent],
	imports: [CommonModule, FormsModule, IconModule],
	exports: [ThemeToggleComponent]
})
export class ThemeToggleModule {}
