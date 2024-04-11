import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { publicRoutes } from "./routes"
import { DefaultLayout } from "~/components/Layouts"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as data from "~/api/data"
import { useEffect } from "react"
import 'tippy.js/dist/tippy.css'

function App() {
    useEffect(() => {
        data.storeDataFromDb()
    }, [])
    return (
        <Router>
            <div className="App">
                <ToastContainer position="top-right" toastClassName="myCustomToast" />
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Layout = route.layout || DefaultLayout
                        const Page = route.component
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        )
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App
