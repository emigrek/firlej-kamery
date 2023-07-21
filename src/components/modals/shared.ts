import colors from "tailwindcss/colors";

export const customStyles = {
    overlay: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 19,
        backgroundColor: `${colors.neutral[950]}CC`,
        backdropFilter: "blur(4px)"
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        padding: 0,
        transform: 'translate(-50%, -50%)',
        backgroundColor: `rgba(0,0,0,0)`,
        border: 'none',
        borderRadius: '0.75rem'
    }
};
