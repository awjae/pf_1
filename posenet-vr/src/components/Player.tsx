import React, { useEffect, useRef } from 'react'
import styled from '@emotion/styled'

import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
// Register one of the TF.js backends.
import '@tensorflow/tfjs-backend-webgl';

function Player() {
  const videoEl = useRef<HTMLVideoElement>(null);
  const output = useRef<HTMLCanvasElement>(null);
  let ctx = null;
  let detector = null;
  let model = null

  async function raf() {

    if (videoEl.current.readyState < 2) {
      await new Promise((resolve) => {
        videoEl.current.onloadeddata = () => {
          resolve(videoEl.current);
        };
      });
    }
    
    
    const poses = await detector.estimatePoses(videoEl.current);
    ctx.drawImage(videoEl.current, 0, 0, videoEl.current.videoWidth, videoEl.current.videoHeight);
    poses[0]?.keypoints.forEach(el => {
      if (el.score >= 0.3) {
        const circle = new Path2D();
        circle.arc(el.x, el.y, 4, 0, 2 * Math.PI);
        ctx.fill(circle);
        ctx.stroke(circle);
      }
    })
    requestAnimationFrame(() => raf());
  }

  async function checkCamera() {
    model = poseDetection.SupportedModels.MoveNet;
    detector = await poseDetection.createDetector(model);
    
    raf();
  }

  useEffect(function () {
    if (output.current !== null) {
      ctx = output.current.getContext('2d');
      ctx.fillStyle = "#00ff2a";
    }

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: {width: 500, height: 500, frameRate: 60}})
      .then(function (stream) {
        if (videoEl.current !== null) {
            videoEl.current.srcObject = stream;
            return
        }
      })
      .then(function () {
        if (videoEl.current !== null) {
          checkCamera();
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