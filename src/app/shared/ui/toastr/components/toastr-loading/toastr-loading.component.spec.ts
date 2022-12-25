import { TestBed } from "@angular/core/testing";

import { ToastrLoadingComponent } from "./toastr-loading.component";

describe("ToastrLoadingComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [ToastrLoadingComponent]
		}).compileComponents();
	});

	it("should create the component", () => {
		const fixture = TestBed.createComponent(ToastrLoadingComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
