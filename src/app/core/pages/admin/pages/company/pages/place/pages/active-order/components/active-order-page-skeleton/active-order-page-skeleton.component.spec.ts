import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { ActiveOrderPageSkeletonComponent } from "./active-order-page-skeleton.component";

describe("PlacesComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [ActiveOrderPageSkeletonComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(ActiveOrderPageSkeletonComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
