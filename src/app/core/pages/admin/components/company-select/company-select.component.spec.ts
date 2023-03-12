import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { CompanySelectComponent } from "./company-select.component";

describe("CompanySelectComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [CompanySelectComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(CompanySelectComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
