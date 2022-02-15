export interface User {
    email: string
    _id: string
    name: string
    role: number
}

export interface Jwt {
    token: string
    user: User
}