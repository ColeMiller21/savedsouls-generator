const { default: axios } = require("axios");
const { config } = require("../../web3/config");
const Jimp = require("jimp");
const { getContract } = require("../../web3/getContract");

export default async function handler(req, res) {
  let { id } = req.query;
  if (!id) res.status(400).send({ message: "id is required" });
  try {
    let c = getContract("ss");
    let uri = await c.tokenURI(id);
    let { data } = await axios.get(formatURI(uri));
    let img_buffer = await getBufferFromImg(formatURI(data.image));
    let { hex, imgText } = getColorsFromMetadata(data.attributes);
    let imageData = await generateImage(hex, imgText, img_buffer);
    res.setHeader("Content-Type", Jimp.MIME_PNG);
    res.setHeader("Content-Length", imageData.length);
    res.send(imageData);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

const WIDTH = 500;
const HEIGHT = 500;

const formatURI = (ipfs) => {
  let uri = ipfs.replace("ipfs://", "https://ipfs.io/ipfs/");
  return uri;
};

const getBufferFromImg = async (link) => {
  let { data: imageBuffer } = await axios.get(link, {
    responseType: "arraybuffer",
  });
  return imageBuffer;
};

const generateImage = async (hex, text, imgBuffer) => {
  let image = await Jimp.read(imgBuffer);
  image.resize(250, 250);
  // Create a new Jimp image object with the specified background color and dimensions
  const jimpImg = new Jimp(WIDTH, HEIGHT, hex);

  // Load the desired fognt
  let font = await Jimp.loadFont(
    "./data/font/OnBcukLVpLJksloVQuiwrbM5.ttf.fnt"
  );
  // Add the text to the image at the top center position
  jimpImg.print(
    font,
    30, // x
    10, // y
    {
      text: text,
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
    },
    500 - 30 * 2, // maxWidth (use same width as base cover image to center correctly)
    200 // maxHeight
  );
  // Add the image to the image at the bottom center position
  const imgX = (WIDTH - image.bitmap.width) / 2;
  const imgY = HEIGHT - image.bitmap.height;
  jimpImg.composite(image, imgX, imgY);
  // Save the resulting image to a buffer as a JPEG

  //   let imageData = await jimpImg.getBase64Async(Jimp.MIME_PNG);
  const buffer = await jimpImg.getBufferAsync(Jimp.MIME_PNG);

  return buffer;
};

const getColorsFromMetadata = (metadata) => {
  let { backgrounds, text } = config;
  let hex, imgText;
  for (const data of metadata) {
    let { trait_type, value } = data;
    if (trait_type === "Background") {
      hex = backgrounds[value];
    }
    if (trait_type === "Eyes") {
      imgText = text[value];
    }
  }
  return { hex, imgText };
};
