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
            <div className='flex flex-col max-w-md gap-2 text-sm text-center text-neutral-600'>
                <p>
                    Aplikacja nie należy do <a className='underline' target="_blank" rel="noreferrer" href="https://www.firlej.pl/">Gminy Firlej</a>.
                </p>
                <p>
                    Aplikacja wykorzystuje kamery ze <a className='underline' target="_blank" rel="noreferrer" href="https://jezioro.firlej.pl/">strony internetowej Gminy Firlej</a>.
                </p>
                <p>
                    Prosimy pamiętać, że wszelkie informacje i obrazy dostarczane przez aplikację są oparte na publicznie dostępnych źródłach. Nie ponosimy odpowiedzialności za ich dokładność i aktualność.
                </p>
            </div>
        </div>
    )
}

export default AboutView