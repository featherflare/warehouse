import React from 'react'
import { emitCustomEvent } from 'react-custom-events'
import * as RiIcons from 'react-icons/ri'
import '../css/ModalLogin.css'

const ModalLogin = ({ errMsg }) => {
    var messageError = errMsg
    const handleClick = () => {
        const closeModal = true
        emitCustomEvent('CloseModal',closeModal)
    }
    return(
        <>
        <div className='Modal'>
            <div className='text-box'>{messageError}</div>
            <button type='button' className='btn-modal' onClick={handleClick}>
                <svg 
                    stroke="currentColor" 
                    fill="currentColor" 
                    stroke-width="0" 
                    viewBox="0 0 24 24" 
                    height="100%" 
                    width="100%" 
                >
                    <g>
                        <path fill="#fff" d="M5 5h14v14H2z"></path>
                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-11.414L9.172 7.757 7.757 9.172 10.586 12l-2.829 2.828 1.415 1.415L12 13.414l2.828 2.829 1.415-1.415L13.414 12l2.829-2.828-1.415-1.415L12 10.586z"></path>
                    </g>
                </svg>
            </button>
        </div>
        </>
    )
}

export default ModalLogin;