import { getI18nProvider } from "@shared/i18n";

import { COMMAND_DIALOG } from "../constants";

export const COMMAND_DIALOG_I18N_PROVIDER = getI18nProvider(COMMAND_DIALOG, (lang) => import(`../i18n/${lang}.json`));
