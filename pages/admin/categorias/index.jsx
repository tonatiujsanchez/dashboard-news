import { useEffect, useMemo, useState } from "react"

import Modal from 'react-modal'

import { useData } from "../../../hooks/useData"

import { AdminLayout } from "../../../components/layouts"

import { BtnSuccess } from "../../../components/admin/ui"
import { TitlePage } from "../../../components/admin/ui"
import { LoadingAdmin } from "../../../components/admin/ui"
import { CategoryModal } from "../../../components/admin/categories"
import { CategoryItem } from "../../../components/admin/categories"

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

const CategoriasPage = () => {

    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const [editCategory, setEditCategory] = useState(null)

    const { refreshCategories, categories } = useData()

    const loadCategories = async () => {
        setLoading(true)
        await refreshCategories()
        setLoading(false)

    }

    useEffect(() => {
        if (categories.length <= 0) {
            loadCategories()
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

    const hiddenModal = () => {
        const body = document.querySelector('body')
        body.classList.remove('fixed-body')
        setModal(false)
        setEditCategory(null)
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
                    onClick={() => loadCategories()}>
                    <i className='bx bx-revision'></i>
                </button>
            </div>
            {
                loading
                    ? <div className="flex justify-center mt-96">
                        <LoadingAdmin />
                    </div>
                    : <section>
                        <div className="w-full mb-5">
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
            }

            <Modal
                isOpen={modal}
                style={customStyles}>
                <CategoryModal
                    categoriesMemo={categoriesMemo}
                    editCategory={editCategory}
                    hiddenModal={hiddenModal} />
            </Modal>

        </AdminLayout>
    )
}

export default CategoriasPage