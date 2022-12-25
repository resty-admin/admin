import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { CounterComponent } from "./layout/counter.component";

@NgModule({
	declarations: [CounterComponent],
	imports: [CommonModule],
	exports: [CounterModule]
})
export class CounterModule {}
