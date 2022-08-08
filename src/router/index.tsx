import AuthLayout from "../layouts/auth/AuthLayout"
import ChatLayout from "../layouts/chat/ChatLayout"
import Profile from "../pages/calls/Calls"
import Chats from "../pages/chats/Chats"
import Contacts from "../pages/contacts/Contacts"
import Login from "../pages/login/Login"
import Register from "../pages/register/Register"
import Setting from "../pages/settings/Setting"

export const privateRouter = [
    {
        path: '/',
        component: Chats,
        layout: ChatLayout
    },
    {
        path: '/contacts',
        component: Contacts,
        layout: ChatLayout
    },
    {
        path: '/profile',
        component: Profile,
        layout: ChatLayout
    },
    {
        path: '/settings',
        component: Setting,
        layout: ChatLayout
    }
]

export const publicRouter = [
    {
        path: '/login',
        component: Login,
        layout: AuthLayout
    },
    {
        path: '/register',
        component: Register,
        layout: AuthLayout
    }
]
