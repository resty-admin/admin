import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { StatisticFooterComponent } from "./statistic-footer.component";

describe("StatisticFooterComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [StatisticFooterComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(StatisticFooterComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
