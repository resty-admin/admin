import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { LoginWithTelegramComponent } from "./login-with-telegram.component";

describe("LoginWithTelegramComponent", () => {
	let component: LoginWithTelegramComponent;
	let fixture: ComponentFixture<LoginWithTelegramComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LoginWithTelegramComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(LoginWithTelegramComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
