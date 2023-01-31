import { FORM_I18N_PROVIDER } from "@shared/providers";

import { PROFILE_I18N_PROVIDERS } from "./profile-i18n.provider";

export const PROFILE_PROVIDERS = [...PROFILE_I18N_PROVIDERS, FORM_I18N_PROVIDER];
