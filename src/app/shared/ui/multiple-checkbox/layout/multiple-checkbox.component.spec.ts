import { TestBed } from "@angular/core/testing";

import { MultipleCheckboxComponent } from "./multiple-checkbox.component";

describe("CheckboxComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [MultipleCheckboxComponent]
		}).compileComponents();
	});

	it("should create the component", () => {
		const fixture = TestBed.createComponent(MultipleCheckboxComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
