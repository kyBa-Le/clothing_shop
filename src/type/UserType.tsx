export type UserType = {
    id: number;
    username: string;
    password: string;
    role: 'admin' | 'customer';
    email: string;
    phone: string;
};