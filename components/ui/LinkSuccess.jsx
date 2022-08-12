import NextLink from 'next/link'


export const LinkSuccess = ({ text, link }) => {
    return (

        <NextLink href={link} passHref>
            <a className="bg-sky-500 hover:bg-sky-600 px-8 py-5 font-semibold rounded-md color-admin w-full sm:w-auto ml-auto flex justify-center gap-1">
                <i className='bx bx-plus text-4xl'></i>
                {text}
            </a>
        </NextLink>
    )
}
