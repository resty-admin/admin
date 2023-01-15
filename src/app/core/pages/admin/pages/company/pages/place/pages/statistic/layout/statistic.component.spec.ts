import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { StatisticComponent } from "./statistic.component";

describe("StatisticComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [StatisticComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(StatisticComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
