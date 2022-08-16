import { useEffect, useState } from "react";


const imageMimeType = /image\/(png|jpg|jpeg)/i;

export const AuthorImages = ({ hiddenImagesModal, setImagePreview }) => {

    const [file, setFile] = useState(null);

    const handlePicture = () => {
        document.querySelector('#filePicture').click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]

        if (!file.type.match(imageMimeType)) {
            alert("Image mime type is not valid");
            return;
        }
        setFile(file)
    }

    useEffect(() => {
        let fileReader, isCancel = false;

        if (file) {
            fileReader = new FileReader()
            fileReader.onload = (e) => {
                const { result } = e.target
                if (result && !isCancel) {
                    setImagePreview(file, result)
                }
            }
            fileReader.readAsDataURL(file)
        }

        return () => {
            isCancel = true
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort()
            }
        }
    }, [file])


    return (
        <div>
            <header className="flex justify-between items-center min-w-[300px] sm:w-[600px] mb-5 pb-5 border-b">
                <div></div>
                <p className="text-3xl font-bold py-3 flex-1 text-center">Actualizar foto</p>
                <button
                    onClick={hiddenImagesModal}
                    className="bg-slate-200 rounded-full w-14 h-14 text-gray-500 flex items-center justify-center hover:text-gray-700 hover:bg-slate-300 transition-all">
                    <i className='bx bx-x text-5xl'></i>
                </button>
            </header>
            {/* <div>
                <p className="font-semibold text-2xl mb-3">Subir foto</p> 
                <div className="border-dotted border-2 text-center py-10">
                    <i className='bx bx-cloud-upload text-8xl text-gray-300'></i>
                </div>
            </div> */}
            <input
                type="file"
                style={{ display: 'none' }}
                id="filePicture"
                onChange={handleFileChange} />
            <button
                onClick={handlePicture}
                className="w-full py-4 rounded-lg flex justify-center items-end gap-2 text-sky-600 hover:text-sky-700 bg-sky-100 hover:bg-sky-200">
                <i className='bx bx-plus text-3xl'></i>
                <span className="font-semibold">Subir imagen</span>
            </button>
            <div className="mt-6">
                <p className="font-semibold text-2xl mb-3">Fotos subidas</p>
                <div className="py-10">

                </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-5">
                <button
                    onClick={hiddenImagesModal}
                    className="py-3 px-5 uppercase w-full sm:w-auto rounded-md cursor-pointer transition-colors">
                    Cancelar
                </button>
                <button
                    // onClick={onSave}
                    className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-8 uppercase w-full sm:w-auto rounded-md cursor-pointer transition-colors">
                    Aceptar
                </button>
            </div>
        </div>
    )
}
