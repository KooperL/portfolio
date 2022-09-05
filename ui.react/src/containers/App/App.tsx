import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { HomePage } from '../homePage/loadable';
import { MrnaPage } from '../mrnaPage/loadable';
import { PropertyPage } from '../propertyPage/loadable';
import { FuelPricesPage } from '../fuelPricesPage/loadable';
import { SecondaryPage } from '../secondaryPage/loadable';
import { SeqAlignPage } from '../seqAlignPage/loadable';
import { TictactoePage } from '../tictactoePage/loadable';
// import { Render } from '../renderer/grid/Render';
import { RouteType } from './routeTypes';
import { SchemeSettings } from '../context/colourScheme';


// TODO fingerprint, helmet, proper logs

function App() {
  return (
    <SchemeSettings>
      <Router>
        <Navbar isVertical={false} />
          <Routes>
            <Route path={`${RouteType.Home}`} element={<HomePage />} />
            {/* <Route path={`${RouteType.Render}`} element={<Render/>} /> */}
            <Route path={`${RouteType.Tictactoe}`} element={<TictactoePage />} />
            <Route path={`${RouteType.Fuelprices}`} element={<FuelPricesPage />} />
            <Route path={`${RouteType.Property}`} element={<PropertyPage />} />
            <Route path={`${RouteType.Mrna}`} element={<MrnaPage />} />
            <Route path={`${RouteType.Secondary}`} element={<SecondaryPage />} />
            <Route path={`${RouteType.Seqalign}`} element={<SeqAlignPage />} />
            {/* <Route path={`${RouteType.Heatmap}`} element={<SeqAlignPage />} /> */}
          </Routes>
      </Router>
    </SchemeSettings>
  );
}
export default App;


// This site started out as a resume project but quickly turned into a passion project as I kept on adding to it. 

// This website is a full stack project in its most current head. The back-end is a combination of SQLite and mongoDB , both hosted locally. The middleware is a flask WSGI REST server written in python 3.x, it was originally all there was to the website as I used to inject into static Jinja templates. Soon after, I developed a front-end layer using javascript and ReactJS, but then refactored with the addition of typescript and tailwind/postCSS. Both the middleware and front-end are served using NGINX on a baremetal VPS in Amazon AWS' Lightsail. Secure API calls are made using Cloudflare's namespaces.
// Load balance, easily deployalbe with seperate feature branches for technologies and libraries I'm trying to implement