import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { CommandsPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class CommandsPageService {
	readonly commandsPageQuery = this._commandsPageGQL.watch();
	readonly commands$ = this.commandsPageQuery.valueChanges.pipe(map((result) => result.data.commands.data));

	constructor(private readonly _commandsPageGQL: CommandsPageGQL) {}
}
