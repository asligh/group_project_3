//js file for the info.html page

async function initializePage(country)
{
  let indBillionaires = [];

  async function loadBillionairesByCountry()
  {
    const queryString  = window.location.search;
    const urlParams    = new URLSearchParams(queryString);
    const selected_country = urlParams.get('id');
  
    let info_url = "/billionaire";
    const info_response = await fetch(info_url);
    const data = await info_response.json();
  
    for (let i = 0; i < data[0].length; i++)
    {
      if (selected_country == data[0][i].county)
      {
        let billionaire_id   = data[0][i].billionaire_id;
        let billionaire_name = data[0][i].display_name;
        let billionaire_map  = {"billionaire_id" : billionaire_id, "billionaire_name" : billionaire_name};

        indBillionaires.push(billionaire_map);
      }
    }
    
    //https://www.codegrepper.com/code-examples/javascript/sort+an+array+of+dictionaries+elements+javascript
    //https://stackoverflow.com/questions/10198257/comparing-2-strings-alphabetically-for-sorting-purposes
    indBillionaires.sort(function(a, b)
    {
      return a.billionaire_name.localeCompare(b.billionaire_name);
    });

    indBillionaires.sort();
    const section = document.querySelector('#selDataset');

    for (let x = 0; x < indBillionaires.length; x++) 
    {
       let text  = indBillionaires[x]["billionaire_name"];
       let value = indBillionaires[x]["billionaire_id"];

      if(x==0)
      {
        loadNewsArticles(value);
      }      

       option = document.createElement("option");
       option.setAttribute("value", value);
       option.textContent = `${text}`;
       section.append(option);
    }
  }

  if(indBillionaires.length == 0)
  {
     loadBillionairesByCountry(country);
  }
};

async function loadNewsArticles(billionaire_id)
{
  let info_url = "/get_articles_by_id/"+billionaire_id;
  const info_response = await fetch(info_url);
  const data = await info_response.json();

  console.log(data);

  displayNewsArticles(data);
}

function displayNewsArticles(data)
{
  document.getElementById("tbArticles").innerHTML = null;
  let table = document.getElementById("tbArticles");

  for(i=0;i < data.length; i++)
  {
    let article_title = data[i]["title"];
    let url           = data[i]["url"];

    let row = table.insertRow(i);

    let cell1 = row.insertCell(0);
    //let cell2 = row.insertCell(1);

    cell1.innerHTML = article_title;
    //cell2.innerHTML = "NEW CELL2";  

    cell1.innerHTML = '<a href="'+ url+'" target="_blank">'+ article_title + '</a>';
  }
}

async function optionChanged(billionaire_id)
{
  //alert('billionaire id is ' + billionaire_id)
  loadNewsArticles(billionaire_id)
};

initializePage();