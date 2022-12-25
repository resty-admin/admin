import { gql } from "apollo-angular";

export const COMPANY_QUERY = gql`
	query getCompany($id: String!) {
		company(id: $id) {
			id
			name
			logo {
				url
			}
		}
	}
`;
