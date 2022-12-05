import JanitorCard from './JanitorCard'


export default function RenderSidebarList() {
    return (
        <div>
            <JanitorCard completed={true}/>
            <JanitorCard completed={false}/>
            <JanitorCard completed={true}/>
            <JanitorCard completed={false}/>
        </div>
    )
}   