import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map } from "rxjs";

import { ActionsService } from "../../../../../../../../../../features/app";
import { CommandsService } from "../../../../../../../../../../features/commands/services/commands/commands.service";
import { PLACE_ID } from "../../../../../../../../../../shared/constants";
import { RouterService } from "../../../../../../../../../../shared/modules/router";
import { COMMANDS_PAGE_I18N } from "../constants";
import { CommandsPageGQL } from "../graphql/commands-page";

@UntilDestroy()
@Component({
	selector: "app-commands",
	templateUrl: "./commands.component.html",
	styleUrls: ["./commands.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandsComponent implements OnInit, OnDestroy {
	readonly commandsPageI18n = COMMANDS_PAGE_I18N;
	private readonly _commandsPageQuery = this._commandsPageGQL.watch();
	readonly commands$ = this._commandsPageQuery.valueChanges.pipe(map((result) => result.data.commands.data));

	readonly actions = this._commandsService.actions;
	constructor(
		private readonly _routerService: RouterService,
		private readonly _commandsPageGQL: CommandsPageGQL,
		private readonly _commandsService: CommandsService,
		private readonly _actionsService: ActionsService
	) {}

	async ngOnInit() {
		const placeId = this._routerService.getParams(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		this._actionsService.setAction({
			label: "Добавить команлу",
			func: () => this.openCreateDialog()
		});

		this._commandsService.changes$.pipe(untilDestroyed(this)).subscribe(async () => {
			await this._commandsPageQuery.refetch();
		});

		await this._commandsPageQuery.setVariables({
			filtersArgs: [{ key: "place.id", operator: "=", value: placeId }]
		});
	}

	openCreateDialog() {
		const place = this._routerService.getParams(PLACE_ID.slice(1));

		if (!place) {
			return;
		}

		this._commandsService.openCreateCommandDialog({ place });
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
