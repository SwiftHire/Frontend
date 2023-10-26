/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useCreditsCalculator } from '../../contexts/CreditsCalculator';
import { BsPencil } from 'react-icons/bs';
import { GenerateDataButtonContainer, ActionButton, GenerateLoadingIcon } from './GenerateDataStyled';
import hrManager from '../../assets/jpg/majorgen-hr.jpg';
import GetCreditsModal from './GetCreditsModal';

export const GenerateDataActions = ({handleCreate,  loading}) => {
   
    const [showModal, setShowModal] = useState(false);
    const { updateUserCredits, userCredits } = useCreditsCalculator();

    const handleToggleModal = () => {
        setShowModal(!showModal);
    };

    async function creditsCheck(){
        if(userCredits===0){
            //alert('insufficient credits, buy new credits');
            handleToggleModal();
        }else{
            handleCreate();
            await updateUserCredits();
        }
    }

    return (
        <GenerateDataButtonContainer>
            <ActionButton primary='true' onClick={creditsCheck} disabled={loading}>
                {loading ? 'Generating Data':'AI Writer'} {loading ? <GenerateLoadingIcon  /> : <BsPencil/>}
            </ActionButton>
            {showModal && (
                <GetCreditsModal 
                    handleToggleModal={handleToggleModal}
                    imageSrc={hrManager}
                />
            )}
        </GenerateDataButtonContainer>
    );
};

