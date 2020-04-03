# Study on how to Handle Big Data

## 1. Research Phase

How to handle a file with hundreds of MBs of JSON data (1,000,000 records).

Possible options:

- Streaming a big JSON file using [Node Streams](https://nodejs.org/api/stream.html#stream_stream) (**<u>Discarded</u>**)
- Using a database
	- Since the data were in JSON format, it seemed natural to import them into a NO-SQL database like Mongodb 
	- Where to host the data?
		- Use [MongoDB Stitch Service](https://www.mongodb.com/cloud/stitch) (Servless Functions) (**<u>Discarded</u>**)
		- Use a full-fledged MongoDB database in the cloud

## 2. Implementation Phase

Features:

- **Backend**
	- [Next.js Framework](https://nextjs.org/#features)  (with Server Side Rendering capabilities)
	- REST API with one endpoint: `https://casumo-nextjs.now.sh/api/books`
	-  Query string parameters can be passed to the `/books` endpoint to **sort, filter and paginate** records
	- Isomorphic Javascript
- **Frontend**
	- ReactJS
	- Lazy loaded images (Only images in the visible portion of the page are loaded)
	- [Material UI](https://material-ui.com/)
	- Responsive Design
	- Use of Repository Pattern
	- Proof of concept of "Infinite Scroll"
- **Database** 
	- [Atlas MongoDB](https://www.mongodb.com/cloud/atlas)
- **Testing**
  - [Cypress](https://www.cypress.io/)

## Demo

- [Link](https://book-list.now.sh/)

## Install

1. Download or clone the source code
2. Change the path to the local source code directory
3. Install the dependencies running in the command line:

```bash
npm run install
```

## Run

Modify the `app.config.js` file to run the project **locally** and avoid CORS errors:

1. Comment the `line 8`:

```javascript
// API_BASE_URL: 'https://casumo-nextjs.now.sh/api'
```
2. Uncomment the `line 9`:

```javascript
API_BASE_URL: 'http://localhost:3000/api'
```

3. Run the app with the following npm script

```bash
npm run dev
```
4. Open [http://localhost:3000](http://localhost:3000) in the browser and load the application.

## Test

```bash
npm run test
```
## Important Considerations

- Due to time constrains, only `e2e` tests has been implemented because these test have priority in case of apps based in `RESTful APIs`
- For the same reason, not all cases have been tested, but the remaining ones are similar
- The addition of adequate **indexes** to the database for sorting and filtering queries is very important. In other case the database will return an error caused by exceeding the maximum memory limit needed to process a huge number of records (1,000,000)
