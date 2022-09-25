import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { HomePage } from '../homePage/loadable';
import { ProjectsPage } from '../projectsPage/loadable';
import { MrnaPage } from '../mrnaPage/loadable';
import { PropertyPage } from '../propertyPage/loadable';
import { FuelPricesPage } from '../fuelPricesPage/loadable';
import { SecondaryPage } from '../secondaryPage/loadable';
import { SeqAlignPage } from '../seqAlignPage/loadable';
import { TictactoePage } from '../tictactoePage/loadable';
import { RandomBioPage } from '../randomBioPage/loadable';
import { RouteType } from './routeTypes';
import { SchemeSettings } from '../context/colourScheme';
import { MinesweeperPage } from '../minesweeperPage/loadable';
import { JsSimPage } from '../jsSimPage/loadable';
import { ContactPage } from '../contactPage/loadable';
import { AboutPage } from '../aboutPage/loadable';
import { Logger } from '../../components/Logger/loadable';
// import { Render } from '../renderer/renderer v3/cube/Render';
// import { Render } from '../renderer/grid/Render';


// TODO Helmet, proper logs

function App() {
  return (
    <SchemeSettings>
        <Router>
          <Navbar isVertical={false} />
            <Logger />
            <Routes>
              <Route path={`${RouteType.Home}`} element={<HomePage />} />
              <Route path={`${RouteType.About}`} element={<AboutPage />} />
              <Route path={`${RouteType.Contact}`} element={<ContactPage />} />
              <Route path={`${RouteType.Projects}`} element={<ProjectsPage />} />
              {/* <Route path={`${RouteType.Render}`} element={<Render />} /> */}
              <Route path={`${RouteType.Tictactoe}`} element={<TictactoePage />} />
              <Route path={`${RouteType.Fuelprices}`} element={<FuelPricesPage />} />
              <Route path={`${RouteType.Property}`} element={<PropertyPage />} />
              <Route path={`${RouteType.Mrna}`} element={<MrnaPage />} />
              <Route path={`${RouteType.Secondary}`} element={<SecondaryPage />} />
              <Route path={`${RouteType.Seqalign}`} element={<SeqAlignPage />} />
              <Route path={`${RouteType.RandomBio}`} element={<RandomBioPage />} />
              <Route path={`${RouteType.Minesweeper}`} element={<MinesweeperPage />} />
              <Route path={`${RouteType.JsSim}`} element={<JsSimPage />} />
              {/* <Route path={`${RouteType.Heatmap}`} element={<SeqAlignPage />} /> */}
            </Routes>
        </Router>
    </SchemeSettings>
  );
}
export default App;