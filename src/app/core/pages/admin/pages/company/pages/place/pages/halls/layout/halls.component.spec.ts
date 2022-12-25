import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { HallsComponent } from "./halls.component";

describe("HallsComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [HallsComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(HallsComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
