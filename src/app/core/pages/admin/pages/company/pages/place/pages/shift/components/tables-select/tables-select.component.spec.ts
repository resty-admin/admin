import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { TablesSelectComponent } from "./tables-select.component";

describe("ShiftComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [TablesSelectComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(TablesSelectComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
