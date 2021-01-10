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

/**
 * - Username (same as email)
 * - Code
 */
export interface ConfirmSignUpRequest{
    username:string;
    code: string;
}

// - 'username': username
// - 'email' : email
// - 'role?': Position of the user on the company
// - 'company?': Company of the user
// - 'phone?': Mobile number of the user
export interface UpdateUserRequest{
    username: string,
    email: string,
    role?: string,
    company?: string,
    phone?: string,
}

export interface GetUserResponse{
    objectId: string,
    type: string,
    username: string,
    email: string,
    role?: string,
    company?: string,
    phone?: string,
}
