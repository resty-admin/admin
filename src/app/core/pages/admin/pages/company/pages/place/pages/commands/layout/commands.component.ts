import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { CommandDialogComponent } from "@features/commands";
import { CommandsService } from "@features/commands/services/commands/commands.service";
import type { CommandEntity } from "@graphql";
import { PLACE_ID } from "@shared/constants";
import type { AtLeast } from "@shared/interfaces";
import { I18nService } from "@shared/modules/i18n";
import { RouterService } from "@shared/modules/router";
import type { IAction } from "@shared/ui/actions";
import { ConfirmationDialogComponent } from "@shared/ui/confirmation-dialog";
import { DialogService } from "@shared/ui/dialog";
import { ToastrService } from "@shared/ui/toastr";
import { lastValueFrom, map } from "rxjs";

import { COMMANDS_PAGE } from "../constants";
import { CommandsPageGQL } from "../graphql";

@Component({
	selector: "app-commands",
	templateUrl: "./commands.component.html",
	styleUrls: ["./commands.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandsComponent implements OnInit, OnDestroy {
	readonly commandsPage = COMMANDS_PAGE;
	private readonly _commandsPageQuery = this._commandsPageGQL.watch();
	readonly commands$ = this._commandsPageQuery.valueChanges.pipe(map((result) => result.data.commands.data));

	readonly actions: IAction<CommandEntity>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (command) => this.openUpdateCommandDialog(command)
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (command) => this.openDeleteCommandDialog(command)
		}
	];

	constructor(
		private readonly _routerService: RouterService,
		private readonly _commandsPageGQL: CommandsPageGQL,
		private readonly _commandsService: CommandsService,
		private readonly _actionsService: ActionsService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService
	) {}

	async ngOnInit() {
		const placeId = this._routerService.getParams(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		this._actionsService.setAction({
			label: "Добавить команлу",
			func: () => this.openCreateCommandDialog()
		});

		await this._commandsPageQuery.setVariables({
			filtersArgs: [{ key: "place.id", operator: "=", value: placeId }]
		});
	}

	async openCreateCommandDialog() {
		const place = this._routerService.getParams(PLACE_ID.slice(1));

		const command: CommandEntity | undefined = await lastValueFrom(
			this._dialogService.open(CommandDialogComponent).afterClosed$
		);

		if (!command) {
			return;
		}

		await lastValueFrom(
			this._commandsService
				.createCommand({
					name: command.name,
					description: command.description,
					place
				})
				.pipe(
					this._toastrService.observe(
						this._i18nService.translate("title", {}, this.commandsPage),
						this._i18nService.translate("added", {}, this.commandsPage)
					)
				)
		);

		await this._commandsPageQuery.refetch();
	}

	async openUpdateCommandDialog(data: AtLeast<CommandEntity, "place">) {
		const command: CommandEntity | undefined = await lastValueFrom(
			this._dialogService.open(CommandDialogComponent, { data }).afterClosed$
		);

		if (!command) {
			return;
		}

		await lastValueFrom(
			this._commandsService
				.updateCommand({
					id: command.id,
					name: command.name,
					description: command.description
				})
				.pipe(
					this._toastrService.observe(
						this._i18nService.translate("title", {}, this.commandsPage),
						this._i18nService.translate("edited", {}, this.commandsPage)
					)
				)
		);

		await this._commandsPageQuery.refetch();
	}

	async openDeleteCommandDialog(value: AtLeast<CommandEntity, "id">) {
		const config = { data: { title: "Вы уверены, что хотите удалить команду?", value } };

		const isConfirmed = await lastValueFrom(this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$);

		if (!isConfirmed) {
			return;
		}

		await lastValueFrom(
			this._commandsService
				.deleteCommand(value.id)
				.pipe(
					this._toastrService.observe(
						this._i18nService.translate("title", {}, this.commandsPage),
						this._i18nService.translate("deleted", {}, this.commandsPage)
					)
				)
		);

		await this._commandsPageQuery.refetch();
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
