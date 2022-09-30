import React, { Component } from "react";
import { createBrowserHistory as createHistory } from "history";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import FaceAuthLayout from "../layouts/FaceAuthLayout";
import EditProfile from "../Accounts/Profile/EditProfile";
import ProfileIndex from "../Accounts/Profile/ProfileIndex";
import NotFoundIndex from "../NotFound/NotFoundIndex";
import { Helmet } from "react-helmet";
import configuration from "react-global-configuration";
import { apiConstants } from "../Constant/constants";
import LandingPageLoader from "../Loader/LandingPageLoader";
import EmptyLayout from "../layouts/EmptyLayout";
import LandingPageIndex from "../LandingPageIndex/LandingPageIndex";
import HomePageIndex from "../Home/HomePageIndex";
import MessageIndex from "../Messages/MessageIndex";
import BookmarksIndex from "../Bookmarks/BookmarksIndex";
import BookmarkPhoto from "../Bookmarks/BookmarkPhoto";
import BookmarkVideo from "../Bookmarks/BookmarkVideo";
import ModelViewProfile from "../Model/ModelViewProfile";
import FollowingIndex from "../Accounts/FansFollowing/Following/FollowingIndex";
import BlockedIndex from "../Accounts/Blocked/BlockedIndex";
import ListIndex from "../Accounts/List/ListIndex";
import NotificationIndex from "../Notification/NotificationIndex";
import CreatePostIndex from "../Post/CreatePost/CreatePostIndex";
import FavoritesIndex from "../Accounts/Favorites/FavoritesIndex";
import PaymentsIndex from "../Accounts/Payments/PaymentsIndex";
import BankingIndex from "../Accounts/Payments/BankingIndex";
import CardsIndex from "../Accounts/Payments/CardsIndex";
import AddBankIndex from "../Accounts/Payments/AddBankIndex";
import Logout from "../Accounts/Logout";
import Wallet from "../Wallet/Wallet";
import UsersMapView from "../MapView/UsersMapView";
import BillingAccountIndex from "../Accounts/Payments/BillingAccountIndex";
import DocumentUploadIndex from "../DocumentUpload/DocumentUploadIndex";
import StaticPage from "../StaticPage/StaticPage";
import FanIndex from "../Accounts/FansFollowing/Fans/FanIndex";
import PostView from "../Post/PostView";
import ResetPassword from "../LandingPageIndex/ResetPassword";
import UploadProfilePicture from "../Accounts/Profile/UploadProfilePicture";
import api from "../../Environment";
import LiveStream from "../LiveStream/LiveStream";
import LiveStreamCreate from "../LiveStream/Create/LiveStreamCreate";
import StreamListIndex from "../LiveStream/StreamListIndex";
import VideoCall from "../VideoCall/VideoCall";
import VideoListIndex from "../VideoCall/VideoListIndex";
import StripeConnectRedirect from "../Model/StripeConnectRedirect";
import StripeConnect from "../Stripe/StripeConnect";
import FaceDetection from "../FaceDetection/FaceDetection";
import FaceSuccess from "../FaceDetection/FaceSuccess";
import FaceError from "../FaceDetection/FaceError";

import {
  setTranslations,
  setDefaultLanguage,
  translate,
  setLanguage,
} from "react-multi-lang";
import en from "../../language/en/translation.json";
import es from "../../language/sp/translation.json";

setTranslations({ en,es });

const history = createHistory();
const $ = window.$;

const AppRoute = ({
  component: Component,
  layout: Layout,
  screenProps: ScreenProps,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => (
      <Layout screenProps={ScreenProps} {...props}>
        <Component {...props} />
      </Layout>
    )}
    isAuthed
  />
);

const PrivateRoute = ({
  component: Component,
  layout: Layout,
  screenProps: ScreenProps,
  authentication,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      authentication === true ? (
        <Layout screenProps={ScreenProps}>
          <Component {...props} authRoute={true} />
        </Layout>
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

class App extends Component {
  constructor(props) {
    super(props);
    let userId = localStorage.getItem("userId");
    let accessToken = localStorage.getItem("accessToken");
    this.state = {
      loading: true,
      configLoading: true,
      authentication: userId && accessToken ? true : false,
    };

    history.listen((location, action) => {
      userId = localStorage.getItem("userId");

      accessToken = localStorage.getItem("accessToken");

      this.setState({
        loading: true,
        authentication: userId && accessToken ? true : false,
      });

      document.body.scrollTop = 0;
    });
  }

  componentDidMount() {
    this.fetchConfig();
    let userLanguage = localStorage.getItem("lang")
        ? localStorage.getItem("lang")
        : "en";
        console.log(userLanguage);
        localStorage.setItem("lang", userLanguage);
        setLanguage(userLanguage);
  }

  async fetchConfig() {
    try {
      const response = await fetch(apiConstants.settingsUrl);
      const configValue = await response.json();

      configuration.set({ configData: configValue.data }, { freeze: false });
      this.setState({ configLoading: false });
    } catch (error) {
      configuration.set({ configData: [] }, { freeze: false });
      this.setState({ configLoading: false });
    }

    $("#google_analytics").html(
      configuration.get("configData.google_analytics")
    );

    $("#header_scripts").html(configuration.get("configData.header_scripts"));

    $("#body_scripts").html(configuration.get("configData.body_scripts"));
  }

  render() {
    const isLoading = this.state.configLoading;

    if (isLoading) {
      return (
        // Place content loadder here
        <div>{/* <HomeLoader></HomeLoader> */}</div>
      );
    }
    return (
      <>
        <Helmet>
          <title>{configuration.get("configData.site_name")}</title>
          <link
            rel="icon"
            type="image/png"
            href={api.serviceUrl()+'/'+configuration.get("configData.site_icon")}
            // sizes="16x16"
          />
        </Helmet>
        <Switch>
          <AppRoute
            path={"/"}
            component={LandingPageIndex}
            exact
            layout={AuthLayout}
          />

          <AppRoute
            path={"/face-detection"}
            component={FaceDetection}
            layout={FaceAuthLayout}
          />

          <AppRoute
            path={"/success/yoti"}
            component={FaceSuccess}
            layout={FaceAuthLayout}
          />

          <AppRoute
            path={"/error/yoti"}
            component={FaceError}
            layout={FaceAuthLayout}
          />


          <PrivateRoute
            authentication={this.state.authentication}
            path={"/home"}
            component={HomePageIndex}
            layout={MainLayout}
          />

          <PrivateRoute
            authentication={this.state.authentication}
            path={"/streamList"}
            component={StreamListIndex}
            layout={MainLayout}
          />

          <PrivateRoute
            authentication={this.state.authentication}
            path={"/callRequest"}
            component={VideoListIndex}
            layout={MainLayout}
          />

          <PrivateRoute
            authentication={this.state.authentication}
            path={"/liveStream/:stream_id"}
            component={LiveStream}
            layout={MainLayout}
          />

          <PrivateRoute
            authentication={this.state.authentication}
            path={"/liveStreamCreate"}
            component={LiveStreamCreate}
            layout={MainLayout}
          />

          <PrivateRoute
            authentication={this.state.authentication}
            path={"/call/:user_id"}
            component={VideoCall}
            layout={MainLayout}
          />

          <PrivateRoute
            authentication={this.state.authentication}
            path={"/inbox"}
            component={MessageIndex}
            layout={MainLayout}
          />

          <PrivateRoute
            authentication={this.state.authentication}
            path={"/posts-create"}
            component={CreatePostIndex}
            layout={MainLayout}
          />
          <PrivateRoute
            authentication={this.state.authentication}
            path={"/post/:post_unique_id"}
            component={PostView}
            layout={MainLayout}
          />

          <PrivateRoute
            authentication={this.state.authentication}
            path={"/bookmarks"}
            component={BookmarksIndex}
            layout={MainLayout}
          />

          <PrivateRoute
            authentication={this.state.authentication}
            path={"/bookmark-photo"}
            component={BookmarkPhoto}
            layout={MainLayout}
          />
          <PrivateRoute
            authentication={this.state.authentication}
            path={"/bookmark-video"}
            component={BookmarkVideo}
            layout={MainLayout}
          />
          <PrivateRoute
            authentication={this.state.authentication}
            path={"/following"}
            component={FollowingIndex}
            layout={MainLayout}
          />
          <PrivateRoute
            authentication={this.state.authentication}
            path={"/blocked"}
            component={BlockedIndex}
            layout={MainLayout}
          />
          <PrivateRoute
            authentication={this.state.authentication}
            path={"/fans"}
            component={FanIndex}
            layout={MainLayout}
          />
          <PrivateRoute
            authentication={this.state.authentication}
            path={"/favorites"}
            component={FavoritesIndex}
            layout={MainLayout}
          />

          <PrivateRoute
            authentication={this.state.authentication}
            path={"/list"}
            component={ListIndex}
            layout={MainLayout}
          />

          <PrivateRoute
            authentication={this.state.authentication}
            path={"/edit-profile"}
            component={EditProfile}
            layout={MainLayout}
          />

          <PrivateRoute
            authentication={this.state.authentication}
            path={"/profile"}
            component={ProfileIndex}
            layout={MainLayout}
          />

          <PrivateRoute
            authentication={this.state.authentication}
            path={"/user_map_view"}
            component={UsersMapView}
            layout={MainLayout}
          />

          <PrivateRoute
            authentication={this.state.authentication}
            path={"/notification"}
            component={NotificationIndex}
            layout={MainLayout}
          />

          <PrivateRoute
            authentication={this.state.authentication}
            path={"/payments"}
            component={PaymentsIndex}
            layout={MainLayout}
          />

          <PrivateRoute
            authentication={this.state.authentication}
            path={"/billing-accounts"}
            component={BillingAccountIndex}
            layout={MainLayout}
          />

          <PrivateRoute
            authentication={this.state.authentication}
            path={"/cards"}
            component={CardsIndex}
            layout={MainLayout}
          />

          <PrivateRoute
            authentication={this.state.authentication}
            path={"/add-bank"}
            component={AddBankIndex}
            layout={MainLayout}
          />

          <PrivateRoute
            authentication={this.state.authentication}
            path={"/banking"}
            component={BankingIndex}
            layout={MainLayout}
          />

          <PrivateRoute
            authentication={this.state.authentication}
            path={"/wallet"}
            component={Wallet}
            layout={MainLayout}
          />

          <PrivateRoute
            authentication={this.state.authentication}
            path={"/stripe-connect"}
            component={StripeConnect}
            layout={MainLayout}
          />

          <PrivateRoute
            authentication={this.state.authentication}
            path={"/stripe-connect-redirect"}
            component={StripeConnectRedirect}
            layout={MainLayout}
          />

          <PrivateRoute
            authentication={this.state.authentication}
            path={"/document-upload"}
            component={DocumentUploadIndex}
            layout={MainLayout}
          />

          <AppRoute
            path={"/page/:title"}
            component={StaticPage}
            layout={MainLayout}
          />

          <AppRoute
            path={"/reset-password/:token"}
            component={ResetPassword}
            layout={AuthLayout}
          />

          <PrivateRoute
            authentication={this.state.authentication}
            path={"/upload-profile-picture"}
            component={UploadProfilePicture}
            layout={MainLayout}
          />

          <PrivateRoute
            authentication={this.state.authentication}
            path={"/logout"}
            component={Logout}
            layout={MainLayout}
          />
          {/* Dont move this route to top */}
          <PrivateRoute
            authentication={this.state.authentication}
            path={"/:username"}
            component={ModelViewProfile}
            layout={MainLayout}
          />

          <Route path="*" component={NotFoundIndex} />
        </Switch>
      </>
    );
  }
}

export default App;
