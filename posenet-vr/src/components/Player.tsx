import React, { useEffect, useRef } from 'react'

import styled from '@emotion/styled'

function Player() {
  const videoEl = useRef<HTMLVideoElement>(null);

  useEffect(function () {
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(function (stream) {
            if (videoEl.current !== null) {
                videoEl.current.srcObject = stream;
            }
          })
          .catch(function (err0r) {
            console.log("Something went wrong!");
          });
      }
  })

  return (
    <CameraDiv>
        <video ref={videoEl} autoPlay={ true } id="videoElement">

        </video>
    </CameraDiv>
  )
}

export default Player

const CameraDiv = styled.div`
    width: 500px;
    height: 500px;
    border-radius: 10px;
    background-color: #2a54c9;
    margin: 0px 20px;
    video {
        width: 100%;
        height: 100%;
    }
`