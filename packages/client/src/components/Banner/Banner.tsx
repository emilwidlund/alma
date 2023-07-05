import { BannerProps } from './Banner.types';

export const Banner = ({ text }: BannerProps) => {
    return (
        <div className="flex flex-row py-3 px-5 bg-neutral-100 text-text-dark rounded-xl text-sm shadow-md max-w-lg max-h-16 overflow-y-auto">
            <span>{text}</span>
        </div>
    );
};
