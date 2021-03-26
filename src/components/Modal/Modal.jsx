import React from 'react'
import s from './Modal.module.css'

class Modal extends React.Component {
    state = {
        isOpen: false
    }
    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {

        //так же можно прямо на кнопке сделать обработку сетстейта. 
        //можно написать - <button onClick={() => {
        //         this.setState({ isOpen: true })
        //     }
        // }> Open modal</button >


        return (
            <React.Fragment>
                <button onClick={this.toggleModal}> Open modal</button>
                {this.state.isOpen && <div className={s.modal}>
                    <div className={s.modalBody}>
                        <h1>Modal Title</h1>
                        <p>This is awesome modal!</p>
                        <button onClick={this.toggleModal}>Close modal</button>
                    </div>
                </div>}
            </React.Fragment>
        )
    }
}

export default Modal