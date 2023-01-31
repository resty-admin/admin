import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class SharedService {
	trackByFn(index: number) {
		return index;
	}
}
