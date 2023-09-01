import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="preconnect" href="https://rsms.me/" />
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
            </Head>
            <body className="bg-neutral-900 text-slate-500">
                <section className="min-h-screen">
                    <Main />
                    <NextScript />
                </section>
            </body>
        </Html>
    );
}
