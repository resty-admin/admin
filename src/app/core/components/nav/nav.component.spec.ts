import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { NavComponent } from "./nav.component";

describe("AsideComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [NavComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(NavComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
