import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { DashboardHeaderComponent } from "./dashboard-header.component";

describe("DashboardHeaderComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [DashboardHeaderComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(DashboardHeaderComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
