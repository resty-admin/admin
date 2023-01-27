import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { Observable } from "rxjs";
import { map } from "rxjs";

import { CommandsPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class CommandsResolver implements Resolve<any> {
	constructor(private _commandsPageGQL: CommandsPageGQL) {}

	resolve(): Observable<any> {
		return this._commandsPageGQL.watch().valueChanges.pipe(map((result) => result.data.commands.data));
	}
}
