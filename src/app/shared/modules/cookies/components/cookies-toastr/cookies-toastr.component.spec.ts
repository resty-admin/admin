import { TestBed } from "@angular/core/testing";

import { CookiesToastrComponent } from "./cookies-toastr.component";

describe("CookiesToastrComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [CookiesToastrComponent]
		}).compileComponents();
	});

	it("should create the component", () => {
		const fixture = TestBed.createComponent(CookiesToastrComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
