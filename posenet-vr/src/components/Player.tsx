import React, { useEffect, useRef } from 'react'
import styled from '@emotion/styled'

import * as posenet from '@tensorflow-models/posenet';
import '@tensorflow/tfjs-backend-webgl';


function Player() {
  const videoEl = useRef<HTMLVideoElement>(null);
  const output = useRef<HTMLCanvasElement>(null);
  let ctx = null;

  function drawKeypoint(keypoint: any) {
    
    console.log(keypoint)
    const circle = new Path2D();
    circle.arc(keypoint.x, keypoint.y, 4, 0, 2 * Math.PI);
    ctx.fill(circle);
    ctx.stroke(circle);
    
    raf();
  }
  function raf() {
    ctx.drawImage(videoEl.current, 0, 0, videoEl.current.videoWidth, videoEl.current.videoHeight);
    requestAnimationFrame(() => raf());
  }

  useEffect(function () {
    if (output.current !== null) {
      ctx = output.current.getContext('2d');
    }

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (stream) {
            if (videoEl.current !== null) {
                videoEl.current.srcObject = stream;
                return
            }
          })
          .then(async function () {
            if (videoEl.current !== null) {
              const scaleFactor = 0.50; // 이미지 크기 보정
              const flipHorizontal = false; //영상 이미지 반전 여부
              const outputStride = 16;
              // load the posenet model
              const net = await posenet.load();
              // const pose = await net.estimateSinglePose(videoEl.current, scaleFactor, flipHorizontal, outputStride);
              const pose = await net.estimateSinglePose(videoEl.current, {flipHorizontal: flipHorizontal});
              drawKeypoint(pose.keypoints);
            }
          })
          .catch(function (err0r) {
            console.log("Something went wrong!", err0r);
          });
      }
  })

  return (
    <CameraDiv>
        <canvas ref={output} width="500px" height="500px"></canvas>
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