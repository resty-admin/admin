import { getI18nProvider } from "../../../../../../../../../../../../shared/i18n";
import { ALL_ORDERS_PAGE_I18N } from "../constants";

export const ALL_ORDERS_I18N_PROVIDER = getI18nProvider(ALL_ORDERS_PAGE_I18N, (lang) => import(`../i18n/${lang}.json`));
