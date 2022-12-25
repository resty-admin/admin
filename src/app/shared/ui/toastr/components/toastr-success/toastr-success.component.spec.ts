import { TestBed } from "@angular/core/testing";

import { ToastrSuccessComponent } from "./toastr-success.component";

describe("ToastrSuccessComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [ToastrSuccessComponent]
		}).compileComponents();
	});

	it("should create the component", () => {
		const fixture = TestBed.createComponent(ToastrSuccessComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
