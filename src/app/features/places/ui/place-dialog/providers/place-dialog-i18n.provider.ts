import { getI18nProviders } from "@shared/i18n";

import { PLACE_DIALOG } from "../constants";

export const PLACE_DIALOG_I18N_PROVIDERS = getI18nProviders(PLACE_DIALOG, (lang) => import(`../i18n/${lang}.json`));
