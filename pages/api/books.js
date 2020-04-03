import {connectToDatabase} from "./connection";
import qs from 'qs';
import {CONFIG} from '../../app.config';

export default async (req, res) => {

  const db = await connectToDatabase(CONFIG.DB.MONGODB_URI);
  const collection = await db.collection(CONFIG.DB.BOOKS_COLLECTION_NAME);


  const {query} = req;
  const skip = query.skip || 0;
  const limit = query.limit || CONFIG.DB.DEFAULT_ITEMS_PER_PAGE;
  const date = query.date;

  // Creates mongodb filter object from query string.
  // Ex: filter[genre]=Math => filter = {'genre': 'Math'} (Filters are case sensitive)
  const filterObj = qs.parse(query).filter || {};

  // Adds date filter
  date && (filterObj.date = new RegExp(`.*${date}.*`, 'i'));

  // Creates sort obj (ascending order)
  let sortObj = {};
  const sortField = query.sort;
  sortField && (sortObj[sortField] = 1);

  const books = await collection.find(filterObj).skip(parseInt(skip)).sort(sortObj).limit(parseInt(limit)).toArray();
  const count = await collection.find(filterObj).skip(parseInt(skip)).sort(sortObj).limit(parseInt(limit)).count();

  res.status(200).json({ books, count })
};
