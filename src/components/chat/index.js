// import React from 'react';
// import { Chat, Channel, ChannelList, ChannelListMessenger, ChannelPreviewMessenger, TypingIndicator, MessageInputFlat, MessageSimple, ChannelHeader, Thread, Window } from 'stream-chat-react';
// import { MessageList, MessageInput } from 'stream-chat-react';
// import { StreamChat } from 'stream-chat';
// import { Cookies } from 'react-cookie';

// import 'stream-chat-react/dist/css/index.css';


// const cookie = new Cookies();
// const uni = cookie.get('uni');
// // const chatClient = new StreamChat('qk4nn7rpcn75');
// // const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiYnJva2VuLXdhdGVyZmFsbC01In0.d1xKTlD_D0G-VsBoDBNbaLjO-2XWNA8rlTm4ru4sMHg';

// // chatClient.setUser(
// //   {
// //        id: 'broken-waterfall-5',
// //        name: 'Broken waterfall',
// //        image: 'https://getstream.io/random_svg/?id=broken-waterfall-5&amp;name=Broken+waterfall'
// //   },
// //   userToken,
// // );

// const chatClient = new StreamChat('wgyfusx8bby7');

// chatClient.setUser(
//   {
//     id: uni,
//     name: uni,
//   },
//   chatClient.devToken(uni)
// );

// const filters = { type: 'messaging', example: 1 };
// const sort = { last_message_at: -1 };

// const App = () => (
//   <Chat client={chatClient} theme={'messaging dark'}>
//   <ChannelList
//     filters={filters}
//     sort={sort}
//     List={ChannelListMessenger}
//     Preview={ChannelPreviewMessenger}
//     />
//   <Channel>
//     <Window>
//       <ChannelHeader />
//       <MessageList TypingIndicator={TypingIndicator} />
//       <MessageInput Input={MessageInputFlat} focus />
//     </Window>
//     <Thread Message={MessageSimple} />
//   </Channel>
// </Chat>
// );

// export default App;