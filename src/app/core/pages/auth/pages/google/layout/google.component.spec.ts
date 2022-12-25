import { TestBed } from "@angular/core/testing";

import { GoogleComponent } from "./google.component";

describe("GoogleComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [GoogleComponent]
		}).compileComponents();
	});

	it("should create the component", () => {
		const fixture = TestBed.createComponent(GoogleComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
