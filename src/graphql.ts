export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends Record<string, unknown>> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
}

export interface AccessToken {
	__typename?: "AccessToken";
	accessToken: Scalars["String"];
}

export interface AccountingSystemEntity {
	__typename?: "AccountingSystemEntity";
	id: Scalars["String"];
	name: Scalars["String"];
}

export interface ActiveOrderEntity {
	__typename?: "ActiveOrderEntity";
	code: Scalars["Int"];
	id: Scalars["String"];
	orderNumber: Scalars["Int"];
	place: PlaceEntity;
	status: OrderStatusEnum;
	table?: Maybe<TableEntity>;
	totalPrice?: Maybe<Scalars["Int"]>;
	type: OrderTypeEnum;
	users?: Maybe<UserEntity[]>;
	usersToOrders?: Maybe<UserToOrderEntity[]>;
}

export interface ActiveOrderEntityInput {
	code: Scalars["Int"];
	orderNumber: Scalars["Int"];
	place: PlaceEntityInput;
	status: OrderStatusEnum;
	table?: InputMaybe<TableEntityInput>;
	totalPrice?: InputMaybe<Scalars["Int"]>;
	type: OrderTypeEnum;
	users?: InputMaybe<UserEntityInput[]>;
	usersToOrders?: InputMaybe<UserToOrderEntityInput[]>;
}

export interface ActiveShiftEntity {
	__typename?: "ActiveShiftEntity";
	id: Scalars["String"];
	place?: Maybe<PlaceEntity>;
	shiftDate: Scalars["String"];
	table?: Maybe<TableEntity>;
	waiter?: Maybe<UserEntity>;
}

export interface ActiveShiftEntityInput {
	place?: InputMaybe<PlaceEntityInput>;
	shiftDate: Scalars["String"];
	table?: InputMaybe<TableEntityInput>;
	waiter?: InputMaybe<UserEntityInput>;
}

export enum AttributeGroupTypeEnum {
	Add = "ADD",
	AddUniq = "ADD_UNIQ",
	Remove = "REMOVE"
}

export interface AttributesEntity {
	__typename?: "AttributesEntity";
	attributesGroup?: Maybe<AttributesGroupEntity[]>;
	id: Scalars["String"];
	name: Scalars["String"];
	price?: Maybe<Scalars["Int"]>;
}

export interface AttributesEntityInput {
	attributesGroup?: InputMaybe<AttributesGroupEntityInput[]>;
	name: Scalars["String"];
	price?: InputMaybe<Scalars["Int"]>;
}

export interface AttributesGroupEntity {
	__typename?: "AttributesGroupEntity";
	attributes?: Maybe<AttributesEntity[]>;
	id: Scalars["String"];
	maxItemsForPick: Scalars["Int"];
	name: Scalars["String"];
	place: PlaceEntity;
	products?: Maybe<ProductEntity[]>;
	type: AttributeGroupTypeEnum;
}

export interface AttributesGroupEntityInput {
	attributes?: InputMaybe<AttributesEntityInput[]>;
	maxItemsForPick: Scalars["Int"];
	name: Scalars["String"];
	place: PlaceEntityInput;
	products?: InputMaybe<ProductEntityInput[]>;
	type: AttributeGroupTypeEnum;
}

export interface CategoryEntity {
	__typename?: "CategoryEntity";
	file?: Maybe<FileEntity>;
	id: Scalars["String"];
	isHide: Scalars["Boolean"];
	name: Scalars["String"];
	place: PlaceEntity;
	products?: Maybe<ProductEntity[]>;
}

export interface CategoryEntityInput {
	file?: InputMaybe<FileEntityInput>;
	isHide: Scalars["Boolean"];
	name: Scalars["String"];
	place: PlaceEntityInput;
	products?: InputMaybe<ProductEntityInput[]>;
}

export interface CommandEntity {
	__typename?: "CommandEntity";
	description: Scalars["String"];
	id: Scalars["String"];
	name: Scalars["String"];
	place: PlaceEntity;
}

export interface CommandEntityInput {
	description: Scalars["String"];
	name: Scalars["String"];
	place: PlaceEntityInput;
}

export interface CompanyEntity {
	__typename?: "CompanyEntity";
	employees?: Maybe<UserEntity[]>;
	fondy?: Maybe<FondyEntity>;
	id: Scalars["String"];
	isHide: Scalars["Boolean"];
	logo?: Maybe<FileEntity>;
	name: Scalars["String"];
	owner: UserEntity;
	places?: Maybe<PlaceEntity[]>;
	status: CompanyStatusEnum;
}

export interface CompanyEntityInput {
	employees?: InputMaybe<UserEntityInput[]>;
	fondy?: InputMaybe<FondyEntityInput>;
	isHide: Scalars["Boolean"];
	logo?: InputMaybe<FileEntityInput>;
	name: Scalars["String"];
	owner: UserEntityInput;
	places?: InputMaybe<PlaceEntityInput[]>;
	status: CompanyStatusEnum;
}

export enum CompanyStatusEnum {
	Approved = "APPROVED",
	Pending = "PENDING",
	Rejected = "REJECTED"
}

export interface CreateAccountingSystemInput {
	name: Scalars["String"];
}

export interface CreateAttributeGroupInput {
	attributes?: InputMaybe<Scalars["String"][]>;
	maxItemsForPick: Scalars["Int"];
	name: Scalars["String"];
	place: Scalars["String"];
	type: AttributeGroupTypeEnum;
}

export interface CreateAttributeInput {
	name: Scalars["String"];
	price: Scalars["Int"];
}

export interface CreateCategoryInput {
	file?: InputMaybe<Scalars["String"]>;
	name: Scalars["String"];
	place: Scalars["String"];
}

export interface CreateCommandInput {
	description: Scalars["String"];
	name: Scalars["String"];
	place: Scalars["String"];
}

export interface CreateCompanyInput {
	logo?: InputMaybe<Scalars["String"]>;
	name: Scalars["String"];
}

export interface CreateHallInput {
	file?: InputMaybe<Scalars["String"]>;
	name: Scalars["String"];
	place: Scalars["String"];
}

export interface CreateOrderInput {
	place: Scalars["String"];
	table?: InputMaybe<Scalars["String"]>;
	type: OrderTypeEnum;
	users?: InputMaybe<Scalars["String"][]>;
}

export interface CreatePaymentSystemInput {
	name: Scalars["String"];
}

export interface CreatePlaceInput {
	address?: InputMaybe<Scalars["String"]>;
	company: Scalars["String"];
	file?: InputMaybe<Scalars["String"]>;
	holidayDays?: InputMaybe<WorkingHoursInput>;
	name: Scalars["String"];
	weekDays?: InputMaybe<WorkingHoursInput>;
	weekendDays?: InputMaybe<WorkingHoursInput>;
}

export interface CreateProductInput {
	attrsGroups?: InputMaybe<Scalars["String"][]>;
	category: Scalars["String"];
	description?: InputMaybe<Scalars["String"]>;
	file?: InputMaybe<Scalars["String"]>;
	name: Scalars["String"];
	price?: InputMaybe<Scalars["Float"]>;
}

export interface CreateShitInput {
	place?: InputMaybe<Scalars["String"]>;
	shiftDate?: InputMaybe<Scalars["String"][]>;
	table?: InputMaybe<Scalars["String"]>;
	waiter?: InputMaybe<Scalars["String"]>;
}

export interface CreateTableInput {
	code?: InputMaybe<Scalars["Int"]>;
	file?: InputMaybe<Scalars["String"]>;
	hall: Scalars["String"];
	name: Scalars["String"];
}

export interface CreateUserInput {
	email: Scalars["String"];
	name?: InputMaybe<Scalars["String"]>;
	password?: InputMaybe<Scalars["String"]>;
	role: UserRoleEnum;
	tel?: InputMaybe<Scalars["String"]>;
}

export interface CreateUserToOrderInput {
	attributes?: InputMaybe<Scalars["String"][]>;
	count: Scalars["Int"];
	product: Scalars["String"];
	user: Scalars["String"];
}

export interface FileEntity {
	__typename?: "FileEntity";
	id: Scalars["String"];
	url: Scalars["String"];
}

export interface FileEntityInput {
	url: Scalars["String"];
}

export interface FiltersArgsDto {
	key: Scalars["String"];
	operator: Scalars["String"];
	value: Scalars["String"];
}

export interface FondyEntity {
	__typename?: "FondyEntity";
	company: CompanyEntity;
	id: Scalars["String"];
	merchantId: Scalars["String"];
	secretKey: Scalars["String"];
}

export interface FondyEntityInput {
	company: CompanyEntityInput;
	merchantId: Scalars["String"];
	secretKey: Scalars["String"];
}

export interface HallEntity {
	__typename?: "HallEntity";
	file?: Maybe<FileEntity>;
	id: Scalars["String"];
	isHide: Scalars["Boolean"];
	name: Scalars["String"];
	place: PlaceEntity;
	tables?: Maybe<TableEntity[]>;
}

export interface HallEntityInput {
	file?: InputMaybe<FileEntityInput>;
	isHide: Scalars["Boolean"];
	name: Scalars["String"];
	place: PlaceEntityInput;
	tables?: InputMaybe<TableEntityInput[]>;
}

export interface HistoryShiftEntity {
	__typename?: "HistoryShiftEntity";
	id: Scalars["String"];
	place?: Maybe<PlaceEntity>;
	shiftDate: Scalars["String"];
	table?: Maybe<TableEntity>;
	waiter?: Maybe<UserEntity>;
}

export interface HistoryShiftEntityInput {
	place?: InputMaybe<PlaceEntityInput>;
	shiftDate: Scalars["String"];
	table?: InputMaybe<TableEntityInput>;
	waiter?: InputMaybe<UserEntityInput>;
}

export interface LanguageEntity {
	__typename?: "LanguageEntity";
	file: FileEntity;
	id: Scalars["String"];
	name: Scalars["String"];
}

export interface Mutation {
	__typename?: "Mutation";
	addProductToOrder: ActiveOrderEntity;
	addUserToOrder: ActiveOrderEntity;
	closeOrder: Scalars["String"];
	createAccountingSystem: AccountingSystemEntity;
	createAttr: AttributesEntity;
	createAttrGroup: AttributesGroupEntity;
	createCategory: CategoryEntity;
	createCommand: CommandEntity;
	createCompany: CompanyEntity;
	createHall: HallEntity;
	createOrder: ActiveOrderEntity;
	createPaymentSystem: PaymentSystemEntity;
	createPlace: PlaceEntity;
	createProduct: ProductEntity;
	createShift: ActiveShiftEntity;
	createTable: TableEntity;
	createUser: UserEntity;
	deleteAccountingSystem: Scalars["String"];
	deleteAttr: Scalars["String"];
	deleteAttrGroup: Scalars["String"];
	deleteCategory: Scalars["String"];
	deleteCommand: Scalars["String"];
	deleteCompany: Scalars["String"];
	deleteHall: Scalars["String"];
	deleteOrder: Scalars["String"];
	deletePaymentSystem: Scalars["String"];
	deletePlace: Scalars["String"];
	deleteProduct: Scalars["String"];
	deleteShift: Scalars["String"];
	deleteTable: Scalars["String"];
	deleteUser: Scalars["String"];
	removeUserProductInOrder: Scalars["String"];
	updateAccountingSystem: AccountingSystemEntity;
	updateAttr: AttributesEntity;
	updateAttrGroup: AttributesGroupEntity;
	updateCategory: CategoryEntity;
	updateCommand: CommandEntity;
	updateCompany: CompanyEntity;
	updateHall: HallEntity;
	updateOrder: ActiveOrderEntity;
	updatePaymentSystem: PaymentSystemEntity;
	updatePlace: PlaceEntity;
	updateProduct: ProductEntity;
	updateShift: ActiveShiftEntity;
	updateTable: TableEntity;
	updateUser: UserEntity;
	updateUserProductInOrder: ActiveOrderEntity;
}

export interface MutationAddProductToOrderArgs {
	orderId: Scalars["String"];
	product: CreateUserToOrderInput;
}

export interface MutationAddUserToOrderArgs {
	code: Scalars["Int"];
}

export interface MutationCloseOrderArgs {
	orderId: Scalars["String"];
}

export interface MutationCreateAccountingSystemArgs {
	accountingSystem: CreateAccountingSystemInput;
}

export interface MutationCreateAttrArgs {
	attr: CreateAttributeInput;
}

export interface MutationCreateAttrGroupArgs {
	attrGroup: CreateAttributeGroupInput;
}

export interface MutationCreateCategoryArgs {
	category: CreateCategoryInput;
}

export interface MutationCreateCommandArgs {
	command: CreateCommandInput;
}

export interface MutationCreateCompanyArgs {
	company: CreateCompanyInput;
}

export interface MutationCreateHallArgs {
	hall: CreateHallInput;
}

export interface MutationCreateOrderArgs {
	order: CreateOrderInput;
}

export interface MutationCreatePaymentSystemArgs {
	paymentSystem: CreatePaymentSystemInput;
}

export interface MutationCreatePlaceArgs {
	place: CreatePlaceInput;
}

export interface MutationCreateProductArgs {
	product: CreateProductInput;
}

export interface MutationCreateShiftArgs {
	shift: CreateShitInput;
}

export interface MutationCreateTableArgs {
	table: CreateTableInput;
}

export interface MutationCreateUserArgs {
	user: CreateUserInput;
}

export interface MutationDeleteAccountingSystemArgs {
	accountingSystemId: Scalars["String"];
}

export interface MutationDeleteAttrArgs {
	attrId: Scalars["String"];
}

export interface MutationDeleteAttrGroupArgs {
	attrGroupId: Scalars["String"];
}

export interface MutationDeleteCategoryArgs {
	categoryId: Scalars["String"];
}

export interface MutationDeleteCommandArgs {
	commandId: Scalars["String"];
}

export interface MutationDeleteCompanyArgs {
	companyId: Scalars["String"];
}

export interface MutationDeleteHallArgs {
	hallId: Scalars["String"];
}

export interface MutationDeleteOrderArgs {
	orderId: Scalars["String"];
}

export interface MutationDeletePaymentSystemArgs {
	paymentSystemId: Scalars["String"];
}

export interface MutationDeletePlaceArgs {
	placeId: Scalars["String"];
}

export interface MutationDeleteProductArgs {
	productId: Scalars["String"];
}

export interface MutationDeleteShiftArgs {
	shiftId: Scalars["String"];
}

export interface MutationDeleteTableArgs {
	tableId: Scalars["String"];
}

export interface MutationDeleteUserArgs {
	userId: Scalars["String"];
}

export interface MutationRemoveUserProductInOrderArgs {
	userToOrderId: Scalars["String"];
}

export interface MutationUpdateAccountingSystemArgs {
	accountingSystem: UpdateAccountingSystemInput;
}

export interface MutationUpdateAttrArgs {
	attr: UpdateAttributeInput;
}

export interface MutationUpdateAttrGroupArgs {
	attrGroup: UpdateAttributeGroupInput;
}

export interface MutationUpdateCategoryArgs {
	category: UpdateCategoryInput;
}

export interface MutationUpdateCommandArgs {
	command: UpdateCommandInput;
}

export interface MutationUpdateCompanyArgs {
	company: UpdateCompanyInput;
}

export interface MutationUpdateHallArgs {
	hall: UpdateHallInput;
}

export interface MutationUpdateOrderArgs {
	order: UpdateOrderInput;
}

export interface MutationUpdatePaymentSystemArgs {
	paymentSystem: UpdatePaymentSystemInput;
}

export interface MutationUpdatePlaceArgs {
	place: UpdatePlaceInput;
}

export interface MutationUpdateProductArgs {
	product: UpdateProductInput;
}

export interface MutationUpdateShiftArgs {
	shift: UpdateShitInput;
}

export interface MutationUpdateTableArgs {
	table: UpdateTableInput;
}

export interface MutationUpdateUserArgs {
	user: UpdateUserInput;
}

export interface MutationUpdateUserProductInOrderArgs {
	userToOrder: UpdateUserToOrderInput;
}

export enum OrderStatusEnum {
	Closed = "CLOSED",
	Opened = "OPENED",
	Paid = "PAID",
	Unpaid = "UNPAID"
}

export enum OrderTypeEnum {
	Delivery = "DELIVERY",
	InPlace = "IN_PLACE",
	Pickup = "PICKUP",
	Reserve = "RESERVE"
}

export interface PaginatedAccountingSystem {
	__typename?: "PaginatedAccountingSystem";
	data?: Maybe<AccountingSystemEntity[]>;
	page: Scalars["Int"];
	totalCount: Scalars["Int"];
}

export interface PaginatedActiveOrder {
	__typename?: "PaginatedActiveOrder";
	data?: Maybe<ActiveOrderEntity[]>;
	page: Scalars["Int"];
	totalCount: Scalars["Int"];
}

export interface PaginatedActiveShift {
	__typename?: "PaginatedActiveShift";
	data?: Maybe<ActiveShiftEntity[]>;
	page: Scalars["Int"];
	totalCount: Scalars["Int"];
}

export interface PaginatedAttributeGroups {
	__typename?: "PaginatedAttributeGroups";
	data?: Maybe<AttributesGroupEntity[]>;
	page: Scalars["Int"];
	totalCount: Scalars["Int"];
}

export interface PaginatedAttributes {
	__typename?: "PaginatedAttributes";
	data?: Maybe<AttributesEntity[]>;
	page: Scalars["Int"];
	totalCount: Scalars["Int"];
}

export interface PaginatedCategory {
	__typename?: "PaginatedCategory";
	data?: Maybe<CategoryEntity[]>;
	page: Scalars["Int"];
	totalCount: Scalars["Int"];
}

export interface PaginatedCommand {
	__typename?: "PaginatedCommand";
	data?: Maybe<CommandEntity[]>;
	page: Scalars["Int"];
	totalCount: Scalars["Int"];
}

export interface PaginatedCompany {
	__typename?: "PaginatedCompany";
	data?: Maybe<CompanyEntity[]>;
	page: Scalars["Int"];
	totalCount: Scalars["Int"];
}

export interface PaginatedHall {
	__typename?: "PaginatedHall";
	data?: Maybe<HallEntity[]>;
	page: Scalars["Int"];
	totalCount: Scalars["Int"];
}

export interface PaginatedPaymentSystem {
	__typename?: "PaginatedPaymentSystem";
	data?: Maybe<PaymentSystemEntity[]>;
	page: Scalars["Int"];
	totalCount: Scalars["Int"];
}

export interface PaginatedPlace {
	__typename?: "PaginatedPlace";
	data?: Maybe<PlaceEntity[]>;
	page: Scalars["Int"];
	totalCount: Scalars["Int"];
}

export interface PaginatedProduct {
	__typename?: "PaginatedProduct";
	data?: Maybe<ProductEntity[]>;
	page: Scalars["Int"];
	totalCount: Scalars["Int"];
}

export interface PaginatedTable {
	__typename?: "PaginatedTable";
	data?: Maybe<TableEntity[]>;
	page: Scalars["Int"];
	totalCount: Scalars["Int"];
}

export interface PaginatedUser {
	__typename?: "PaginatedUser";
	data?: Maybe<UserEntity[]>;
	page: Scalars["Int"];
	totalCount: Scalars["Int"];
}

export interface PaymentSystemEntity {
	__typename?: "PaymentSystemEntity";
	id: Scalars["String"];
	name: Scalars["String"];
}

export interface PaymentSystemEntityInput {
	name: Scalars["String"];
}

export interface PlaceEntity {
	__typename?: "PlaceEntity";
	a11y: Scalars["String"];
	address?: Maybe<Scalars["String"]>;
	attrGroups: AttributesGroupEntity[];
	categories?: Maybe<CategoryEntity[]>;
	commands?: Maybe<CommandEntity[]>;
	company: CompanyEntity;
	file?: Maybe<FileEntity>;
	halls: HallEntity[];
	holidayDays: Scalars["String"];
	id: Scalars["String"];
	isHide: Scalars["Boolean"];
	name: Scalars["String"];
	orders?: Maybe<ActiveOrderEntity[]>;
	status: PlaceStatusEnum;
	weekDays: Scalars["String"];
	weekendDays: Scalars["String"];
}

export interface PlaceEntityInput {
	a11y: Scalars["String"];
	address?: InputMaybe<Scalars["String"]>;
	attrGroups: AttributesGroupEntityInput[];
	categories?: InputMaybe<CategoryEntityInput[]>;
	commands?: InputMaybe<CommandEntityInput[]>;
	company: CompanyEntityInput;
	file?: InputMaybe<FileEntityInput>;
	halls: HallEntityInput[];
	holidayDays: Scalars["String"];
	isHide: Scalars["Boolean"];
	name: Scalars["String"];
	orders?: InputMaybe<ActiveOrderEntityInput[]>;
	status: PlaceStatusEnum;
	weekDays: Scalars["String"];
	weekendDays: Scalars["String"];
}

export enum PlaceStatusEnum {
	Closed = "CLOSED",
	Opened = "OPENED"
}

export interface ProductEntity {
	__typename?: "ProductEntity";
	attrsGroups?: Maybe<AttributesGroupEntity[]>;
	category?: Maybe<CategoryEntity>;
	description?: Maybe<Scalars["String"]>;
	file?: Maybe<FileEntity>;
	id: Scalars["String"];
	isHide: Scalars["Boolean"];
	name: Scalars["String"];
	price: Scalars["Int"];
}

export interface ProductEntityInput {
	attrsGroups?: InputMaybe<AttributesGroupEntityInput[]>;
	category?: InputMaybe<CategoryEntityInput>;
	description?: InputMaybe<Scalars["String"]>;
	file?: InputMaybe<FileEntityInput>;
	isHide: Scalars["Boolean"];
	name: Scalars["String"];
	price: Scalars["Int"];
}

export enum ProductToOrderStatusEnum {
	Added = "ADDED",
	Confirmed = "CONFIRMED",
	Paid = "PAID",
	RequestedToConfirm = "REQUESTED_TO_CONFIRM",
	RequestedToPay = "REQUESTED_TO_PAY"
}

export interface Query {
	__typename?: "Query";
	accountingSystem: AccountingSystemEntity;
	accountingSystems: PaginatedAccountingSystem;
	attribute: AttributesEntity;
	attributeGroup: AttributesGroupEntity;
	attributeGroups: PaginatedAttributeGroups;
	attributes: PaginatedAttributes;
	categories: PaginatedCategory;
	category: CategoryEntity;
	command: CommandEntity;
	commands: PaginatedCommand;
	companies: PaginatedCompany;
	company: CompanyEntity;
	getMe: AccessToken;
	hall: HallEntity;
	halls: PaginatedHall;
	language: LanguageEntity;
	languages: LanguageEntity;
	order: ActiveOrderEntity;
	orders: PaginatedActiveOrder;
	paymentSystem: PaymentSystemEntity;
	paymentSystems: PaginatedPaymentSystem;
	place: PlaceEntity;
	places: PaginatedPlace;
	product: ProductEntity;
	products: PaginatedProduct;
	shift: ActiveShiftEntity;
	shifts: PaginatedActiveShift;
	table: TableEntity;
	tables: PaginatedTable;
	user: UserEntity;
	users: PaginatedUser;
}

export interface QueryAccountingSystemArgs {
	id: Scalars["String"];
}

export interface QueryAccountingSystemsArgs {
	filtersArgs?: InputMaybe<FiltersArgsDto>;
	skip?: Scalars["Int"];
	take?: Scalars["Int"];
}

export interface QueryAttributeArgs {
	id: Scalars["String"];
}

export interface QueryAttributeGroupArgs {
	id: Scalars["String"];
}

export interface QueryAttributeGroupsArgs {
	filtersArgs?: InputMaybe<FiltersArgsDto>;
	skip?: Scalars["Int"];
	take?: Scalars["Int"];
}

export interface QueryAttributesArgs {
	filtersArgs?: InputMaybe<FiltersArgsDto>;
	skip?: Scalars["Int"];
	take?: Scalars["Int"];
}

export interface QueryCategoriesArgs {
	filtersArgs?: InputMaybe<FiltersArgsDto>;
	skip?: Scalars["Int"];
	take?: Scalars["Int"];
}

export interface QueryCategoryArgs {
	id: Scalars["String"];
}

export interface QueryCommandArgs {
	id: Scalars["String"];
}

export interface QueryCommandsArgs {
	filtersArgs?: InputMaybe<FiltersArgsDto>;
	skip?: Scalars["Int"];
	take?: Scalars["Int"];
}

export interface QueryCompaniesArgs {
	filtersArgs?: InputMaybe<FiltersArgsDto>;
	skip?: Scalars["Int"];
	take?: Scalars["Int"];
}

export interface QueryCompanyArgs {
	id: Scalars["String"];
}

export interface QueryHallArgs {
	id: Scalars["String"];
}

export interface QueryHallsArgs {
	filtersArgs?: InputMaybe<FiltersArgsDto>;
	skip?: Scalars["Int"];
	take?: Scalars["Int"];
}

export interface QueryLanguageArgs {
	id: Scalars["String"];
}

export interface QueryLanguagesArgs {
	filtersArgs?: InputMaybe<FiltersArgsDto>;
	skip?: Scalars["Int"];
	take?: Scalars["Int"];
}

export interface QueryOrderArgs {
	id: Scalars["String"];
}

export interface QueryOrdersArgs {
	filtersArgs?: InputMaybe<FiltersArgsDto>;
	skip?: Scalars["Int"];
	take?: Scalars["Int"];
}

export interface QueryPaymentSystemArgs {
	id: Scalars["String"];
}

export interface QueryPaymentSystemsArgs {
	filtersArgs?: InputMaybe<FiltersArgsDto>;
	skip?: Scalars["Int"];
	take?: Scalars["Int"];
}

export interface QueryPlaceArgs {
	id: Scalars["String"];
}

export interface QueryPlacesArgs {
	filtersArgs?: InputMaybe<FiltersArgsDto>;
	skip?: Scalars["Int"];
	take?: Scalars["Int"];
}

export interface QueryProductArgs {
	id: Scalars["String"];
}

export interface QueryProductsArgs {
	filtersArgs?: InputMaybe<FiltersArgsDto>;
	skip?: Scalars["Int"];
	take?: Scalars["Int"];
}

export interface QueryShiftArgs {
	id: Scalars["String"];
}

export interface QueryShiftsArgs {
	filtersArgs?: InputMaybe<FiltersArgsDto>;
	skip?: Scalars["Int"];
	take?: Scalars["Int"];
}

export interface QueryTableArgs {
	id: Scalars["String"];
}

export interface QueryTablesArgs {
	filtersArgs?: InputMaybe<FiltersArgsDto>;
	skip?: Scalars["Int"];
	take?: Scalars["Int"];
}

export interface QueryUserArgs {
	id: Scalars["String"];
}

export interface QueryUsersArgs {
	filtersArgs?: InputMaybe<FiltersArgsDto>;
	skip?: Scalars["Int"];
	take?: Scalars["Int"];
}

export interface TableEntity {
	__typename?: "TableEntity";
	code: Scalars["Int"];
	file?: Maybe<FileEntity>;
	hall: HallEntity;
	id: Scalars["String"];
	isHide: Scalars["Boolean"];
	name: Scalars["String"];
	orders?: Maybe<ActiveOrderEntity[]>;
}

export interface TableEntityInput {
	code: Scalars["Int"];
	file?: InputMaybe<FileEntityInput>;
	hall: HallEntityInput;
	isHide: Scalars["Boolean"];
	name: Scalars["String"];
	orders?: InputMaybe<ActiveOrderEntityInput[]>;
}

export enum ThemeEnum {
	Dark = "DARK",
	Light = "LIGHT"
}

export interface UpdateAccountingSystemInput {
	id: Scalars["String"];
	name: Scalars["String"];
}

export interface UpdateAttributeGroupInput {
	attributes?: InputMaybe<Scalars["String"][]>;
	id: Scalars["String"];
	isUniq?: InputMaybe<Scalars["Boolean"]>;
	maxItemsForPick?: InputMaybe<Scalars["Int"]>;
	name?: InputMaybe<Scalars["String"]>;
	type?: InputMaybe<AttributeGroupTypeEnum>;
}

export interface UpdateAttributeInput {
	id: Scalars["String"];
	name: Scalars["String"];
	price?: InputMaybe<Scalars["Int"]>;
}

export interface UpdateCategoryInput {
	file?: InputMaybe<Scalars["String"]>;
	id: Scalars["String"];
	name?: InputMaybe<Scalars["String"]>;
	place?: InputMaybe<Scalars["String"]>;
}

export interface UpdateCommandInput {
	description?: InputMaybe<Scalars["String"]>;
	id: Scalars["String"];
	name?: InputMaybe<Scalars["String"]>;
	place?: InputMaybe<Scalars["String"]>;
}

export interface UpdateCompanyInput {
	employees?: InputMaybe<Scalars["String"][]>;
	id: Scalars["String"];
	logo?: InputMaybe<Scalars["String"]>;
	name?: InputMaybe<Scalars["String"]>;
}

export interface UpdateHallInput {
	file?: InputMaybe<Scalars["String"]>;
	id: Scalars["String"];
	name: Scalars["String"];
}

export interface UpdateOrderInput {
	id: Scalars["String"];
	status?: InputMaybe<OrderStatusEnum>;
	table?: InputMaybe<Scalars["String"]>;
	type?: InputMaybe<OrderTypeEnum>;
	users?: InputMaybe<Scalars["String"][]>;
}

export interface UpdatePaymentSystemInput {
	id: Scalars["String"];
	name: Scalars["String"];
}

export interface UpdatePlaceInput {
	address?: InputMaybe<Scalars["String"]>;
	file?: InputMaybe<Scalars["String"]>;
	holidayDays?: InputMaybe<WorkingHoursInput>;
	id: Scalars["String"];
	name?: InputMaybe<Scalars["String"]>;
	weekDays?: InputMaybe<WorkingHoursInput>;
	weekendDays?: InputMaybe<WorkingHoursInput>;
}

export interface UpdateProductInput {
	attrsGroups?: InputMaybe<Scalars["String"][]>;
	category?: InputMaybe<Scalars["String"]>;
	description?: InputMaybe<Scalars["String"]>;
	file?: InputMaybe<Scalars["String"]>;
	id: Scalars["String"];
	name?: InputMaybe<Scalars["String"]>;
	price?: InputMaybe<Scalars["Float"]>;
}

export interface UpdateShitInput {
	id: Scalars["String"];
	place?: InputMaybe<Scalars["String"]>;
	shiftDate?: InputMaybe<Scalars["String"][]>;
	table?: InputMaybe<Scalars["String"]>;
	waiter?: InputMaybe<Scalars["String"]>;
}

export interface UpdateTableInput {
	code?: InputMaybe<Scalars["Int"]>;
	file?: InputMaybe<Scalars["String"]>;
	id: Scalars["String"];
	name: Scalars["String"];
}

export interface UpdateUserInput {
	email?: InputMaybe<Scalars["String"]>;
	id: Scalars["String"];
	name?: InputMaybe<Scalars["String"]>;
	tel?: InputMaybe<Scalars["String"]>;
}

export interface UpdateUserToOrderInput {
	attributes?: InputMaybe<Scalars["String"][]>;
	count?: InputMaybe<Scalars["Int"]>;
	id: Scalars["String"];
	product?: InputMaybe<Scalars["String"]>;
	user?: InputMaybe<Scalars["String"]>;
}

export interface UserEntity {
	__typename?: "UserEntity";
	companies?: Maybe<CompanyEntity>;
	email?: Maybe<Scalars["String"]>;
	googleId?: Maybe<Scalars["String"]>;
	id: Scalars["String"];
	name: Scalars["String"];
	orders?: Maybe<ActiveOrderEntity[]>;
	password?: Maybe<Scalars["String"]>;
	role: UserRoleEnum;
	status: UserStatusEnum;
	tel?: Maybe<Scalars["String"]>;
	telegramId?: Maybe<Scalars["Int"]>;
	telegramToken?: Maybe<Scalars["String"]>;
	theme: ThemeEnum;
	verificationCode?: Maybe<Scalars["Int"]>;
}

export interface UserEntityInput {
	companies?: InputMaybe<CompanyEntityInput>;
	email?: InputMaybe<Scalars["String"]>;
	googleId?: InputMaybe<Scalars["String"]>;
	name: Scalars["String"];
	orders?: InputMaybe<ActiveOrderEntityInput[]>;
	password?: InputMaybe<Scalars["String"]>;
	role: UserRoleEnum;
	status: UserStatusEnum;
	tel?: InputMaybe<Scalars["String"]>;
	telegramId?: InputMaybe<Scalars["Int"]>;
	telegramToken?: InputMaybe<Scalars["String"]>;
	theme: ThemeEnum;
	verificationCode?: InputMaybe<Scalars["Int"]>;
}

export enum UserRoleEnum {
	Admin = "ADMIN",
	Client = "CLIENT",
	Hookah = "HOOKAH",
	Hostess = "HOSTESS",
	Root = "ROOT",
	Waiter = "WAITER"
}

export enum UserStatusEnum {
	NotVerified = "NOT_VERIFIED",
	Verified = "VERIFIED"
}

export interface UserToOrderEntity {
	__typename?: "UserToOrderEntity";
	attributes?: Maybe<AttributesEntity[]>;
	count: Scalars["Int"];
	id: Scalars["String"];
	order: ActiveOrderEntity;
	paymentLink?: Maybe<Scalars["String"]>;
	product: ProductEntity;
	status: ProductToOrderStatusEnum;
	user: UserEntity;
}

export interface UserToOrderEntityInput {
	attributes?: InputMaybe<AttributesEntityInput[]>;
	count: Scalars["Int"];
	order: ActiveOrderEntityInput;
	paymentLink?: InputMaybe<Scalars["String"]>;
	product: ProductEntityInput;
	status: ProductToOrderStatusEnum;
	user: UserEntityInput;
}

export interface WorkingHoursInput {
	end: Scalars["Int"];
	name: Scalars["String"];
	start: Scalars["Int"];
}
