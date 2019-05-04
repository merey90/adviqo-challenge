const express = require('express');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const app = express();
const port = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('PORT 5000');
});

const statusMap = {
  '-1': 'all',
  '1': 'online',
  '0': 'offline'
};

app.post('/', async (req, res) => {
  const {
    sortBy = 'reviews',
    sortDirection = 'desc',
    status = 'all',
    language = 'all',
    page = 0,
    count = 20
  } = req.body;

  let dbAdvisors = [];

  try {
    const rawAdvisors = await readFile('advisors.json');
    dbAdvisors = JSON.parse(rawAdvisors);
  } catch (error) {
    res.status(500).send('Something went wrong...');
  }

  dbAdvisors = dbAdvisors.sort(
    (current, next) => {
      let comparatorA = current, comparatorB = next;
      if(sortDirection === '-1') {
        comparatorA = next;
        comparatorB = current;
      }
      if(comparatorA[sortBy] < comparatorB[sortBy]) return -1;
      if(comparatorA[sortBy] > comparatorB[sortBy]) return 1;
      return 0;
    }
  );

  const verbalStatus = statusMap[status];
  let advisors = dbAdvisors.filter(advisor => 
    ((verbalStatus !== 'all' && advisor.status === verbalStatus) || verbalStatus === 'all')
    && ((language !== 'all' && advisor.language === language) || language === 'all')
  ).slice(page*count, page*count+count);

  res.send(advisors);
});

app.listen(port, (err) => {
  if (err) { console.log(err); };
  console.log('Listening on port ' + port);
});