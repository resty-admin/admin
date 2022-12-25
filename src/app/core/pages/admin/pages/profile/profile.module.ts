import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ImageModule } from "src/app/shared/ui/image";
import { InputModule } from "src/app/shared/ui/input";
import { LinkModule } from "src/app/shared/ui/link";
import { TypographyModule } from "src/app/shared/ui/typography";

import { ProfileComponent } from "./layout/profile.component";
import { ProfileRoutingModule } from "./profile-routing.module";

@NgModule({
	declarations: [ProfileComponent],
	imports: [CommonModule, ProfileRoutingModule, TypographyModule, LinkModule, InputModule, ImageModule],
	exports: [ProfileComponent]
})
export class ProfileModule {}
