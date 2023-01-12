import { Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import { filter, Subject, switchMap, take, tap } from "rxjs";
import { ChangesEnum } from "src/app/shared/enums";

import type { CreateHallInput, HallEntity, UpdateHallInput } from "../../../../../graphql";
import type { AtLeast } from "../../../../shared/interfaces";
import type { IAction } from "../../../../shared/ui/actions";
import { ConfirmationDialogComponent } from "../../../../shared/ui/confirmation-dialog";
import { DialogService } from "../../../../shared/ui/dialog";
import { CreateHallGQL, DeleteHallGQL, UpdateHallGQL } from "../../graphql/halls";
import { HallDialogComponent } from "../../ui/hall-dialog/layout/hall-dialog.component";

@Injectable({ providedIn: "root" })
export class HallsService {
	readonly actions: IAction<HallEntity>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (hall) => this.openUpdateHallDialog(hall).pipe(take(1)).subscribe()
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (hall) => this.openDeleteHallDialog(hall).pipe(take(1)).subscribe()
		}
	];

	private readonly _changesSubject = new Subject();
	readonly changes$ = this._changesSubject.asObservable();

	constructor(
		private readonly _createHallGQL: CreateHallGQL,
		private readonly _updateHallGQL: UpdateHallGQL,
		private readonly _deleteHallGQL: DeleteHallGQL,
		private readonly _dialogService: DialogService
	) {}

	private _emitChanges<T>(changes: string): (source$: Observable<T>) => Observable<T> {
		return (source$) => source$.pipe(tap(() => this._changesSubject.next(changes)));
	}

	openCreateHallDialog(data: AtLeast<CreateHallInput, "place">) {
		return this._dialogService.open(HallDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((hall) => Boolean(hall)),
			switchMap((hall: HallEntity) => this.createHall({ name: hall.name, place: data.place, file: hall.file?.id }))
		);
	}

	openUpdateHallDialog(data: AtLeast<HallEntity, "id">) {
		return this._dialogService.open(HallDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((hall) => Boolean(hall)),
			switchMap((hall: HallEntity) => this.updateHall({ id: hall.id, name: hall.name, file: hall.file?.id }))
		);
	}

	openDeleteHallDialog(value: AtLeast<HallEntity, "id">) {
		const config = { data: { title: "Вы уверены, что хотите удалить зал?", value } };

		return this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$.pipe(
			take(1),
			filter((hall) => Boolean(hall)),
			switchMap((hall) => this.deleteHall(hall.id))
		);
	}

	createHall(hall: CreateHallInput) {
		return this._createHallGQL.mutate({ hall }).pipe(this._emitChanges(ChangesEnum.CREATE));
	}

	updateHall(hall: UpdateHallInput) {
		return this._updateHallGQL.mutate({ hall }).pipe(this._emitChanges(ChangesEnum.UPDATE));
	}

	deleteHall(hallId: string) {
		return this._deleteHallGQL.mutate({ hallId }).pipe(this._emitChanges(ChangesEnum.DELETE));
	}
}
