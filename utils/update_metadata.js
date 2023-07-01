const fs = require("fs");
const console = require("console");
const path = require("path");
const basePath = process.cwd();
const buildDir = `${basePath}/build/json`;

const getJsons = (_dir) => {
  try {
    return fs
      .readdirSync(_dir)
      .filter((item) => {
        let extension = path.extname(`${_dir}${item}`);
        if (extension == ".json") {
          return item;
        }
      })
      .map((i) => {
        return {
          filename: i,
          path: `${_dir}/${i}`,
        };
      });
  } catch {
    return null;
  }
};

const startCreating = async () => {
  const jsons = getJsons(buildDir);
  if (jsons == null) {
    console.log("Please generate collection first.");
    return;
  }
  let sortedJson = jsons.sort((a, b) => {
    if (a.filename < b.filename) {
      return -1;
    }
    if (a.filename > b.filename) {
      return 1;
    }
    return 0;
  });

  let metadataList = [];
  sortedJson.forEach((jsonObject) => {
    let rawdata = fs.readFileSync(jsonObject.path);
    let data = JSON.parse(rawdata);
    metadataList.push(data);
  });

  let sortedMetadataList = metadataList.sort((a, b) => {
    if (a.edition < b.edition) {
      return -1;
    }
    if (a.edition > b.edition) {
      return 1;
    }
    return 0;
  });

  fs.writeFileSync(`${buildDir}/_metadata.json`, JSON.stringify(sortedMetadataList, null, 2));
};

startCreating();
