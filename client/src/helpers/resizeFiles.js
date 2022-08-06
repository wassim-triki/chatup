import Compress from 'compress.js';

const resizeFiles = async (files, size = 10, maxWidth, maxHeight) => {
  const compress = new Compress();
  const compressedFiles = await compress.compress(files, {
    size,
    quality: 1,
    maxWidth,
    maxHeight,
    resize: true,
  });
  const resizedFiles = compressedFiles.map((f) =>
    Compress.convertBase64ToFile(f.data, f.ext)
  );
  return resizedFiles.length === 1 ? resizedFiles[0] : resizedFiles;
};
export default resizeFiles;
