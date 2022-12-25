import type { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import type { HttpErrorResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import { catchError, throwError } from "rxjs";

import { ERRORS_CONFIG } from "../../injection-tokens";
import { IErrorsConfig } from "../../interfaces";

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
	constructor(@Inject(ERRORS_CONFIG) private readonly _errorsConfig: IErrorsConfig) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			catchError((httpErrorResponse: HttpErrorResponse) => {
				if (httpErrorResponse.error && httpErrorResponse.error.messages) {
					httpErrorResponse.error.messages = httpErrorResponse.error.messages.map((message: string) => {
						const [code, field, count] = message.split("_");

						return `${field || ""}  ${this._errorsConfig.errors[code]} ${count || ""}`;
					});
				}

				return throwError(httpErrorResponse);
			})
		);
	}
}
