import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { QrCodeComponent } from "./qr-code.component";

describe("CardComponent", () => {
	let component: QrCodeComponent;
	let fixture: ComponentFixture<QrCodeComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [QrCodeComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(QrCodeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
