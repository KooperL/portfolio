import { useContext, useEffect, useState } from 'react';
import { postCapture, postMonitor } from '../../containers/App/api/loggerApi';
import { LoggingPOSTResponse } from './types';


interface Props {
  capturePost: Function; 
  monitorPost: Function; 
}

function generateUniqueToken(length: number) {
  let token = '';
  let validChars = 'abcdefghijklmnopqrstuvwxyz'
  for(let i=0;i<length;i++) {
    let random = Math.random();
    if(random>0.8) {
      token = token.concat(parseInt((random*10).toString()).toString());
    } else {
      const index = Math.floor(Math.random() * validChars.length);
      let alpha = validChars[index];
      token = token.concat(index%2?alpha.toLowerCase():alpha.toUpperCase());
    }
  }
  return token
}

function Logger(props: Props) {
  useEffect(() => {
    // TODO hash all three items
    if(!localStorage.getItem('uuid')) {
      localStorage.setItem('uuid', generateUniqueToken(10));
    }
    if(!sessionStorage.getItem('session_id')) {
      sessionStorage.setItem('session_id', generateUniqueToken(20));
    }

    const canvasHash = document.getElementById('canvas-hash')?.innerText ?? '';
    if((!localStorage.getItem('canvas-hash')) || (localStorage.getItem('canvas-hash') !== canvasHash)) {
      localStorage.setItem('canvas-hash', canvasHash?.toString());
      // TODO
      // @ts-ignore 
      const [browserVar, versionVar] = (() => {
        const { userAgent } = navigator
        let match = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
        let temp
        if (/trident/i.test(match[1])) {
          temp = /\brv[ :]+(\d+)/g.exec(userAgent) || []
          return `IE ${temp[1] || ''}`
        }
        if (match[1] === 'Chrome') {
          temp = userAgent.match(/\b(OPR|Edge)\/(\d+)/)
          if (temp !== null) {
            return temp.slice(1).join(' ').replace('OPR', 'Opera')
          }
          temp = userAgent.match(/\b(Edg)\/(\d+)/)
          if (temp !== null) {
            return temp.slice(1).join(' ').replace('Edg', 'Edge (Chromium)')
          }
        }
        match = match[2] ? [ match[1], match[2] ] : [ navigator.appName, navigator.appVersion, '-?' ]
        temp = userAgent.match(/version\/(\d+)/i)
        if (temp !== null) {
          match.splice(1, 1, temp[1])
        }
        return match
      })()
      props.capturePost({
        canvas_hash: document.getElementById('canvas-hash')?.innerText,
        uuid: localStorage.getItem('uuid'),
        // windowInfo: {
          // plugins: JSON.stringify([].slice.call(navigator.plugins).map((item: any) => {
          //   return {
          //     name: item.name,
          //     filename: item.filename,
          //     description: item.description,
          //   }
          // })) ?? null,
          // window: {
          innerHeight: +window.innerHeight ?? 123,
          outerHeight: +window.outerHeight ?? 123,
          innerWidth: +window.innerWidth ?? 123,
          outerWidth: +window.outerWidth ?? 123,
          // },
          // screen: {
          actualHeight: +window.screen.height ??  123,  // window.screen might not be valid in safari
          actualWidth: +window.screen.width ??  123,
          pixelDepth: +window.screen.pixelDepth ??  123,
          // },
          // navigator: {
          platform: navigator.platform ?? 'null',
          cookieEnabled: +navigator.cookieEnabled ?? 2,
          // 'java': navigator.javaEnabled ?? null,
          // 'online': navigator.onLine ?? null,
          // },
        // }
        darkMode: +window.matchMedia("(prefers-color-scheme: dark)").matches ?? 2,
        browser: browserVar ?? 'null',
        version: versionVar ?? 'null'
      }).then((resp: LoggingPOSTResponse) => {
        if(resp.success) {
        } else {
          throw new Error(resp.error);
        }
      }).catch((err: any) => {
        console.log(err);   //TODO
      })
    }
    props.monitorPost({
      uuid: localStorage.getItem('uuid'),
      session_id: sessionStorage.getItem('session_id'),
      page: window.location.pathname,
      ...(localStorage.getItem('currentPage') && {prevPage: localStorage.getItem('currentPage')})
    }).then((resp: LoggingPOSTResponse) => {
      if(resp.success) {
        localStorage.setItem('currentPage', window.location.pathname)
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