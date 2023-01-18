import ReactDOMServer from 'react-dom/server'
import {StaticRouter} from 'react-router-dom/server'
import App from './App'

export function render(url: string, context: any) {
    return ReactDOMServer.renderToString(
        // @ts-ignore | weird bug, context is failing to be recognized
        <StaticRouter location={url} context={context}>
            <App/>
        </StaticRouter>
    )
}