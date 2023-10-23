import { PieChart } from 'react-minimal-pie-chart';

const AnalyzeOne = ({pastaData, togglePasta}) => {
    return(
        <>
            <button className='load' onClick={togglePasta}>Bağla</button>
            <div className='container analyze-container'>
                <PieChart
                data={[
                    { title: 'Status: 0', value: pastaData.firstTypes, color: 'lightBlue' },
                    { title: 'Status: 1', value: pastaData.secondTypes, color: 'green' },
                    { title: 'Status: 2', value: pastaData.thirdTypes, color: 'yellow' },
                ]}
                />
            </div>
            <div className='container analyze-container space-between'>
                <div>
                    <div></div>
                    Status: 0
                    <p>{"% " + (pastaData.firstTypes/(pastaData.firstTypes + pastaData.secondTypes + pastaData.thirdTypes)*100).toFixed(2)}</p>
                    <p>{pastaData.firstTypes}</p>
                </div>
                <div>
                <div style={{backgroundColor:"green"}}></div>
                    Status: 1
                    <p>{"% " + (pastaData.secondTypes/(pastaData.firstTypes + pastaData.secondTypes + pastaData.thirdTypes)*100).toFixed(2)}</p>
                    <p>{pastaData.secondTypes}</p>
                </div>
                <div>
                    <div style={{backgroundColor:"yellow"}}></div>
                    Status: 2
                    <p>{"% " + (pastaData.thirdTypes/(pastaData.firstTypes + pastaData.secondTypes + pastaData.thirdTypes)*100).toFixed(2)}</p>
                    <p>{pastaData.thirdTypes}</p>
                </div>
            </div>
        </>
    );
}
export default AnalyzeOne;