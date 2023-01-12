import { getI18nProvider } from "../../../../../../../../../../../../shared/i18n";
import { PRODUCTS_PAGE_I18N } from "../constants";

export const PRODUCTS_I18N_PROVIDER = getI18nProvider(PRODUCTS_PAGE_I18N, (lang) => import(`../i18n/${lang}.json`));
