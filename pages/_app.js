import 'boxicons/css/boxicons.min.css'
import { DataProvider } from '../context/data/DataProvider'
import { UIProvider } from '../context/ui/UIProvider'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    return (
        <DataProvider>
            <UIProvider>
                <Component {...pageProps} />
            </UIProvider>
        </DataProvider>
    )
}

export default MyApp
