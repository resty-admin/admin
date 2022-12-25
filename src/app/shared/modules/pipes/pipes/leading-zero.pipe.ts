import type { PipeTransform } from "@angular/core";
import { Pipe } from "@angular/core";

@Pipe({ name: "leadingZero" })
export class LeadingZeroPipe implements PipeTransform {
	transform(number_: number) {
		return number_ > 9 ? number_.toString() : `0${number_}`;
	}
}
