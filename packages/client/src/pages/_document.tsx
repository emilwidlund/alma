import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body className="bg-neutral-800 text-text-dark">
                <section className="min-h-screen">
                    <Main />
                    <NextScript />
                </section>
            </body>
        </Html>
    );
}
