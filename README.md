# Front End Capstone Project - Travel App

An app that takes a city and departure date as input. It generates a card that includes basic information about city and country as well as a weatherforecast for the departure date. A photo of the place is also shown. When the destination or the APIs are not sending processable data, the picture will be a default picture. 

## Prerequisites

You will need to create accounts to access the api key for following APIs::
- [Geonames](http://www.geonames.org/export/web-services.html)
- [Weatherbit](https://www.weatherbit.io/account/create)
- [Pixabay](https://pixabay.com/api/docs/)

Further the project requires the following:
- Installation of Node.js
- Create .env file in the root directory;
- Add the required API keys to the .env file


## Extend your Project Further
following items were integrated as functionality into the app according to "Extend your Project Further":
- Pull in an image for the country from Pixabay API when the entered location brings up no results
- Allow the user to remove the trip

## Running the App

As described please install or configure points from the "Prerequisites". To build the code use the command npm run run build-prod to run the app in development mode use npm run build-dev. To start the express server use npm run start.

## Running the tests

To run the tests use the command npm run test

## Build with
- [webpack](https://webpack.js.org/)
- [Sass](https://sass-lang.com/)
- [Express](https://expressjs/)
- [Jest](https://jestjs.io/)
- [Geonames](http://www.geonames.org/export/web-services.html)
- [Weatherbit](https://www.weatherbit.io/account/create)
- [Pixabay](https://pixabay.com/api/docs/)

