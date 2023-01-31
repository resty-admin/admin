import { environment } from "@env/environment";
import type { IApiConfig } from "@shared/modules/api";

export const API_CONFIG: IApiConfig = {
	apiUrl: environment.apiUrl
};
