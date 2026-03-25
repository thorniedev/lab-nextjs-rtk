import { NavbarType } from "../../types/navType";

export const navLink: NavbarType[] = [
    {
        path:'/',
        name: 'Home',
        active: true,
    },
    {
        path: '/about',
        name: 'about',
        active: false,
    },
    {
        path: '/products',
        name: 'product',
        active: false,
    },
    {
        path: '/users',
        name: 'users',
        active: true,
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        active: true
    }
]
