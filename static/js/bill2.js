// js file for the info.html page
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
        let name = data[0][i].display_name;
        indBillionaires.push(name);
      }
    }
  
    indBillionaires.sort();
  
    // appending the list to the dropdown
    for (let x = 0; x < indBillionaires.length; x++) 
    {
      text = indBillionaires[x];
      const section = document.querySelector('#selDataset');
      option = document.createElement("option");
      option.setAttribute("value", text);
      option.textContent = `${text}`;
      section.append(option);
    }
  }

  if(indBillionaires.length == 0)
  {
    loadBillionairesByCountry(country);
  }
};

initializePage();