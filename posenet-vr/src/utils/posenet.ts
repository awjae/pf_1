import * as poseDetection from '@tensorflow-models/pose-detection';
import { SupportedModels } from '@tensorflow-models/pose-detection';
import '@tensorflow/tfjs-backend-webgl';

export default class Posenet {
    private model: SupportedModels;
    private detector: any;
    private poses: Object;

    constructor() {
        this.model = poseDetection.SupportedModels.MoveNet;
        this.setDetector();
    }
    async setDetector() {
        this.detector = await poseDetection.createDetector(this.model);
    }

    async getPoses(el) {
        return this.detector.estimatePoses(el)
    }    
}