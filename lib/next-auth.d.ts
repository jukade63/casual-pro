import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            id: number;
            username: string;
            email: string;
            userType: string;
            phoneNumber: string;
            imgUrl: string;
        };
        accessToken: string;
    }
}
declare module "next-auth/jwt" {
    interface JWT {
        user: {
            id: number;
            username: string;
            email: string;
            userType: string;
            phoneNumber: string;
            imgUrl: string;
        };
        accessToken: string;
    }
}