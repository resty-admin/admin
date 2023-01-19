import { getI18nProvider } from "../../../../../../../../../../../../shared/i18n";
import { EMPLOYEES_PAGE_I18N } from "../constants";

export const EMPLOYEES_I18N_PROVIDER = getI18nProvider(EMPLOYEES_PAGE_I18N, (lang) => import(`../i18n/${lang}.json`));
