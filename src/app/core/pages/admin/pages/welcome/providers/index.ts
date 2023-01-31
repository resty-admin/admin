import { FORM_I18N_PROVIDER } from "@shared/providers";

import { WELCOME_I18N_PROVIDERS } from "./welcome-i18n.provider";

export const WELCOME_PROVIDERS = [...WELCOME_I18N_PROVIDERS, FORM_I18N_PROVIDER];
