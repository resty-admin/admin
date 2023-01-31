import { getI18nProviders } from "@shared/i18n";

import { HALLS_PAGE } from "../constants";

export const HALLS_I18N_PROVIDERS = getI18nProviders(HALLS_PAGE, (lang) => import(`../i18n/${lang}.json`));
