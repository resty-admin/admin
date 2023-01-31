import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { EmployeesComponent } from "./employees.component";

describe("EmployeesComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [EmployeesComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(EmployeesComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
