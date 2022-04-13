import React, { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import Posenet from '../utils/posenet';
import Canvas from '../utils/canvas';

import useStore from "../utils/store";
import { modelTree } from "../utils/movenetTree";

function Player() {
  const videoEl = useRef<HTMLVideoElement>(null);
  const output = useRef<HTMLCanvasElement>(null);
  let initPoses = null;
  const name = useStore((state) => state.text);

  const posenet = new Posenet();
  let canvas;

  async function raf() {

    if (videoEl.current.readyState < 2) {
      await new Promise((resolve) => {
        videoEl.current.onloadeddata = () => {
          resolve(videoEl.current);
        };
      });
    }

    const faces = {};
    try {
      const poses = await posenet.getPoses(videoEl.current);

      if (initPoses === null && poses[0]) {
        initPoses = poses[0].keypoints;
        console.log(initPoses)
      }
      canvas.ctx.drawImage(videoEl.current, 0, 0, videoEl.current.videoWidth, videoEl.current.videoHeight);
      
      poses[0]?.keypoints.forEach((el, idx) => {
        if (el.score >= 0.3) {
          canvas.drawPoint(el.x, el.y);
          if (modelTree.hasOwnProperty(String(idx)) && poses[0].keypoints[parseInt(modelTree[String(idx)])].score >= 0.3) {
            canvas.drawSkeleton(poses[0].keypoints[idx].x, poses[0].keypoints[idx].y, poses[0].keypoints[modelTree[String(idx)]].x, poses[0].keypoints[modelTree[String(idx)]].y);
          }
          faces[el.name] = el;
        }
      })
      
    } catch (error) {
      
    }

    requestAnimationFrame(() => raf());
  }
  useEffect(function () {
    console.log(name)
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