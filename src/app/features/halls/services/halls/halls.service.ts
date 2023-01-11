import { Injectable } from "@angular/core";
import { filter, switchMap, take } from "rxjs";

import type { CreateHallInput, UpdateHallInput } from "../../../../../graphql";
import { FilesService } from "../../../../shared/modules/files";
import type { IAction } from "../../../../shared/ui/actions";
import { ConfirmationDialogComponent } from "../../../../shared/ui/confirmation-dialog";
import { DialogService } from "../../../../shared/ui/dialog";
import { CreateHallGQL, DeleteHallGQL, UpdateHallGQL } from "../../graphql/halls";
import { HallDialogComponent } from "../../ui/hall-dialog/layout/hall-dialog.component";

@Injectable({ providedIn: "root" })
export class HallsService {
	readonly actions: IAction<any>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (hall?: any) => this.openUpdateHallDialog(hall).subscribe()
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (hall?: any) => {
				if (!hall) {
					return;
				}

				this.openDeleteHallDialog(hall).subscribe();
			}
		}
	];

	constructor(
		private readonly _createHallGQL: CreateHallGQL,
		private readonly _updateHallGQL: UpdateHallGQL,
		private readonly _deleteHallGQL: DeleteHallGQL,
		private readonly _filesService: FilesService,
		private readonly _dialogService: DialogService
	) {}

	openCreateHallDialog(place: string) {
		return this._dialogService.open(HallDialogComponent, { data: { place } }).afterClosed$.pipe(
			take(1),
			switchMap((hall: any) => this.createHall(hall))
		);
	}

	openUpdateHallDialog(data?: any) {
		return this._dialogService.open(HallDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((hall) => Boolean(hall)),
			switchMap((hall: any) => this.updateHall(hall))
		);
	}

	openDeleteHallDialog(hall: any) {
		const config = {
			data: {
				title: "Вы уверены, что хотите удалить зал?",
				value: hall
			}
		};

		return this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$.pipe(
			take(1),
			switchMap((hall) => this.deleteHall(hall.id))
		);
	}

	createHall(hall: CreateHallInput) {
		return this._filesService.getFile(hall.file).pipe(
			take(1),
			switchMap((file) => this._createHallGQL.mutate({ hall: { ...hall, file: file?.id } }))
		);
	}

	updateHall(hall: UpdateHallInput) {
		return this._filesService.getFile(hall.file).pipe(
			take(1),
			switchMap((file) => this._updateHallGQL.mutate({ hall: { ...hall, file: file?.id } }))
		);
	}

	deleteHall(hallId: string) {
		return this._deleteHallGQL.mutate({ hallId });
	}
}
