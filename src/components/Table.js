import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext'
import { Icon } from '@iconify/react';
import { db } from '../firebase-config'
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import AddMember from './AddMember';
const Table = () => {
  const { logout } = useAuth()
  const [tableData, setTableData] = useState([{
    Id: "",
    Name: "",
    Company: "",
    Status: "",
    Notes: ""
  }])
  const [compList, setCompList] = useState([])
  const status = ["Active", "Closed"]
  const [compIcon, setCompIcon] = useState("akar-icons:chevron-up")
  const [statIcon, setStatIcon] = useState("akar-icons:chevron-up")
  const [selectedComp, setSelectedComp] = useState([])
  const [selectedStat, setSelectedStat] = useState([])
  const [compDown, setCompDown] = useState(false)
  const [statDown, setStatDown] = useState(false)
  const [addingMem, setAddingMem] = useState(false)
  const [dbUpdated, setDbUpdated] = useState(false)
  const [tableCopy, setTableCopy] = useState(tableData)

  async function updateData() {
    const docRef = collection(db, 'members');
    const docSnap = await getDocs(docRef);
    return docSnap
  }

  useEffect(() => {
    const snapshot = updateData()
    snapshot.then((snapshot) => {
      if (snapshot.docs) {
        setTableData(snapshot.docs.map((doc) => ({
          Id: doc.id,
          Name: doc.data().Name,
          Company: doc.data().Company,
          Status: doc.data().Status,
          Notes: doc.data().Notes
        })))
        setCompList(prev => [])
        snapshot.docs.forEach((doc) => {
          setCompList(prev => [...prev, doc.data().Company])
        })
        setCompList(prev => [...new Set(prev)])
      }
    })
  }, [dbUpdated])

  useEffect(() => {
    setTableCopy(tableData)
  }, [tableData])

  useEffect(() => {
    setTableCopy(prev => tableData.filter((obj) => {
      if (selectedComp.length === 0 && selectedStat.length === 0) {
        return obj
      }
      if(selectedStat.length === 0) {
        if (selectedComp.includes(obj.Company)) {
          return obj
        }
      }
      else if(selectedComp.length === 0) {
        if (selectedStat.includes(obj.Status)) {
          return obj
        }
      }
      else {
        if(selectedComp.includes(obj.Company) && selectedStat.includes(obj.Status)) {
          return obj
        }
      }
    }))

  }, [selectedComp, tableData, selectedStat])

  let navigate = useNavigate()
  async function handleButton() {
    try {
      await logout()
      navigate("/login")
    }
    catch (e) {
      console.log(e)
    }
  }

  async function handleDelete(id) {
    try {
      const docRef = doc(db, 'members', id)
      await deleteDoc(docRef)
      if (dbUpdated) {
        setDbUpdated(false)
      }
      else {
        setDbUpdated(true)
      }
    }
    catch (e) {
      console.log(e)
    }
  }
  const handleCompCheckbox = (e) => {
    if (e.target.checked) {
      setSelectedComp(prev => [...prev, e.target.value])
    }
    else {
      setSelectedComp(prev => prev.filter((item) => { return item !== e.target.value }))
    }

  }
  const handleStatCheckbox = (e) => {
    if (e.target.checked) {
      setSelectedStat(prev => [...prev, e.target.value])
    }
    else {
      setSelectedStat(prev => prev.filter((item) => { return item !== e.target.value }))
    }

  }

const data = tableCopy.map((d) =>
  <tr>
    <td><input className="select" type="checkbox" value={d.Name} /></td>
    <td>{d.Name}</td>
    <td>{d.Company}</td>
    <td>{d.Status}</td>
    <td>{d.Notes}</td>
    <td onClick={() => handleDelete(d.Id)}><Icon icon="ic:baseline-delete" /></td>
  </tr>)


const cList = compList.map((c) =>
  <ul>
    <li><input onChange={handleCompCheckbox} className="select" type="checkbox" value={c} />{c}</li>
  </ul>
)
const statList = status.map((s) =>
  <ul>
    <li><input onChange={handleStatCheckbox}className="select" type="checkbox" value={s} />{s}</li>
  </ul>
)
function handleCompClick() {
  if (!compDown) {
    setCompIcon("akar-icons:chevron-down")
    setCompDown(true);
  }
  else {
    setCompIcon("akar-icons:chevron-up")
    setCompDown(false);
  }
}
function handleStatClick() {
  if (!statDown) {
    setStatIcon("akar-icons:chevron-down")
    setStatDown(true);
  }
  else {
    setStatIcon("akar-icons:chevron-up")
    setStatDown(false);
  }
}
function addMemberHandler() {
  setAddingMem(true)
}
return (
  <div className='Table'>
    <div className='logout'>
      <button onClick={handleButton}>Logout</button>
    </div>
    {addingMem ? <>
      <div className='Modal'></div>
      <AddMember setAddingMem={setAddingMem} setDbUpdated={setDbUpdated} dbUpdated={dbUpdated} />
    </> : ""}

    <div className='Table-Container'>
      <div className='Table-Header'>
        <h1>Team Members</h1>
        <div onClick={addMemberHandler} className='Add-Member'>
          Add Members
          <Icon className="plus-sign" icon="akar-icons:plus" />
        </div>
      </div>
      <hr />
      <div className='Table-Options'>
        <div onClick={handleCompClick} className='Company-List'>
          Company
          <Icon className="drop-down" icon={compIcon} />
        </div>
        <div onClick={handleStatClick} className='Status-List'>
          Status
          <Icon className="drop-down" icon={statIcon} />
        </div>
      </div>
      {compDown ?
        <div className='c-list'>
            {cList}
        </div> : ""}
      {statDown ? <div className='s-list'>
        {statList}
      </div> : ""}

      <table>
        <thead>
          <tr>
            <th><input className='select-all' type="checkbox" value="all" /></th>
            <th>Name</th>
            <th>Company</th>
            <th>Status</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {data}
        </tbody>

      </table>
    </div>
  </div>
)
}

export default Table