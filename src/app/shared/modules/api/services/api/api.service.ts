import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, Optional } from "@angular/core";

import { API_CONFIG } from "../../injection-tokens";
import { IApiConfig } from "../../interfaces";

@Injectable({ providedIn: "root" })
export class ApiService {
	constructor(
		@Optional() @Inject(API_CONFIG) private readonly _apiConfig: IApiConfig,
		private readonly _httpClient: HttpClient
	) {
		if (!_apiConfig) {
			console.warn("There is no config for ApiService. Please provide it vie ApiModule.forRoot(apiConfig: ApiConfig)");
		}
	}

	get<T>(url: string) {
		return this._httpClient.get<T>(`${this._apiConfig.apiUrl}/${url}`);
	}

	post<T>(url: string, body: unknown) {
		return this._httpClient.post<T>(`${this._apiConfig.apiUrl}/${url}`, body);
	}

	patch<T>(url: string, body: unknown) {
		return this._httpClient.patch<T>(`${this._apiConfig.apiUrl}/${url}`, body);
	}

	delete<T>(url: string) {
		return this._httpClient.delete<T>(`${this._apiConfig.apiUrl}/${url}`);
	}
}
