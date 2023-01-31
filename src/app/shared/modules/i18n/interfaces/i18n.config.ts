import type { TranslocoConfig } from "@ngneat/transloco";

export type II18nConfig = TranslocoConfig & {
	storage?: unknown;
	url: string;
	defaultLang: string;
};
