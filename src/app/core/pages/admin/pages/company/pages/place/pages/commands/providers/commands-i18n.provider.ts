import { getI18nProviders } from "@shared/i18n";

import { COMMANDS_PAGE } from "../constants";

export const COMMANDS_I18N_PROVIDERS = getI18nProviders(COMMANDS_PAGE, (lang) => import(`../i18n/${lang}.json`));
