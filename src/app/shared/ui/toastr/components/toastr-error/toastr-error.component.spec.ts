import { TestBed } from "@angular/core/testing";

import { ToastrErrorComponent } from "./toastr-error.component";

describe("ToastrErrorComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [ToastrErrorComponent]
		}).compileComponents();
	});

	it("should create the component", () => {
		const fixture = TestBed.createComponent(ToastrErrorComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
