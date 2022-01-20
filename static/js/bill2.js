//js file for the info.html page

async function initializePage(country) {
  let indBillionaires = [];

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const selected_country = urlParams.get('id');

  let info_url = "/billionaire";
  const info_response = await fetch(info_url);
  const data = await info_response.json();
  console.log(data)
  data_name = []
  data_wealth = []
  data_age = []
  data_selfm = []

  async function loadBillionairesByCountry() {


    for (let i = 0; i < data[0].length; i++) {

      if (!(selected_country == data[0][i].county)) {
        dName = data[0][i].display_name;
        data_name.push(dName)

        dWealth = data[0][i].net_worth;
        data_wealth.push(dWealth)

        dAge = data[0][i].age;
        data_age.push(dAge)

        dSelfm = data[0][i].is_self_made
        data_selfm.push(dSelfm)
      }

      if (selected_country == data[0][i].county) {
        let billionaire_id = data[0][i].billionaire_id;
        let billionaire_name = data[0][i].display_name;
        let billionaire_wealth = data[0][i].net_worth;
        let billionaire_age = data[0][i].age;
        let billionaire_selfm = data[0][i].is_self_made;
        let billionaire_map = { "billionaire_id": billionaire_id, "billionaire_name": billionaire_name, "billionaire_wealth": billionaire_wealth, "age": billionaire_age, "self_made": billionaire_selfm };
        indBillionaires.push(billionaire_map);
      }
    }

    //https://www.codegrepper.com/code-examples/javascript/sort+an+array+of+dictionaries+elements+javascript
    //https://stackoverflow.com/questions/10198257/comparing-2-strings-alphabetically-for-sorting-purposes
    indBillionaires.sort(function (a, b) {
      return a.billionaire_name.localeCompare(b.billionaire_name);
    });

    indBillionaires.sort();
    const section = document.querySelector('#selDataset');

    for (let x = 0; x < indBillionaires.length; x++) {
      let text = indBillionaires[x]["billionaire_name"];
      let value = indBillionaires[x]["billionaire_id"];

      option = document.createElement("option");
      option.setAttribute("value", value);
      option.textContent = `${text}`;
      section.append(option);
    }

  }

  if (indBillionaires.length == 0) {
    loadBillionairesByCountry(country);
  }

  // create the needed selected country info in list format for plotly consumption

  bill_name = []
  bill_wealth = []
  bill_age = []
  bill_selfm = []

  for (r = 0; r < indBillionaires.length; r++) {

    bName = indBillionaires[r].billionaire_name
    bill_name.push(bName)

    bWealth = indBillionaires[r].billionaire_wealth
    bill_wealth.push(bWealth)

    bAge = indBillionaires[r].age
    bill_age.push(bAge)

    bSelfm = indBillionaires[r].self_made
    bill_selfm.push(bSelfm)

  }

  //  set up the bubble charts with info from both the selected country and all countries

  let trace1 = {
    x: bill_age,
    y: bill_wealth,
    mode: 'markers',
    marker: {
      color: "green",
      size: bill_wealth
    },
    text: bill_name,
    name: selected_country
  };

  let trace2 = {
    x: data_age,
    y: data_wealth,
    mode: 'markers',
    marker: {
      color: "grey",
      size: data_wealth
    },
    text: data_name,
    name: 'Other Countries'
  };

  let final_data = [trace1, trace2];


  var default_bubble_lay = {
    title: `${selected_country}'s Billionaires Compared to Those of Other Countries: Age and Net Worth`,
    xaxis: {
      title: {
        text: 'Age'
      },
    },
    yaxis: {
      title: {
        text: 'Net Worth (in billions of USD)'
      },
    },
    showlegend: true,
    height: 600,
    width: 1000
  };

  Plotly.newPlot('bubble', final_data, default_bubble_lay);


};

function optionChanged(billionaire_id) {
  alert('billionaire id is ' + billionaire_id)
  loadNewsArticles(billionaire_id)
};

initializePage();