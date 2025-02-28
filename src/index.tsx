import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
// import { neynar } from 'frog/hubs'

export const app = new Frog({
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
  title: 'Scribble Frame',
})

 
app.composerAction(
  '/',
  (c) => {
    return c.res({
      title: 'Scribble',
      url: 'https://scribbleonchain.com' 
    })
  },
  {
    /* Name of the action – 14 characters max. */
    name: 'scribbleframe',
    /* Description of the action – 20 characters max. */
    description: 'sketch and send',
    icon: 'pencil',
    imageUrl: 'https://scribbleonchain.com/icon.png',
  }
)

const isCloudflareWorker = typeof caches !== 'undefined'
if (isCloudflareWorker) {
  const manifest = await import('__STATIC_CONTENT_MANIFEST')
  const serveStaticOptions = { manifest, root: './' }
  app.use('/*', serveStatic(serveStaticOptions))
  devtools(app, { assetsPath: '/frog', serveStatic, serveStaticOptions })
} else {
  devtools(app, { serveStatic })
}

export default app
