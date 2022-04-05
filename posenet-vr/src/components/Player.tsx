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
  const modelTree = {
    "0": "1",
    "1": "3",
    "2": "0",
    "4": "2",
    "5": "11",
    "6": "5",
    "7": "5",
    "8": "6",
    "9": "7",
    "10": "8",
    "11": "12",
    "12": "6",
    "13": "11",
    "14": "12",
    "15": "13",
    "16": "14",
  }

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
    poses[0]?.keypoints.forEach((el, idx) => {
      if (el.score >= 0.3) {
        const circle = new Path2D();
        circle.arc(el.x, el.y, 4, 0, 2 * Math.PI);
        ctx.fill(circle);
        ctx.fillStyle = "#00ff2a";
        ctx.strokeStyle = "#00ff2a";
        ctx.stroke(circle);
        if (modelTree.hasOwnProperty(String(idx)) && poses[0].keypoints[parseInt(modelTree[String(idx)])].score >= 0.3) {
          ctx.beginPath();
          ctx.strokeStyle = '#fff';
          ctx.moveTo(poses[0].keypoints[idx].x, poses[0].keypoints[idx].y);
          ctx.lineTo(poses[0].keypoints[modelTree[String(idx)]].x, poses[0].keypoints[modelTree[String(idx)]].y);
          ctx.stroke();
        }
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