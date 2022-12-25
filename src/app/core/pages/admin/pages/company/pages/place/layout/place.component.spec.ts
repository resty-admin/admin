import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { PlaceComponent } from "./place.component";

describe("PlaceComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [PlaceComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(PlaceComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
