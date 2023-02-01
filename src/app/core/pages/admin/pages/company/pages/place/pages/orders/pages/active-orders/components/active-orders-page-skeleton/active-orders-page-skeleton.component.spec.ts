import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { ActiveOrdersPageSkeletonComponent } from "./active-orders-page-skeleton.component";

describe("PlacesComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [ActiveOrdersPageSkeletonComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(ActiveOrdersPageSkeletonComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
