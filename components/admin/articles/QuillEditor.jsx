import { useEffect, useState } from 'react';

import Modal from 'react-modal'
import styled from '@emotion/styled';

import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'

import { ImagesSelectModal } from "./ImagesSelectModal"


const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    content: {
        top: '45%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '99',
        paddingTop: '0'
    },
}
Modal.setAppElement('#__next')


const modules = {
    toolbar: '#toolbar'
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'align',
    'list', 'list',
    'image', 'link', "code-block", "video", "blockquote", "clean"
];

const colors = ['#000055', '#FF7600', '#222222', '#18222b', '#238633', '#0284c7']


export const QuillEditor = ({ placeholder, onEditorChange, content, label="Contenido" }) => {

    const [showImagesModal, setShowImagesModal] = useState(false)
    const [positionEditor, setPositionEditor] = useState(null)
    const { quill, quillRef } = useQuill({ modules, formats, placeholder })
    

    const insertToEditor = (url) => {
        quill.insertEmbed((positionEditor - 1), 'image', url)
    }

    useEffect(() => {
        if (quill) {
            quill.getModule('toolbar').addHandler('image', openImagesModal)
        }
    }, [quill])

    useEffect(() => {
        if (quill) {
            quill.on('text-change', (delta, oldDelta, source) => {
                //console.log(quill.getText()); // Get text only
                // console.log(quill.getContents()); // Get delta contents
                // console.log(quill.root.innerHTML); // Get innerHTML using quill
                onEditorChange(quill.root.innerHTML)
                // console.log(quill.root); // Get innerHTML using quill
            })
        }
    }, [quill])

    useEffect(()=>{
        if(content){
            if (quill) {
                quill.clipboard.dangerouslyPasteHTML(content)
            }
        }
    },[quill])
    

    const hiddenImagesModal = () => {
        const body = document.querySelector('body')
        body.classList.remove('fixed-body')
        setPositionEditor(null)
        setShowImagesModal(false)
    }

    const openImagesModal = () => {
        const body = document.querySelector('body')
        body.classList.add('fixed-body')

        const range = quill.getSelection()
        setPositionEditor(range.index)

        setShowImagesModal(true)
    }

    const handleSelectedImage = async (fnSelectedImage) => {
        const image = await fnSelectedImage()
        if (image) {
            insertToEditor(image)
            hiddenImagesModal()
        }
    }

    // TODO: Insertar videos de facebook y otras redes sociales. 

    return (
        <>
            <p className="mb-2 font-medium">{ label }</p>
            <EditorContent className='pb-32 sm:pb-24'>
                <div id="toolbar">
                    <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
                        <option value="2" />
                        <option value="3" />
                        <option value="4" />
                        <option value="5" />
                        <option value="6" />
                        <option value="" />
                    </select>
                    <button className="ql-bold" />
                    <button className="ql-italic" />
                    <button className="ql-underline" />
                    <button className="ql-strike" />

                    <select className="ql-color" defaultValue={"black"} onChange={e => e.persist()}>
                        <option value="black" />
                        <option value="white" />
                        {
                            colors.map( color => (<option key={color} value={color} />) )
                        }
                    </select>
                    <select className="ql-background" defaultValue={"black"} onChange={e => e.persist()}>
                        <option value="black" />
                        <option value="white" />
                        {
                            colors.map( color => (<option key={color} value={color} />) )
                        }
                    </select>

                    <select className="ql-align" defaultValue={""} onChange={e => e.persist()}>
                        <option value="" />
                        <option value="center" />
                        <option value="right" />
                        <option value="justify" />
                    </select>

                    <button className="ql-list" value="bullet" />
                    <button className="ql-list" value="ordered" />
  
                    <button className="ql-image"/>
                    <button className="ql-video" />

                    <button className="ql-link" />
                    <button className="ql-code-block" />
                    <button className="ql-blockquote" />
                    <button className="ql-clean" />

                </div>
                <div ref={quillRef} />
            </EditorContent>
            <Modal
                isOpen={showImagesModal}
                style={customStyles}
            >
                <ImagesSelectModal
                    hiddenImagesModal={hiddenImagesModal}
                    handleSelectedImage={handleSelectedImage}
                />
            </Modal>

        </>
    )
}


const EditorContent = styled.div`
    width: 100%;
    height: 52rem;
    /* padding-bottom: 10rem; */
    border-radius: 0.8rem;
    border: 1.5px solid rgba(229, 231, 235, 1);


    .ql-toolbar {
        border-radius: 0.8rem;
        border: none;
        border-bottom: 1.5px solid rgba(229, 231, 235, 1);
        background-color: rgb(250, 250, 255);
        padding-top: 1.2rem;
        padding-bottom: 1.2rem;
    }
    .ql-container{
        border: none;
        font-size: 1.6rem;
    }
    
    .ql-editor{
        line-height: 2.5rem;
    }

    .ql-editor::-webkit-scrollbar {
        -webkit-appearance: none;
    }

    .ql-editor::-webkit-scrollbar:vertical {
        width:8px;
    }

    .ql-editor::-webkit-scrollbar-button:increment,.contenedor::-webkit-scrollbar-button {
        display: none;
    } 

    .ql-editor::-webkit-scrollbar:horizontal {
        height: 8px;
    }

    .ql-editor::-webkit-scrollbar-thumb {
        background-color: #dbdbdb;
        border-radius: 20px;
        border: 2px solid #f1f2f3;
    }

    .ql-editor::-webkit-scrollbar-track {
        border-radius: 8px;  
    }
`