// HOME ROUTE

async function main() 
{
   alert("Youre in billionaire js");
    let home_url = "/billionaire";
    const home_response = await fetch(home_url);
    const data = await home_response.json();
    console.log(data);

};

main();
