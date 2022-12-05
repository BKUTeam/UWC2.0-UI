import RenderSidebarCollectorList from './ListCollector/SidebarList';
// import RenderSidebarJanitorList from '../Janitor/ListJanitor/SidebarList';

export default function RightSideBar({ content }) {
    return <RenderSidebarCollectorList collectors={content} />;
}
