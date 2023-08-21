import { Inter, Space_Mono } from 'next/font/google';
import localFont from 'next/font/local'

export const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
export const spaceMono = Space_Mono({ weight: '400', subsets: ['latin'], variable: '--font-space-mono' });
export const circular = localFont({ src: [{ path: './fonts/circular-book.otf', weight: '400', style: 'normal' }, { path: './fonts/circular-medium.otf', weight: '500', style: 'medium' }, { path: './fonts/circular-bold.otf', weight: '600', style: 'bold' }, { path: './fonts/circular-black.otf', weight: '700', style: 'black' }] })
 