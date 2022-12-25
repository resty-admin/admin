import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { CompaniesComponent } from "./companies.component";

describe("CompaniesComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [CompaniesComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(CompaniesComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
