import type { PipeTransform } from "@angular/core";
import { Pipe } from "@angular/core";

@Pipe({ name: "initials" })
export class InitialsPipe implements PipeTransform {
	transform(name: string) {
		const words = name.split(/\s/);

		return words.length > 1
			? words.reduce((response, word) => `${response}${word.slice(0, 1).toUpperCase()}`, "")
			: name.slice(0, 2);
	}
}
