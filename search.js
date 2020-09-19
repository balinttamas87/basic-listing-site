const client = algoliasearch('YourApplicationID', 'dee646598d711bfc8ca326b526bd40f9');
const index = client.initIndex('indexName');

// only query string
index.search('query string').then(({ hits }) => {
  console.log(hits);
});

// with params
index.search('query string', {
  attributesToRetrieve: ['firstname', 'lastname'],
  hitsPerPage: 50,
}).then(({ hits }) => {
  console.log(hits);
});