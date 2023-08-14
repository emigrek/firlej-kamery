import { FC, HTMLAttributes, useState } from 'react'

interface HoverableProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children?: (isHovered: boolean, isTouch: boolean) => JSX.Element
}

const Hoverable: FC<HoverableProps> = ({ children, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsTouch(true)}
      onTouchEnd={() => setIsTouch(false)}
      {...props}
    >
      {children && children(isHovered, isTouch)}
    </div>
  )
}

export default Hoverable