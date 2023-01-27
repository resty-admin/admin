import { AUTH_PROVIDERS } from "@features/auth";
import { FORM_PROVIDER } from "@shared/providers";

export const CORE_PAGE_PROVIDERS = [FORM_PROVIDER, ...AUTH_PROVIDERS];
