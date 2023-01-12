import { getI18nProvider } from "../../../../../../../../../../../../shared/i18n";
import { WORKERS_PAGE_I18N } from "../constants";

export const WORKERS_I18N_PROVIDER = getI18nProvider(WORKERS_PAGE_I18N, (lang) => import(`../i18n/${lang}.json`));
