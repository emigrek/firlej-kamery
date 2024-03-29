import Anchor from '@client/components/ui/Anchor';
import View from '@client/components/ui/View';
import { FC } from 'react';
import { PiGithubLogo } from 'react-icons/pi';

const AboutView: FC = () => {
    return (
        <View className='flex flex-col items-center justify-center gap-10 p-4 text-neutral-100'>
            <div className='flex items-center gap-6'>
                <Anchor href="https://github.com/emigrek/firlej-kamery" target="_blank" className="flex flex-col items-center gap-3 p-4 font-semibold no-underline text-inherit">
                    <PiGithubLogo className='w-24 h-24' />
                    Github
                </Anchor>
            </div>
            <div className='flex flex-col max-w-sm gap-2 text-sm text-center text-neutral-500'>
                <p>
                    Aplikacja nie jest powiązana z <Anchor target="_blank" href="https://www.firlej.pl/">Gminą Firlej</Anchor>, niekomercyjnie wykorzystuje <Anchor target="_blank" href="https://jezioro.firlej.pl/">publicznie dostępny</Anchor> obraz z kamer zainstalowanych na terenie gminy.
                </p>
                <p>
                    Prosimy pamiętać, że obrazy dostarczane przez aplikację są oparte na publicznie dostępnych źródłach. Nie ponosimy odpowiedzialności za ich dokładność i aktualność.
                </p>
            </div>
        </View>
    );
}

export default AboutView