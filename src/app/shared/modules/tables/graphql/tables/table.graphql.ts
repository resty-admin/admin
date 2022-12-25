import { gql } from "apollo-angular";

export const TABLE_QUERY = gql`
	query getTable($id: String!) {
		table(id: $id) {
			id
			name
			file {
				url
			}
		}
	}
`;
