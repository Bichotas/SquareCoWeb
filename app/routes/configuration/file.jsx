import { unstable_parseMultipartFormData as parseMultipartFormData } from "@remix-run/node";
import { getStorage } from "firebase-admin/storage";

import createFirebaseStorageFileHandler from "remix-firebase-storage-file-handler";

export const action = async ({ request }) => {
  const formData = await parseMultipartFormData(
    request,
    createFirebaseStorageFileHandler({
      // Required: provide a reference to a file
      file({ filename }) {
        return getStorage().bucket().file(filename);
      },
    })
  );

  const url = formData.get("my-file-input");

  // Do something with the URL!
};
