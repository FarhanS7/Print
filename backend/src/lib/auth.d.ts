export declare const auth: import("better-auth").Auth<{
    database: any;
    emailAndPassword: {
        enabled: true;
    };
    socialProviders: {
        google: {
            clientId: string;
            clientSecret: string;
        };
    };
    modelMapping: {
        user: string;
        session: string;
        account: string;
        verification: string;
    };
}>;
//# sourceMappingURL=auth.d.ts.map