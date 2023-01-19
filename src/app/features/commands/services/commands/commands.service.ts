import { Injectable } from "@angular/core";

import type { CreateCommandInput, UpdateCommandInput } from "../../../../../graphql";
import { CreateCommandGQL, DeleteCommandGQL, UpdateCommandGQL } from "../../graphql/commands";

@Injectable({ providedIn: "root" })
export class CommandsService {
	constructor(
		private readonly _createCommandGQL: CreateCommandGQL,
		private readonly _updateCommandGQL: UpdateCommandGQL,
		private readonly _deleteCommandGQL: DeleteCommandGQL
	) {}

	createCommand(command: CreateCommandInput) {
		return this._createCommandGQL.mutate({ command });
	}

	updateCommand(command: UpdateCommandInput) {
		return this._updateCommandGQL.mutate({ command });
	}

	deleteCommand(commandId: string) {
		return this._deleteCommandGQL.mutate({ commandId });
	}
}
