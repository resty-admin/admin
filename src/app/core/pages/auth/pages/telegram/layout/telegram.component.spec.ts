import { TestBed } from "@angular/core/testing";

import { TelegramComponent } from "./telegram.component";

describe("TelegramComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [TelegramComponent]
		}).compileComponents();
	});

	it("should create the component", () => {
		const fixture = TestBed.createComponent(TelegramComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
