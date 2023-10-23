const Form = ({setFormState, formState, data, setData, toggleFormState, setPageState}) => {
  const onInputChange = (e) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const onAddClick = (e) => {
    if(formState.len !== "" && formState.status !== ""){
      if(formState.id === 0){
        const ids = data.map(object => {
          return object.id
        })
        const lastId = Math.max(...ids)
        const newOne = {id: lastId + 1, len: formState.len, wkt: formState.wkt, status: formState.status}
        let newArr = [newOne].concat(data)
        setData(newArr)
        setFormState({
          id:0,
          len: "",
          wkt:"",
          status: ""
        })
        setPageState("table")
      }
      else{
        const editedOne = {id: formState.id, len: formState.len, wkt: formState.wkt, status: formState.status}
        let newArr = data.map((el) => {
          if(el.id === formState.id){
            return editedOne
          }else{
            return el
          }
        })
        setData(newArr)
        setFormState({
          id:0,
          len: "",
          wkt:"",
          status: ""
        })
        setPageState("table")
      }
    }
  }
  return(
    <div className="alert-container" id="modal">
      <div className="alert-modal" style={{top:"15%",position:"relative"}}>
        <h3>Başlıq</h3>
        <h5>Alt Tərif</h5>
        <form onSubmit={onAddClick}>
          <div className="input-container">
            <label htmlFor='len'>Len dəyərini daxil edin</label>
            <input type="number" className="input" name="len" value={formState.len} onChange={onInputChange} required/>
          </div>
          <div className="input-container">
            <label htmlFor='status'>Statusu seçin</label>
            <select className="input" name="status" value={formState.status} onChange={onInputChange} required>
              <option disabled></option>
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
            </select>
          </div>
          <div className="button-container">
            <button className="btn btn-save" onClick={onAddClick}>save</button>
            <button className="btn btn-cancel" onClick={toggleFormState}>cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Form;