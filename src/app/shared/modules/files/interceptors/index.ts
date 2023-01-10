import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { FilesInterceptor } from "./files/files.interceptor";

export const FILES_INTEPCEPTORS = [
	{
		provide: HTTP_INTERCEPTORS,
		useClass: FilesInterceptor,
		multi: true
	}
];

export * from "./files/files.interceptor";
