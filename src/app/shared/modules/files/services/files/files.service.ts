import { Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import { of } from "rxjs";
import type { IFile } from "src/app/shared/interfaces";

import type { FileEntity } from "../../../../../../graphql";
import { ApiService } from "../../../api";
import { FILE_FIELD, FILES_ENDPOINTS, FILES_FIELD } from "../../constants";

@Injectable({ providedIn: "root" })
export class FilesService {
	constructor(private readonly _apiService: ApiService) {}

	private _getFormData(fields: Record<string, any>) {
		const formData = new FormData();

		for (const field in fields) {
			formData.set(field, fields[field]);
		}

		return formData;
	}

	getFile(file?: any): Observable<FileEntity> {
		if (file instanceof File) {
			return this.uploadOne(file);
		}

		return of(file?.url ? file : null);
	}

	uploadOne(file: File): Observable<IFile> {
		return this._apiService.post<IFile>(FILES_ENDPOINTS.UPLOAD_ONE, this._getFormData({ [FILE_FIELD]: file }));
	}

	uploadMany(files: File[]): Observable<IFile[]> {
		return this._apiService.post<IFile[]>(FILES_ENDPOINTS.UPLOAD_MANY, this._getFormData({ [FILES_FIELD]: files }));
	}
}
