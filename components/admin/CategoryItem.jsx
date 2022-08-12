
import { useState } from 'react'

import Modal from 'react-modal'
import { useData } from '../../hooks/useData'


const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
}

Modal.setAppElement('#__next')


export const CategoryItem = ({ category, onEditCategory }) => {

    const [openSubcategories, setOpenSubcategories] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)

    const [categoryDelete, setCategoryDelete] = useState(null)


    const { deleteCategory } = useData()


    const showModalDelete = (category) => {
        
        const body = document.querySelector('body')
        body.classList.add('fixed-body')

        setCategoryDelete(category)
        setModalDelete(true)
    }

    const hiddenModalDelete = () => {

        const body = document.querySelector('body')
        body.classList.add('fixed-body')

        setCategoryDelete(null)
        setModalDelete(false)
    }

    const onDeleteCategory = () => {
        deleteCategory(categoryDelete._id)
        hiddenModalDelete()
    }

    return (
        <>
            <div className={`mb-3 border pl-5 pr-10 py-4 bg-white rounded-md ${openSubcategories ? 'h-auto' : 'h-25'}`}>
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <button
                            onClick={() => setOpenSubcategories(!openSubcategories)}
                            className={`text-5xl p-2 ${category.subcategories.length > 0 ? 'opacity-100' : 'opacity-10'}`}>
                            <i className={`bx bx-chevron-down transition-all ${openSubcategories && category.subcategories.length > 0 ? 'rotate-180' : ''}`}></i>
                        </button>
                        <p
                            onClick={() => setOpenSubcategories(!openSubcategories)}
                            className={`font-bold ${category.subcategories.length > 0 ? 'cursor-pointer' : 'cursor-text'}`}>
                            {category.title}
                        </p>
                    </div>
                    <div className="flex gap-5">
                        <button
                            className='text-sky-700 hover:text-sky-800'  
                            onClick={() => onEditCategory(category)}>
                            <i className='bx bx-edit'></i>
                        </button>
                        <button
                            className='text-red-500 hover:text-red-600'  
                            onClick={ ()=> showModalDelete(category) }>
                            <i className='bx bx-trash' ></i>
                        </button>
                    </div>
                </div>
                {
                    category.subcategories.length > 0 &&
                    <div>
                        {
                            category.subcategories.map(subc => {
                                if (subc.category === category._id) {
                                    return (
                                        <div key={subc._id} className={`pl-10 pr-10 my-1 py-4 justify-between items-center even:bg-gray-100 ${openSubcategories ? 'opacity-100 flex' : 'opacity-0 hidden'}`}>
                                            <p><i className='bx bx-minus'></i> {subc.title}</p>
                                            <div className="flex gap-5">
                                                <button
                                                    className='text-sky-700 hover:text-sky-800'   
                                                    onClick={() => onEditCategory(subc)}>
                                                    <i className='bx bx-edit'></i>
                                                </button>
                                                <button
                                                    className='text-red-500 hover:text-red-600' 
                                                    onClick={()=> showModalDelete(subc) }>
                                                    <i className='bx bx-trash' ></i>
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                }
            </div>
            {
                modalDelete &&
                <Modal
                    isOpen={modalDelete}
                    style={customStyles}>
                    <div className="p-5">
                        <header className="text-center">
                            <p className="text-center text-3xl mb-2">{`Desea eliminar la categoría:`}</p>
                            <h3 className='font-semibold text-3xl'>{ categoryDelete.title }</h3>
                        </header>
                        <div className='flex items-center justify-center gap-2 mt-10'>
                            <button
                                onClick={hiddenModalDelete}
                                className="py-3 px-5 uppercase w-full rounded-md cursor-pointer transition-colors">
                                Cancelar
                            </button>
                            <button
                                onClick={onDeleteCategory}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 uppercase w-full rounded-md cursor-pointer transition-colors">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </Modal>
            }
        </>
    )
}
