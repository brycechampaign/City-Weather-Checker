# City-Weather-Checker

A single-page web application using React JS that allows users to look up current weather information for cities around the world and add cities to a “favorites” list.

## Getting Started

### Requirements

- [NodeJS and NPM](https://nodejs.org/en/)
- [Weatherstack API key](https://weatherstack.com/)
- [GeoDB Cities API key](https://rapidapi.com/wirefreethought/api/geodb-cities)

### Download/Clone the Repository

Download this repository or clone it using the below command:

```
git clone https://github.com/brycechampaign/City-Weather-Checker.git
```

### Install dependencies

Navigate to the root of the application directory and run `npm install`

### Configuration

#### Setting up API Keys

In `src/server/keys.js`, replace the `null` values with the corresponding API keys.

```
module.exports = {
  weatherKey: null, // REPLACE WITH YOUR WEATHERSTACK API KEY
  cityKey: null, // REPLACE WITH YOUR GEODB CITIES API KEY
};

```

Alternatively, create the following envrionment variables:

```
process.env.WEATHER_KEY: YOUR WEATHERSTACK API KEY HERE
process.env.CITY_KEY: YOUR GEODB CITIES API KEY HERE
```

### Building the files

Use the `npm run build` command to build the files in production mode. If you'd like to run webpack in development mode and have it watch the files, use `npm run build-dev`.

### Starting the server

Run `npm start` to start the server. Set an environment variable called `PORT` to the desired port number to change which port node will run the server on, or it will use port `3000` by default.
