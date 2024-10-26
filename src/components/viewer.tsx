import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { PointCloudOctree, Potree } from '@pix4d/three-potree-loader';
import { CameraControls } from './camera-controls';

export class Viewer {
  private targetEl: HTMLElement | undefined;
  private renderer = new WebGLRenderer();
  private scene = new Scene();
  private camera = new PerspectiveCamera(45, NaN, 0.1, 1000);
  private cameraControls = new CameraControls(this.camera);
  private potree = new Potree();
  private pointClouds: PointCloudOctree[] = [];
  private prevTime: number | undefined;
  private reqAnimationFrameHandle: number | undefined;

  initialize(targetEl: HTMLElement): void {
    if (this.targetEl || !targetEl) return;

    this.targetEl = targetEl;
    targetEl.appendChild(this.renderer.domElement);

    this.resize();
    window.addEventListener('resize', this.resize);

    requestAnimationFrame(this.loop);
  }

  destroy(): void {
    if (this.targetEl) {
      this.targetEl.removeChild(this.renderer.domElement);
      this.targetEl = undefined;
      window.removeEventListener('resize', this.resize);

      if (this.reqAnimationFrameHandle !== undefined) {
        cancelAnimationFrame(this.reqAnimationFrameHandle);
      }
    }
  }

  load(fileName: string, baseUrl: string): Promise<PointCloudOctree> {
    return this.potree
      .loadPointCloud(fileName, (url) => `${baseUrl}${url}`)
      .then((pco: PointCloudOctree) => {
        this.scene.add(pco);
        this.pointClouds.push(pco);
        return pco;
      });
  }

  update(dt: number): void {
    this.cameraControls.update(dt);
    this.potree.updatePointClouds(this.pointClouds, this.camera, this.renderer);
  }

  render(): void {
    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);
  }

  loop = (time: number): void => {
    this.reqAnimationFrameHandle = requestAnimationFrame(this.loop);

    const prevTime = this.prevTime;
    this.prevTime = time;
    if (prevTime === undefined) return;

    this.update(time - prevTime);
    this.render();
  };

  resize = () => {
    if (this.targetEl) {
      const { width, height } = this.targetEl.getBoundingClientRect();
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    }
  };
}
