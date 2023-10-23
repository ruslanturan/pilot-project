import './App.css';
import { useState, useMemo } from 'react';
import * as XLSX from 'xlsx';
import React from 'react';
import Table from './components/Table';
import Form from './components/Form';
import AnalyzeOne from './components/AnalyzeOne';
import AnalyzeTwo from './components/AnalyzeTwo';

function App() {
  const [pageState, setPageState] = useState("table")
  const [data, setData] = useState([])
  const [pastaData, setPastaData] = useState({
    firstTypes: 0,
    secondTypes: 0,
    thirdTypes: 0
  })
  const [formState, setFormState] = useState({
    id:0,
    len: "",
    wkt:"",
    status: ""
  })
  let inputFile = ''
  const handleClick = () => {
    inputFile.click()
  }
  const handleInputChange = (e) => {
    if (e.target.value) {
      const reader = new FileReader()
      reader.readAsBinaryString(e.target.files[0])
      reader.onload = (e) => {
        const data = e.target.result
        const workbook = XLSX.read(data, { type: "binary"})
        const sheetname = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetname]
        const parsedData = XLSX.utils.sheet_to_json(sheet)
        setData(parsedData.reverse())
      }
    }
  }
  const toggleFormState = () => {
    setFormState({
      id:0,
      len: "",
      wkt:"",
      status: ""
    })
    if(pageState === "form"){
      setPageState("table")
    }else{
      setPageState("form")
    }
  }
  const diagramOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  }
  const labels = ['Statuslar'];
  const diagramData = {
    labels,
    datasets: [
      {
        label: '0',
        data: [pastaData.firstTypes],
        backgroundColor: 'lightBlue',
      },
      {
        label: '1',
        data: [pastaData.secondTypes],
        backgroundColor: 'green',
      },
      {
        label: '2',
        data: [pastaData.thirdTypes],
        backgroundColor: 'yellow',
      }
    ],
  }
  const togglePasta = () => {
    let firstTypes = data.filter((el) => {
      return el.status === 0 || el.status === "0"
    }).length
    let secondTypes = data.filter((el) => {
      return el.status === 1 || el.status === "1"
    }).length
    let thirdTypes = data.filter((el) => {
      return el.status === 2 || el.status === "2"
    }).length
    setPastaData({
      firstTypes: firstTypes,
      secondTypes: secondTypes,
      thirdTypes: thirdTypes
    })
    if(pageState === "pasta"){
      setPageState("table")
    }else{
      setPageState("pasta")
    }
  }
  const toggleDiagram = () => {
      let firstTypes = data.filter((el) => {
        return el.status === 0 || el.status === "0"
      }).length
      let secondTypes = data.filter((el) => {
        return el.status === 1 || el.status === "1"
      }).length
      let thirdTypes = data.filter((el) => {
        return el.status === 2 || el.status === "2"
      }).length
      setPastaData({
        firstTypes: firstTypes,
        secondTypes: secondTypes,
        thirdTypes: thirdTypes
      })
      if(pageState === "diagram"){
        setPageState("table")
      }else{
        setPageState("diagram")
      }
  }
  return (
    <div className="App">
      <div className="App-body">
        {pageState === "table" && 
          <>
            <button className='load' onClick={handleClick}>Load Excel File</button>
            <input type="file" className="file" name="fileUpload"
              onChange={handleInputChange}
              accept='.xlsx, .xls'
              ref={input => {
                inputFile = input
              }}
            />
          </>
        }
        {data.length > 0 && pageState === "table" && 
          <Table 
            data={data}
            toggleFormState={toggleFormState}
            setFormState={setFormState}
            setPageState={setPageState}
            togglePasta={togglePasta}
            toggleDiagram={toggleDiagram}
            setData={setData}/>
        }
        {pageState === "form" && 
          <Form 
            setFormState={setFormState}
            formState={formState}
            data={data}
            setPageState={setPageState}
            setData={setData}
            toggleFormState={toggleFormState}/>}
        {pageState === "pasta" && 
          <AnalyzeOne
            togglePasta={togglePasta}
            pastaData={pastaData}/>
        }
        {pageState === "diagram" && 
          <AnalyzeTwo
            toggleDiagram={toggleDiagram}
            diagramOptions={diagramOptions}
            diagramData={diagramData}/>
        }
      </div>
    </div>
  )
}

export default App;
