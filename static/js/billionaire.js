// HOME ROUTE

async function main() 
{
//    alert("Youre in billionaire js");
    let home_url = "/billionaire";
    const home_response = await fetch(home_url);
    const data = await home_response.json();
    // console.log(data);

    // creating unique list for countries
    list = []

    for (let x = 0; x < data[0].length; x++) {
        let country = data[0][x].county;
        list.push(country)
    }
    let newArray =[... new Set(list)].sort();
    console.log(newArray)

    // appending the list to the dropdown

    for (let i = 0; i < newArray.length; i++) {
        text = newArray[i]
        const section = document.querySelector('#selDataset')
        option = document.createElement("option")
        option.setAttribute("value", text)
        option.textContent = `${text}`
        section.append(option)
      }
    
    // age vs. net worth

    // age = data.

    
};

main();
