export declare global {
    var handleSignInWithGoogle: ({ credential }: { credential: string }) => Promise<void>;

    interface Window {
        someProperty: SomeType;
    }
}
