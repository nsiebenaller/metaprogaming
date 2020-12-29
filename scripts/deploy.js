const fs = require("fs");
const path = require("path");
const AdmZip = require("adm-zip");
const package = require("../package.json");

async function deploy() {
    // Increment package version
    const v = package.version.split(".");
    const nextVersion = `${v[0]}.${v[1]}.${parseInt(v[2]) + 1}`;
    package.version = nextVersion;
    const new_package = JSON.stringify(package, undefined, 4);

    const success = await new Promise((resolve) => {
        fs.writeFile(path.resolve("./package.json"), new_package, (err) => {
            if (err) {
                console.error("ERROR: ", err);
                resolve(false);
            }
            resolve(true);
        });
    });
    if (!success) {
        console.error("Error updating package.json");
        return;
    }

    const zip = new AdmZip();
    const rootDir = __dirname + "/../";

    // Folders
    const ebextDir = rootDir + ".ebextensions";
    const platformDir = rootDir + ".platform";
    const distDir = rootDir + "dist";
    const publicDir = rootDir + "public";
    const srcDir = rootDir + "src";

    // Files
    const envFile = rootDir + ".env";
    const sqlFile = rootDir + ".sequelizerc";
    const swcFile = rootDir + ".swcrc";
    const nodemonFile = rootDir + "nodemon.json";
    const packageFile = rootDir + "package.json";
    const tsconfigFile = rootDir + "tsconfig.json"; // may not be necessary
    const webpackFile = rootDir + "webpack.config.js";

    // Add Folders
    zip.addLocalFolder(ebextDir);
    zip.addLocalFolder(platformDir);
    zip.addLocalFolder(distDir);
    zip.addLocalFolder(publicDir);
    zip.addLocalFolder(srcDir);

    // Add Files
    zip.addLocalFile(envFile);
    zip.addLocalFile(sqlFile);
    zip.addLocalFile(swcFile);
    zip.addLocalFile(nodemonFile);
    zip.addLocalFile(packageFile);
    zip.addLocalFile(tsconfigFile);
    zip.addLocalFile(webpackFile);

    const buildPath = rootDir + `build/build_${nextVersion}.zip`;
    zip.writeZip(buildPath);
}
deploy();
