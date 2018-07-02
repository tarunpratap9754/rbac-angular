import { Role } from './role';

export class User{
    _id?: string;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
    role: Role;
    country: string;
    state: string;
    city: string
}