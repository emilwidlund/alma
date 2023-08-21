import { RouteOutlined, StreamOutlined } from '@mui/icons-material';

import Header from '~/components/Header/Header';
import { circular } from '~/styles/fonts';

export default function Index() {
    return (
        <main className={`flex flex-col h-screen bg-neutral-100 text-text-subtle px-12 overflow-y-auto ${circular.className}`}>
            <div className="flex flex-col items-center h-full min-w-md max-w-7xl mx-auto w-full">
                <Header />
                <section className="flex flex-col items-center text-center mt-24 max-w-4xl w-full">
                    <span className="flex flex-row items-center px-5 py-3 bg-white rounded-full">
                        <StreamOutlined />
                        <span className="ml-2">A new kind of environment for creative coding</span>
                    </span>
                    <h1
                        className="text-8xl font-semibold leading-normal mt-12"
                        style={{
                            background: 'linear-gradient(90deg, #FD9DFF 0%, #f5e178 100%)',
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
                <section className='flex flex-col items-center text-center py-48'>
                    <span className='text-6xl'>
                        <RouteOutlined fontSize='inherit' />
                        <h2 className='mt-16 text-4xl'>Complicated logic in a simplified format</h2>
                    </span>
                </section>
            </div>
        </main>
    );
}
