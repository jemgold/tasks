const nodeFetch = require('node-fetch');
const Task = require('data.task');
const { chain, compose, map, pluck } = require('ramda');

const logError = e => console.error(e);

// fetch :: string -> Task Error Response
const fetch = url =>
  new Task((reject, resolve) => nodeFetch(url).then(resolve, reject))

// json :: Response -> Task Error JSON
const json = res =>
  new Task((reject, resolve) => res.json().then(resolve, reject))

// fetchJSON :: string -> Task Error JSON
const fetchJson = compose(
  chain(json),
  fetch
)

// makeUserUrl :: string -> string
const makeUserUrl = user => `https://api.github.com/users/${user}`;

// bio :: User -> string
const bio = ({ name, location }) =>
  `${name} is a developer from ${location}`

const main = (user) =>
  compose(map(bio), fetchJson, makeUserUrl)(user)
    .fork(logError, x => console.log(x))

main('jongold')
