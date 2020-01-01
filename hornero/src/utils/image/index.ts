import Exif from "exif-js";

import {Orientation, ORIENTATIONS} from "./orientations";

const MAX_SQUARE = 5000000; // ios max canvas square
const MAX_SIZE = 4096; // ie max canvas dimensions

type Dimensions = {
  height: number;
  width: number;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
function getOrientation(image: any): Promise<Orientation> {
  return new Promise<Orientation>((resolve) => {
    Exif.getData(image, function (this: any) {
      const orientation = Exif.getTag(this, "Orientation") || 1;
      resolve(ORIENTATIONS[orientation]);
    });
  });
}
/* eslint-enable @typescript-eslint/no-explicit-any */

function getProportionalDimensions(image: HTMLCanvasElement, maxHeight: number, maxWidth: number): Dimensions {
  let [height, width] = [image.height, image.width];
  const ratio = height / width;
  if (height > maxHeight) {
    height = maxHeight;
    width = Math.round(maxHeight / ratio);
  }
  if (width > maxWidth) {
    height = Math.round(maxWidth * ratio);
    width = maxWidth;
  }
  return {
    height,
    width,
  }
}

function rotateImage(image: HTMLImageElement, translate: Orientation): HTMLCanvasElement {
  const [height, width] = (translate.rotation === 0 || translate.rotation === 180) ? [image.height, image.width] : [image.width, image.height];
  const canvas = document.createElement("canvas");
  canvas.height = height;
  canvas.width = width;
  const context = canvas.getContext("2d");
  context?.translate(width/2, height/2);
  context?.rotate(translate.rotation * Math.PI / 180);
  context?.scale(translate.xScale, translate.yScale);
  context?.drawImage(image, -image.width/2, -image.height/2, image.width, image.height);
  return canvas;
}

function protect(image: HTMLCanvasElement): HTMLCanvasElement {
  const ratio = image.width/image.height;
  let maxWidth = Math.floor(Math.sqrt(MAX_SQUARE * ratio));
  let maxHeight = Math.floor(MAX_SQUARE / Math.sqrt(MAX_SQUARE * ratio));
  if (maxWidth > MAX_SIZE) {
    maxWidth = MAX_SIZE;
    maxHeight = Math.round(maxWidth / ratio);
  }
  if (maxHeight > MAX_SIZE) {
    maxHeight = MAX_SIZE;
    maxWidth = Math.round(ratio * maxHeight);
  }
  if (image.width > maxWidth) {
    const canvas = document.createElement("canvas");
    canvas.width = maxWidth;
    canvas.height = maxHeight;
    canvas.getContext("2d")?.drawImage(image, 0, 0, maxWidth, maxHeight);
    image = canvas;
  }
  return image;
}

function resizeImage(image: HTMLCanvasElement, targetHeight: number, targetWidth: number): HTMLCanvasElement {
  // Resizing in steps refactored to use a solution from
  // https://blog.uploadcare.com/image-resize-in-browsers-is-broken-e38eed08df01
  image = protect(image);

  // Use the Polyfill for Math.log2() since IE doesn't support log2
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log2#Polyfill
  let steps = Math.ceil(Math.log(image.width / targetWidth) * Math.LOG2E);
  if (steps < 1) {
    steps = 1;
  }
  let width = targetWidth * Math.pow(2, steps - 1);
  let height = targetHeight * Math.pow(2, steps - 1);
  const x = 2;
  while (steps--) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d")?.drawImage(image, 0, 0, width, height);
    image = canvas;
    width = Math.round(width / x);
    height = Math.round(height / x);
  }
  return image;
}

export function createPreviewURL(image: Blob, maxHeight: number, maxWidth: number): Promise<string> {
  const originalURL = URL.createObjectURL(image);
  const onload = new Promise<HTMLImageElement>(function (resolve, reject) {
    const image = new Image();
    image.src = originalURL;
    image.addEventListener("load", function () {
      URL.revokeObjectURL(originalURL);
      resolve(image);
    });
    image.addEventListener("error", function (event) {
      URL.revokeObjectURL(originalURL);
      reject(event.error || new Error("cannot create image"));
    });
  });
  return Promise.all([onload, getOrientation(image)]).then(([image, orientation]) => {
    const rotatedImage = rotateImage(image, orientation);
    const dimensions = getProportionalDimensions(rotatedImage, maxHeight, maxWidth);
    const resizedImage = resizeImage(rotatedImage, dimensions.height, dimensions.width);
    return canvasToBlob(resizedImage, "image/png");
  }).then(URL.createObjectURL);
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob> {
  try {
    canvas.getContext("2d")?.getImageData(0, 0, 1, 1);
  } catch (err) {
    if (err.code === 18) {
      return Promise.reject(new Error("cannot read image, probably an svg with external resources"));
    }
  }
  return new Promise<Blob | null>(function (resolve) {
    canvas.toBlob(resolve, type, quality);
  }).then(function (blob): Blob {
    if (!blob) {
      throw new Error("cannot read image, probably an svg with external resources");
    }
    return blob;
  });
}
