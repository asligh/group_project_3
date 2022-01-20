// HOME ROUTE

function countryOptionChanged(country)
{
    let btnExplore = document.getElementById('btnExplore');

    btnExplore.onclick = function () 
    {
       location.href = "./info?id=" + country;
    };
 }

async function main() 
{
    let home_url = "/billionaire";
    const home_response = await fetch(home_url);
    const data = await home_response.json();
    // console.log(data);

    /// drop down for county
    var billionaire = data[0];
    var article = data[1];
    var metric = data[2];

    console.log("Billionaire", billionaire);
    console.log("Article", article);
    console.log("Metrics", metric);

    // creating unique list for countries
    list = []

    for (let x = 0; x < billionaire.length; x++) {
        let country = billionaire[x].county;
        list.push(country)
    }
    let unique_country =[... new Set(list)].sort();

    //seed the expore button with an initial value
    countryOptionChanged(unique_country[0]);

    //console.log(newArray)

    // appending the list to the dropdown

    for (let i = 0; i < unique_country.length; i++) {
        text = unique_country[i]
        const section = document.querySelector('#ddlCountries')
        option = document.createElement("option")
        option.setAttribute("value", text)
        option.textContent = `${text}`
        section.append(option)
      }
    
    // age vs. net worth

    // age = data.

 

    // variable for the chart 
    var kid = [],
        rstat= [],
        net_worth = [],
        names = [],
        county = [];
    // use this for the an array that was filtered by county    
    for (var i = 0; i < billionaire.length; i++) {
        var row = billionaire[i];
        kid.push(row["children"]);
        rstat.push(row["relationship_status"]);
        names.push(row["display_name"]);
        net_worth.push(row["net_worth"]);
        county.push(row["county"]);
    };
    console.log("kid",kid);
    console.log("status", rstat);
    console.log("networth", net_worth)
    console.log("names", names);
    console.log("country", county);

    /// making a list of each relationship status for all countries      
    var divorced = [],
    relationships = [],
    married = [],
    single = [],
    widowed = [],
    wid_remarried = []
    n_a = [],
    divorcedKids = [],
    marriedKids = [],
    relationshipKids = [],
    singleKids = [],
    widowedKids = [],
    remarriedKids = [],
    otherKids = [];


    for (var i = 0; i < billionaire.length; i++) {
        var item = billionaire[i];
        if (item.relationship_status === 'Divorced') {
            divorced.push({"Divorced" : item.relationship_status, "Billionare" : item.display_name});
            } else if (item.relationship_status === 'In Relationship') {
            relationships.push({"In Relationship" : item.relationship_status, "Billionare" : item.display_name});
            } else if (item.relationship_status === 'Married') {
            married.push({"Married" : item.relationship_status, "Billionare" : item.display_name});
            } else if (item.relationship_status === 'Single') {
            single.push({"Single" : item.relationship_status, "Billionare" : item.display_name});
            } else if (item.relationship_status === 'Widowed') {
            widowed.push({"Widowed" : item.relationship_status, "Billionare" : item.display_name});
            } else if (item.relationship_status === 'Widowed, Remarried') {
            wid_remarried.push({"Widowed, Remarried" : item.relationship_status, "Billionare" : item.display_name});
            } else {
                n_a.push({"Other" : item.relationship_status, "Billionare" : item.display_name});
           
        };
        if (item.relationship_status === 'Divorced' && item.children > 0){
            divorcedKids.push(item.children);
            } else if (item.relationship_status === 'In Relationship' && item.children > 0){
            relationshipKids.push(item.children); 
            } else if (item.relationship_status === 'Married' && item.children > 0){
                marriedKids.push(item.children);
            } else if (item.relationship_status === 'Single' && item.children > 0){
                singleKids.push(item.children);
            } else if (item.relationship_status === 'Widowed' && item.children > 0){
                widowedKids.push(item.children);
            } else if (item.relationship_status === 'Widowed, Remarried' && item.children > 0){
                remarriedKids.push(item.children);
            } else {
                otherKids.push(item.children);
            };
        };

    // color values for pie chart
    var pieColors =[ ['#f6eff7', '#d0d1e6', '#a6bddb', '#67a9cf', '#3690c0', '#02818a', '#016450'],
    ['#ffffb2', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#b10026' ]
    ];
    

    // pie chart creation for side by side
    var trace1 = [{
        values: [divorced.length, relationships.length, married.length, 
                single.length, widowed.length, wid_remarried.length, n_a.length],
        labels: ['Divorced', 'In Relationship', 'Married', 'Single', 
                'Widowed', 'Widowed & Remarried', 'Other'],
        type: 'pie',
        name: "Global",
        title: "Global",
        domain: {column: 0},
        hole: .4,
        hoverinfo: 'label+percent+name',
        textposition: "inside",
        marker: {
            colors: pieColors[0]
          },
    
    },
    {
        values: [divorced.length, relationships.length, married.length, 
                single.length, widowed.length, wid_remarried.length, n_a.length],
        labels: ['Divorced', 'In Relationship', 'Married', 'Single', 
                'Widowed', 'Widowed & Remarried', 'Other'],
        type: 'pie',
        name: "County",
        title: "Country",
        domain: {column: 1},
        hole: .4,
        hoverinfo: 'label+percent+name+value',
        textposition: "inside",
        marker: {
            colors: pieColors[1]
          },
    
    }];      
    var layout = {
        height: 600,
        width: 800,
        showlegend: false,
        title: "Relationship Status",
        grid: {rows: 1, columns:2},
    };
 
    Plotly.newPlot('pie',  trace1, layout);

    //make a sum function for kid values
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    
    // grouped bar chart
    var bar1 = {
        x: ['Divorced', 'In Relationship', 'Married', 'Single', 
        'Widowed', 'Widowed & Remarried', 'Other'],
        y: [divorcedKids.reduce(reducer), 
            relationshipKids.reduce(reducer), 
            marriedKids.reduce(reducer), 
            singleKids.reduce(reducer), 
            widowedKids.reduce(reducer),
            remarriedKids.reduce(reducer), 
            otherKids.reduce(reducer)],
        name: 'Global',
        type: 'bar',
        marker: {
            color: '##7fcdbb',
            opacity: 0.7,
          }
    };
      
    var bar2 = {
        x: ['Divorced', 'In Relationship', 'Married', 'Single', 
        'Widowed', 'Widowed & Remarried', 'Other'],
        y: [divorcedKids.reduce(reducer), 
            relationshipKids.reduce(reducer), 
            marriedKids.reduce(reducer), 
            singleKids.reduce(reducer), 
            widowedKids.reduce(reducer),
            remarriedKids.reduce(reducer), 
            otherKids.reduce(reducer)],
        name: 'Country',
        type: 'bar',
        marker: {
            color: '#2c7fb8',
            opacity: 0.5
          }
    };
      
      var bar = [ bar1, bar2];
      
      var layout2 = {barmode: 'group',
                    title: "Children by Relationship Status",
                    xaxis: {
                        tickangle: -45
                      },
                    };
      
      Plotly.newPlot('myChart', bar, layout2);

    
};
main();