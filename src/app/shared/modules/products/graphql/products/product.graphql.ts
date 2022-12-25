import { gql } from "apollo-angular";

export const PRODUCT_QUERY = gql`
	query getProduct($id: String!) {
		product(id: $id) {
			id
			name
			file {
				url
			}
		}
	}
`;
