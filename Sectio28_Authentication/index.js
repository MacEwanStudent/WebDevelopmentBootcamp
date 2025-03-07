import express from "express";
import axios from "axios";
import dotenv from 'dotenv';

dotenv.config({ path: './info.env' });



const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Set up the authetications methods
const Username = process.env.USERNAME_BASIC;
const Password = process.env.PASSWORD;
const APIKey = process.env.API_KEY;
const BearerToken = process.env.BEARER_TOKEN;



app.get("/", (req, res) => {
  //IF no api calls have been made yet, it will default to a simple message.
  const api_response = req.query.api_response || "No data received";
  res.render("index.ejs", { content: api_response });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  let final_response =""
  try {
    const response = await axios.get('https://secrets-api.appbrewery.com/random');
    
    // Convert response data to a JSON string
    final_response= JSON.stringify(response.data, null, 2);
    console.log(final_response);
  } catch (error) {
    final_response = error.message; 
    console.error('Error fetching data:', error.message);
  }
  
  res.redirect(`/?api_response=${encodeURIComponent(final_response)}`);
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
  const user_auth= {
    username: Username,
    password: Password,
  }
  let final_response =""
  try {
    const response = await axios.get('https://secrets-api.appbrewery.com/all',{
      auth: user_auth,
    });
    
    // Convert response data to a JSON string
    final_response= JSON.stringify(response.data, null, 2);
    console.log(final_response);
  } catch (error) {
    final_response = error.message; 
    console.error('Error fetching data:', error.message);
  }
  
  res.redirect(`/?api_response=${encodeURIComponent(final_response)}`);
});

app.get("/apiKey",async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  let final_response =""
  const score = 5;
  try {
    const response = await axios.get(`https://secrets-api.appbrewery.com/filter?score=${score}&apiKey=${APIKey}`);
    
    // Convert response data to a JSON string
    final_response= JSON.stringify(response.data, null, 2);
    console.log(final_response);
  } catch (error) {
    final_response = error.message; 
    console.error('Error fetching data:', error.message);
  }
  
  res.redirect(`/?api_response=${encodeURIComponent(final_response)}`);
});

app.get("/bearerToken", async(req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
  let final_response =""
  try {
    const response = await axios.get('https://secrets-api.appbrewery.com/secrets/42',{
      headers: { 
        Authorization: `Bearer ${BearerToken}` 
      },
    });
    
    // Convert response data to a JSON string
    final_response= JSON.stringify(response.data, null, 2);
    console.log(final_response);
  } catch (error) {
    final_response = error.message; 
    console.error('Error fetching data:', error.message);
  }
  
  res.redirect(`/?api_response=${encodeURIComponent(final_response)}`);



});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
