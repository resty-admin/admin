import { gql } from "apollo-angular";

export const ATTRIBUTE_QUERY = gql`
	query getAttribute($id: String!) {
		attribute(id: $id) {
			id
			name
		}
	}
`;
