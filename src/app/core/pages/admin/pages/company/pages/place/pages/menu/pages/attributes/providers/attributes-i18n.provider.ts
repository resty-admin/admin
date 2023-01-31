import { getI18nProviders } from "@shared/i18n";

import { ATTRIBUTES_PAGE } from "../constants";

export const ATTIRUBUTES_I18N_PROVIDERS = getI18nProviders(ATTRIBUTES_PAGE, (lang) => import(`../i18n/${lang}.json`));
