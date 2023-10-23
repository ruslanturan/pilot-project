import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator_simple.min.css';
import { ReactTabulator } from 'react-tabulator';
import { useState } from 'react';
import OLMap from './OLMap';

const Table = ({data, toggleFormState, setFormState, setData, setPageState, togglePasta, toggleDiagram}) => {
  const [showMapState, setShowMapState] = useState(false)
  const [wktState, setWktState] = useState()
  var showButton = function(){ 
      return '<button class="options"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>'
  }
  var editButton = function(){ 
      return '<button class="options"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>'
  }
  var deleteButton = function(){ 
      return '<button class="options"><svg viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>delete [#1487]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-179.000000, -360.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M130.35,216 L132.45,216 L132.45,208 L130.35,208 L130.35,216 Z M134.55,216 L136.65,216 L136.65,208 L134.55,208 L134.55,216 Z M128.25,218 L138.75,218 L138.75,206 L128.25,206 L128.25,218 Z M130.35,204 L136.65,204 L136.65,202 L130.35,202 L130.35,204 Z M138.75,204 L138.75,200 L128.25,200 L128.25,204 L123,204 L123,206 L126.15,206 L126.15,220 L140.85,220 L140.85,206 L144,206 L144,204 L138.75,204 Z" id="delete-[#1487]"> </path> </g> </g> </g> </g></svg></button>'
  }
  const onShowClick = (e, cell) => {
    let item = cell.getRow().getData()
    setWktState(item.wkt)
    setShowMapState(true)
  }
  const onEditClick = (e, cell) => {
      let item = cell.getRow().getData()
      setFormState({
          id: item.id,
          len: item.len,
          wkt: item.wkt,
          status: item.status
      })
      setPageState("form")
  }
  const onDeleteClick = (e, cell) => {
      let item = cell.getRow().getData()
      let newArr = data.filter((el) => {
        return el.id !== item.id
      })
      setData(newArr)
  }
  const columns = [
    { title: "id", field: "id", headerFilter: "input" },
    { title: "len", field: "len", headerFilter: "input" },
    { title: "wkt", field: "wkt", headerFilter: "input" },
    { title: "status", field: "status", headerFilter: "input" },
    { title: "...", field: "...", formatter: showButton, cellClick: onShowClick, width: 45},
    { title: "", field: "", formatter: editButton, cellClick: onEditClick, width: 45},
    { title: "", field: "", formatter: deleteButton, cellClick: onDeleteClick, width: 45}
  ]
  const options = {
    movableRows: false,
    pagination:"local",
    paginationSize:12
  }    

  return(
    <>
      <button className='load' onClick={toggleFormState}>Add New Data</button>
      <div className='' style={{display:"flex", width: "100%", height:"510px"}}>
        <ReactTabulator style={{width: "50%"}} columns={columns} data={data} options={options} />
        {showMapState && <OLMap setShowMapState={setShowMapState} wktValue={wktState}/>}
      </div>
      <div>
        <button className='load' onClick={togglePasta}>Analiz 1</button>
        <button className='load' onClick={toggleDiagram}>Analiz 2</button>
      </div>
    </>
  )
}
export default Table;