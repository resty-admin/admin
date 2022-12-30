import { Injectable } from "@angular/core";
import { map, switchMap, take, tap } from "rxjs";
import type { IHall } from "src/app/shared/interfaces";
import type { IAction } from "src/app/shared/ui/actions";
import { ConfirmationDialogComponent } from "src/app/shared/ui/confirmation-dialog";

import type { CreateHallInput, UpdateHallInput } from "../../../../../graphql";
import { DialogService } from "../../../../shared/ui/dialog";
import { ToastrService } from "../../../../shared/ui/toastr";
import { HallDialogComponent } from "../../components";
import { CreateHallGQL, DeleteHallGQL, HallsGQL, UpdateHallGQL } from "../../graphql/halls";

@Injectable({ providedIn: "root" })
export class HallsService {
	readonly actions: IAction<IHall>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (hall?: IHall) => this.openCreateOrUpdateHallDialog(hall)
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (hall?: IHall) => {
				if (!hall) {
					return;
				}

				this.openDeleteHallDialog(hall);
			}
		}
	];

	readonly halls$ = this._hallsGQL.watch().valueChanges.pipe(map((result) => result.data.halls.data));

	constructor(
		private readonly _hallsGQL: HallsGQL,
		private readonly _createHallGQL: CreateHallGQL,
		private readonly _updateHallGQL: UpdateHallGQL,
		private readonly _deleteHallGQL: DeleteHallGQL,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService
	) {}

	async refetch() {
		await this._hallsGQL.watch().refetch();
	}

	openCreateOrUpdateHallDialog(hall?: any) {
		return this._dialogService
			.openFormDialog(HallDialogComponent, { data: { hall } })
			.pipe(switchMap((hall: any) => (hall.id ? this.updateHall(hall) : this.createHall(hall))));
	}

	openDeleteHallDialog(hall: IHall) {
		return this._dialogService
			.openFormDialog(ConfirmationDialogComponent, {
				data: {
					title: "Вы уверены, что хотите удалить зал?",
					value: hall
				}
			})
			.pipe(switchMap((hall) => this._deleteHallGQL.mutate(hall.id)));
	}

	createHall(hall: CreateHallInput) {
		return this._createHallGQL.mutate({ hall }).pipe(
			take(1),
			this._toastrService.observe("Залы"),
			tap(async () => {
				await this.refetch();
			})
		);
	}

	updateHall(hall: UpdateHallInput) {
		return this._updateHallGQL.mutate({ hall }).pipe(
			take(1),
			this._toastrService.observe("Залы"),
			tap(async () => {
				await this.refetch();
			})
		);
	}

	deleteHall(hallId: string) {
		return this._deleteHallGQL.mutate({ hallId }).pipe(
			take(1),
			this._toastrService.observe("Залы"),
			tap(async () => {
				await this.refetch();
			})
		);
	}
}
