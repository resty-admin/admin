import { getI18nProvider } from "../../../../../../../../../../shared/i18n";
import { PAYMENT_SYSTEMS_PAGE_I18N } from "../constants";

export const PAYMENT_SYSTEMS_I18N_PROVIDER = getI18nProvider(
	PAYMENT_SYSTEMS_PAGE_I18N,
	(lang) => import(`../i18n/${lang}.json`)
);
