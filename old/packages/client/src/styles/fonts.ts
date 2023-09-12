import { Inter, Space_Mono } from 'next/font/google';
import localFont from 'next/font/local';

export const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
export const spaceMono = Space_Mono({ weight: '400', subsets: ['latin'], variable: '--font-space-mono' });
export const circular = localFont({
    src: [
        { path: './fonts/Circular-Book.woff2', weight: '400', style: 'normal' },
        { path: './fonts/Circular-Medium.woff2', weight: '500', style: 'medium' },
        { path: './fonts/Circular-Bold.woff2', weight: '600', style: 'bold' },
        { path: './fonts/Circular-Black.woff2', weight: '700', style: 'black' }
    ]
});
