import ImageKit from "@imagekit/nodejs";
import config from "../config/config.js";

const imageKit = new ImageKit({
  privateKey: config.IMAGEKIT_PRIVATE_KEY,
  publicKey: config.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: config.IMAGEKIT_URL_ENDPOINT,
});

export async function uploadFile({buffer, fileName }) {

}
