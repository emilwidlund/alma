import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
    title: 'Alma',
    description: 'A new way to think about graphics'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.variable} font-sans bg-neutral-200 text-text-dark`}>
                <section className="min-h-screen">{children}</section>
            </body>
        </html>
    );
}
