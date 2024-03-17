import { NextResponse } from 'next/server'
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";


export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        const token = request.nextauth.token;
    
        const pathname = request.nextUrl.pathname;
        const searchParams = request.nextUrl.searchParams;

        if (!!token && token.user.userType === "business" && (pathname === '/sign-in' || pathname === '/business/sign-up')) {
            return NextResponse.redirect(new URL('/business/post-job', request.url))

        }
        if (!!token && token.user.userType === "worker" && (pathname === '/sign-in' || pathname === '/worker/sign-up')) {
            return NextResponse.redirect(new URL('/worker/dashboard', request.url))
        }
        if ((!token || token.user.userType === "worker") && pathname.startsWith('/business')) {
            return NextResponse.rewrite(new URL('/access-denied', request.url))
        }
        if ((!token || token.user.userType === "business") && pathname.startsWith('/worker')) {
            return NextResponse.rewrite(new URL('/access-denied', request.url))
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
        pages: {
            signIn: '/sign-in',
        },

    }
)

export const config = {
    matcher: ["/((?!api|sign-in|forgot-password|reset-password|find-jobs|find-workers|worker/sign-up|business/sign-up|__next/static|_next/image|favicon.ico|$).*)"],
}


