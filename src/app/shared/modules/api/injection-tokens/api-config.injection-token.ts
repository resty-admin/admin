import { InjectionToken } from "@angular/core";

import type { IApiConfig } from "../interfaces";

export const API_CONFIG = new InjectionToken<IApiConfig>("API_CONFIG");
