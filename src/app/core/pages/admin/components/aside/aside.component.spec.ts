import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { AsideComponent } from "./aside.component";

describe("AsideComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [AsideComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(AsideComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
