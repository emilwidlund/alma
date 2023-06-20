import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
    title: 'Bitspace',
    description: 'Where creative technologists showcase their work'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.variable} font-sans`}>
                <section className="min-h-screen">{children}</section>
            </body>
        </html>
    );
}
