import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { ShiftComponent } from "./shift.component";

describe("ShiftComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [ShiftComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(ShiftComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
