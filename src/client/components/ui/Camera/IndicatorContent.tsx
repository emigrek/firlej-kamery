const IndicatorContent = (index: number, sourceSet: string[]) => {
    return (
        <span className='text-xs text-neutral-300'>
            {index + 1} / {sourceSet.length}
        </span>
    )
}

export default IndicatorContent;