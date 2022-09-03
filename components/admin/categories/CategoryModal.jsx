import { useEffect } from "react"
import { useData } from "../../../hooks/useData"
import { useCustomForm } from "../../../hooks/useCustomForm"


export const CategoryModal = ({ categoriesMemo, editCategory, hiddenModal }) => {

    const { addNewCategory, updateCategory } = useData()

    const [values, handleInputChange, reset] = useCustomForm({
        typeCategory: 'category',
        category: categoriesMemo[0]._id || '',
        title: '',
        tag: '',
    })

    const { typeCategory, category, title, tag } = values

    useEffect(() => {
        if (editCategory?._id) {

            reset({
                typeCategory: editCategory.type,
                category: editCategory.category || categoriesMemo[0]._id,
                title: editCategory.title,
                tag: editCategory.tag
            })
        }
    }, [])
    

    const handleSubmit = (ev) => {
        ev.preventDefault()

        if (title.trim() === '') {
            console.log('El título es necesario');
            return
        }

        if (typeCategory === 'subcategory') {

            if (category.trim() === '') {
                console.log('Debe elegir la categoria a la que pertenece');
                return
            }
        }

        const newCategory = {
            ...editCategory,
            type: typeCategory,
            category: typeCategory === 'subcategory' ? category : null,
            title,
            tag: tag.trim() === '' ? title : tag
        }

        if(editCategory?._id){
            updateCategory(newCategory)
            hiddenModal()
        }else{
            newCategory.position = categoriesMemo.length + 1
            addNewCategory(newCategory)
            hiddenModal()
        }

    }

    return (
        <div className="py-5">
            <header className="mb-10">
                <h3 className="text-center font-semibold text-3xl">{editCategory ? `Editando: ${ editCategory.title }` : 'Nueva Categoría'}</h3>
            </header>
            <form onSubmit={handleSubmit} className="w-[320px] sm:w-[600px]">
                <div className="my-5">
                    <label htmlFor="marca" className="block text-md mb-3 font-semibold text-gray-500 uppercase">
                        Tipo <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="typeCategory"
                        id="typeCategory"
                        className="w-full border border-gray-200 p-6 rounded-md"
                        value={typeCategory}
                        onChange={handleInputChange} >

                        <option value="category">Categoría principal</option>
                        <option value="subcategory">Subcategoría</option>
                    </select>
                </div>
                {typeCategory === 'subcategory' &&
                    <div className="my-5">
                        <label htmlFor="marca" className="block text-md mb-3 font-semibold text-gray-500 uppercase">
                            Categoría <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="category"
                            id="category"
                            className="w-full border border-gray-200 p-6 rounded-md"
                            value={category}
                            onChange={handleInputChange} >
                            {
                                categoriesMemo.map(category => (
                                    <option key={category._id} value={category._id} >
                                        {category.title}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                }
                <div className="my-5">
                    <label htmlFor="marca" className="block text-md mb-3 font-semibold text-gray-500 uppercase">
                        Título <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        onChange={handleInputChange}
                        className="border mt-2 block w-full p-6 rounded-md shadow-sm focus:outline-slate-800 text-md" />
                </div>
                <div className="my-5">
                    <label htmlFor="marca" className="block text-md mb-3 font-semibold text-gray-500 uppercase">
                        Etiqueta
                    </label>
                    <input
                        type="text"
                        name="tag"
                        id="tag"
                        value={tag}
                        onChange={handleInputChange}
                        className="border mt-2 block w-full p-6 rounded-md shadow-sm focus:outline-slate-800 text-md" />
                </div>
                <div className="flex items-center justify-end gap-2 mt-10">
                    <button
                        onClick={hiddenModal}
                        className="py-3 px-5 uppercase w-full sm:w-auto rounded-md cursor-pointer transition-colors">
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-8 uppercase w-full sm:w-auto rounded-md cursor-pointer transition-colors">
                            { editCategory ? 'Editar' : 'Añadir' }
                    </button>
                </div>
            </form>
        </div>
    )
}
