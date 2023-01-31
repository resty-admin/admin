import { FORM_I18N_PROVIDER } from "@shared/providers";

import { SIGN_IN_I18N_PROVIDERS } from "./sign-in-i18n.provider";

export const SIGN_IN_PROVIDERS = [...SIGN_IN_I18N_PROVIDERS, FORM_I18N_PROVIDER];
