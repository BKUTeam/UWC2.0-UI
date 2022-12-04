import CollectorCard from './CollectorCard'
import CollectorInfo from '../CollectorInfo/info'
import { useState } from 'react'


export default function RenderSidebarList() {
    const [showList, setShowList] = useState(true);
    const [showInfo, setShowInfo] = useState(false);
    const [getID, setID] = useState('');

    return (
        <>
        {   
            <div>
                <CollectorCard showInfo={showInfo} setShowInfo={setShowInfo} completed={true}/>
                <CollectorCard showInfo={showInfo} setShowInfo={setShowInfo} completed={false}/>
                <CollectorCard showInfo={showInfo} setShowInfo={setShowInfo} completed={false}/>
            </div>
        }
        {
            <div>
                <CollectorInfo/>
                <CollectorInfo/>
                <CollectorInfo/>
            </div>
        }
        </>

    )
}   