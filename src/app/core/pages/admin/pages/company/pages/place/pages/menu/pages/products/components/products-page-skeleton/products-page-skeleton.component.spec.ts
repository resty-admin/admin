import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { ProductsPageSkeletonComponent } from "./products-page-skeleton.component";

describe("PlacesComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [ProductsPageSkeletonComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(ProductsPageSkeletonComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
