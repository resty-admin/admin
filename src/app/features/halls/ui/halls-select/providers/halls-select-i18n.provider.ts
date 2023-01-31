import { getI18nProviders } from "@shared/i18n";

import { HALLS_SELECT } from "../constants";

export const HALLS_SELECT_I18N_PROVIDERS = getI18nProviders(HALLS_SELECT, (lang) => import(`../i18n/${lang}.json`));
