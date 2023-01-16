import { getI18nProvider } from "../../../../../../../../../../shared/i18n";
import { ORDER_PAGE_I18N } from "../constants";

export const ORDER_I18N_PROVIDER = getI18nProvider(ORDER_PAGE_I18N, (lang) => import(`../i18n/${lang}.json`));
