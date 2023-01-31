import type { OnChanges, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, Inject, Input } from "@angular/core";
import { FileEntity } from "@graphql";
import { ControlValueAccessor } from "@shared/classes";
import { ANY_SYMBOL, THEME } from "@shared/constants";
import { getControlValueAccessorProviders } from "@shared/functions";
import type { IHTMLInputEvent, ISimpleChanges } from "@shared/interfaces";
import { BehaviorSubject } from "rxjs";

import { FILE_CONFIG } from "../injection-tokens";
import { IFileConfig, IFileTheme } from "../interfaces";

@Component({
	selector: "app-file",
	templateUrl: "./file.component.html",
	styleUrls: ["./file.component.scss"],
	providers: getControlValueAccessorProviders(FileComponent),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileComponent extends ControlValueAccessor<File | null> implements OnInit, OnChanges {
	@Input() label = "";
	@Input() theme: IFileTheme = "1";
	@Input() previewImage?: FileEntity;

	fileName = "";

	readonly srcSubject = new BehaviorSubject<ArrayBuffer | string | null>("");
	readonly src$ = this.srcSubject.asObservable();

	className = `app-file ${THEME.replace(ANY_SYMBOL, this.theme)}`;

	constructor(@Inject(FILE_CONFIG) private readonly _fileConfig: IFileConfig) {
		super(null);
	}

	override ngOnChanges(changes: ISimpleChanges<FileComponent>) {
		if (changes.theme) {
			this.className = `app-file ${THEME.replace(ANY_SYMBOL, changes.theme.currentValue)}`;
		}

		if (changes.previewImage && changes.previewImage.currentValue) {
			const { id, url } = changes.previewImage.currentValue;

			this.fileName = id;
			this.srcSubject.next(`${this._fileConfig.assetsUrl}/${url}`);
		}

		super.ngOnChanges(changes);
	}

	upload(event: Event) {
		const { target } = event as IHTMLInputEvent;

		if (!target || !target.files) {
			return;
		}

		const files = [...target.files];

		this.fileName = files.reduce((pre, current) => `${pre} ${current.name},`, "");

		const [emitValue] = files;

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
}
