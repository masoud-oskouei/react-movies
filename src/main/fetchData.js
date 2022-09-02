// This function receives endPoint and urlParams
// then makes an API query string and fetches data from the server
// at last it returns a promise
export const fetchData = (endPoint, urlParams) => {
  return new Promise((resolve, reject) => {
    const url = // stich the params together to make a url
      `${endPoint}` +
      `${Object.keys(urlParams).reduce((accumulator, key) => {
        return accumulator + `${key}=${urlParams[key]}&`;
      }, "")}`;

    fetch(url)
      .then((response) => {
        if (response.status !== 200) {
          // if there is error
          response.json().then((jsonData) => {
            //parse the data from stream
            //jsonData is the data parsed from the stream
            reject(
              `Server responded with error. 
            Status Code=${response.status}  ${response.statusText}.
            Second Error Code=${jsonData.status_code}  ${jsonData.status_message} 
            `
            );
          });
        }
        if (response.status == 200) {
          // if ok
          response
            .json() // parse the stream to get the jasonData
            .then((jsonData) => {
              resolve(jsonData);
            })
            .catch(() => {
              reject("Error in parsing received data");
            });
        }
      })
      .catch(() => {
        //this catch is for the fetch
        reject("Network Error");
      });
  });
};
