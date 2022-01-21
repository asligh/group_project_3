let bill_name = [];
let bill_wealth = [];
let bill_age = [];
let bill_selfm = [];
let bill_children = [];
let bill_id = [];

let indBillionaires = [];


async function initializePage(country) 
{
  async function loadBillionairesByCountry() 
  {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const selected_country = urlParams.get('id');

    let info_url = "/billionaire";
    const info_response = await fetch(info_url);
    const data = await info_response.json();

    // setting up data lists (for other countries) for the bubble chart later on
    let data_name = [];
    let data_wealth = [];
    let data_age = [];
    let data_selfm = [];
    let data_chil = [];

    for (let i = 0; i < data[0].length; i++) {
      if (!(selected_country == data[0][i].country)) {
        dName = data[0][i].display_name;
        data_name.push(dName);

        dWealth = data[0][i].net_worth;
        data_wealth.push(dWealth);

        dAge = data[0][i].age;
        data_age.push(dAge);

        dSelfm = data[0][i].is_self_made;
        data_selfm.push(dSelfm);

        dChild = data[0][i].children;
        data_chil.push(dChild);
      }

      if (selected_country == data[0][i].country) 
      {
        let billionaire_id = data[0][i].billionaire_id;
        let billionaire_name = data[0][i].display_name;
        let billionaire_wealth = data[0][i].net_worth;
        let billionaire_age = data[0][i].age;
        let billionaire_selfm = data[0][i].is_self_made;
        let bill_child = data[0][i].children;
        let billionaire_map = { "billionaire_id": billionaire_id, "billionaire_name": billionaire_name, "billionaire_wealth": billionaire_wealth, "age": billionaire_age, "self_made": billionaire_selfm, "billionaire_child": bill_child };

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

    for (let x = 0; x < indBillionaires.length; x++) 
    {
      let text = indBillionaires[x]["billionaire_name"];
      let value = indBillionaires[x]["billionaire_id"];

      if (x == 0) 
      {
        loadNewsArticles(value);
        loadBillionaireInfo(value);
      }

      option = document.createElement("option");
      option.setAttribute("value", value);
      option.textContent = `${text}`;
      section.append(option);
    }
    // create the needed selected country info in list format for plotly consumption

    // bill_name = []
    // bill_wealth = []
    // bill_age = []
    // bill_selfm = []
    // bill_children = []

    //  set up the bubble charts with info from both the selected country and all countries
    for (r = 0; r < indBillionaires.length; r++) {

      bName = indBillionaires[r].billionaire_name;
      bill_name.push(bName);

      bWealth = indBillionaires[r].billionaire_wealth;
      bill_wealth.push(bWealth);

      bAge = indBillionaires[r].age;
      bill_age.push(bAge);

      bSelfm = indBillionaires[r].self_made;
      bill_selfm.push(bSelfm);

      bChildren = indBillionaires[r].billionaire_child;
      bill_children.push(bChildren);

      bId = indBillionaires[r].billionaire_id;
      bill_id.push(bId);
    }

    async function removeNulls(list) 
    {

      for (g = 0; g < list.length; g++) {
        if (list[g] == null) {
          list[g] = 0;
        }
      }
      return (list);
    }

    removeNulls(bill_children);
    removeNulls(data_chil);

    let trace1 = {
      x: bill_age,
      y: bill_children,
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
      y: data_chil,
      mode: 'markers',
      marker: {
        color: "grey",
        size: data_wealth
      },
      text: data_name,
      name: 'Other Countries'
    };

    let trace3 = {
      x: [bill_age[0]],
      y: [bill_children[0]],
      mode: 'markers',
      marker: {
        color: "red",
        size: [bill_wealth[0]]
      },
      text: [bill_name[0]],
      name: `${[bill_name[0]]}`
    }

    let final_data = [trace1, trace2, trace3];


    var default_bubble_lay = {
      title: `${bill_name[0]}'s Age, # of Children, and Net Worth Compared to Those of Other Billionaires`,
      xaxis: {
        title: {
          text: 'Age'
        },
      },
      yaxis: {
        title: {
          text: 'Number of Children'
        },
      },
      showlegend: true,
      height: 600,
      width: 1000
    };

    Plotly.newPlot('bubble', final_data, default_bubble_lay);
  }

  if (indBillionaires.length == 0) 
  {
    loadBillionairesByCountry(country);
  }
};

async function loadNewsArticles(billionaire_id) 
{
  let info_url = "/get_articles_by_id/" + billionaire_id;
  const info_response = await fetch(info_url);
  const data = await info_response.json();

  displayNewsArticles(data);
}

function displayNewsArticles(data) 
{
  document.getElementById("tbArticles").innerHTML = null;
  let table = document.getElementById("tbArticles");

  for (i = 0; i < data.length; i++) 
  {
    let article_title = data[i]["title"];
    let url = data[i]["url"];

    let row = table.insertRow(i);

    let cell1 = row.insertCell(0);
    //let cell2 = row.insertCell(1);

    cell1.innerHTML = article_title;
    //cell2.innerHTML = "NEW CELL2";  

    cell1.innerHTML = '<a href="' + url + '" target="_blank">' + article_title + '</a>';
  }
}

async function plotChange(billionaire_id) 
{

  Plotly.deleteTraces('bubble', 2)

  for (k = 0; k < bill_name.length; k++) 
  {
    if (bill_id[k] == billionaire_id) 
    {
      let update = 
      {
        x: [bill_age[k]],
        y: [bill_children[k]],
        mode: 'markers',
        marker: {
          color: "red",
          size: [bill_wealth[k]]
        },
        text: [bill_name[k]],
        name: `${[bill_name[k]]}`
      }
      Plotly.addTraces('bubble', update)

      let layout_up = 
      {
        title: `${bill_name[k]}'s Age, # of Children, and Net Worth Compared to Those of Other Billionaires`
      }

      Plotly.relayout('bubble', layout_up)
      // console.log(update)

    }
  }
};

async function loadBillionaireInfo(billionaire_id)
{
  let info_url = "/get_billionaire_by_id/"+billionaire_id;
  const info_response = await fetch(info_url);
  const data = await info_response.json();

  displayBillionaireInfo(data);
}

function displayBillionaireInfo(data)
{
  let billionaire_meta = document.getElementById("sample-metadata");

  billionaire_meta.innerHTML = "";

  for(const [key, value] of Object.entries(data)) 
  {
      let h6 =  document.createElement("h6");
      billionaire_meta.append(h6,`${key}: ${value}`);
  };
}

async function optionBillionaireChanged(billionaire_id)
{
  loadNewsArticles(billionaire_id);
  loadBillionaireInfo(billionaire_id);
  plotChange(billionaire_id);
};

initializePage();