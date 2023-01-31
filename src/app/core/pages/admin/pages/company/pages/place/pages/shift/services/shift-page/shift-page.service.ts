import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { ActiveShiftGQL, ShiftPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ShiftPageService {
	readonly activeShiftQuery = this._activeShiftGQL.watch();
	readonly shiftPageQuery = this._shiftPageGQL.watch();
	readonly activeShift$ = this.activeShiftQuery.valueChanges.pipe(map((result) => result.data.activeShift));
	readonly shiftPage$ = this.shiftPageQuery.valueChanges.pipe(map((result) => result.data));

	constructor(private readonly _shiftPageGQL: ShiftPageGQL, private readonly _activeShiftGQL: ActiveShiftGQL) {}
}
