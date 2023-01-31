import { getI18nProviders } from "@shared/i18n";

import { HALL_DIALOG } from "../constants";

export const HALL_DIALOG_I18N_PROVIDERS = getI18nProviders(HALL_DIALOG, (lang) => import(`../i18n/${lang}.json`));
