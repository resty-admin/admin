import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { WelcomeComponent } from "./welcome.component";

describe("WelcomeComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [WelcomeComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(WelcomeComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
