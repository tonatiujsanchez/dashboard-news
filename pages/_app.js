import 'boxicons/css/boxicons.min.css'
import { AuthProvider } from '../context/auth/AuthProvider'
import { DataProvider } from '../context/data/DataProvider'
import { UIProvider } from '../context/ui/UIProvider'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <DataProvider>
                <UIProvider>
                    <Component {...pageProps} />
                </UIProvider>
            </DataProvider>
        </AuthProvider>
    )
}

export default MyApp
