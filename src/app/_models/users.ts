export class User {
    id!: string;
    title!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    address!: string;
    option!: string;
    date_of_birth!: Date;
    password!: string;
    isDeleting: boolean = false;
}