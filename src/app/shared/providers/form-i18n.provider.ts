import { TRANSLOCO_SCOPE } from "@ngneat/transloco";

import { FORM } from "../constants";

export const FORM_PROVIDER = {
	provide: TRANSLOCO_SCOPE,
	useValue: FORM,
	multi: true
};
