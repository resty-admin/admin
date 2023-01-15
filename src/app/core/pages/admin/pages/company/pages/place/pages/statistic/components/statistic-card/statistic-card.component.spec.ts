import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { StatisticCardComponent } from "./statistic-card.component";

describe("StatisticCardComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [StatisticCardComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(StatisticCardComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
