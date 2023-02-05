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
	DateTime: any;
	JSONObject: any;
}

export interface AccessToken {
	__typename?: "AccessToken";
	accessToken: Scalars["String"];
}

export interface AccountingSystemEntity {
	__typename?: "AccountingSystemEntity";
	configFields?: Maybe<Scalars["JSONObject"]>;
	id: Scalars["String"];
	name: Scalars["String"];
}

export interface AccountingSystemEntityInput {
	configFields?: InputMaybe<Scalars["JSONObject"]>;
	name: Scalars["String"];
}

export interface ActiveOrderEntity {
	__typename?: "ActiveOrderEntity";
	code: Scalars["Int"];
	comments?: Maybe<Scalars["String"]>;
	createdAt: Scalars["DateTime"];
	id: Scalars["String"];
	orderNumber: Scalars["Int"];
	place: PlaceEntity;
	productsToOrders?: Maybe<ProductToOrderEntity[]>;
	startDate: Scalars["DateTime"];
	status: OrderStatusEnum;
	table?: Maybe<TableEntity>;
	tableStatus: TableStatusEnum;
	totalPrice?: Maybe<Scalars["Int"]>;
	type: OrderTypeEnum;
	users?: Maybe<UserEntity[]>;
	waiters?: Maybe<UserEntity[]>;
}

export interface ActiveOrderEntityInput {
	code: Scalars["Int"];
	comments?: InputMaybe<Scalars["String"]>;
	createdAt: Scalars["DateTime"];
	orderNumber: Scalars["Int"];
	place: PlaceEntityInput;
	productsToOrders?: InputMaybe<ProductToOrderEntityInput[]>;
	startDate: Scalars["DateTime"];
	status: OrderStatusEnum;
	table?: InputMaybe<TableEntityInput>;
	tableStatus: TableStatusEnum;
	totalPrice?: InputMaybe<Scalars["Int"]>;
	type: OrderTypeEnum;
	users?: InputMaybe<UserEntityInput[]>;
	waiters?: InputMaybe<UserEntityInput[]>;
}

export interface ActiveShiftEntity {
	__typename?: "ActiveShiftEntity";
	id: Scalars["String"];
	place?: Maybe<PlaceEntity>;
	shiftDate: Scalars["DateTime"];
	tables?: Maybe<TableEntity[]>;
	waiter?: Maybe<UserEntity>;
}

export interface ActiveShiftEntityInput {
	place?: InputMaybe<PlaceEntityInput>;
	shiftDate: Scalars["DateTime"];
	tables?: InputMaybe<TableEntityInput[]>;
	waiter?: InputMaybe<UserEntityInput>;
}

export interface AddEmployeeInput {
	placeId: Scalars["String"];
	userId: Scalars["String"];
}

export enum AttributeGroupTypeEnum {
	Add = "ADD",
	Remove = "REMOVE"
}

export interface AttributesEntity {
	__typename?: "AttributesEntity";
	attributesGroup?: Maybe<AttributesGroupEntity[]>;
	id: Scalars["String"];
	name: Scalars["String"];
	price: Scalars["Int"];
}

export interface AttributesEntityInput {
	attributesGroup?: InputMaybe<AttributesGroupEntityInput[]>;
	name: Scalars["String"];
	price: Scalars["Int"];
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
	accountingSystemsFields?: Maybe<Scalars["JSONObject"]>;
	file?: Maybe<FileEntity>;
	id: Scalars["String"];
	isHide: Scalars["Boolean"];
	name: Scalars["String"];
	place: PlaceEntity;
	products?: Maybe<ProductEntity[]>;
}

export interface CategoryEntityInput {
	accountingSystemsFields?: InputMaybe<Scalars["JSONObject"]>;
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

export interface ConfirmProductToOrderInput {
	attributesIds?: InputMaybe<Scalars["String"][]>;
	count: Scalars["Float"];
	orderId: Scalars["String"];
	productId: Scalars["String"];
}

export interface ConnectAccountingSystemToPlaceInput {
	accountingSystem: Scalars["String"];
	place: Scalars["String"];
	placeConfigFields: Scalars["JSONObject"];
}

export interface ConnectPaymentSystemToPlaceInput {
	paymentSystem: Scalars["String"];
	place: Scalars["String"];
	placeConfigFields: Scalars["JSONObject"];
}

export interface CreateAccountingSystemInput {
	configFields?: InputMaybe<Scalars["JSONObject"]>;
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
	attributesGroup: Scalars["String"][];
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
	comments?: InputMaybe<Scalars["String"]>;
	place: Scalars["String"];
	productsToOrder?: InputMaybe<CreateProductToOrderInput[]>;
	table?: InputMaybe<Scalars["String"]>;
	type: OrderTypeEnum;
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

export interface CreateProductToOrderInput {
	attributesIds?: InputMaybe<Scalars["String"][]>;
	count: Scalars["Int"];
	productId: Scalars["String"];
}

export interface CreateShiftInput {
	place?: InputMaybe<Scalars["String"]>;
	tables: Scalars["String"][];
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

export interface FondyLink {
	__typename?: "FondyLink";
	link: Scalars["String"];
}

export interface ForgotPasswordInput {
	email: Scalars["String"];
	tel: Scalars["String"];
}

export interface HallEntity {
	__typename?: "HallEntity";
	accountingSystemsFields?: Maybe<Scalars["JSONObject"]>;
	file?: Maybe<FileEntity>;
	id: Scalars["String"];
	isHide: Scalars["Boolean"];
	name: Scalars["String"];
	place: PlaceEntity;
	tables?: Maybe<TableEntity[]>;
}

export interface HallEntityInput {
	accountingSystemsFields?: InputMaybe<Scalars["JSONObject"]>;
	file?: InputMaybe<FileEntityInput>;
	isHide: Scalars["Boolean"];
	name: Scalars["String"];
	place: PlaceEntityInput;
	tables?: InputMaybe<TableEntityInput[]>;
}

export interface HistoryOrderEntity {
	__typename?: "HistoryOrderEntity";
	id: Scalars["String"];
	orderNumber: Scalars["Int"];
	place: PlaceEntity;
	productsToOrders: Scalars["JSONObject"][];
	status: OrderStatusEnum;
	table?: Maybe<Scalars["JSONObject"]>;
	totalPrice?: Maybe<Scalars["Int"]>;
	type: OrderTypeEnum;
	users: Scalars["JSONObject"][];
}

export interface IsTableAvailableInput {
	date: Scalars["DateTime"];
	tableId: Scalars["String"];
}

export interface LanguageEntity {
	__typename?: "LanguageEntity";
	file: FileEntity;
	id: Scalars["String"];
	name: Scalars["String"];
}

export interface Link {
	__typename?: "Link";
	link: Scalars["String"];
}

export interface Mutation {
	__typename?: "Mutation";
	addTableToOrder: ActiveOrderEntity;
	addUserToOrder: ActiveOrderEntity;
	addUserToPlace: UserToPlaceEntity;
	addWaiterToPlace: UserToPlaceEntity;
	approveProductsInOrder: ProductToOrderEntity[];
	approveTableInOrder: ActiveOrderEntity;
	cancelOrder: Scalars["String"];
	closeOrder: Scalars["String"];
	closeShift: Scalars["String"];
	confirmProductsToOrders: ActiveOrderEntity;
	connectAccountingSystemToPlace: PlaceToAccountingSystemEntity;
	connectPaymentSystemToPlace: PlaceToPaymentSystemEntity;
	createAccountingSystem: AccountingSystemEntity;
	createAttr: AttributesEntity;
	createAttrGroup: AttributesGroupEntity;
	createCategory: CategoryEntity;
	createCommand: CommandEntity;
	createCompany: CompanyEntity;
	createHall: HallEntity;
	createOrder: ActiveOrderEntity;
	createPaymentOrderLink: FondyLink;
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
	deleteMe: Scalars["String"];
	deleteOrder: Scalars["String"];
	deletePaymentSystem: Scalars["String"];
	deletePlace: Scalars["String"];
	deleteProduct: Scalars["String"];
	deleteShift: Scalars["String"];
	deleteTable: Scalars["String"];
	deleteUser: Scalars["String"];
	emitCommand: Scalars["String"];
	forgotPassword: Scalars["String"];
	getAccessToken: PlaceToAccountingSystemEntity;
	getMerchantLoginAndCodeLink: Link;
	getTableByCode: TableEntity;
	rejectProductsInOrder: ProductToOrderEntity[];
	rejectTableInOrder: ActiveOrderEntity;
	removeEmployeeFromPlace: PlaceEntity;
	removeTableFromOrder: ActiveOrderEntity;
	resetPassword: AccessToken;
	setManualPayForProductsInOrder: ProductToOrderEntity[];
	setPaidStatusForProductsInOrder: ProductToOrderEntity[];
	signIn: AccessToken;
	signUp: AccessToken;
	syncCategories: Scalars["String"];
	syncHalls: Scalars["String"];
	syncProducts: Scalars["String"];
	syncTables: Scalars["String"];
	telegram: AccessToken;
	updateAccountingSystem: AccountingSystemEntity;
	updateAttr: AttributesEntity;
	updateAttrGroup: AttributesGroupEntity;
	updateCategory: CategoryEntity;
	updateCommand: CommandEntity;
	updateCompany: CompanyEntity;
	updateHall: HallEntity;
	updateMe: UserEntity;
	updateOrder: ActiveOrderEntity;
	updatePaymentSystem: PaymentSystemEntity;
	updatePlace: PlaceEntity;
	updatePlaceVerification: PlaceEntity;
	updateProduct: ProductEntity;
	updateShift: ActiveShiftEntity;
	updateTable: TableEntity;
	updateUser: UserEntity;
	verifyCode: AccessToken;
}

export interface MutationAddTableToOrderArgs {
	orderId: Scalars["String"];
	tableId: Scalars["String"];
}

export interface MutationAddUserToOrderArgs {
	code: Scalars["Int"];
}

export interface MutationAddUserToPlaceArgs {
	data: UserToPlaceInput;
}

export interface MutationAddWaiterToPlaceArgs {
	waiterCode: Scalars["Float"];
}

export interface MutationApproveProductsInOrderArgs {
	productToOrderIds: Scalars["String"][];
}

export interface MutationApproveTableInOrderArgs {
	orderId: Scalars["String"];
}

export interface MutationCancelOrderArgs {
	orderId: Scalars["String"];
}

export interface MutationCloseOrderArgs {
	orderId: Scalars["String"];
}

export interface MutationCloseShiftArgs {
	shiftId: Scalars["String"];
}

export interface MutationConfirmProductsToOrdersArgs {
	productsToOrders: ConfirmProductToOrderInput[];
}

export interface MutationConnectAccountingSystemToPlaceArgs {
	body: ConnectAccountingSystemToPlaceInput;
}

export interface MutationConnectPaymentSystemToPlaceArgs {
	body: ConnectPaymentSystemToPlaceInput;
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

export interface MutationCreatePaymentOrderLinkArgs {
	productsToOrders: Scalars["String"][];
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
	shift: CreateShiftInput;
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

export interface MutationEmitCommandArgs {
	commandId: Scalars["String"];
	tableId: Scalars["String"];
}

export interface MutationForgotPasswordArgs {
	body: ForgotPasswordInput;
}

export interface MutationGetAccessTokenArgs {
	body: PosterAccessCodeInput;
}

export interface MutationGetMerchantLoginAndCodeLinkArgs {
	placeId: Scalars["String"];
}

export interface MutationGetTableByCodeArgs {
	code: Scalars["String"];
	placeId: Scalars["String"];
}

export interface MutationRejectProductsInOrderArgs {
	productToOrderIds: Scalars["String"][];
}

export interface MutationRejectTableInOrderArgs {
	orderId: Scalars["String"];
}

export interface MutationRemoveEmployeeFromPlaceArgs {
	employeeData: AddEmployeeInput;
}

export interface MutationRemoveTableFromOrderArgs {
	orderId: Scalars["String"];
}

export interface MutationResetPasswordArgs {
	body: ResetPasswordInput;
}

export interface MutationSetManualPayForProductsInOrderArgs {
	productToOrderIds: Scalars["String"][];
}

export interface MutationSetPaidStatusForProductsInOrderArgs {
	productToOrderIds: Scalars["String"][];
}

export interface MutationSignInArgs {
	body: SignInInput;
}

export interface MutationSignUpArgs {
	body: SignUpInput;
}

export interface MutationSyncCategoriesArgs {
	placeId: Scalars["String"];
}

export interface MutationSyncHallsArgs {
	placeId: Scalars["String"];
}

export interface MutationSyncProductsArgs {
	placeId: Scalars["String"];
}

export interface MutationSyncTablesArgs {
	placeId: Scalars["String"];
}

export interface MutationTelegramArgs {
	telegramUser: TelegramUserInput;
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

export interface MutationUpdateMeArgs {
	user: UpdateMeInput;
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

export interface MutationUpdatePlaceVerificationArgs {
	placeId: Scalars["String"];
	status: PlaceVerificationStatusEnum;
}

export interface MutationUpdateProductArgs {
	product: UpdateProductInput;
}

export interface MutationUpdateShiftArgs {
	shift: UpdateShiftInput;
}

export interface MutationUpdateTableArgs {
	table: UpdateTableInput;
}

export interface MutationUpdateUserArgs {
	user: UpdateUserInput;
}

export interface MutationVerifyCodeArgs {
	code: Scalars["Int"];
}

export enum OrderStatusEnum {
	Approved = "APPROVED",
	Cancel = "CANCEL",
	Closed = "CLOSED",
	Created = "CREATED",
	Rejected = "REJECTED"
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

export interface PaginatedHistoryOrder {
	__typename?: "PaginatedHistoryOrder";
	data?: Maybe<HistoryOrderEntity[]>;
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

export interface PaginatedUserToPlace {
	__typename?: "PaginatedUserToPlace";
	data?: Maybe<UserToPlaceEntity[]>;
	page: Scalars["Int"];
	totalCount: Scalars["Int"];
}

export interface PaymentSystemEntity {
	__typename?: "PaymentSystemEntity";
	configFields?: Maybe<Scalars["JSONObject"]>;
	id: Scalars["String"];
	name: Scalars["String"];
}

export interface PaymentSystemEntityInput {
	configFields?: InputMaybe<Scalars["JSONObject"]>;
	name: Scalars["String"];
}

export interface PlaceAccountingSystemEntityInput {
	accountingSystem: AccountingSystemEntityInput;
	place: PlaceEntityInput;
	placeConfigFields?: InputMaybe<Scalars["JSONObject"]>;
}

export interface PlaceEntity {
	__typename?: "PlaceEntity";
	a11y: Scalars["String"];
	accountingSystems?: Maybe<PlaceToAccountingSystemEntity[]>;
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
	paymentSystems?: Maybe<PlaceToPaymentSystemEntity[]>;
	status: PlaceStatusEnum;
	usersToPlaces?: Maybe<UserToPlaceEntity[]>;
	verificationStatus: PlaceVerificationStatusEnum;
	waiterCode?: Maybe<Scalars["Int"]>;
	weekDays: Scalars["String"];
	weekendDays: Scalars["String"];
}

export interface PlaceEntityInput {
	a11y: Scalars["String"];
	accountingSystems?: InputMaybe<PlaceAccountingSystemEntityInput[]>;
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
	paymentSystems?: InputMaybe<PlaceToPaymentSystemEntityInput[]>;
	status: PlaceStatusEnum;
	usersToPlaces?: InputMaybe<UserToPlaceEntityInput[]>;
	verificationStatus: PlaceVerificationStatusEnum;
	waiterCode?: InputMaybe<Scalars["Int"]>;
	weekDays: Scalars["String"];
	weekendDays: Scalars["String"];
}

export enum PlaceStatusEnum {
	Closed = "CLOSED",
	Opened = "OPENED"
}

export interface PlaceToAccountingSystemEntity {
	__typename?: "PlaceToAccountingSystemEntity";
	accountingSystem: AccountingSystemEntity;
	id: Scalars["String"];
	place: PlaceEntity;
	placeConfigFields?: Maybe<Scalars["JSONObject"]>;
}

export interface PlaceToPaymentSystemEntity {
	__typename?: "PlaceToPaymentSystemEntity";
	id: Scalars["String"];
	paymentSystem: PaymentSystemEntity;
	place: PlaceEntity;
	placeConfigFields?: Maybe<Scalars["JSONObject"]>;
}

export interface PlaceToPaymentSystemEntityInput {
	paymentSystem: PaymentSystemEntityInput;
	place: PlaceEntityInput;
	placeConfigFields?: InputMaybe<Scalars["JSONObject"]>;
}

export enum PlaceVerificationStatusEnum {
	NotVerified = "NOT_VERIFIED",
	Verified = "VERIFIED"
}

export interface PosterAccessCodeInput {
	code: Scalars["String"];
	login: Scalars["String"];
	placeId: Scalars["String"];
}

export interface ProductEntity {
	__typename?: "ProductEntity";
	accountingSystemsFields?: Maybe<Scalars["JSONObject"]>;
	attrsGroups?: Maybe<AttributesGroupEntity[]>;
	category: CategoryEntity;
	description?: Maybe<Scalars["String"]>;
	file?: Maybe<FileEntity>;
	id: Scalars["String"];
	isHide: Scalars["Boolean"];
	name: Scalars["String"];
	price: Scalars["Int"];
}

export interface ProductEntityInput {
	accountingSystemsFields?: InputMaybe<Scalars["JSONObject"]>;
	attrsGroups?: InputMaybe<AttributesGroupEntityInput[]>;
	category: CategoryEntityInput;
	description?: InputMaybe<Scalars["String"]>;
	file?: InputMaybe<FileEntityInput>;
	isHide: Scalars["Boolean"];
	name: Scalars["String"];
	price: Scalars["Int"];
}

export interface ProductToOrderEntity {
	__typename?: "ProductToOrderEntity";
	attributes?: Maybe<AttributesEntity[]>;
	count: Scalars["Int"];
	id: Scalars["String"];
	order: ActiveOrderEntity;
	paidStatus: ProductToOrderPaidStatusEnum;
	product: ProductEntity;
	status: ProductToOrderStatusEnum;
	user: UserEntity;
}

export interface ProductToOrderEntityInput {
	attributes?: InputMaybe<AttributesEntityInput[]>;
	count: Scalars["Int"];
	order: ActiveOrderEntityInput;
	paidStatus: ProductToOrderPaidStatusEnum;
	product: ProductEntityInput;
	status: ProductToOrderStatusEnum;
	user: UserEntityInput;
}

export enum ProductToOrderPaidStatusEnum {
	NotPaid = "NOT_PAID",
	Paid = "PAID",
	Waiting = "WAITING"
}

export enum ProductToOrderStatusEnum {
	Approved = "APPROVED",
	Rejected = "REJECTED",
	WaitingForApprove = "WAITING_FOR_APPROVE"
}

export interface Query {
	__typename?: "Query";
	accountingSystem: AccountingSystemEntity;
	accountingSystems: PaginatedAccountingSystem;
	activeShift?: Maybe<ActiveShiftEntity>;
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
	getPlaceStatistic: StatisticType;
	hall: HallEntity;
	halls: PaginatedHall;
	historyOrders: PaginatedHistoryOrder;
	isTableAvailableForReserve: TableEntity;
	language: LanguageEntity;
	languages: LanguageEntity;
	order?: Maybe<ActiveOrderEntity>;
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
	usersToPlaces: PaginatedUserToPlace;
}

export interface QueryAccountingSystemArgs {
	id: Scalars["String"];
}

export interface QueryAccountingSystemsArgs {
	filtersArgs?: InputMaybe<FiltersArgsDto[]>;
	skip?: InputMaybe<Scalars["Int"]>;
	take?: InputMaybe<Scalars["Int"]>;
}

export interface QueryAttributeArgs {
	id: Scalars["String"];
}

export interface QueryAttributeGroupArgs {
	id: Scalars["String"];
}

export interface QueryAttributeGroupsArgs {
	filtersArgs?: InputMaybe<FiltersArgsDto[]>;
	skip?: InputMaybe<Scalars["Int"]>;
	take?: InputMaybe<Scalars["Int"]>;
}

export interface QueryAttributesArgs {
	filtersArgs?: InputMaybe<FiltersArgsDto[]>;
	skip?: InputMaybe<Scalars["Int"]>;
	take?: InputMaybe<Scalars["Int"]>;
}

export interface QueryCategoriesArgs {
	filtersArgs?: InputMaybe<FiltersArgsDto[]>;
	skip?: InputMaybe<Scalars["Int"]>;
	take?: InputMaybe<Scalars["Int"]>;
}

export interface QueryCategoryArgs {
	id: Scalars["String"];
}

export interface QueryCommandArgs {
	id: Scalars["String"];
}

export interface QueryCommandsArgs {
	filtersArgs?: InputMaybe<FiltersArgsDto[]>;
	skip?: InputMaybe<Scalars["Int"]>;
	take?: InputMaybe<Scalars["Int"]>;
}

export interface QueryCompaniesArgs {
	filtersArgs?: InputMaybe<FiltersArgsDto[]>;
	skip?: InputMaybe<Scalars["Int"]>;
	take?: InputMaybe<Scalars["Int"]>;
}

export interface QueryCompanyArgs {
	id: Scalars["String"];
}

export interface QueryGetPlaceStatisticArgs {
	placeId: Scalars["String"];
}

export interface QueryHallArgs {
	id: Scalars["String"];
}

export interface QueryHallsArgs {
	filtersArgs?: InputMaybe<FiltersArgsDto[]>;
	skip?: InputMaybe<Scalars["Int"]>;
	take?: InputMaybe<Scalars["Int"]>;
}

export interface QueryHistoryOrdersArgs {
	filtersArgs?: InputMaybe<FiltersArgsDto[]>;
	placeId: Scalars["String"];
	skip?: InputMaybe<Scalars["Int"]>;
	take?: InputMaybe<Scalars["Int"]>;
}

export interface QueryIsTableAvailableForReserveArgs {
	body: IsTableAvailableInput;
}

export interface QueryLanguageArgs {
	id: Scalars["String"];
}

export interface QueryLanguagesArgs {
	filtersArgs?: InputMaybe<FiltersArgsDto[]>;
	skip?: InputMaybe<Scalars["Int"]>;
	take?: InputMaybe<Scalars["Int"]>;
}

export interface QueryOrderArgs {
	filtersArgs?: InputMaybe<FiltersArgsDto[]>;
	id?: InputMaybe<Scalars["String"]>;
}

export interface QueryOrdersArgs {
	filtersArgs?: InputMaybe<FiltersArgsDto[]>;
	skip?: InputMaybe<Scalars["Int"]>;
	take?: InputMaybe<Scalars["Int"]>;
}

export interface QueryPaymentSystemArgs {
	id: Scalars["String"];
}

export interface QueryPaymentSystemsArgs {
	filtersArgs?: InputMaybe<FiltersArgsDto[]>;
	skip?: InputMaybe<Scalars["Int"]>;
	take?: InputMaybe<Scalars["Int"]>;
}

export interface QueryPlaceArgs {
	filtersArgs?: InputMaybe<FiltersArgsDto[]>;
	id: Scalars["String"];
}

export interface QueryPlacesArgs {
	filtersArgs?: InputMaybe<FiltersArgsDto[]>;
	skip?: InputMaybe<Scalars["Int"]>;
	take?: InputMaybe<Scalars["Int"]>;
}

export interface QueryProductArgs {
	id: Scalars["String"];
}

export interface QueryProductsArgs {
	filtersArgs?: InputMaybe<FiltersArgsDto[]>;
	skip?: InputMaybe<Scalars["Int"]>;
	take?: InputMaybe<Scalars["Int"]>;
}

export interface QueryShiftArgs {
	filtersArgs: FiltersArgsDto[];
}

export interface QueryShiftsArgs {
	filtersArgs?: InputMaybe<FiltersArgsDto[]>;
	skip?: InputMaybe<Scalars["Int"]>;
	take?: InputMaybe<Scalars["Int"]>;
}

export interface QueryTableArgs {
	id: Scalars["String"];
}

export interface QueryTablesArgs {
	filtersArgs?: InputMaybe<FiltersArgsDto[]>;
	skip?: InputMaybe<Scalars["Int"]>;
	take?: InputMaybe<Scalars["Int"]>;
}

export interface QueryUserArgs {
	filtersArgs?: InputMaybe<FiltersArgsDto[]>;
	id?: InputMaybe<Scalars["String"]>;
}

export interface QueryUsersArgs {
	filtersArgs?: InputMaybe<FiltersArgsDto[]>;
	skip?: InputMaybe<Scalars["Int"]>;
	take?: InputMaybe<Scalars["Int"]>;
}

export interface QueryUsersToPlacesArgs {
	filtersArgs?: InputMaybe<FiltersArgsDto[]>;
	skip?: InputMaybe<Scalars["Int"]>;
	take?: InputMaybe<Scalars["Int"]>;
}

export interface ResetPasswordInput {
	password: Scalars["String"];
}

export interface SignInInput {
	email?: InputMaybe<Scalars["String"]>;
	password: Scalars["String"];
	tel?: InputMaybe<Scalars["String"]>;
}

export interface SignUpInput {
	email?: InputMaybe<Scalars["String"]>;
	password: Scalars["String"];
	role: UserRoleEnum;
	tel?: InputMaybe<Scalars["String"]>;
}

export interface StatisticType {
	__typename?: "StatisticType";
	employees: Scalars["Int"];
	guests: Scalars["Int"];
	halls: Scalars["Int"];
	tables: Scalars["Int"];
	tax: Scalars["Int"];
	totalAmount: Scalars["Int"];
}

export interface TableEntity {
	__typename?: "TableEntity";
	accountingSystemsFields?: Maybe<Scalars["JSONObject"]>;
	code: Scalars["Int"];
	file?: Maybe<FileEntity>;
	hall: HallEntity;
	id: Scalars["String"];
	isHide: Scalars["Boolean"];
	name: Scalars["String"];
	orders?: Maybe<ActiveOrderEntity[]>;
}

export interface TableEntityInput {
	accountingSystemsFields?: InputMaybe<Scalars["JSONObject"]>;
	code: Scalars["Int"];
	file?: InputMaybe<FileEntityInput>;
	hall: HallEntityInput;
	isHide: Scalars["Boolean"];
	name: Scalars["String"];
	orders?: InputMaybe<ActiveOrderEntityInput[]>;
}

export enum TableStatusEnum {
	Approved = "APPROVED",
	Empty = "EMPTY",
	Rejected = "REJECTED",
	WaitingForApprove = "WAITING_FOR_APPROVE"
}

export interface TelegramUserInput {
	added_to_attachment_menu?: InputMaybe<Scalars["Boolean"]>;
	first_name: Scalars["String"];
	id: Scalars["ID"];
	is_bot?: InputMaybe<Scalars["Boolean"]>;
	is_premium?: InputMaybe<Scalars["Boolean"]>;
	language_code?: InputMaybe<Scalars["String"]>;
	last_name?: InputMaybe<Scalars["String"]>;
	role: UserRoleEnum;
	username?: InputMaybe<Scalars["String"]>;
}

export enum ThemeEnum {
	Dark = "DARK",
	Light = "LIGHT"
}

export interface UpdateAccountingSystemInput {
	configFields?: InputMaybe<Scalars["JSONObject"]>;
	id: Scalars["String"];
	name?: InputMaybe<Scalars["String"]>;
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
	attributesGroup?: InputMaybe<Scalars["String"][]>;
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

export interface UpdateMeInput {
	email?: InputMaybe<Scalars["String"]>;
	name?: InputMaybe<Scalars["String"]>;
	tel?: InputMaybe<Scalars["String"]>;
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

export interface UpdateShiftInput {
	id: Scalars["String"];
	tables?: InputMaybe<Scalars["String"][]>;
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
	Manager = "MANAGER",
	Waiter = "WAITER"
}

export enum UserStatusEnum {
	NotVerified = "NOT_VERIFIED",
	Verified = "VERIFIED"
}

export interface UserToPlaceEntity {
	__typename?: "UserToPlaceEntity";
	id: Scalars["String"];
	place: PlaceEntity;
	role: UserRoleEnum;
	user: UserEntity;
	visits?: Maybe<Scalars["Int"]>;
}

export interface UserToPlaceEntityInput {
	place: PlaceEntityInput;
	role: UserRoleEnum;
	user: UserEntityInput;
	visits?: InputMaybe<Scalars["Int"]>;
}

export interface UserToPlaceInput {
	place: Scalars["String"];
	role: UserRoleEnum;
	user: Scalars["String"];
}

export interface WorkingHoursInput {
	end: Scalars["Int"];
	name: Scalars["String"];
	start: Scalars["Int"];
}
