import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import { createServer as createViteServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServer() {
    const app = express()
    const isProd = process.env.NODE_ENV === 'production'

    const indexProd = isProd
    ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
    : fs.readFileSync(path.resolve(__dirname, 'index.html'),'utf-8')

    // Create Vite server in middleware mode and configure the app type as
    // 'custom', disabling Vite's own HTML serving logic so parent server
    // can take control
    const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'custom'
    })

    if (!isProd) {
        // use vite's connect instance as middleware
        // if you use your own express router (express.Router()), you should use router.use
        app.use(vite.middlewares)
    } else {
        app.use((await import('compression')).default())
        app.use((await import('serve-static')).default(resolve('dist/client'), {index: false}))
    }

//    app.use('*', async (req, res) => {
//        // serve index.html - we will tackle this next
//    })

    app.use('*', async (req, res, next) => {
        const url = req.originalUrl

        try {
            // 1. Read index.html
//            let template = fs.readFileSync(
//                    path.resolve(__dirname, 'index.html'),
//                    'utf-8',
//                    )

            let template = indexProd
            let rend
            if (!isProd) {
                // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
                //    also applies HTML transforms from Vite plugins, e.g. global preambles
                //    from @vitejs/plugin-react
                template = await vite.transformIndexHtml(url, template)

                // 3. Load the server entry. vite.ssrLoadModule automatically transforms
                //    your ESM source code to be usable in Node.js! There is no bundling
                //    required, and provides efficient invalidation similar to HMR.
                const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')
                rend = render
            } else {
                const { render } = await vite.ssrLoadModule('.dist/server/entry-server.tsx')
                rend = render
            }

            // 4. render the app HTML. This assumes entry-server.js's exported `render`
            //    function calls appropriate framework SSR APIs,
            //    e.g. ReactDOMServer.renderToString()
            const context = {}
            const appHtml = await rend(url, context)

            if (context.url) {
                // Somewhere a `<Redirect>` was rendered
                return res.redirect(301, context.url)
            }

            // 5. Inject the app-rendered HTML into the template., should find this inside the main index.html inside the #root div
            const html = template.replace(`<!--ssr-outlet-->`, appHtml)

            // 6. Send the rendered HTML back.
            res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        } catch (e) {
            // If an error is caught, let Vite fix the stack trace so it maps back to
            // your actual source code.
            vite.ssrFixStacktrace(e)
            next(e)
        }
    })

    app.listen(5173)
}

createServer()
