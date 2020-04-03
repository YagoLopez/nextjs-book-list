# Study on How to Handle Big Data

How to handle a file with hundreds of MBs of JSON data (1,000,000 records).

## 1. Research Phase

Possible options:

- Streaming the JSON file using [Node Streams](https://nodejs.org/api/stream.html#stream_stream) (**<u>Discarded:</u>** Complex and there is better ways to do it)
- Using a database
	- Since the data were in JSON format, it seemed natural to import them into a NO-SQL database like Mongodb 
	- Where to host the data?
		- Use [MongoDB Stitch Service](https://www.mongodb.com/cloud/stitch) (Servless Functions) (**<u>Discarded:</u>** Not complete Mongodb funcionality)
		- Use a full-fledged MongoDB database in the cloud

## 2. Implementation Phase

Features:

- **Backend**
	- [Next.js Framework](https://nextjs.org/#features)  (with Server Side Rendering capabilities)
	- REST API with one endpoint: https://book-list.now.sh/api/books
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

- Download or clone the source code

- Change the path to the local source code directory

- Install the dependencies running in the command line:

```bash
npm run install
```

## Run

```bash
npm run dev
```
- Open [http://localhost:3000](http://localhost:3000) in the browser and load the application.

## Test

```bash
npm run test
```
## Important Considerations

- Due to time constrains, only `e2e` tests has been implemented because these test have priority in case of apps based in `RESTful APIs`
- For the same reason, not all cases have been tested, but the remaining ones are similar
- The addition of **indexes** to the database for sorting and filtering queries is very important. In other case the database will return an error caused by exceeding the maximum memory limit needed to process the number of records (1,000,000)
