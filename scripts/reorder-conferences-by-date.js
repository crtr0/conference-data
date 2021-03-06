// Reorder a file by running (from the scripts folder)
const fs = require('fs');
const sortBy = require('lodash/sortBy');
const parse = require('date-fns/parse');
const conferenceReader = require('./conferenceReader');

const BASE_DIR = 'conferences';

const conferencesJSON = conferenceReader();

Object.keys(conferencesJSON).forEach((year) => {
  Object.keys(conferencesJSON[year]).forEach((topic) => {
    const fileName = `${BASE_DIR}/${year}/${topic}.json`;

    const conferences = conferencesJSON[year][topic];
    if (!Array.isArray(conferences)) {
      return;
    }
    const sortedConfs = sortBy(conferences, [
      (conf) => parse(conf.startDate, 'yyyy-MM-dd', new Date()).getTime(),
      (conf) => parse(conf.endDate || conf.startDate, 'yyyy-MM-dd', new Date()).getTime(),
      'name'
    ]);

    fs.writeFile(fileName, JSON.stringify(sortedConfs, null, 2), () => {
      console.log(`File ${fileName} was successfully reordered`);
    });

  });
});
