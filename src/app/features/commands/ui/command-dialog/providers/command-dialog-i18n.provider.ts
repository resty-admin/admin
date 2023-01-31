import { getI18nProviders } from "@shared/i18n";

import { COMMAND_DIALOG } from "../constants";

export const COMMAND_DIALOG_I18N_PROVIDERS = getI18nProviders(COMMAND_DIALOG, (lang) => import(`../i18n/${lang}.json`));
