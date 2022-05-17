import React, { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import Posenet from '../utils/posenet';
import Canvas from '../utils/canvas';

import useStore from "../utils/store";
import { modelTree } from "../utils/movenetTree";

function Player() {
  const videoEl = useRef<HTMLVideoElement>(null);
  const output = useRef<HTMLCanvasElement>(null);
  const imageEl = useRef<HTMLImageElement>(null);
  let initPoses = null;
  let init_Y = 0;
  let init_X = 0;
  let init_right_arm_distance = 0;
  // const setInitX = useStore((state) => state.rotateX);
  const setRotateX = useStore((state) => state.setRotateX);
  const setRotateY = useStore((state) => state.setRotateY);
  const setRightArmRotateY = useStore((state) => state.setRightArmRotateY);
  const setRightArmRotateZ = useStore((state) => state.setRightArmRotateZ);

  const posenet = new Posenet();
  let canvas;

  async function raf(mediaType: string) {

    if (mediaType === 'video' && videoEl.current.readyState < 2) {
      await new Promise((resolve) => {
        videoEl.current.onloadeddata = () => {
          resolve(videoEl.current);
        };
      });
    }

    try {
      let poses;
      mediaType === 'video' ? poses = await posenet.getPoses(videoEl.current) : poses = await posenet.getPoses(imageEl.current);

      if (initPoses === null && poses[0]) {
        initPoses = poses[0].keypoints;
        //얼굴 
        init_Y = ((initPoses[3].y + initPoses[4].y) / 2) - initPoses[0].y;
        init_X = ((initPoses[2].x - initPoses[4].x) + (initPoses[3].x - initPoses[1].x)) / 2;
        
        //오른팔
        init_right_arm_distance = Math.sqrt(Math.pow((initPoses[6].x - initPoses[8].x),2) + Math.pow((initPoses[6].y - initPoses[8].y),2));

        console.log(initPoses)
      }

      canvas.ctx.drawImage(videoEl.current, 0, 0, videoEl.current.videoWidth, videoEl.current.videoHeight);
      poses[0]?.keypoints.forEach((el, idx) => {
        if (el.score >= 0.3) {
          canvas.drawPoint(el.x, el.y);
          if (modelTree.hasOwnProperty(String(idx)) && poses[0].keypoints[parseInt(modelTree[String(idx)])].score >= 0.3) {
            canvas.drawSkeleton(poses[0].keypoints[idx].x, poses[0].keypoints[idx].y, poses[0].keypoints[modelTree[String(idx)]].x, poses[0].keypoints[modelTree[String(idx)]].y);
          }
        }
      })

      // 얼굴 //
      if (poses[0].keypoints[3].score >= 0.3 && poses[0].keypoints[4].score >= 0.3 && poses[0].keypoints[0].score >= 0.3) {
        const ear_Y = ((poses[0].keypoints[3].y + poses[0].keypoints[4].y) / 2) - poses[0].keypoints[0].y;
        setRotateX(init_Y - ear_Y);
      }
      if ((poses[0].keypoints[2].score >= 0.3 && poses[0].keypoints[4].score >= 0.3) || (poses[0].keypoints[3].score >= 0.3 && poses[0].keypoints[1].score >= 0.3)) {
        if (!(poses[0].keypoints[2].score >= 0.3 && poses[0].keypoints[4].score >= 0.3)) {
          setRotateY(-(poses[0].keypoints[3].x - poses[0].keypoints[1].x - init_X));
        } else if (!(poses[0].keypoints[3].score >= 0.3 && poses[0].keypoints[1].score >= 0.3)) {
          setRotateY(poses[0].keypoints[2].x - poses[0].keypoints[4].x - init_X);
        } else {
          (poses[0].keypoints[2].x - poses[0].keypoints[4].x) > (poses[0].keypoints[3].x - poses[0].keypoints[1].x) ? 
            setRotateY(poses[0].keypoints[2].x - poses[0].keypoints[4].x - init_X) : setRotateY(-(poses[0].keypoints[3].x - poses[0].keypoints[1].x - init_X));
        }
      }

      // 오른팔 : poses[0].keypoints[6], poses[0].keypoints[8], poses[0].keypoints[10]
      if (poses[0].keypoints[6].score >= 0.3 && poses[0].keypoints[8].score >= 0.3) {
        poses[0].keypoints[6].x - poses[0].keypoints[8].x >= 0 ?
          setRightArmRotateZ(poses[0].keypoints[8].y - poses[0].keypoints[6].y) : setRightArmRotateZ(251 + (poses[0].keypoints[6].y - poses[0].keypoints[8].y));

        let currentArmDistance = Math.sqrt(Math.pow((poses[0].keypoints[8].x - poses[0].keypoints[6].x), 2) + Math.pow((poses[0].keypoints[8].y - poses[0].keypoints[6].y), 2));
        poses[0].keypoints[6].x - poses[0].keypoints[8].x >= 0 ?
        setRightArmRotateY((((init_right_arm_distance - currentArmDistance) * 100) / init_right_arm_distance) - 1) : setRightArmRotateY(((((currentArmDistance - init_right_arm_distance) * 100) / init_right_arm_distance) - 1));
      }



    } catch (error) {
      
    }

    if (mediaType === 'video') { requestAnimationFrame(() => raf(mediaType)) };
  }

  useEffect(function () {
    if (output.current !== null) {
      canvas = new Canvas(output.current.getContext('2d'));
    }

    navigator.mediaDevices.getUserMedia({ video: {width: 500, height: 500, frameRate: 60}})
    .then(function (stream) {
      if (videoEl.current !== null) {
          videoEl.current.srcObject = stream;
          raf('video');
          return
      }
    })
    .catch(function (err0r) {
      console.log("Something went wrong!", err0r);
      setTimeout(function () {
        raf('img');
      }, 2000);
    });

  },[])

  return (
    <CameraDiv>
        <canvas ref={output} width="500px" height="500px"></canvas>
        <video ref={videoEl} autoPlay={ true } id="videoElement">
        </video>

        {/* <ImgEl ref={imageEl} src='/images/top.webp' alt='대체이미지'></ImgEl> */}
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
    position: relative;
    video {
        width: 100%;
        height: 100%;
        display: none;
    }
`
const ImgEl = styled.img`
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: .4;
`
