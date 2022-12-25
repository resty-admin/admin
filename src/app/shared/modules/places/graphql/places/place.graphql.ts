import { gql } from "apollo-angular";

export const PLACE_QUERY = gql`
	query getPlace($id: String!) {
		place(id: $id) {
			id
			name
			file {
				url
			}
		}
	}
`;
