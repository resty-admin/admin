import { gql } from "apollo-angular";

export const ATTRIBUTES_GROUP_QUERY = gql`
	query getAttributesGroup($id: String!) {
		attributeGroup(id: $id) {
			id
			name
		}
	}
`;
