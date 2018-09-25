import React from "react";

import { Button, Link } from "../Components/Buttons";
import "../styles/home.scss";

import UpdateBanner from "../Components/UpdateBanner";
import * as ServiceWorker from "../utils/service-worker";

import { AudioConsumer } from "../Components/AudioManager";
import Footer from "../Components/Footer";
import Hamburger from "../Components/Hamburger";
import { fetchCurrentGame } from "../utils/game";

function AppLogo() {
  return (
    <div className="logo shape1">
      <div className="shape2" />
      <div className="shape2" />
      <div className="shape2" />
      <div className="shape2 shape3" />
    </div>
  );
}

class Home extends React.Component {
  state = {
    showBanner: false
  };
  UNSAFE_componentWillMount() {
    ServiceWorker.onUpdate(() => {
      this.setState({ showBanner: true });
    });
  }
  clickHandler = (mute, muted) => {
    mute(!muted);
    mute(muted);
    this.props.history.replace("/new-game", fetchCurrentGame());
  };
  render() {
    const { props } = this;
    return (
      <div className="home">
        {this.state.showBanner && <UpdateBanner />}
        <AppLogo />
        <AudioConsumer>
          {({ methods, muted }) => (
            <Button onClick={e => this.clickHandler(methods.mute, muted)}>
              Play
            </Button>
          )}
        </AudioConsumer>
        <Link onClick={e => props.history.replace("/history")}>
          View History
        </Link>
        <div className="hamburger-wrapper">
          <Hamburger onClick={() => props.history.replace("/setting")} />
        </div>
        <Footer />
      </div>
    );
  }
}
export default Home;