import React, { useState, useReducer } from 'react';
import Modal from './Modal';
import { data } from '../../../data';

// reducer function
const reducer = (state, action) => {
    if (action.type ==='ADD_ITEM') {
        const newItems =[...state.people, action.payload]
        return {
            ...state, 
            people: newItems, 
            isModalOpen: true, 
            modalContent: 'item addded',
        }
    }
    return state;
    //throw new Error ('no matching action type')
}
const defaultState = {
    people: [],
    isModalOpen: false, 
    modalContent: 'hello world'
}

const Index = () => {
    // const [people, setPeople] = useState(data);
    // const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('')
    const [state, dispatch] = useReducer(reducer, defaultState)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name) {
            // setShowModal(true);
            // setPeople([...people, {id: new Date().getTime().toString(), name }]);
            // setName('');
            const newItem = {id: new Date().getTime().toString(), name}
            dispatch({type: 'ADD_ITEM', payload: newItem})
        }
        else {
            // setShowModal(true)
            dispatch({type: 'RANDOM'})
        }
    }

    return (
        <>
            {state.isModalOpen && <Modal modalContent={state.modalContent}/>}
            <form onSubmit={handleSubmit} className="form">
                <div>
                    <input 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                </div>
                <button type="submit">add person</button>
            {state.people.map((person) => {
                return <div key={person.id}>
                        <h4>{person.name}</h4>
                </div>
            })}
            </form>
        </>
    );
};

export default Index;
