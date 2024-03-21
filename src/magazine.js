import pino from "pino";
import axios from 'axios';
import * as fs from "fs";
import { REFERENCE_CONTENT_TYPES, HEADERS, PAGE_SIZE, META_DATA, DATA } from "./constants.js";

//Optional headers for content management
const AUTH_TOKEN = 'authtoken';
const BRANCH = 'branch';

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

const failedEntries = [];
const cache = {};

// variable to store the rate limit (in milliseconds)
const rateLimit = 2000;

//Insert data to content using contentstack create entry api with rate limit of fix rate
export const insertBulkDataIntoContentStack = async (requests) => {
    let i = 0;
    const makeRequest = async () => {
      try {
        const response = await axios(requests[i]);
        if (response.status !== 201) {
          logger.child({ errorObj: e }).error("Create entry is failed");
          failedEntries.push(requests[i]);
          logger.info(`API ERROR : ${requests[i].data}`);
        }
        // logger.info(`API SUCCESS : ${requests[i].data}`);
        logger.info(`API SUCCESS`);
      } catch (e) {
        // logger.child({ errorObj: e }).error("Create entry is failed");
        logger.info(`Error in API ${requests[i].data} - ${e}`);
        logger.info(e.response.data)
        failedEntries.push(requests[i]);
      }
      i++;
      if (i < requests.length) {
        setTimeout(makeRequest, rateLimit);
      } else {
        logger.info("Data inserting is completed");
      }
    };
    makeRequest();
  }

  export const publishMagazineData = async () => {
    logger.info("Start recipe data inserting");
    const otmmImages = JSON.parse(fs.readFileSync('./magazines_otmm.json', 'utf8'));
    const requests = [];
    // read the data from the JSON file
    const magazins= JSON.parse(fs.readFileSync('./magazines6prod.json', 'utf8'));
    for (const magazin of magazins) {
      const imageObj = otmmImages.filter(img => img.name === magazin.image)[0];
      const pdfObje = otmmImages.filter(pdf => pdf.name === magazin.pdf)[0];
      const payload = {
        entry: {
          title: `${magazin.edition_number}_${magazin.name}`,
          name: magazin.name,
          year: magazin.year,
          edition_number: magazin.edition_number,
          description:magazin.description,
          image: [{
            url: imageObj === undefined ? null : imageObj?.url,
            id: imageObj === undefined ? null : imageObj?.id,
            name: imageObj === undefined ? null : imageObj?.name,
            content_type: imageObj === undefined ? null : imageObj?.content_type,
            mime_type: imageObj === undefined ? null : imageObj?.meme_type
          }],
          pdf: [{
            url: pdfObje === undefined ? null : pdfObje?.url,
            id: pdfObje === undefined ? null : pdfObje?.id,
            name: pdfObje === undefined ? null : imageObj?.name,
            content_type: pdfObje === undefined ? null : pdfObje?.content_type,
            mime_type: pdfObje === undefined ? null : pdfObje?.meme_type
          }],
        }
      }
      const request = {
        url: `${process.env.CREATE_ENTRY_URL}${process.env.MAGAZINE_UID}/entries?locale=${process.env.LOCALE_CODE}`,
        method: 'post',
        headers: {
          ...HEADERS,
        },
        data: JSON.stringify(payload)
      }
      requests.push(request);
    }
    insertBulkDataIntoContentStack(requests);
  }

  publishMagazineData();