function MenuChoice()
{
    if (document.getElementById("menu").value == "Customer List")
    {
        document.getElementById("section1").style.visibility = "visible";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Order History")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "visible";
        document.getElementById("section3").style.visibility = "hidden";
    }
    else
    {
    document.getElementById("section1").style.visibility = "hidden";
    document.getElementById("section2").style.visibility = "hidden";
    document.getElementById("section3").style.visibility = "visible";
    }
}

function GetCustomers()
{
    var objRequest = new XMLHttpRequest(); //Create AJAX request object
    
    //Create URL
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getAllCustomers";
 
    //Checks that the object has returned data
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            CustomerOutput(output);
        }
    }
 
    //Initiate the server request
    objRequest.open("GET", url, true);
    objRequest.send();
}

function CustomerOutput(result)
{
    var count = 0;
    var displaytext = "";
 
    var displaytext = "<table><tr><th>Customer Name</th><th>Customer ID</th><th>City</th></tr>"; //Create table headers
    
    //Loop to extract data from the response object
    for (count = 0; count < result.GetAllCustomersResult.length; count++)
    {
        displaytext += "<tr><td>" + result.GetAllCustomersResult[count].CompanyName + "</td><td>" + result.GetAllCustomersResult[count].CustomerID + "</td><td>" + result.GetAllCustomersResult[count].City + "</td></tr>";
    }
    displaytext += "</table>";
    document.getElementById("customerdisplay").innerHTML = displaytext;
}


function GetHistory()
{
    var objRequest = new XMLHttpRequest(); //Create AJAX request object
    
    //Create URL and Query string
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
    url += document.getElementById("custid1").value;
 
    //Checks that the object has returned data
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            HistoryOutput(output);
        }
    }
 
    //Initiate the server request
    objRequest.open("GET", url, true);
    objRequest.send();
}

function HistoryOutput(result)
{
    var count = 0;
    var displaytext = "";
 
    var displaytext = "<table><tr><th>Product Name</th><th>Quantity</th></tr>"; //Create table headers
    
    //Loop to extract data from the response object
    for (count = 0; count < result.length; count++)
    {
        displaytext += "<tr><td>" + result[count].ProductName + "</td><td>" + result[count].Total + "</td></tr>";
    }
    displaytext += "</table>";
    document.getElementById("historydisplay").innerHTML = displaytext;
}

function GetOrders()
{
    var objRequest = new XMLHttpRequest(); //Create AJAX request object
    
    //Create URL and Query string
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/";
    url += document.getElementById("custid2").value;
 
    //Checks that the object has returned data
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            OrderOutput(output);
        }
    }
 
    //Initiate the server request
    objRequest.open("GET", url, true);
    objRequest.send();
}

function OrderOutput(result)
{
    var count = 0;
    var displaytext = "";
 
    var displaytext = "<table><tr><th>Order Date</th><th>Order ID</th><th>Ship Address</th><th>Ship City</th><th>Ship Name</th><th>Ship Postcode</th><th>Shipped Date</th></tr>"; //Create table headers
    
    //Loop to extract data from the response object
    for (count = 0; count < result.GetOrdersForCustomerResult.length; count++)
    {
        displaytext += "<tr><td>" + result.GetOrdersForCustomerResult[count].OrderDate + "</td><td>" + result.GetOrdersForCustomerResult[count].OrderID + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipAddress + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipCity + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipName + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipPostcode + "</td><td>" + result.GetOrdersForCustomerResult[count].ShippedDate + "</td></tr>";
    }
    displaytext += "</table>";
    document.getElementById("orderdisplay").innerHTML = displaytext;
}