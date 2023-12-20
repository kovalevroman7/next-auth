import NextAuth, {AuthOptions} from "next-auth"

const CLIENT_ID = "5657de0281647803a830";
const CLIENT_SECRET = "dac3ea3422ad0811df53ceedfa5e7b3105f37cbd";


export const authOptions: AuthOptions = {
    secret: process.env.AUTH_SECRET,
    providers: [
        {
            id: "customCasdoorProvider",
            name: "CustomCasdoorProvider",
            type: "oauth",
            // wellKnown: "https://sso.stage.sodrujestvo.org/.well-known/openid-configuration",
            issuer: "https://sso.stage.sodrujestvo.org",
            jwks_endpoint: "https://sso.stage.sodrujestvo.org/.well-known/jwks",
            authorization: {
                url: "https://sso.stage.sodrujestvo.org/signin",
                params: { scope: "openid profile email" }
            }, // https://sso.stage.sodrujestvo.org/api/login //login/oauth/authorize
            token: "https://sso.stage.sodrujestvo.org/api/login/oauth/access_token",
            userinfo: "https://sso.stage.sodrujestvo.org/api/userinfo",
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            profile: (profile, tokens) => ({
                id: profile.sub,
                name: profile.name,
                avatar: profile.avatar,
                email: profile.email,
            }),
        }
    ],
    callbacks: {
        // Здесь можно прокинуть значения, которые вернет getServerSession в серверном компоненте
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    test: "test",
                },
            }
        },
        // async signIn(params) {
        //     console.log('params',params);
        //     return true;
        // },
    },
    pages: {
        signIn: "",
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }