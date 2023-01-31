import { getI18nProvider } from "@shared/i18n";

import { COMMANDS_PAGE } from "../constants";

export const COMMANDS_I18N_PROVIDER = getI18nProvider(COMMANDS_PAGE, (lang) => import(`../i18n/${lang}.json`));
