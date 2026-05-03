import { Client } from "@microsoft/microsoft-graph-client";
import "isomorphic-fetch";
import { config } from "./config.js";

async function uploadToSharePoint({ token, file, folder }) {
  const graph = Client.init({
    authProvider: (done) => done(null, token)
  });

  const uploadPath = `${folder}/${file.originalname}`;

  return graph
    .api(`/sites/${config.siteId}/drives/${config.driveId}/root:/${uploadPath}:/content`)
    .put(file.buffer);
}


export { uploadToSharePoint };
