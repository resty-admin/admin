import { AsideComponent } from "./aside/aside.component";
import { CompanySelectComponent } from "./company-select/company-select.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { NavComponent } from "./nav/nav.component";
import { PlaceSelectComponent } from "./place-select/place-select.component";
import { ProfileComponent } from "./profile/profile.component";
import { SupportComponent } from "./support/support.component";

export const CORE_COMPONENTS = [
	HeaderComponent,
	AsideComponent,
	FooterComponent,
	NavComponent,
	SupportComponent,
	ProfileComponent,
	CompanySelectComponent,
	PlaceSelectComponent
];

export * from "./aside/aside.component";
export * from "./company-select/company-select.component";
export * from "./footer/footer.component";
export * from "./header/header.component";
export * from "./nav/nav.component";
export * from "./place-select/place-select.component";
export * from "./profile/profile.component";
export * from "./support/support.component";
