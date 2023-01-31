import { AUTH_PROVIDERS } from "@features/auth";
import { FORM_I18N_PROVIDER } from "@shared/providers";

import { CORE_PAGE_I18N_PROVIDERS } from "./core-page-i18n.provider";

export const CORE_PAGE_PROVIDERS = [FORM_I18N_PROVIDER, ...CORE_PAGE_I18N_PROVIDERS, ...AUTH_PROVIDERS];
