// HOME ROUTE

async function main() {
    home_url = "/"
    const home_response = await fetch(home_url);
    const data = await home_response.json();
    console.log(data)

    return JSON.stringify(data)

    //THE BILLIONAIRE ROUTE

    // bill_url = "/billionaire"
    // bill_response = await fetch(bill_url)
    // console.log(bill_response);

    // $.ajax({
    //     type : "POST",
    //     url : '/email_process',
    //     dataType: "json",
    //     data: JSON.stringify(you can put in a variable in here to send data with the request),
    //     contentType: 'application/json;charset=UTF-8',
    //     success: function (data) {
    //         console.log(data);
    //         }
    //     };

    //     success: function (data) {
    //         console.log(data);
    //         }
;
}

main();
