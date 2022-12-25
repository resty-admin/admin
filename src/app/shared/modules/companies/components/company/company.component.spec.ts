import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { CompanyComponent } from "./company.component";

describe("CompanyComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [CompanyComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(CompanyComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
