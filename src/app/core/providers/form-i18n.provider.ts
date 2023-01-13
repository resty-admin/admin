import { TRANSLOCO_SCOPE } from "@ngneat/transloco";

import { FORM_I18N } from "../constants";

export const FORM_I18N_PROVIDER = {
	provide: TRANSLOCO_SCOPE,
	useValue: FORM_I18N,
	multi: true
};
