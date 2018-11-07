import moment from "moment";
import CryptoJS from "crypto-js";

const configApi = {
    publicKey: "8f0bb5f53cb83a7189e960ad214f91dc",
    privateKey: "484f703ca97ef229487bf3b71ba1ce3f1af76e73",
    urlMarvelAPI: `${window.location.protocol}//gateway.marvel.com`
};

class MarvelCharacterLoader {
  
  static getMarvelCharacters(origOptions = {}) {
    const stamp = moment().unix();
    const defaultPageData = { page: 1, quantity: 100 };

    const pageOptions = Object.assign(defaultPageData, origOptions);
    const toMD5 = stamp + configApi.privateKey + configApi.publicKey;
    const hashRequired = CryptoJS.MD5(toMD5).toString(CryptoJS.enc.Hex);

    const offset = pageOptions.quantity * (pageOptions.page - 1);

    return fetch(`${configApi.urlMarvelAPI}/v1/public/characters?apikey=${configApi.publicKey}&ts=${stamp}&offset=${offset}&limit=${pageOptions.quantity}&hash=${hashRequired}`);
  }

  getAllMarvelCharacters(Callback) {
    return this.getNextCharactersPage(Callback);
  }

  getNextCharactersPage(Callback, prevResults = []) {
    var page = 1;
    return new Promise((resolve) => {  
    MarvelCharacterLoader.getMarvelCharacters({ page: page }).then(Apiresponse => Apiresponse.json()).then(response => {
          page++;
          const results = response.data.results;
          const concatedResults = prevResults.concat(results);
          Callback(concatedResults);
          console.log(results.length);
          if (results.length < 100) {
            resolve(concatedResults);
          } else {
            //resolve(this.getNextCharactersPage(Callback, concatedResults));
          }
        });
    });
  }
}

export default MarvelCharacterLoader;