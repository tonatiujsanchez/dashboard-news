import styled from "@emotion/styled";
import { useState } from "react";


export const SelectCategories = ({ categorySelected='uno', categories }) => {

    const [ mostrarSelect, setMostrarSelect ] = useState(false)

    const handleSelectCategory = (category) => {

        console.log(category);
    }

    return (
        <ContenedorSelect 
            onClick={ ()=> setMostrarSelect( !mostrarSelect ) }
            className="border border-gray-200"
        >
        <OpcionSeleccionada>
            { categorySelected }
        </OpcionSeleccionada>
        {mostrarSelect && 
            <Opciones className="border border-gray-200 shadow-lg">
                { categories.map( category => (
                    <>
                        <Opcion 
                            key={ category._id } 
                            onClick={ ()=> handleSelectCategory( category ) }
                        >
                            { category.title }
                        </Opcion>
                        {
                            category.subcategories.length > 0 &&
                            <div>
                                {
                                    category.subcategories.map(subcategory => (
                                        
                                        <Opcion
                                            subcategory 
                                            key={ subcategory._id } 
                                            onClick={ ()=> handleSelectCategory( subcategory ) }
                                            
                                        >
                                           - { subcategory.title }
                                        </Opcion>
                                    ))

                                }
                            </div>
                        }
                    </>
                    ))
                }
            </Opciones>
        }
    </ContenedorSelect>
    )
}



const ContenedorSelect = styled.div`
    background-color: white;
	cursor: pointer;
	border-radius: 0.625rem; /* 10px */
	position: relative;
	height: 5rem; /* 80px */
	width: 100%;
	padding: 0px 1.25rem; /* 20px */
	font-size: 1.5rem; /* 24px */
	text-align: center;
	display: flex;
	align-items: center;
	transition: .5s ease all;
	&:hover {
		background-color: #E8EFF1;
	}
`;

const OpcionSeleccionada = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Opciones = styled.div`
    background-color: white;
	position: absolute;
	top: 4.8rem; /* 90px */
	left: 0;
	width: 100%;
	border-radius: 0.625rem; /* 10px */
	max-height: 28rem; /* 300px */
	overflow-y: auto;
`;

const Opcion = styled.div`
	display: flex;
    padding: ${(props) => props.subcategory ? '1rem 1.25rem 1rem 3rem' : '1.25rem'};
    font-weight: ${(props) => props.subcategory ? 'normal' : 'bold'};
	&:hover {
		background-color: #CBDDE2;
	}
`;

