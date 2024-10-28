import NextAuth from "next-auth";
import authConfig from "./next-auth.config";

const { auth: middleware } = NextAuth(authConfig);
const aurhPaths = [
    "/auth/sign-in",
]

export default middleware((req) => {
    if (aurhPaths.includes(req.nextUrl.pathname)) {
        if (req.auth) {
            const redirectUrl = new URL("/", req.url);
            return Response.redirect(redirectUrl);
        }
        return
    }
    if (!req.auth) {
        const redirectUrl = new URL("/auth/sign-in", req.url);
        return Response.redirect(redirectUrl);
    }
    return
})



export const config = {
    matcher: ["/auth/:path*"],
}
