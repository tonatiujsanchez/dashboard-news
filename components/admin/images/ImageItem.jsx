import Image from "next/image"
import { toast } from 'react-toastify'


export const ImageItem = ({ image }) => {
    
    const notifyCopy = (msg) => toast.dark(msg, {
        theme: "dark",
        hideProgressBar: true,
        autoClose: 300
    })


    const copyUrl = (urlImage) => {
        notifyCopy('Se copio URL de la image')
        navigator.clipboard.writeText(urlImage)
    }

    return (
        <div className="rounded-lg overflow-hidden border w-[48%] sm:w-[170px] relative">
            <Image
                priority="true"
                layout='responsive'
                width={100}
                height={70}
                objectFit="cover"
                src={image.url}
                alt={`Imagen ${image.name}`}
                title={`Imagen ${image.name}`}
            />
            <div className="pl-2 pt-2">
                <p className="font-bold text-xl mb-2">{ image.name }</p>
                <div className="flex justify-between">
                    <p className="text-lg text-slate-600">{image.format}</p>
                    <p className="text-lg text-slate-600">{image.size}</p>
                    <button
                        onClick={()=>copyUrl(image.url)} 
                        className="bg-slate-200 text-slate-800 px-4 py-2 rounded-tl-lg text-xl active:scale-95">
                        <i className='bx bx-clipboard'></i>
                    </button>
                </div>

            </div>
        </div>
    )
}
