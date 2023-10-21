export interface User {
	firstName: string;
	lastName: string;
	id?: number;
	admin?: boolean;
	email: string;
	phoneNumber: string;
	password: string;
	confirmPassword: string;
}
