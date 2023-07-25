import * as ReactDOMServer from 'react-dom/server';

const jsxToString = (icon: JSX.Element) => {
    return `data:image/svg+xml;base64,${btoa(ReactDOMServer.renderToString(icon))}`
};

export default jsxToString;