import { getI18nProvider } from "../../../../../../../../../../shared/i18n";
import { WALLET_PAGE_I18N } from "../constants";

export const WALLET_I18N_PROVIDER = getI18nProvider(WALLET_PAGE_I18N, (lang) => import(`../i18n/${lang}.json`));
