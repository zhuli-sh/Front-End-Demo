/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import styles from "./App.module.css";
import Home from "./pages/homepage";
import Categories from "./pages/categories";
import Sell from "./pages/sell";
import Results from "./pages/results";
import GoogleLogin from "./components/login";
import GoogleLogout from "./components/logout";
import { Route, useLocation, useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import Signup from "./pages/userInfoForm";
import Profile from "./pages/profile";
import UserMenu from "./components/userMenu";
import axios from "axios";
import { Cookies } from "react-cookie";
import ChatApp from './components/chat';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import { Chat, Channel, ChannelList, ChannelListMessenger, ChannelPreviewMessenger, TypingIndicator, MessageInputFlat, MessageSimple, ChannelHeader, Thread, Window } from 'stream-chat-react';
import { MessageList, MessageInput } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import { AcUnit } from "@material-ui/icons";
import Scanner from './components/qrScanner';
import Orders from './pages/Orders';
import Listings from './pages/Listings';
import ListingForm from './pages/editListing';
import Checkout from './pages/Checkout';

import 'stream-chat-react/dist/css/index.css';

function App() {
  const cookie = new Cookies();
  const uniCookie = cookie.get('uni');
  const history = useHistory();
  const location = useLocation();
  const [value, setValue] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [uni, setUni] = useState('');
  const [dim, setDim] = useState(false);
  const pathName = location.pathname.slice(1);
  console.log(location.pathname.slice(1));

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = async () => {
    if (!value) {
      return;
    }
    let response;
    if (
      (value.length === 13 && !value.includes(" ")) ||
      value.split("-").join("").length === 13
    ) {
      response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/books?isbn=${value}`
      );

      console.log(response);
    } else {
      response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/books?title=${value}`
      );
    }
    setValue('');
    history.push({
      pathname: `/results`,
      search: `?query=${value}`,
      state: response.data
    });
    // history.push("/results");
  };

  // const client = new StreamChat('wgyfusx8bby7');

  const client = new StreamChat('r6h6jhk9jyzq');
  if (uniCookie) {
    client.setUser(
      {
        id: uniCookie,
        name: uniCookie,
      },
      client.devToken(uniCookie)
    );
    client.on('typing.start', event => {
      console.log("new message");
    })
  }



  const filter = { type: 'messaging', members: { $in: [uniCookie] } };
  const sort = { last_message_at: -1 };

  const ChatApp = () => (
    <Chat client={client} theme={'messaging dark'}>
      <ChannelList
        filters={filter}
        sort={sort}
        List={ChannelListMessenger}
        Preview={ChannelPreviewMessenger}
      />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList TypingIndicator={TypingIndicator} />
          <MessageInput Input={MessageInputFlat} focus />
        </Window>
        <Thread Message={MessageSimple} />
      </Channel>
    </Chat>
  );

  useEffect(() => {
    const setup = function () {
      if (uniCookie) {
        setSignedIn(true);
        setUni(uniCookie);
      }
    }
    setup();
  }, [])

  // const getChannels = async () => {
  //   const filter = { type: 'messaging', members: { $in: ['zl2890'] } };
  //   const sort = { last_message_at: -1 };

  //   const channels = await client.queryChannels(filter, sort, {
  //     watch: true,
  //     state: true,
  //   });

  //   console.log(channels);
  // }

  const createChatUser = async (userUni) => {
    console.log("uni", userUni);
    client.disconnect();
    client.setUser(
      {
        id: userUni,
        name: userUni,
      },
      client.devToken(userUni)
    );
  }

  const createConversation = async (bookName, sellerUni) => {
    const conversation = client.channel('messaging', {
      name: `${bookName}`,
      members: [uni, sellerUni]
    })

    await conversation.create()
    setChatOpen(true);
  }

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const closeChat = () => {
    setChatOpen(false);
  }

  return (
    <div className={dim ? styles.dimApp : styles.App}>
      {signedIn && <div className={styles.chatButton} onClick={() => {
        setChatOpen(true);
      }}>
        <QuestionAnswerOutlinedIcon />
      </div>}
      {(signedIn && chatOpen) ? (
        <div className={styles.chatContainer}>
          <div className={styles.innerChatContainer}>
            {ChatApp()}
            <div className={styles.closeChatButton} onClick={closeChat}>close</div>
          </div>
        </div>
      ) : null}
      <div className={pathName !== "" ? styles.header : styles.header_home}>
        {/* <Scanner /> */}
        {pathName !== "" && (
          <div className={styles.headerInputContainer}>
            <div
              className={styles.homeButton}
              data-testid="header-home-button"
              onClick={() => {
                history.push("/");
              }}
            >
              <span className={styles.book}>Book</span>
              <span className={styles.delight}>Delight</span>
            </div>
            <div
              className={styles.homeButtonMobile}
              data-testid="header-home-button"
              onClick={() => {
                history.push("/");
              }}
            >
              <span className={styles.book}>B</span>
              <span className={styles.delight}>D</span>
            </div>
            {pathName !== "sell" && (
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  value={value}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  className={styles.input}
                  placeholder="search by book title or ISBN"
                  data-testid="header-search-input"
                />
                <div
                  className={styles.iconContainer}
                  onClick={handleSubmit}
                  data-testid="header-search-button"
                >
                  <SearchIcon fontSize="inherit" />
                </div>
              </div>
            )}
          </div>
        )}
        <div className={styles.buttons}>
          {signedIn ? (
            <UserMenu setSignedIn={setSignedIn} setUni={setUni} />
          ) : (
              <GoogleLogin setSignedIn={setSignedIn} createChatUser={createChatUser} setUni={setUni} />
            )}
          <div
            className={styles.lightButton}
            onClick={
              signedIn
                ? () => {
                  history.push("/sell");
                }
                : () => {
                  alert("You must log in first!");
                }
            }
          >
            Sell
          </div>
        </div>
        {pathName === "" && <div className={styles.buttonsMobile}>
          {signedIn ? (
            <UserMenu setSignedIn={setSignedIn} setUni={setUni} pathName={pathName} />
          ) : (
              <GoogleLogin setSignedIn={setSignedIn} createChatUser={createChatUser} setUni={setUni}/>
            )}
          <div
            className={styles.lightButtonMobile}
            onClick={
              signedIn
                ? () => {
                  history.push("/sell");
                }
                : () => {
                  alert("You must log in first!");
                }
            }
          >
            Sell
          </div>
        </div>}
      </div>
      <div className={styles.content}>
        <Route exact path="/" component={Home} />
        <Route exact path="/categories" component={Categories} />
        <Route exact path="/sell" component={Sell} />
        <Route exact path="/results" render={(props) => (
          <Results {...props} createConversation={createConversation} />
        )} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/user/update" component={Signup} />
        <Route exact path="/user/profile" component={Profile} />
        <Route exact path="/orders" component={Orders} />
        <Route exact path="/listings" render={(props) => (
          <Listings {...props} setDim={setDim} />
        )} />
        <Route exact path="/listings/:listingId/edit" component={ListingForm} />
      </div>
    </div>
  );
}

export default App;
