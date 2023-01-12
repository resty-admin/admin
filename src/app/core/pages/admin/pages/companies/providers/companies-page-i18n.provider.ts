import { getI18nProvider } from "../../../../../../shared/i18n";
import { COMPANIES_PAGE_I18N } from "../constants";

export const COMPANIES_PAGE_I18N_PROVIDER = getI18nProvider(
	COMPANIES_PAGE_I18N,
	(lang) => import(`../i18n/${lang}.json`)
);