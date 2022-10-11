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
import { AccessTokenProvider } from '../authContext/context';
import { BlogHomePage } from '../blogHomePage/loadable';
import { BlogLoginPage } from '../blogLoginPage/loadable';
import { BlogPostCreatePage } from '../blogPostCreatePage/loadable';
import { BlogPostViewPage } from '../blogPostViewPage/loadable';
// import { Render } from '../renderer/renderer v3/cube/Render';
// import { Render } from '../renderer/grid/Render';


// TODO Helmet
// TODO: https://www.w3schools.com/react/react_router.asp - proper paths and routes
// TODO Feature toggling

function App() {
  return (
    <SchemeSettings>
            <AccessTokenProvider>
        <Router>
          <Navbar isVertical={false} />
            <Logger />
              <Routes>
                {/* <Route path="/" element={<Layout />}>
                  <Route index element={<HomePage />} />
                </Route> */}
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
                {/* <Route path="*" element={<NoPage />} /> */}
                <Route path={`${RouteType.BlogHome}`} element={<BlogHomePage />} />
                <Route path={`${RouteType.BlogRegister}`} element={<BlogLoginPage />} />
                <Route path={`${RouteType.BlogLogin}`} element={<BlogLoginPage />} />
                <Route path={`${RouteType.BlogPostCreate}`} element={<BlogPostCreatePage />} />
                <Route path={`${RouteType.BlogPost}`} element={<BlogPostViewPage />} />
              </Routes>
        </Router>
            </ AccessTokenProvider>
    </SchemeSettings>
  );
}
export default App;