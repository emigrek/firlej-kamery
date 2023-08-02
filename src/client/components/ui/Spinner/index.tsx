import cn from '@client/utils/cn'
import { FC } from 'react'
import { VscLoading } from 'react-icons/vsc'

interface SpinnerProps {
  className?: string
}

const Spinner: FC<SpinnerProps> = ({ className }) => {
  return <VscLoading className={cn("animate-spin w-6 h-6 md:w-7 md:h-7", className)} />
}

export default Spinner;