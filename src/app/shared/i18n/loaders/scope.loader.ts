import { LanguagesEnum } from "../../enums";

export function getScopeLoader(loader: (lang: string) => Promise<JSON>) {
	return Object.values(LanguagesEnum).reduce((acc, lang) => ({ ...acc, [lang]: () => loader(lang) }), {});
}
