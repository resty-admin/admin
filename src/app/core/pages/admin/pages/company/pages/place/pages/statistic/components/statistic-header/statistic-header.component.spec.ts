import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { StatisticHeaderComponent } from "./statistic-header.component";

describe("StatisticHeaderComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [StatisticHeaderComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(StatisticHeaderComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
