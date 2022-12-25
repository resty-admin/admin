import { TestBed } from "@angular/core/testing";

import { SignUpComponent } from "./sign-up.component";

describe("SignInComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [SignUpComponent]
		}).compileComponents();
	});

	it("should create the component", () => {
		const fixture = TestBed.createComponent(SignUpComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
