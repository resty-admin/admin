import type { OnChanges, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, Inject, Input } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { BehaviorSubject, filter } from "rxjs";
import { ControlValueAccessor } from "src/app/shared/classes";
import { ANY_SYMBOL, THEME } from "src/app/shared/constants";
import { getControlValueAccessorProviders } from "src/app/shared/functions";

import type { ISimpleChanges } from "../../../interfaces";
import { FILE_CONFIG } from "../injection-tokens";
import { IFileConfig, IFileTheme } from "../interfaces";

@UntilDestroy()
@Component({
	selector: "app-file",
	templateUrl: "./file.component.html",
	styleUrls: ["./file.component.scss"],
	providers: getControlValueAccessorProviders(FileComponent),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileComponent extends ControlValueAccessor<string> implements OnInit, OnChanges {
	@Input() label = "";
	@Input() theme: IFileTheme = "1";
	@Input() multiple = false;

	fileName = "";

	readonly srcSubject = new BehaviorSubject<ArrayBuffer | string | null>("");
	readonly src$ = this.srcSubject.asObservable();

	className = `app-file ${THEME.replace(ANY_SYMBOL, this.theme)}`;

	constructor(@Inject(FILE_CONFIG) private readonly _fileConfig: IFileConfig) {
		super("");
	}

	override ngOnChanges(changes: ISimpleChanges<FileComponent>) {
		if (changes.theme) {
			this.className = `app-file ${THEME.replace(ANY_SYMBOL, changes.theme.currentValue)}`;
		}

		super.ngOnChanges(changes);
	}

	upload(event: Event) {
		const files = [...(event.target as any).files];

		this.fileName = files.reduce((pre, current) => `${pre} ${current.name},`, "");

		const emitValue = this.multiple ? files : files[0];

		this.srcSubject.next("");

		if (emitValue) {
			const reader = new FileReader();

			reader.onload = () => {
				this.srcSubject.next(reader.result);
			};

			reader.readAsDataURL(emitValue);
		}

		if (this.onChange) {
			this.onChange(emitValue);
		}

		this.valueChange.emit(emitValue);
	}

	override ngOnInit() {
		super.ngOnInit();

		this.formControl.valueChanges
			.pipe(
				untilDestroyed(this),
				filter((value) => Boolean(value))
			)
			.subscribe((value: any) => {
				this.fileName = value.id;
				this.srcSubject.next(`${this._fileConfig.assetsUrl}/${value.url}`);
			});
	}
}
