// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("data/samples.json").then((importedData) => {
    // console.log(importedData);
    var data = importedData;

    // Sort the data array using the sample_values
    data.sort(function(a,b) {
        return (b.sample_values) - (a.sample_values);
    });

     // Slice the first 10 objects for plotting
    data = data.slice(0, 10);

    // Reverse the array due to Plotly's defaults
    data = data.reverse();

    // Trace1 for the sample_values data
    var trace1 = {
        x: data.map(row => row.sample_values),
        y: data.map(row => row.id),
        text: data.map(row => row.id),
        type: "bar",
    };

    // data
    var chartData = [trace1];

    // Render the plot to the div tag with id "bar"
    Plotly.newPlot("plot", chartData);

});

test test 