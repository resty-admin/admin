import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { CommandDialogComponent, CommandsService } from "@features/commands";
import type { CommandEntity } from "@graphql";
import { PLACE_ID } from "@shared/constants";
import type { AtLeast } from "@shared/interfaces";
import { I18nService } from "@shared/modules/i18n";
import { RouterService } from "@shared/modules/router";
import { ConfirmationDialogComponent } from "@shared/ui/confirmation-dialog";
import { DialogService } from "@shared/ui/dialog";
import { ToastrService } from "@shared/ui/toastr";
import { filter, from, switchMap, take } from "rxjs";

import { COMMANDS_PAGE } from "../constants";
import { CommandsPageService } from "../services";

@Component({
	selector: "app-commands",
	templateUrl: "./commands.component.html",
	styleUrls: ["./commands.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandsComponent implements OnInit, OnDestroy {
	readonly commandsPage = COMMANDS_PAGE;

	readonly commands$ = this._commandsPageService.commands$;

	constructor(
		private readonly _actionsService: ActionsService,
		private readonly _routerService: RouterService,
		private readonly _commandsPageService: CommandsPageService,
		private readonly _commandsService: CommandsService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService
	) {}

	ngOnInit() {
		this._actionsService.setAction({ label: "Добавить команлу", func: () => this.openCreateCommandDialog() });
	}

	openCreateCommandDialog() {
		return this._dialogService
			.open(CommandDialogComponent)
			.afterClosed$.pipe(
				filter((command) => Boolean(command)),
				switchMap((command) =>
					this._commandsService
						.createCommand({
							name: command.name,
							description: command.description,
							place: this._routerService.getParams(PLACE_ID.slice(1))
						})
						.pipe(
							switchMap(() => from(this._commandsPageService.commandsPageQuery.refetch())),
							this._toastrService.observe(this._i18nService.translate("createCommand"))
						)
				),
				take(1)
			)
			.subscribe();
	}

	openUpdateCommandDialog(data: AtLeast<CommandEntity, "place">) {
		this._dialogService
			.open(CommandDialogComponent, { data })
			.afterClosed$.pipe(
				filter((command) => Boolean(command)),
				switchMap((command) =>
					this._commandsService
						.updateCommand({ id: command.id, name: command.name, description: command.description })
						.pipe(
							switchMap(() => from(this._commandsPageService.commandsPageQuery.refetch())),
							this._toastrService.observe(this._i18nService.translate("updateCommand"))
						)
				),
				take(1)
			)
			.subscribe();
	}

	openDeleteCommandDialog(value: AtLeast<CommandEntity, "id">) {
		this._dialogService
			.open(ConfirmationDialogComponent, { data: { title: this._i18nService.translate("confirmCommand"), value } })
			.afterClosed$.pipe(
				filter((result) => Boolean(result)),
				switchMap(() =>
					this._commandsService.deleteCommand(value.id).pipe(
						switchMap(() => from(this._commandsPageService.commandsPageQuery.refetch())),
						this._toastrService.observe(this._i18nService.translate("deleteCommand"))
					)
				),
				take(1)
			)
			.subscribe();
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
