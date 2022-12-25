import { TestBed } from "@angular/core/testing";

import { ThemeComponent } from "./theme.component";

describe("ThemeComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [ThemeComponent]
		}).compileComponents();
	});

	it("should create the component", () => {
		const fixture = TestBed.createComponent(ThemeComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
