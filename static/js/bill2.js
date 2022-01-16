// js file for the info.html page

async function optionChanged(country) {

  //alert("Youre in billionaire js");
  let info_url = "/billionaire";
  const info_response = await fetch(info_url);
  const data = await info_response.json();

  for (let i = 0; i < data[0].length; i++) {

    if (country == data[0][i].county) {

      // creating list of billionaires based on country
      indBillionaires = []

      name = data[0][i].display_name;
      indBillionaires.push(name)
      console.log(indBillionaires)

      // appending the list to the dropdown

      for (let x = 0; x < indBillionaires.length; x++) {
        text = indBillionaires[x]
        const section = document.querySelector('#selDataset')
        option = document.createElement("option")
        option.setAttribute("value", text)
        option.textContent = `${text}`
        section.append(option)
      }
    }

  }
};

optionChanged();
