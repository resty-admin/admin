import type { ACCESS_TOKEN } from "@shared/constants";
import type { LanguagesEnum, ThemeEnum } from "@shared/enums";

export interface IAuthState {
	[ACCESS_TOKEN]?: string;
	theme: ThemeEnum;
	language: LanguagesEnum;
}
