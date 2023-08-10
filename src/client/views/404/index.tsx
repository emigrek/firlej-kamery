import { Button } from '@client/components/ui/Button';
import View from '@client/components/ui/View';
import { FC } from 'react';
import { IoHome } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const NotFoundView: FC = () => {
    return (
        <View className='flex flex-col items-center justify-center gap-10 p-4 text-neutral-100'>
            <div className='flex flex-col items-center gap-2'>
                <h1 className='font-bold text-9xl text-primary-400'>404</h1>
                <h2 className='text-lg text-neutral-300'>
                    Nie znaleziono strony
                </h2>
            </div>
            <Link to="/">
                <Button size={'large'} iconRight={IoHome}>
                    Powrót
                </Button>
            </Link>
        </View>
    );
}

export default NotFoundView;