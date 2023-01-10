import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { DashboardFooterComponent } from "./dashboard-footer.component";

describe("DashboardFooterComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [DashboardFooterComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(DashboardFooterComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
