/**
 * - Email
 * - Password
 */
export interface SignInRequest{
    email:string;
    password: string;
}

/**
 * - Email
 * - Password
 * - Username (same as email)
 */
export interface SignUpRequest{
    email:string;
    password: string;
    username: string;
}