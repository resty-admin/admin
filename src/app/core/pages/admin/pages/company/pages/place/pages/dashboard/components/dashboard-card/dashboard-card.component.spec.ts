import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { DashboardCardComponent } from "./dashboard-card.component";

describe("DashboardCardComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [DashboardCardComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(DashboardCardComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
