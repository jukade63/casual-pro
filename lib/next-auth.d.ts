import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            id: number;
            username: string;
            email: string;
            user_type: string;
            phone_number: string;
            img_url: string;
        };
        access_token: string;
    }
}
declare module "next-auth/jwt" {
    interface JWT {
        user: {
            id: number;
            username: string;
            email: string;
            user_type: string;
            phone_number: string;
            img_url: string;
        };
        access_token: string;
    }
}