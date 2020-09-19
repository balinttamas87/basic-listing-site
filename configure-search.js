import { AuthMode } from '@algolia/client-common';

const algoliasearch = algoliasearch(
  'YourApplicationID',
  'dee646598d711bfc8ca326b526bd40f9',
  {
    authMode: AuthMode.WithinHeaders, // or AuthMode.WithinQueryParameters
  },
);
