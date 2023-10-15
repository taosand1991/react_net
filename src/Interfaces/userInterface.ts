export interface User {
	firstName: string;
	lastName: string;
	id?: number;
	admin?: boolean;
	email: string;
	password: string;
	confirmPassword: string;
}
