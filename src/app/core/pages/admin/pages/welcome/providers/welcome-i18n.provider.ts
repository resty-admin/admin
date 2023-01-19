import { getI18nProvider } from "../../../../../../shared/i18n";
import { WELCOME_PAGE_I18N } from "../constants";

export const WELCOME_I18N_PROVIDER = getI18nProvider(WELCOME_PAGE_I18N, (lang) => import(`../i18n/${lang}.json`));
