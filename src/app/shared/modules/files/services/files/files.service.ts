import { Injectable } from "@angular/core";
import type { FileEntity } from "@graphql";
import type { IFile } from "@shared/interfaces";
import { ApiService } from "@shared/modules/api";
import type { Observable } from "rxjs";
import { of } from "rxjs";

import { FILE_FIELD, FILES_ENDPOINTS, FILES_FIELD } from "../../constants";

@Injectable({ providedIn: "root" })
export class FilesService {
	constructor(private readonly _apiService: ApiService) {}

	private _getFormData(fields: Record<string, Blob | string>) {
		const formData = new FormData();

		for (const field in fields) {
			formData.set(field, fields[field]);
		}

		return formData;
	}

	getFile(file?: File | FileEntity | null): Observable<FileEntity | null> {
		if (file instanceof File) {
			return this.uploadOne(file);
		}

		return of(file?.url ? file : null);
	}

	uploadOne(file: Blob): Observable<IFile> {
		return this._apiService.post<IFile>(FILES_ENDPOINTS.UPLOAD_ONE, this._getFormData({ [FILE_FIELD]: file }));
	}

	uploadMany(files: Blob): Observable<IFile[]> {
		return this._apiService.post<IFile[]>(FILES_ENDPOINTS.UPLOAD_MANY, this._getFormData({ [FILES_FIELD]: files }));
	}
}
