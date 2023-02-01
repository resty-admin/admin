import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { AttributesPageSkeletonComponent } from "./attributes-page-skeleton.component";

describe("PlacesComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [AttributesPageSkeletonComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(AttributesPageSkeletonComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
