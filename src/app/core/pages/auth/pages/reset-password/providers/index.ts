import { FORM_I18N_PROVIDER } from "@shared/providers";

import { RESET_PASSWORD_I18N_PROVIDERS } from "./reset-password-i18n.provider";

export const RESET_PASSWORD_PROVIDERS = [...RESET_PASSWORD_I18N_PROVIDERS, FORM_I18N_PROVIDER];
