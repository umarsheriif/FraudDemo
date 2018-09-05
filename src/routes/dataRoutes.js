const express = require('express');

const dataRouter = express.Router();
const { MongoClient, ObjectID } = require('mongodb');
const payform = require('payform');
// const debug = require('debug')('app:dataroutes');

function router(nav) {
  const Orderdata = [
    {
      Id: 1,
      Payee: 'Tae JOO',
      Currency: 'US',
      ShipDate: '12/8/2017',
      Status: 'Done',
      Badge: 'success'
    },
    {
      Id: 4,
      Payee: 'Omar Sherif',
      Currency: 'EGP',
      ShipDate: '12/8/2017',
      Status: 'Fraud',
      Badge: 'danger'
    },
    {
      Id: 5,
      Payee: 'Tarek El Abaddy',
      Currency: 'EGP',
      ShipDate: '12/8/2017',
      Status: 'Pending',
      Badge: 'brand'
    },
    {
      Id: 6,
      Payee: 'Sherif Alaa',
      Currency: 'EGP',

      ShipDate: '12/8/2017',
      Status: 'Done',
      Badge: 'success'

    },
    {
      Id: '7',
      Payee: 'Dina Essam',
      Currency: 'EGP',
      ShipDate: '12/8/2017',
      Status: 'Fraud',
      Badge: 'danger'
    }
  ];
  dataRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'PaymentInformation';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          console.log('connected correctly');

          const db = client.db(dbName);
          const col = await db.collection('payments');
          const paydata = await col.find().toArray();
          res.render(
            'data',
            {
              nav,
              Orderdata: paydata
            }
          );
        } catch (error) {
          console.log(error.stack);
        }
        client.close();
      }());
    });
  dataRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      const url = 'mongodb://localhost:27017';
      const dbName = 'PaymentInformation';
      (async function mongo() {
        try {
          const Client = await MongoClient.connect(url);
          console.log('connected to server successfully');
          const db = Client.db(dbName);
          const col = await db.collection('payments');
          const singlepaydata = await col.findOne({ _id: new ObjectID(id) });
          res.render(
            'dataSingle',
            {
              nav,
              Orderdata: singlepaydata
            }
          );
        } catch (error) {
          console.log(error.stack);
        }
      }());


    });

  return dataRouter;
}

module.exports = router;
