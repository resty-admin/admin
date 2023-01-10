import { Injectable } from "@angular/core";
import { map, switchMap, take, tap } from "rxjs";
import type { IAction } from "src/app/shared/ui/actions";
import { ConfirmationDialogComponent } from "src/app/shared/ui/confirmation-dialog";

import type { CreateHallInput, UpdateHallInput } from "../../../../../graphql";
import { FilesService } from "../../../../shared/modules/files";
import { DialogService } from "../../../../shared/ui/dialog";
import { ToastrService } from "../../../../shared/ui/toastr";
import { HallDialogComponent } from "../../components";
import { CreateHallGQL, DeleteHallGQL, HallsGQL, UpdateHallGQL } from "../../graphql/halls";

@Injectable({ providedIn: "root" })
export class HallsService {
	private readonly _hallsQuery = this._hallsGQL.watch({ skip: 0, take: 10 });

	readonly halls$ = this._hallsQuery.valueChanges.pipe(map((result) => result.data.halls.data));

	readonly actions: IAction<any>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (hall?: any) => this.openCreateOrUpdateHallDialog(hall).subscribe()
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
		private readonly _hallsGQL: HallsGQL,
		private readonly _createHallGQL: CreateHallGQL,
		private readonly _updateHallGQL: UpdateHallGQL,
		private readonly _deleteHallGQL: DeleteHallGQL,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _filesService: FilesService
	) {}

	openCreateOrUpdateHallDialog(data?: any) {
		return this._dialogService.openFormDialog(HallDialogComponent, { data }).pipe(
			switchMap((hall: any) =>
				hall.id
					? this.updateHall({
							id: hall.id,
							name: hall.name,
							file: hall.file
					  })
					: this.createHall(hall)
			)
		);
	}

	openDeleteHallDialog(hall: any) {
		return this._dialogService
			.openFormDialog(ConfirmationDialogComponent, {
				data: {
					title: "Вы уверены, что хотите удалить зал?",
					value: hall
				}
			})
			.pipe(switchMap((hall) => this.deleteHall(hall.id)));
	}

	createHall(hall: CreateHallInput) {
		return this._filesService.getFile(hall.file).pipe(
			switchMap((file) =>
				this._createHallGQL.mutate({ hall: { ...hall, file: file?.id } }).pipe(
					take(1),
					this._toastrService.observe("Залы"),
					tap(async () => {
						await this._hallsQuery.refetch();
					})
				)
			)
		);
	}

	updateHall(hall: UpdateHallInput) {
		return this._filesService.getFile(hall.file).pipe(
			switchMap((file) =>
				this._updateHallGQL.mutate({ hall: { ...hall, file: file?.id } }).pipe(
					take(1),
					this._toastrService.observe("Залы"),
					tap(async () => {
						await this._hallsQuery.refetch();
					})
				)
			)
		);
	}

	deleteHall(hallId: string) {
		return this._deleteHallGQL.mutate({ hallId }).pipe(
			take(1),
			this._toastrService.observe("Залы"),
			tap(async () => {
				await this._hallsQuery.refetch();
			})
		);
	}
}
