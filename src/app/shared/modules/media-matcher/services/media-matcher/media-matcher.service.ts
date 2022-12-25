import { MediaMatcher } from "@angular/cdk/layout";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class MediaMatcherService {
	constructor(private readonly _mediaMatcher: MediaMatcher) {}

	matches(query: string) {
		return this._mediaMatcher.matchMedia(query).matches;
	}

	matchMedia(query: string) {
		const subject = new Subject<boolean>();

		this._mediaMatcher.matchMedia(query).addEventListener("change", (value: { matches: boolean }) => {
			subject.next(value.matches);
		});

		return subject.asObservable();
	}
}
