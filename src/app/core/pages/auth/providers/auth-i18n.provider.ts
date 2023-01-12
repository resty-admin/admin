import { getI18nProvider } from "../../../../shared/i18n";
import { AUTH_PAGE_I18N } from "../constants";

export const AUTH_I18N_PROVIDER = getI18nProvider(AUTH_PAGE_I18N, (lang) => import(`../i18n/${lang}.json`));
