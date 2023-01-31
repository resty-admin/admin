import { TestBed } from "@angular/core/testing";

import { FooterComponent } from "./footer.component";

describe("FooterComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [FooterComponent]
		}).compileComponents();
	});

	it("should create the component", () => {
		const fixture = TestBed.createComponent(FooterComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
