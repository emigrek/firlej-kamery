const IndicatorContent = (index: number, sourceSet: string[]) => {
    return (
        <span className='hidden text-xs text-neutral-300 md:block'>
            {index + 1} / {sourceSet.length}
        </span>
    )
}

export default IndicatorContent;