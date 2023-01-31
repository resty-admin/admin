import { Injectable } from "@angular/core";
import type { CreateAttributeGroupInput, UpdateAttributeGroupInput } from "@graphql";

import { CreateAttrGroupGQL, DeleteAttrGroupGQL, UpdateAttrGroupGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class AttributeGroupsService {
	constructor(
		private readonly _createAttributeGroupGQL: CreateAttrGroupGQL,
		private readonly _updateAttributeGroupGQL: UpdateAttrGroupGQL,
		private readonly _deleteAttributeGroupGQL: DeleteAttrGroupGQL
	) {}

	createAttributeGroup(attrGroup: CreateAttributeGroupInput) {
		return this._createAttributeGroupGQL.mutate({ attrGroup });
	}

	updateAttributeGroup(attrGroup: UpdateAttributeGroupInput) {
		return this._updateAttributeGroupGQL.mutate({ attrGroup });
	}

	deleteAttributeGroup(attrGroupId: string) {
		return this._deleteAttributeGroupGQL.mutate({ attrGroupId });
	}
}
