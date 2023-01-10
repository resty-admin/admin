import type { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import { switchMap } from "rxjs";
import type { IFile } from "src/app/shared/interfaces";

import { FilesService } from "../../services";

@Injectable({ providedIn: "root" })
export class FilesInterceptor implements HttpInterceptor {
	constructor(private readonly _filesService: FilesService) {}

	replaceRequestWithMedia(request: HttpRequest<any>, file: IFile, key: string) {
		request.body[key] = file;

		return request;
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if (!request.body) {
			return next.handle(request);
		}

		const key = Object.keys(request.body || {}).find((field) => request.body[field] instanceof File);

		if (!key) {
			return next.handle(request);
		}

		return this._filesService
			.uploadOne(request.body[key])
			.pipe(switchMap((media) => next.handle(this.replaceRequestWithMedia(request, media, key))));
	}
}
