import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { PlaceSelectComponent } from "./place-select.component";

describe("CompanySelectComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [PlaceSelectComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(PlaceSelectComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
