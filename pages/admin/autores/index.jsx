import Image from 'next/image'
import NextLink from 'next/link'

import { TitlePage } from "../../../components/admin"
import { AdminLayout } from "../../../components/layouts"

import { LinkSuccess } from "../../../components/ui"

const AutoresPage = () => {

    const refreshAuthors = () => {
        console.log('Refresh Authors');
    }

    return (
        <AdminLayout title="- Autores" >
            <div className="mb-5 flex gap-2 items-center py-3">
                <TitlePage title="Autores" />
                <button
                    className="text-3xl text-slate-600 hover:bg-slate-200 hover:text-slate-900 py-2 px-3 rounded-full active:scale-95"
                    onClick={() => refreshAuthors()}>
                    <i className='bx bx-revision'></i>
                </button>
            </div>
            <section>
                <div className="flex w-full mb-5">
                    <LinkSuccess link="/admin/autores/nuevo" text="Agregar nuevo autor" />
                </div>
                <div className="flex flex-wrap justify-center sm:justify-start gap-y-10 gap-5 sm:gap-10 bg-white px-5 py-10 sm:p-10 rounded-lg shadow-md">
                    <div className="w-[45%] sm:w-[180px]">
                        <NextLink href={`/admin/autores/name`} passHref>
                                <a className="block w-full relative h-[180px] rounded-lg overflow-hidden group">
                                    <div className='relative w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 h-80 lg:aspect-none'>
                                        <Image
                                            priority="true"
                                            layout='fill'
                                            objectFit="cover"
                                            objectPosition="top"
                                            src="https://zenix.dexignzone.com/xhtml/images/contacts/Untitled-5.jpg"
                                            alt=""
                                        />
                                    </div>
                                </a>
                        </NextLink>
                        <div className="text-center py-5">
                            <NextLink href={`/admin/autores/name`} passHref>
                                <a className="block font-bold text-3xl mb-2">Contextos Guerrero</a>
                            </NextLink>
                            <p className="text-slate-600 text-xl sm:text-2xl">correo@correo.com</p>
                        </div>
                    </div>
                    <div className="w-[45%] sm:w-[180px]">
                        <NextLink href={`/admin/autores/name`} passHref>
                                <a className="block w-full relative h-[180px] rounded-lg overflow-hidden group">
                                    <div className='relative w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 h-80 lg:aspect-none'>
                                        <Image
                                            priority="true"
                                            layout='fill'
                                            objectFit="cover"
                                            objectPosition="top"
                                            src="https://zenix.dexignzone.com/xhtml/images/contacts/Untitled-1.jpg"
                                            alt=""
                                        />
                                    </div>
                                </a>
                        </NextLink>
                        <div className="text-center py-5">
                            <NextLink href={`/admin/autores/name`} passHref>
                                <a className="block font-bold text-3xl mb-2">Norma Irene de la Cruz Magaña</a>
                            </NextLink>
                            <p className="text-slate-600 text-xl sm:text-2xl">correo@correo.com</p>
                        </div>
                    </div>
                    <div className="w-[45%] sm:w-[180px]">
                        <NextLink href={`/admin/autores/name`} passHref>
                                <a className="block w-full relative h-[180px] rounded-lg overflow-hidden group">
                                    <div className='relative w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 h-80 lg:aspect-none'>
                                        <Image
                                            priority="true"
                                            layout='fill'
                                            objectFit="cover"
                                            objectPosition="top"
                                            src="https://zenix.dexignzone.com/xhtml/images/contacts/Untitled-4.jpg"
                                            alt=""
                                        />
                                    </div>
                                </a>
                        </NextLink>
                        <div className="text-center py-5">
                            <NextLink href={`/admin/autores/name`} passHref>
                                <a className="block font-bold text-3xl mb-2">Jorge Álvarez Hoth</a>
                            </NextLink>
                            <p className="text-slate-600 text-xl sm:text-2xl">correo@correo.com</p>
                        </div>
                    </div>
                    <div className="w-[45%] sm:w-[180px]">
                        <NextLink href={`/admin/autores/name`} passHref>
                                <a className="block w-full relative h-[180px] rounded-lg overflow-hidden group">
                                    <div className='relative w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 h-80 lg:aspect-none'>
                                        <Image
                                            priority="true"
                                            layout='fill'
                                            objectFit="cover"
                                            objectPosition="top"
                                            src="https://www.eluniversal.com.mx/sites/default/files/styles/f01-383x568_corte_1_u2020_/public/autores/opinion/2021/02/22/hector-de-mauleon.png"
                                            alt=""
                                        />
                                    </div>
                                </a>
                        </NextLink>
                        <div className="text-center py-5">
                            <NextLink href={`/admin/autores/name`} passHref>
                                <a className="block font-bold text-3xl mb-2">Luis Cárdenas</a>
                            </NextLink>
                            <p className="text-slate-600 text-xl sm:text-2xl">correo@correo.com</p>
                        </div>
                    </div>
                    <div className="w-[45%] sm:w-[180px]">
                        <NextLink href={`/admin/autores/name`} passHref>
                                <a className="block w-full relative h-[180px] rounded-lg overflow-hidden group">
                                    <div className='relative w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 h-80 lg:aspect-none'>
                                        <Image
                                            priority="true"
                                            layout='fill'
                                            objectFit="cover"
                                            objectPosition="top"
                                            src="https://zenix.dexignzone.com/xhtml/images/contacts/Untitled-2.jpg"
                                            alt=""
                                        />
                                    </div>
                                </a>
                        </NextLink>
                        <div className="text-center py-5">
                            <NextLink href={`/admin/autores/name`} passHref>
                                <a className="block font-bold text-3xl mb-2">Cindy Hernandez</a>
                            </NextLink>
                            <p className="text-slate-600 text-xl sm:text-2xl">correo@correo.com</p>
                        </div>
                    </div>
                    <div className="w-[45%] sm:w-[180px]">
                        <NextLink href={`/admin/autores/name`} passHref>
                                <a className="block w-full relative h-[180px] rounded-lg overflow-hidden group">
                                    <div className='relative w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 h-80 lg:aspect-none'>
                                        <Image
                                            priority="true"
                                            layout='fill'
                                            objectFit="cover"
                                            objectPosition="top"
                                            src="https://zenix.dexignzone.com/xhtml/images/contacts/Untitled-3.jpg"
                                            alt=""
                                        />
                                    </div>
                                </a>
                        </NextLink>
                        <div className="text-center py-5">
                            <NextLink href={`/admin/autores/name`} passHref>
                                <a className="block font-bold text-3xl mb-2">Olivia Cardoso</a>
                            </NextLink>
                            <p className="text-slate-600 text-xl sm:text-2xl">correo@correo.com</p>
                        </div>
                    </div>
                </div>
            </section>
        </AdminLayout>
    )

}

export default AutoresPage