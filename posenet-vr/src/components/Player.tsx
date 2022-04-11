import React, { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import Posenet from '../utils/posenet';
import Canvas from '../utils/canvas';

function Player() {
  const videoEl = useRef<HTMLVideoElement>(null);
  const output = useRef<HTMLCanvasElement>(null);
  const [initPoses, setInitPoses] = useState(null);

  const posenet = new Posenet();
  let canvas;

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

    const eyes = {
      "left_eye": {},
      "right_eye": {},
    };
    try {
      const poses = await posenet.getPoses(videoEl.current);

      if (initPoses === null && poses[0]) {
        setInitPoses(poses[0].keypoints);
      }
      
      canvas.ctx.drawImage(videoEl.current, 0, 0, videoEl.current.videoWidth, videoEl.current.videoHeight);
      
      poses[0]?.keypoints.forEach((el, idx) => {
        if (el.score >= 0.3) {
          canvas.drawPoint(el.x, el.y);
          if (modelTree.hasOwnProperty(String(idx)) && poses[0].keypoints[parseInt(modelTree[String(idx)])].score >= 0.3) {
            canvas.drawSkeleton(poses[0].keypoints[idx].x, poses[0].keypoints[idx].y, poses[0].keypoints[modelTree[String(idx)]].x, poses[0].keypoints[modelTree[String(idx)]].y);
          }
          if (el.name === "left_eye" || el.name === "right_eye") {
            eyes[el.name] = el;
          }
        }
      })
      
    } catch (error) {
      
    }

    requestAnimationFrame(() => raf());
  }
  useEffect(function () {
    if (output.current !== null) {
      canvas = new Canvas(output.current.getContext('2d'));
    }

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: {width: 500, height: 500, frameRate: 60}})
      .then(function (stream) {
        if (videoEl.current !== null) {
            videoEl.current.srcObject = stream;
            raf();
            return
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