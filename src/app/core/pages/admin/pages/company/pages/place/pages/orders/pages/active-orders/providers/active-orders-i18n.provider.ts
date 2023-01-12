import { getI18nProvider } from "../../../../../../../../../../../../shared/i18n";
import { ACTIVE_ORDERS_PAGE_I18N } from "../constants";

export const ACTIVE_ORDER_I18N_PROVIDER = getI18nProvider(
	ACTIVE_ORDERS_PAGE_I18N,
	(lang) => import(`../i18n/${lang}.json`)
);
