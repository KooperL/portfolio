import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "../../components/Navbar"
import { HomePage } from "../homePage/loadable"
import { ProjectsPage } from "../projectsPage/loadable"
import { MrnaPage } from "../mrnaPage/loadable"
import { PropertyPage } from "../propertyPage/loadable"
import { FuelPricesPage } from "../fuelPricesPage/loadable"
import { SecondaryPage } from "../secondaryPage/loadable"
import { SeqAlignPage } from "../seqAlignPage/loadable"
import { TictactoePage } from "../tictactoePage/loadable"
import { RandomBioPage } from "../randomBioPage/loadable"
import { SchemeSettings } from "../../state/colorScheme/colourScheme"
import { MinesweeperPage } from "../minesweeperPage/loadable"
import { JsSimPage } from "../jsSimPage/loadable"
import { ContactPage } from "../contactPage/loadable"
import { AboutPage } from "../aboutPage/loadable"
import { Logger } from "../../components/Logger/loadable"
import { AuthProvider } from "../../state/authContext/context"
import { ForumHomePage } from "../forumHomePage/loadable"
import { ForumUserPage } from "../forumUserPage/loadable"
import { ForumLoginPage } from "../forumLoginPage/loadable"
import { ForumPostCreatePage } from "../forumPostCreatePage/loadable"
import { ForumPostViewPage } from "../forumPostViewPage/loadable"
import { SiteAnalysisPage } from "../siteAnalysisPage/loadable"
import Redirect from "../../components/Redirect"
import * as baseHandler from "src/api/clients/ApiHandler/types"
import { forumPath, routes } from "./types"
import { projectPath } from "src/api/shared/types"
import { ErrorProvider } from "src/state/errorHandler/context"
import ErrorPage from "src/containers/ErrorPage"
import WithErrorHandling from "src/controllers/withErrorHandling"
// import { Render } from '../renderer/renderer v3/cube/Render';
// import { Render } from '../renderer/grid/Render';

// TODO Helmet
// TODO Feature toggling

function BaseLayout() {
  return ( 
      <Router>
        <AuthProvider>
          <Navbar isVertical={false} />
          <Logger />
          <Routes>
            {/* element={<Layout />} */}
            <Route path={baseHandler.indexPath}>
              <Route
                index
                element={<HomePage />}
              />
              <Route
                path={"home"}
                element={<Redirect destination={baseHandler.indexPath} />}
              />
              <Route
                path={`${routes.about}`}
                element={<AboutPage />}
              />
              <Route
                path={`${routes.contact}`}
                element={<ContactPage />}
              />
            </Route>
            <Route path={projectPath}>
              <Route
                index
                element={<ProjectsPage />}
              />
              {/* <Route path={`${routes.Render}`} element={<Render />} /> */}
              <Route
                path={`${routes.tictactoe}`}
                element={<TictactoePage />}
              />
              <Route
                path={`${routes.fuelprices}`}
                element={<FuelPricesPage />}
              />
              <Route
                path={`${routes.property}`}
                element={<PropertyPage />}
              />
              <Route
                path={`${routes.mrna}`}
                element={<MrnaPage />}
              />
              <Route
                path={`${routes.secondary}`}
                element={<SecondaryPage />}
              />
              <Route
                path={`${routes.seqalign}`}
                element={<SeqAlignPage />}
              />
              <Route
                path={`${routes.siteanalysis}`}
                element={<SiteAnalysisPage />}
              />
              <Route
                path={`${routes.randombio}`}
                element={<RandomBioPage />}
              />
              <Route
                path={`${routes.minesweeper}`}
                element={<MinesweeperPage />}
              />
              <Route
                path={`${routes.jssim}`}
                element={<JsSimPage />}
              />
              {/* <Route path={`${RouteType.Heatmap}`} element={<SeqAlignPage />} /> */}
              {/* <Route path="*" element={<NoPage />} /> */}
            </Route>
            <Route path={forumPath}>
              <Route
                index
                element={<ForumHomePage />}
              />
              <Route
                path={`${routes.forumRegister}`}
                element={<ForumLoginPage />}
              />
              <Route
                path={`${routes.forumLogin}`}
                element={<ForumLoginPage />}
              />
              <Route
                path={`${routes.forumPostCreate}`}
                element={<ForumPostCreatePage />}
              />
              <Route
                path={`${routes.forumPostView}/:postId`}
                element={<ForumPostViewPage />}
              />
              <Route
                path={`${routes.forumUserView}/:username`}
                element={<ForumUserPage />}
              />
            </Route>
            <Route path="*" element={<ErrorPage errorMessage="Page not found" errorType="CLIENT" decorator="404"/>} />
          </Routes>
        </AuthProvider>
      </Router>)
}

function App() {
  return (
    <ErrorProvider>
      <SchemeSettings>
        <WithErrorHandling>
          <BaseLayout />
        </WithErrorHandling>
      </SchemeSettings>
    </ErrorProvider>
  )
}
export default App
