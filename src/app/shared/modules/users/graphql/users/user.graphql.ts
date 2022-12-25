import { gql } from "apollo-angular";

export const USER_QUERY = gql`
	query getUser($id: String!) {
		user(id: $id) {
			id
			name
		}
	}
`;
