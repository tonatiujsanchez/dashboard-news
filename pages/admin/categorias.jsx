import { useEffect, useMemo, useState } from "react"

import Modal from 'react-modal'

import { useData } from "../../hooks/useData"

import { CategoryItem, TitlePage } from "../../components/admin"
import { AdminLayout } from "../../components/layouts"
import { BtnSuccess } from "../../components/ui"
import { ModalCategory } from "../../components/admin"

const customStyles = {
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

const CategoriasPage = () => {

    const [modal, setModal] = useState(false)

    const [editCategory, setEditCategory] = useState(null)

    const { refreshCategories, categories } = useData()

    useEffect(() => {
        if (categories.length <= 0) {
            refreshCategories()
        }
    }, [])

    const categoriesMemo = useMemo(() => {
        return (
            categories.filter(category => {

                category.subcategories = categories.filter(
                    subc => (subc.type === 'subcategory' && subc.category === category._id)
                )
                if (category.type === 'category') {
                    return category
                }
            })
        )

    }, [categories])

    const handleShowModal = () => {
        const body = document.querySelector('body')
        body.classList.add('fixed-body')
        setModal(true)
    }
    
    const onEditCategory = (category) => {
        setEditCategory({ ...category })
        handleShowModal()
    }

    return (
        <AdminLayout title="- Categorías" >
            <div className="mb-5 flex gap-2 items-center py-3">
                <TitlePage title="Categorías" />
                <button
                    className="text-3xl text-slate-600 hover:bg-slate-200 hover:text-slate-900 py-2 px-3 rounded-full active:scale-95"
                    onClick={() => refreshCategories()}>
                    <i className='bx bx-revision'></i>
                </button>
            </div>
            <section>
                <div className="w-full mb-10">
                    <BtnSuccess onClick={handleShowModal} text="Agregar nueva categoria" />
                </div>
                <div>
                    {
                        categoriesMemo.map(category => (
                            <CategoryItem
                                key={category._id}
                                category={category}
                                onEditCategory={onEditCategory}
                            />
                        ))

                    }
                </div>
            </section>
            {
                modal &&
                <Modal
                    isOpen={modal}
                    style={customStyles}>
                    <ModalCategory
                        categoriesMemo={categoriesMemo}
                        setModal={setModal}
                        editCategory={editCategory}
                        setEditCategory={setEditCategory} />
                </Modal>
            }
        </AdminLayout>
    )
}

export default CategoriasPage