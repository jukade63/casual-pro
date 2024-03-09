import { Briefcase, FileStack, Crown, Rocket, MousePointerClick, UserRound, SendToBack, LayoutDashboard } from "lucide-react"

export const BACKEND_URL = 'http://localhost:3000'
export const navLinks = [
    {
        name: 'Find Jobs',
        route: '/find-jobs',
        icon: Briefcase
    },
    {
        name: 'Find Workers',
        route: '/find-workers',
        icon: SendToBack

    },
    {
        name: 'How it Works',
        route: '/find-workers#how-it-works',
        icon: Rocket
    }
]

export const workerLinks = [
    {
        href: "dashboard",
        text: "Dashboard",
        icon: LayoutDashboard,
    },
    { href: "profile", text: "Profile", icon: UserRound },
    {
        href: "work-history",
        text: "Work History",
        icon: FileStack,
    },
    { href: "favorites", text: "Favorites", icon: Crown },
    { href: "applied-jobs", text: "Applying", icon: MousePointerClick },
];
