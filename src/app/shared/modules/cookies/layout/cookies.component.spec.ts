import { TestBed } from "@angular/core/testing";

import { CookiesComponent } from "./cookies.component";

describe("CookiesComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [CookiesComponent]
		}).compileComponents();
	});

	it("should create the component", () => {
		const fixture = TestBed.createComponent(CookiesComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
