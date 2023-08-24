import { FC, HTMLAttributes } from 'react'
import cn from '@client/utils/cn';
import Spinner from '@client/components/ui/Spinner';

interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  iconClassName?: string
}

const Loader: FC<LoaderProps> = ({ className, iconClassName, ...props }) => {
  return (
    <div className={cn("absolute inset-0 flex items-center justify-center bg-neutral-900 text-primary gap-3", className)} {...props}>
      <Spinner className={cn("w-6 h-6 md:w-9 md:h-9", iconClassName)} />
    </div>
  )
}

export default Loader