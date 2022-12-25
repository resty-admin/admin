import { Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import type { IFile } from "src/app/shared/interfaces";

import { ApiService } from "../../../api";
import { FILE_FIELD, FILES_ENDPOINTS, FILES_FIELD } from "../../constants";

@Injectable({ providedIn: "root" })
export class FilesService {
	constructor(private readonly _apiService: ApiService) {}

	getFormData(fields: Record<string, any>) {
		const formData = new FormData();

		for (const field in fields) {
			formData.set(field, fields[field]);
		}

		return formData;
	}

	uploadOne(file: File): Observable<IFile> {
		return this._apiService.post<IFile>(FILES_ENDPOINTS.UPLOAD_ONE, this.getFormData({ [FILE_FIELD]: file }));
	}

	uploadMany(files: File[]): Observable<IFile[]> {
		return this._apiService.post<IFile[]>(FILES_ENDPOINTS.UPLOAD_MANY, this.getFormData({ [FILES_FIELD]: files }));
	}
}
