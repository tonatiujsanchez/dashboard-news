import 'boxicons/css/boxicons.min.css'
import { UIProvider } from '../context/ui/UIProvider'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    return (
        <UIProvider>
            <Component {...pageProps} />
        </UIProvider>
    )
}

export default MyApp
