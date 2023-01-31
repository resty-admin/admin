import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { WalletHeaderComponent } from "./wallet-header.component";

describe("WalletComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [WalletHeaderComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(WalletHeaderComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
