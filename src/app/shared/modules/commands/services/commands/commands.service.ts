import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { COMMANDS_ENDPOINTS } from "src/app/shared/endpoints";
import type { ICommand } from "src/app/shared/interfaces";
import { ApiService } from "src/app/shared/modules/api";
import { ApolloService } from "src/app/shared/modules/apollo";

import { DYNAMIC_ID } from "../../../../constants";
import { COMMAND_QUERY, COMMANDS_QUERY } from "../../graphql";

@Injectable({ providedIn: "root" })
export class CommandsService {
	readonly commandsQuery = this._apolloService.watchQuery<any>({
		query: COMMANDS_QUERY,
		variables: { take: 5, skip: 0 }
	});

	readonly commands$ = this.commandsQuery.valueChanges.pipe(map(({ data }) => data.commands.data));

	constructor(private readonly _apolloService: ApolloService, private readonly _apiService: ApiService) {}

	async refetchCommands() {
		await this.commandsQuery.refetch();
	}

	getCommand(id: string) {
		return this._apolloService
			.watchQuery<any>({ query: COMMAND_QUERY, variables: { id } })
			.valueChanges.pipe(map(({ data }) => data.command));
	}

	createCommand(command: Partial<ICommand>) {
		return this._apiService.post<ICommand>(COMMANDS_ENDPOINTS.CREATE_COMMAND, command);
	}

	updateCommand(id: string, command: Partial<ICommand>) {
		return this._apiService.patch<ICommand>(COMMANDS_ENDPOINTS.UPDATE_COMMAND.replace(DYNAMIC_ID, id), command);
	}

	deleteCommand(id: string) {
		return this._apiService.delete(COMMANDS_ENDPOINTS.DELETE_COMMAND.replace(DYNAMIC_ID, id));
	}
}
