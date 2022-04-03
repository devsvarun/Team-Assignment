import React from 'react'
import { db } from '../firebase-config'
import { collection, addDoc, Timestamp } from 'firebase/firestore'

const AddMember = ({ setAddingMem , setDbUpdated, dbUpdated}) => {
    const updateAddingMem = setAddingMem;
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await addDoc(collection(db, 'members'), {
                Name: e.target.name.value,
                Company: e.target.comp.value,
                Status: e.target.status.value,
                Notes: e.target.notes.value
            })
            updateAddingMem(false)
            if(dbUpdated) {
                setDbUpdated(false)
            }
            else{
                setDbUpdated(true)
            }
            
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='AddMember'>
            <h2>Add Members</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label className="mem-lab">Name </label>
                    <input type="text" name="name" />
                </div>
                <div className="input-container">
                    <label className="mem-lab">Company </label>
                    <input type="text" name="comp" />
                </div>
                <div className="input-container">
                    <label className="mem-lab">Status </label>
                    <input type="text" name="status" />
                </div>
                <div className="input-container">
                    <label className="mem-lab">Notes</label>
                    <input type="text" name="notes" />
                </div>
                <div className="mem-btn">
                    <input onClick={() => {
                        updateAddingMem(false)
                    }} id="cancel-btn" type="submit" value="Cancel" />
                    <input id="save-btn" type="submit" value="Save" />
                </div>
            </form>
        </div>
    )
}

export default AddMember