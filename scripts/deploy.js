const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const package = require("../package.json");

async function deploy() {
    // Increment package version
    console.log("Incrementing package version");
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

    // Zip required files
    const rootDir = __dirname + "/../";
    const buildPath = rootDir + `build/build_${nextVersion}.zip`;
    const archive = createZip(buildPath);

    // Folders
    const ebextDir = rootDir + ".ebextensions";
    const platformDir = rootDir + ".platform";
    const distDir = rootDir + "dist";
    const publicDir = rootDir + "public";
    const srcDir = rootDir + "src";

    // Files
    const envFile = ".env";
    const sqlFile = ".sequelizerc";
    const swcFile = ".swcrc";
    const nodemonFile = "nodemon.json";
    const packageFile = "package.json";
    const tsconfigFile = "tsconfig.json"; // may not be necessary
    const webpackFile = "webpack.config.js";

    // Add Folders
    addFolder(archive, ebextDir);
    addFolder(archive, platformDir);
    addFolder(archive, distDir);
    addFolder(archive, publicDir);
    addFolder(archive, srcDir);

    // Add Files
    addFile(archive, envFile);
    addFile(archive, sqlFile);
    addFile(archive, swcFile);
    addFile(archive, nodemonFile);
    addFile(archive, packageFile);
    addFile(archive, tsconfigFile);
    addFile(archive, webpackFile);

    // finalize the archive (ie we are done appending files but streams have to finish yet)
    await archive.finalize();
    console.log(`Zip has been created: "${buildPath}"`);
}
deploy();

function createZip(zipPath) {
    // create a file to stream archive data to.
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip");

    // listen for all archive data to be written
    // 'close' event is fired only when a file descriptor is involved
    output.on("close", function () {
        console.log(archive.pointer() + " total bytes");
        console.log(
            "archiver has been finalized and the output file descriptor has closed."
        );
    });

    // This event is fired when the data source is drained no matter what was the data source.
    // It is not part of this library but rather from the NodeJS Stream API.
    // @see: https://nodejs.org/api/stream.html#stream_event_end
    output.on("end", function () {
        console.log("Data has been drained");
    });

    // good practice to catch warnings (ie stat failures and other non-blocking errors)
    archive.on("warning", function (err) {
        if (err.code === "ENOENT") {
            // log warning
        } else {
            // throw error
            throw err;
        }
    });

    // good practice to catch this error explicitly
    archive.on("error", function (err) {
        throw err;
    });

    // pipe archive data to the file
    archive.pipe(output);

    return archive;
}

function addFolder(archive, folderPath) {
    archive.directory(folderPath, getFolderName(folderPath));
}

function addFile(archive, file) {
    archive.file(file, { name: file });
}

function getFolderName(folderPath) {
    const parts = path.normalize(folderPath).split("\\");
    return parts[parts.length - 1];
}
