import { Injectable } from "@angular/core";

import type { CreateAttributeInput, UpdateAttributeInput } from "../../../../../graphql";
import { CreateAttrGQL, DeleteAttrGQL, UpdateAttrGQL } from "../../graphql/attributes";

@Injectable({ providedIn: "root" })
export class AttributesService {
	constructor(
		private readonly _createAttributeGQL: CreateAttrGQL,
		private readonly _updateAttributeGQL: UpdateAttrGQL,
		private readonly _deleteAttributeGQL: DeleteAttrGQL
	) {}

	createAttribute(attr: CreateAttributeInput) {
		return this._createAttributeGQL.mutate({ attr });
	}

	updateAttribute(attr: UpdateAttributeInput) {
		return this._updateAttributeGQL.mutate({ attr });
	}

	deleteAttribute(attrId: string) {
		return this._deleteAttributeGQL.mutate({ attrId });
	}
}
