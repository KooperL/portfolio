import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "@components/Navbar"
import { HomePage } from "../homePage/loadable"
import { ProjectsPage } from "../projectsPage/loadable"
import { MrnaPage } from "../mrnaPage/loadable"
import { PropertyPage } from "../propertyPage/loadable"
import { FuelPricesPage } from "../fuelPricesPage/loadable"
import { SecondaryPage } from "../secondaryPage/loadable"
import { SeqAlignPage } from "../seqAlignPage/loadable"
import { TictactoePage } from "../tictactoePage/loadable"
import { RandomBioPage } from "../randomBioPage/loadable"
import { ForumRouteType, IndexRouteType, ProjectsRouteType } from "./routeTypes"
import { SchemeSettings } from "../context/colourScheme"
import { MinesweeperPage } from "../minesweeperPage/loadable"
import { JsSimPage } from "../jsSimPage/loadable"
import { ContactPage } from "../contactPage/loadable"
import { AboutPage } from "../aboutPage/loadable"
import { Logger } from "@components/Logger/loadable"
import { AccessTokenProvider } from "../authContext/context"
import { ForumHomePage } from "../forumHomePage/loadable"
import { ForumUserPage } from "../forumUserPage/loadable"
import { ForumLoginPage } from "../forumLoginPage/loadable"
import { ForumPostCreatePage } from "../forumPostCreatePage/loadable"
import { ForumPostViewPage } from "../forumPostViewPage/loadable"
// import { Render } from '../renderer/renderer v3/cube/Render';
// import { Render } from '../renderer/grid/Render';

// TODO Helmet
// TODO Feature toggling

function App() {
  return (
    <SchemeSettings>
      <AccessTokenProvider>
        <Router>
          <Navbar isVertical={false} />
          <Logger />
          <Routes>
            {/* element={<Layout />} */}
            <Route path={IndexRouteType.Home}>
              <Route
                index
                element={<HomePage />}
              />
              <Route
                path={`${IndexRouteType.About}`}
                element={<AboutPage />}
              />
              <Route
                path={`${IndexRouteType.Contact}`}
                element={<ContactPage />}
              />
            </Route>
            {/* <Route path={`${RouteType.Home}`} element={<HomePage />} /> */}
            <Route path={ProjectsRouteType.ProjectsHome}>
              <Route
                index
                element={<ProjectsPage />}
              />
              {/* <Route path={`${ProjectsRouteType.Render}`} element={<Render />} /> */}
              <Route
                path={`${ProjectsRouteType.Tictactoe}`}
                element={<TictactoePage />}
              />
              <Route
                path={`${ProjectsRouteType.Fuelprices}`}
                element={<FuelPricesPage />}
              />
              <Route
                path={`${ProjectsRouteType.Property}`}
                element={<PropertyPage />}
              />
              <Route
                path={`${ProjectsRouteType.Mrna}`}
                element={<MrnaPage />}
              />
              <Route
                path={`${ProjectsRouteType.Secondary}`}
                element={<SecondaryPage />}
              />
              <Route
                path={`${ProjectsRouteType.Seqalign}`}
                element={<SeqAlignPage />}
              />
              <Route
                path={`${ProjectsRouteType.RandomBio}`}
                element={<RandomBioPage />}
              />
              <Route
                path={`${ProjectsRouteType.Minesweeper}`}
                element={<MinesweeperPage />}
              />
              <Route
                path={`${ProjectsRouteType.JsSim}`}
                element={<JsSimPage />}
              />
              {/* <Route path={`${RouteType.Heatmap}`} element={<SeqAlignPage />} /> */}
              {/* <Route path="*" element={<NoPage />} /> */}
            </Route>
            <Route path={ForumRouteType.ForumHome}>
              <Route
                index
                element={<ForumHomePage />}
              />
              <Route
                path={`${ForumRouteType.ForumRegister}`}
                element={<ForumLoginPage />}
              />
              <Route
                path={`${ForumRouteType.ForumLogin}`}
                element={<ForumLoginPage />}
              />
              <Route
                path={`${ForumRouteType.ForumPostCreate}`}
                element={<ForumPostCreatePage />}
              />
              <Route
                path={`${ForumRouteType.ForumPost}/:postId`}
                element={<ForumPostViewPage />}
              />
              <Route
                path={`${ForumRouteType.ForumUser}/:username`}
                element={<ForumUserPage />}
              />
            </Route>
          </Routes>
        </Router>
      </AccessTokenProvider>
    </SchemeSettings>
  )
}
export default App
