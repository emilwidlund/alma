import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body className={`bg-neutral-200 text-text-dark`}>
                <section className="min-h-screen">
                    <Main />
                    <NextScript />
                </section>
            </body>
        </Html>
    );
}
