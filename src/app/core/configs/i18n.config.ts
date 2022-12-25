import { environment } from "../../../environments/environment";

export const I18N_CONFIG = {
	prodMode: environment.production,
	url: `${environment.assetsUrl}/i18n/`,
	availableLangs: ["uk", "ru", "en"],
	fallbackLang: ["ru", "en"],
	defaultLang: "ru",
	reRenderOnLangChange: true,
	// storage: LocalforageService.storage,
	failedRetries: 0,
	missingHandler: {
		logMissingKey: !environment.production,
		useFallbackTranslation: true
	}
};
