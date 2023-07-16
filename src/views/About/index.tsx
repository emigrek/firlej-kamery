import { FC } from 'react';
import { PiGithubLogo, PiUser } from 'react-icons/pi';

const AboutView: FC = () => {
    return (
        <div className='h-[calc(100vh-theme(spacing.16))] mt-0 mb-16 md:mb-0 md:mt-16 text-white p-4 flex items-center justify-center gap-10 flex-col'>
            <div className='flex items-center gap-6'>
                <a href="https://emigrek.bieda.it/" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-3 p-4 font-semibold">
                    <PiUser className='w-24 h-24' />
                    Autor
                </a>
                <a href="https://github.com/emigrek/firlej-kamery" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-3 p-4 font-semibold">
                    <PiGithubLogo className='w-24 h-24' />
                    Github
                </a>
            </div>
            <span className='text-xs text-neutral-400'>Aplikacja nie należy do <a target="_blank" rel="noreferrer" href="https://www.firlej.pl/">Gminy Firlej</a>.</span>
        </div>
    )
}

export default AboutView