import { ATTRIBUTE_GROUP_DIALOG_I18N } from "@features/attributes/ui/attribute-group-dialog/constants";
import { getI18nProvider } from "@shared/i18n";

export const ATTRIBUTE_GROUP_DILAOG_I18N_PROVIDER = getI18nProvider(
	ATTRIBUTE_GROUP_DIALOG_I18N,
	(lang) => import(`../i18n/${lang}.json`)
);
