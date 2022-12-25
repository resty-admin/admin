import type { TranslocoConfig } from "@ngneat/transloco";

export type II18nConfig = TranslocoConfig & {
	storage?: any;
	url: string;
	defaultLang: string;
};
