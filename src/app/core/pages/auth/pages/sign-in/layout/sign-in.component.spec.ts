import { TestBed } from "@angular/core/testing";

import { SignInComponent } from "./sign-in.component";

describe("SignInComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [SignInComponent]
		}).compileComponents();
	});

	it("should create the component", () => {
		const fixture = TestBed.createComponent(SignInComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
