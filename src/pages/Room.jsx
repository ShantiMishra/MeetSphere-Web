import React from 'react'
import {useParams} from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';


const Room = () => {
  
  let{roomId}=useParams()           //.... We can access the roomId variable that we have created in the App.jsx  by useParams() which is the feature of router dom


  //Copied from zegocloud to generate the random id.
  function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}


  // Generate key token (provided by the zegocloud)...
  const appID = 1325307515;
  const serverSecret = "3b80f6a45529693ecd7a083e9df9cd1f";
  const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId,  randomID(5),  randomID(5));

  
  // start the call
  let myMeeting = async (element) => {
      // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      // start the call
      zp.joinRoom({
        container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.LiveStreaming,
        },
        sharedLinks:[
          {name:"copy link" , 
          url:`http://localhost:5173/room/${roomId}`}
          
        ]
      });
  };


  return (
   <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  )
}

export default Room
