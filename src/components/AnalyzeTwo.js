import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
const AnalyzeTwo = ({diagramOptions, diagramData, toggleDiagram}) => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    )
    return(
        <>
            <button className='load' onClick={toggleDiagram}>Bağla</button>
            <div className='container analyze-container'>
                <Bar options={diagramOptions} data={diagramData} />
            </div>
        </>
    )
}
export default AnalyzeTwo;