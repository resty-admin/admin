import { getI18nProvider } from "@shared/i18n";

import { PLACE_DIALOG_I18N } from "../constants";

export const PLACE_DIALOG_I18N_PROVIDER = getI18nProvider(PLACE_DIALOG_I18N, (lang) => import(`../i18n/${lang}.json`));
