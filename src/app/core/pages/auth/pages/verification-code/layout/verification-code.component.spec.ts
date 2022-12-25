import { TestBed } from "@angular/core/testing";

import { VerificationCodeComponent } from "./verification-code.component";

describe("VerificationCodeComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [VerificationCodeComponent]
		}).compileComponents();
	});

	it("should create the component", () => {
		const fixture = TestBed.createComponent(VerificationCodeComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
