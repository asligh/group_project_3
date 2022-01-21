// HOME ROUTE

function countryOptionChanged(country)
{
    let btnExplore = document.getElementById('btnExplore');

    btnExplore.onclick = function () 
    {
       location.href = "./info?id=" + country;
    };
    
    loadBillionairesByCountry();
 }

async function main() 
{
    let home_url = "/billionaire";
    const home_response = await fetch(home_url);
    const data = await home_response.json();
   
    var billionaire = data[0];

    let list = [];

    for (let x = 0; x < billionaire.length; x++) 
    {
        let country = billionaire[x].country;
        list.push(country);
    };
    let unique_country =[... new Set(list)].sort();

    countryOptionChanged(unique_country[0]);

    // appending the list to the dropdown
    for (let i = 0; i < unique_country.length; i++) {
        text = unique_country[i]
        const section = document.querySelector('#ddlCountries')
        option = document.createElement("option")
        option.setAttribute("value", text)
        option.textContent = `${text}`
        section.append(option)
    };

    const selected_country = document.getElementById('ddlCountries');
  
    // Label value for charts
    let selected = selected_country.value
    // Array for the selected countries
    let countryArray = billionaire.filter(a => a.country === selected);
    ///build charts function
    loadBillionairesByCountry(countryArray);
};

/// function for new country array to run    
//function countryOptionChanged() 
//{ 
    //loadBillionairesByCountry();
//}//;


/// build the datasets
async function loadBillionairesByCountry()
{
    let home_url = "/billionaire";
    const home_response = await fetch(home_url);
    const data = await home_response.json();
    
    // Global dataset
    let billionaire = data[0];
  
    const selected_country = document.getElementById('ddlCountries');
  
    // Label value for charts
    let selected = selected_country.value
    
    // Array for the selected country dataset
    var countryArray = billionaire.filter(a => a.country === selected_country.value);
    
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
        /// Relationship lists
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
        /// kid lists
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
    /// for the country
    var cdivorced = [],
    crelationships = [],
    cmarried = [],
    csingle = [],
    cwidowed = [],
    cwid_remarried = []
    cn_a = [],
    /// lists for kids and starting values at zero
    cdivorcedKids = [0],
    cmarriedKids = [0],
    crelationshipKids = [0],
    csingleKids = [0],
    cwidowedKids = [0],
    cremarriedKids = [0],
    cotherKids = [0];

    for (var i = 0; i < countryArray.length; i++) {
        var newCountry = countryArray[i];                          
        /// Relationship lists
        if (newCountry.relationship_status === 'Divorced') {
            cdivorced.push({"Divorced" : newCountry.relationship_status, "Billionare" : newCountry.display_name});
            } else if (newCountry.relationship_status === 'In Relationship') {
            crelationships.push({"In Relationship" : newCountry.relationship_status, "Billionare" : newCountry.display_name});
            } else if (newCountry.relationship_status === 'Married') {
            cmarried.push({"Married" : newCountry.relationship_status, "Billionare" : newCountry.display_name});
            } else if (newCountry.relationship_status === 'Single') {
            csingle.push({"Single" : newCountry.relationship_status, "Billionare" : newCountry.display_name});
            } else if (newCountry.relationship_status === 'Widowed') {
            cwidowed.push({"Widowed" : newCountry.relationship_status, "Billionare" : newCountry.display_name});
            } else if (newCountry.relationship_status === 'Widowed, Remarried') {
            cwid_remarried.push({"Widowed, Remarried" : newCountry.relationship_status, "Billionare" : newCountry.display_name});
            } else {
            cn_a.push({"Other" : newCountry.relationship_status, "Billionare" : newCountry.display_name});
        };
        /// kid lists
        if (newCountry.relationship_status === 'Divorced' && newCountry.children > 0){
            cdivorcedKids.push(newCountry.children);
            } else if (newCountry.relationship_status === 'In Relationship' && newCountry.children > 0){
            crelationshipKids.push(newCountry.children); 
            } else if (newCountry.relationship_status === 'Married' && newCountry.children > 0){
            cmarriedKids.push(newCountry.children);
            } else if (newCountry.relationship_status === 'Single' && newCountry.children > 0){
            csingleKids.push(newCountry.children);
            } else if (newCountry.relationship_status === 'Widowed' && newCountry.children > 0){
            cwidowedKids.push(newCountry.children);
            } else if (newCountry.relationship_status === 'Widowed, Remarried' && newCountry.children > 0){
            cremarriedKids.push(newCountry.children);
            } else {
            cotherKids.push(newCountry.children);
        };
    };            


    // color values for pie chart
    var pieColors =[ ['#F7F7F7','#D9D9D9','#BDBDBD','#969696','#737373','#525252','#252525'],
    ['#EDF8E9','#C7E9C0','#A1D99B','#74C476','#41AB5D','#238B45','#005A32' ]
    ];
    

    // pie chart creation for side by side

    //below is where it is in html
//     <div class="row">
//     <div class="col-md-4">
//       <h2>Relationship</h2> 
//       <div id="pie"></div>
//     </div>
//   </div>

    /// title and traces for charting
    var countryTitle = selected;
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
        values: [cdivorced.length, crelationships.length, cmarried.length, 
                csingle.length, cwidowed.length, cwid_remarried.length, cn_a.length],
        labels: ['Divorced', 'In Relationship', 'Married', 'Single', 
                'Widowed', 'Widowed & Remarried', 'Other'],
        type: 'pie',
        name: countryTitle,
        title: countryTitle,
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


    // GROUPED BAR CHART

    //below is where it is in html
//     <div class="row"></div>
//     <div class="col-md-4">
//       <h2>kids</h2> 
//       <div id="myChart"></div>
//     </div>
    // </div>


    //make a sum function for kid values
    const reducer = ((a, b) => a + b);

    var bar1 = {
        x: ['Divorced', 'In Relationship', 'Married', 'Single', 
        'Widowed', 'Widowed & Remarried', 'Other'],
        y: [divorcedKids.reduce(reducer), 
            relationshipKids.reduce(reducer), 
            marriedKids.reduce(reducer), 
            singleKids.reduce(reducer), 
            widowedKids.reduce(reducer),
            remarriedKids.reduce(reducer), 
            otherKids.reduce(reducer)
        ],
        name: 'Global',
        type: 'bar',
        marker: {
            color: 'grey',
            opacity: 0.7,
          }
    };
      
    var bar2 = {
        x: ['Divorced', 'In Relationship', 'Married', 'Single', 
        'Widowed', 'Widowed & Remarried', 'Other'],
        y: [
            cdivorcedKids.reduce(reducer), 
            crelationshipKids.reduce(reducer), 
            cmarriedKids.reduce(reducer), 
            csingleKids.reduce(reducer), 
            cwidowedKids.reduce(reducer),
            cremarriedKids.reduce(reducer), 
            cotherKids.reduce(reducer)
        ],
        name: countryTitle,
        type: 'bar',
        marker: {
            color: 'green',
            opacity: 0.5
          },
          ticks: {
            beginAtZero: true,
            min: 0,
            suggestedMin: 0
        }
    };
      
    var bar = [ bar1, bar2];
      
    var layout2 = {barmode: 'group',
                    title: "Children by Relationship Status",
                    xaxis: {
                        tickangle: -25
                      },
                    width: 800,
                    height: 600,
                    };
      
    Plotly.newPlot('myChart', bar, layout2);

    

};
let data = {}       
main();