import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class AsideService {
	readonly activeCompanyIdSubject = new BehaviorSubject("");
	readonly activeCompanyId$ = this.activeCompanyIdSubject.asObservable();

	readonly activePlaceIdSubject = new BehaviorSubject("");
	readonly activePlaceId$ = this.activePlaceIdSubject.asObservable();

	readonly placesBehaviourSubject = new BehaviorSubject([]);
	readonly places$ = this.placesBehaviourSubject.asObservable();

	readonly companiesBehaviourSubject = new BehaviorSubject([]);
	readonly companies$ = this.companiesBehaviourSubject.asObservable();
}
