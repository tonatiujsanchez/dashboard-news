import { ToastContainer } from 'react-toastify'

import { AuthProvider } from '../context/auth/AuthProvider'
import { DataProvider } from '../context/data/DataProvider'
import { UIProvider } from '../context/ui/UIProvider'

import 'boxicons/css/boxicons.min.css'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <DataProvider>
                <UIProvider>
                    <ToastContainer />
                    <Component {...pageProps} />
                </UIProvider>
            </DataProvider>
        </AuthProvider>
    )
}

export default MyApp
