import { getI18nProvider } from "@shared/i18n";

import { ATTRIBUTES_PAGE } from "../constants";

export const ATTIRUBUTES_I18N_PROVIDER = getI18nProvider(ATTRIBUTES_PAGE, (lang) => import(`../i18n/${lang}.json`));
