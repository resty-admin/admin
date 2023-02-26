import { Injectable } from "@angular/core";
import { HotToastService } from "@ngneat/hot-toast";
import type { CreateHotToastRef, ToastOptions } from "@ngneat/hot-toast/lib/hot-toast.model";
import type { Content } from "@ngneat/overview";
import type { Observable } from "rxjs";
import { tap } from "rxjs";

@Injectable({ providedIn: "root" })
export class ToastrService {
	constructor(private readonly _hotToastService: HotToastService) {}

	show<DataType>(message?: Content, options?: ToastOptions<DataType>): CreateHotToastRef<DataType | unknown> {
		return this._hotToastService.show(message, options);
	}

	observe<T>(title?: string, message?: string): (source: Observable<T>) => Observable<T> {
		return (source: Observable<T>) =>
			// const loadingRef = this.loading(undefined, { data: { title, message } });

			source.pipe(
				tap({
					next: () => this.success(undefined, { data: { title, message } }),
					error: ({ error }) => this.error(undefined, { data: { title, messages: error.messages } })
					// finalize: () => loadingRef.close()
				})
			);
	}

	success<DataType>(message?: Content, options?: ToastOptions<DataType>): CreateHotToastRef<DataType | unknown> {
		return this._hotToastService.success<DataType>(message, options);
	}

	error<DataType>(message?: Content, options?: ToastOptions<DataType>): CreateHotToastRef<DataType | unknown> {
		return this._hotToastService.error<DataType>(message, options);
	}

	loading<DataType>(message?: Content, options?: ToastOptions<DataType>): CreateHotToastRef<DataType | unknown> {
		return this._hotToastService.loading<DataType>(message, options);
	}
}
