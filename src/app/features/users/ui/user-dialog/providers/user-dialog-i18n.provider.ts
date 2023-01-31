import { getI18nProviders } from "@shared/i18n";

import { USER_DIALOG } from "../constants";

export const USER_DIALOG_I18N_PROVIDERS = getI18nProviders(USER_DIALOG, (lang) => import(`../i18n/${lang}.json`));
