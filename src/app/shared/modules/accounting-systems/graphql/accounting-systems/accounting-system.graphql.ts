import { gql } from "apollo-angular";

export const ACCOUNTING_SYSTEM_QUERY = gql`
	query getAccountingSystem($id: String!) {
		accountingSystem(id: $id) {
			id
			name
		}
	}
`;
