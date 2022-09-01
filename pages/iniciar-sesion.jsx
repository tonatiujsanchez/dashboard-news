

const iniciarSesionPage = () => {
  return (
    <main className="bg-admin h-screen flex justify-center items-center">
        <article className="sm:bg-white rounded-lg sm:shadow-lg px-5 sm:px-16 py-20 flex flex-col items-center w-[320px] md:w-[400px] mb-36">
            <img 
                src="https://res.cloudinary.com/ton/image/upload/v1661840375/jurrdmthg3uih7hxxbht.jpg"
                alt="Logo admin"
                className="w-32 mb-10"
            />
            <form className="w-full">
                <div className="mb-8">
                    <label htmlFor="user" className="block text-md mb-2 font-semibold text-gray-500 uppercase">Usuario</label>
                    <input 
                        type="text" 
                        id="user"
                        className="sm:bg-admin rounded-md flex-1 border p-5 w-full"
                    />
                </div>
                <div className="mb-16">
                    <label htmlFor="pwd" className="block text-md mb-2 font-semibold text-gray-500 uppercase">Contraseña</label>
                    <input 
                        type="password" 
                        id="pwd" 
                        className="sm:bg-admin rounded-md flex-1 border p-5 w-full"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-sky-500 hover:bg-sky-600 px-8 py-5 font-semibold rounded-md color-admin w-full  ml-auto uppercase">
                    Iniciar Sesión
                </button>
            </form>
        </article>
    </main>
  )
}

export default iniciarSesionPage