const express = require('express');

const { MongoClient } = require('mongodb');

const adminRouter = express.Router();
const Orderdata = [
  {
    id: 1,
    payee: 'Tae JOO',
    currency: 'US',
    date: '12/8/2017',
    status: 'Done',
    badge: 'success'
  },
  {
    id: 4,
    payee: 'Omar Sherif',
    currency: 'EGP',
    date: '12/8/2017',
    status: 'Fraud',
    badge: 'danger'
  },
  {
    id: 5,
    payee: 'Tarek El Abaddy',
    currency: 'EGP',
    date: '12/8/2017',
    status: 'Pending',
    badge: 'brand'
  },
  {
    id: 6,
    payee: 'Sherif Alaa',
    currency: 'EGP',
    date: '12/8/2017',
    status: 'Done',
    badge: 'success'

  },
  {
    id: '7',
    payee: 'Dina Essam',
    currency: 'EGP',
    date: '12/8/2017',
    status: 'Fraud',
    badge: 'danger'
  }
];
function router(nav) {
  adminRouter.route('/').get((req, res) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'PaymentInformation';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        console.log('connected correctly');

        const db = client.db(dbName);
        const response = await db.collection('payments').insert(Orderdata);
        res.json(response);
      } catch (error) {
        console.log(error.stack);
      }
      client.close();
    }());
    // res.send('Verifying Card');
  });

  return adminRouter;
}

module.exports = router;
