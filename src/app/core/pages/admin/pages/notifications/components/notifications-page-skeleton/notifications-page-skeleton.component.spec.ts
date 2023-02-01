import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { NotificationsPageSkeletonComponent } from "./notifications-page-skeleton.component";

describe("PlacesComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [NotificationsPageSkeletonComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(NotificationsPageSkeletonComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
