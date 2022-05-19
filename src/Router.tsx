import { Routes, Route, Link } from "react-router-dom";

import {lazy} from 'preact/compat';
import { CustomSuspense } from "./components/CustomSuspense/CustomSuspense";


const AppPage = lazy(() => import('./pages/AppPage/AppPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));


export default function Router() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="app" element={<CustomSuspense><AppPage /></CustomSuspense>} />

      <Route path="app/inbox" element={<CustomSuspense><AppPage routeName="inbox" /></CustomSuspense>} />

      <Route path="app/servers/:serverId/:channelId" element={<CustomSuspense><AppPage routeName="server_messages" /></CustomSuspense>} />


      <Route path="app/explore/servers/invites/:inviteId" element={<CustomSuspense><AppPage routeName="explore_server" /></CustomSuspense>} />



      <Route path="login" element={<CustomSuspense><LoginPage /></CustomSuspense>} />
      <Route path="register" element={<CustomSuspense><RegisterPage /></CustomSuspense>} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}


function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}



function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
