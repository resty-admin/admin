import { getI18nProvider } from "@shared/i18n";

import { HALL_DIALOG } from "../constants";

export const HALL_DIALOG_I18N_PROVIDER = getI18nProvider(HALL_DIALOG, (lang) => import(`../i18n/${lang}.json`));
