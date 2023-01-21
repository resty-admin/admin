import { getI18nProvider } from "@shared/i18n";

import { COMMANDS_PAGE_I18N } from "../constants";

export const COMMANDS_I18N_PROVIDER = getI18nProvider(COMMANDS_PAGE_I18N, (lang) => import(`../i18n/${lang}.json`));
