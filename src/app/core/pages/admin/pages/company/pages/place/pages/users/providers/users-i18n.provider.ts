import { getI18nProvider } from "../../../../../../../../../../shared/i18n";
import { USERS_PAGE_I18N } from "../constants";

export const USERS_I18N_PROVIDER = getI18nProvider(USERS_PAGE_I18N, (lang) => import(`../i18n/${lang}.json`));
