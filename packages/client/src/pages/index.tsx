import Link from 'next/link';

import { Button } from '~/components/Button/Button';
import Header from '~/components/Header/Header';
import { circular } from '~/styles/fonts';

export default function Index() {
    return (
        <main className={`flex flex-col items-center h-screen text-text-subtle ${circular.className}`}>
            <div className="flex flex-col items-center h-full min-w-md max-w-7xl mx-auto w-full px-12 text-slate-50">
                <Header />
            </div>
            <section className="flex flex-col items-center text-center pt-16 pb-32 w-full px-12 bg-neutral-900">
                <div className="flex flex-col items-center max-w-5xl w-full">
                    <h1
                        className="text-8xl font-black leading-snug mt-12"
                        style={{
                            background: 'linear-gradient(90deg, #88ffd6 0%, #8877ff 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        A playgound for your creative code
                    </h1>
                    <p className="mt-16 text-2xl leading-loose max-w-2xl w-full">
                        Join the community of coders, artists & visionaries who have embraced Alma as their creative
                        environment
                    </p>
                    <div className="flex flex-row flex-nowrap items-center gap-x-4 mt-20">
                        <Button>Join the Beta</Button>
                        <a
                            href="https://github.com/newfrgmnt/alma"
                            target="_blank"
                            className="px-8 py-3 text-slate-600"
                        >
                            View on Github
                        </a>
                    </div>
                </div>
            </section>
            <section className="flex flex-col items-center text-center w-full bg-playground bg-cover bg-bottom py-52 px-12">
                <div className="flex flex-row max-w-7xl w-full">
                    <div className="flex flex-col w-1/2 text-left">
                        <h2 className="text-7xl text-white font-semibold leading-tight">
                            A playground for your creative code
                        </h2>
                        <p className="text-xl text-slate-100 mt-12 leading-relaxed w-3/4">
                            Unleash new dimensions of creative coding with our unique graphics environment
                        </p>
                        <div className="flex flex-row flex-nowrap items-center gap-x-4 mt-20">
                            <button
                                className="px-8 py-3 bg-white rounded-full text-text-dark font-medium self-start"
                                style={{
                                    boxShadow:
                                        '0px 0px 0px 0px rgba(55, 72, 83, 0.10), 0px 4px 8px 0px rgba(55, 72, 83, 0.10), 0px 15px 15px 0px rgba(55, 72, 83, 0.09), 0px 34px 21px 0px rgba(55, 72, 83, 0.05), 0px 61px 24px 0px rgba(55, 72, 83, 0.01), 0px 95px 27px 0px rgba(55, 72, 83, 0.00)'
                                }}
                            >
                                Join the Beta
                            </button>
                            <div className="px-8 py-3">
                                <Link className="text-white" href="/learn">
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
