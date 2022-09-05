// const { MongoClient } = require('mongodb');
import { MongoClient } from 'mongodb';
const url = 'mongodb://139.99.238.84:27017'; 
const client = new MongoClient(url);


async function getMinMaxOf2DIndex(arr, idx) {
    let min = await Math.min.apply(null, arr.map(function (e) { return e[idx]}))
    let max = await Math.max.apply(null, arr.map(function (e) { return e[idx]}));
    return {
        min: min,
        max: max
    }
} 

export async function call(coll='loc_data', filter={}) {
    return new Promise((resolve) => {
        client.connect().then(() => {
            const db = client.db('vic_properties');
            const locCollection = db.collection(coll);
            const docs = locCollection.find(filter).toArray();
            docs.then((a)=> {
                // console.log(a);
                client.close()
                resolve(a);
            })
        })
    })
}
