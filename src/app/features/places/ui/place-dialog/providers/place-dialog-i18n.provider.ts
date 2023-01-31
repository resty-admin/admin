import { getI18nProvider } from "@shared/i18n";

import { PLACE_DIALOG } from "../constants";

export const PLACE_DIALOG_I18N_PROVIDER = getI18nProvider(PLACE_DIALOG, (lang) => import(`../i18n/${lang}.json`));
