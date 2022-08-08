import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { io } from 'socket.io-client'
import SocketProvider from './contexts/SocketProvider'
import { privateRouter, publicRouter } from './router'
import { RequireAuth } from './router/PrivateRouter'
import { Public } from './router/PublicRouter'

function App() {

  return (
    <Router>
      <Routes>
        {
          privateRouter.map((router, key) => {
            const Page = router.component
            const Layout = router.layout
            return (
              <Route
                key={key}
                path={router.path}
                element={
                  <SocketProvider>
                    <RequireAuth>
                      <Layout>
                        <Page />
                      </Layout>
                    </RequireAuth>
                  </SocketProvider>
                }
              />
            )
          })
        }
        {
          publicRouter.map((router, key) => {
            const Page = router.component
            const Layout = router.layout
            return (
              <Route
                key={key}
                path={router.path}
                element={
                  <Public>
                    <Layout>
                      <Page />
                    </Layout>
                  </Public>
                }
              />
            )
          })
        }
      </Routes>
    </Router>
  );
}

export default App;
