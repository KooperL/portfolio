
import { useContext, useEffect, useState } from 'react';
import { postCapture, postMonitor } from '../../containers/App/api/loggerApi';
import { CapturePOSTPayload, MonitorPOSTPayload } from './types';





  interface Props {
    capturePost: Function; 
    monitorPost: Function; 
  }

function Logger(props: Props) {
  const [identity, setIdentity] = useState(false);

  useEffect(() => {
    if(!localStorage.getItem('uuid')) {
      let uuid = '';
      let validChars = 'abcdefghijklmnopqrstuvwxyz'
      for(let i=0;i<20;i++) {
        let random = Math.random();
        if(random>0.8) {
          uuid = uuid.concat(parseInt((random*10).toString()).toString());
        } else {
          const index = Math.floor(Math.random() * validChars.length);
          let alpha = validChars[index];
          uuid = uuid.concat(index%2?alpha.toLowerCase():alpha.toUpperCase());
        }
      }
      localStorage.setItem('uuid', uuid);
    }
    // const isDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches   //todo
    
    const canvasHash = document.getElementById('canvas-hash')?.innerText ?? '';
    if((!localStorage.getItem('canvas-hash')) || (localStorage.getItem('canvas-hash') !== canvasHash)) {
      localStorage.setItem('canvas-hash', canvasHash?.toString());
      props.capturePost({
        fingerprint: document.getElementById('canvas-hash')?.innerText,
        session_id: localStorage.getItem('uuid')
        // plugins: JSON.stringify([].slice.call(navigator.plugins).map((item: any) => {
        //   return {
        //     name: item.name,
        //     filename: item.filename,
        //     description: item.description,
        //   }
        // })) ?? null,
        // window: {
        //   innerHeight: window.innerHeight ?? null,
        //   outerHeight: window.outerHeight ?? null,
        //   innerWidth: window.innerWidth ?? null,
        //   outerWidth: window.outerWidth ?? null,
        // },
        // screen: {
        //   actualHeight: window.screen.height ??  null,  // window.screen might not be valid in safari
        //   actualWidth: window.screen.width ??  null,
        //   pixelDepth: window.screen.pixelDepth ??  null,
        // },
        // navigator: {
        //   'platform': navigator.platform ?? null,
        //   'cookieEnabled': navigator.cookieEnabled ?? null,
        //   'java': navigator.javaEnabled ?? null,
        //   'online': navigator.onLine ?? null
        // }
      }).then((resp: CapturePOSTPayload) => {
        if(resp.success) {
        } else {
          throw new Error(resp.error);
        }
      }).catch((err: any) => {
        console.log(err);   //TODO
      })
    }
    props.monitorPost({session_id: localStorage.getItem('uuid'), href: window.location.href}).then((resp: MonitorPOSTPayload) => {
      if(resp.success) {
      } else {
        throw new Error(resp.error);
      }
    }).catch((err: any) => {
      console.log(err)
    })
  }, [])


  return (
    <></>
  );
}

const enhance = (): JSX.Element => {
  return(
    <Logger capturePost={postCapture} monitorPost={postMonitor} />
  ) 
};

export default enhance;