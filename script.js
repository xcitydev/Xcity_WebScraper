const algosdk = require("algosdk");
var fs = require("fs");
var json2xls = require("json2xls");
const filename = "sample.xlsx";

const algoServer = "https://mainnet-algorand.api.purestake.io/idx2";
const algoPort = "";
const token = {
  "X-API-Key": "", //Your APi key here
};

let algodClient = new algosdk.Indexer(token, algoServer, algoPort);

// /indexer/javascript/AccountInfo.js
// (async () => {
//   let acct = "7WENHRCKEAZHD37QMB5T7I2KWU7IZGMCC3EVAO7TQADV7V5APXOKUBILCI";
//   let accountInfo = await algodClient.lookupAccountByID(acct).do();
//   console.log(
//     "Information for Account: " + JSON.stringify(accountInfo, undefined, 2)
//   );
// })().catch((e) => {
//   console.log(e);
//   console.trace();
// });
function filter(num) {
  console.log(num["sender"]);
  console.log(num["payment-transaction"]["amount"]);
}
(async () => {
  let currencyGreater = 10;
  let transactionInfo = await algodClient
    .searchForTransactions()
    .address("25S2YKMG2E3L5RTFI67NTSWFJJQHBTDULAIN7TQVXWB3E4E5Y6BPG3O44I")
    .currencyGreaterThan(currencyGreater)
    .assetID(Number(297995609))
    .do();
  fs.writeFile(
    "index.json",
    JSON.stringify(transactionInfo, undefined, 2),
    function (err, result) {
      if (err) console.log("error", err);
    }
  );
  const arr = transactionInfo.transactions;

  const arra = [];
  arr.forEach((element) => {
    arra.push([
      element["sender"],
      element["asset-transfer-transaction"]["amount"] / 100 + " Choice",
    ]);
  });

  arra.forEach(function (rowArray) {
    let row = rowArray.join(",");
    csvContent += row + "\r\n";
  });
  var xls = json2xls(arra);
  fs.writeFileSync(filename, xls, "binary", (err) => {
    if (err) {
      console.log("writeFileSync :", err);
    }
    console.log(filename + " file is saved!");
  });
})().catch((e) => {
  console.log(e);
  console.trace();
});
var convert = function () {
  var xls = json2xls(allUsers);
  fs.writeFileSync(filename, xls, "binary", (err) => {
    if (err) {
      console.log("writeFileSync :", err);
    }
    console.log(filename + " file is saved!");
  });
};
