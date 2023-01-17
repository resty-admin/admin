import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import type { DeepPartial } from "@ngneat/reactive-forms/lib/types";

import type { TableEntity } from "../../../../../../graphql";

@Component({
	selector: "app-preview-table",
	templateUrl: "./preview-table.component.html",
	styleUrls: ["./preview-table.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewTableComponent {
	@Input() table?: DeepPartial<TableEntity> | null;
	@Input() active = false;
}
