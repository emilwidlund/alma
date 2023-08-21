import { StreamOutlined } from '@mui/icons-material';

import Header from '~/components/Header/Header';
import { circular } from '~/styles/fonts';

export default function Index() {
    return (
        <main className={`flex flex-col items-center h-screen bg-neutral-100 text-text-subtle overflow-y-auto ${circular.className}`}>
            <div className="absolute flex flex-col items-center h-full min-w-md max-w-7xl mx-auto w-full px-12">
                <Header />
            </div>
            <section className='flex flex-col items-center text-center w-full bg-playground bg-cover bg-right py-52 px-12'>
                <div className='flex flex-row max-w-7xl w-full'>
                    <div className='flex flex-col w-1/2 text-left'>
                        <h2 className='text-7xl text-white font-bold leading-tight'>A playground for your creative code</h2>
                        <p className='text-xl text-slate-100 mt-12 leading-relaxed'>Join the community of coders, artists & visionaries who have embraced Alma as their creative environment</p>
                    </div>
                </div>
            </section>
            <section className="flex flex-col items-center text-center pt-16 pb-32 max-w-5xl w-full px-12">
                <span className="flex flex-row items-center px-6 py-4 rounded-full bg-complimentary text-accent">
                    <StreamOutlined />
                    <span className="ml-4 text-lg">A new kind of environment for creative coding</span>
                </span>
                <h1
                    className="text-8xl font-black leading-snug mt-16"
                    style={{
                        background: 'linear-gradient(90deg, #88ffd6 0%, #8877ff 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                >
                    Your playgound for creative graphics
                </h1>
                <p className="mt-16 text-2xl leading-loose max-w-xl w-full">
                    Unleash new dimensions of creative coding with our unique graphics environment
                </p>
                <div className='flex flex-row flex-nowrap items-center gap-x-4 mt-20'>
                    <button
                        className="px-8 py-3 bg-white rounded-full text-text-dark font-medium"
                        style={{
                            boxShadow:
                                '0px 0px 0px 0px rgba(55, 72, 83, 0.10), 0px 4px 8px 0px rgba(55, 72, 83, 0.10), 0px 15px 15px 0px rgba(55, 72, 83, 0.09), 0px 34px 21px 0px rgba(55, 72, 83, 0.05), 0px 61px 24px 0px rgba(55, 72, 83, 0.01), 0px 95px 27px 0px rgba(55, 72, 83, 0.00)'
                        }}
                    >
                        Join the Beta
                    </button>
                    <a href="https://github.com/newfrgmnt/alma" target="_blank" className='px-8 py-3 text-text-dark'>View on Github</a>
                </div>
            </section>
        </main>
    );
}
