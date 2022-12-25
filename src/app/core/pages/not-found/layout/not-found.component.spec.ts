import { TestBed } from "@angular/core/testing";

import { NotFoundComponent } from "./not-found.component";

describe("NotFoundComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [NotFoundComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(NotFoundComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
