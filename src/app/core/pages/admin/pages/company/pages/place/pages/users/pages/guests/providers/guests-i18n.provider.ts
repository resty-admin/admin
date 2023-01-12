import { getI18nProvider } from "../../../../../../../../../../../../shared/i18n";
import { GUESTS_PAGE_I18N } from "../constants";

export const GUESTS_I18N_PROVIDER = getI18nProvider(GUESTS_PAGE_I18N, (lang) => import(`../i18n/${lang}.json`));
