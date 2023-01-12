import { getI18nProvider } from "../../../../../../../../../../shared/i18n";
import { DASHBOARD_PAGE_I18N } from "../constants";

export const DASHBOARD_I18N_PROVIDER = getI18nProvider(DASHBOARD_PAGE_I18N, (lang) => import(`../i18n/${lang}.json`));
