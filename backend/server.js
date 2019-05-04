const express = require('express');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const app = express();
const port = 5000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/advisors', async (req, res) => {
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

  let advisors = dbAdvisors.filter(advisor => 
    (status === -1 || advisor.status === status)
    && (language === 'all' || advisor.language === language)
  ).slice(page*count, page*count+count);

  setTimeout(() => {
    res.send(advisors);
  }, 1200);
});

app.listen(port, (err) => {
  if (err) { console.log(err); };
  console.log('Listening on port ' + port);
});