import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { HallsSelectComponent } from "./halls-select.component";

describe("ShiftComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [HallsSelectComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(HallsSelectComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
