import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { StatusSelectComponent } from "./status-select.component";

describe("StatusSelectComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [StatusSelectComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(StatusSelectComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
