
function creatNames (){

var selData = d3.select("#selDataset")

// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("data/samples.json").then((importedData) => {
    console.log(importedData);
    var data = importedData.names;
    console.log(data)
    importedData.names.forEach ((id) => {
        selData.append("option").text(id).property("value")
    })
    optionChanged(importedData.names[0])
})};

creatNames()

function demographic (userId) {
    d3.json("data/samples.json").then((demoData) => {
        console.log(demoData.metadata)
        var filterData = demoData.metadata.filter(meta => meta.id == userId)
        var firstDemo = filterData[0]
        console.log(firstDemo)
        var metadataBody = d3.select("#sample-metadata")
        metadataBody.html("")
        Object.entries(firstDemo).forEach (([key, value]) => {
            var pragraph = metadataBody.append("p")
            pragraph.text(`${key} : ${value}`)
        })
    })
}
function optionChanged(userId) {
    demographic(userId)
    barChart(userId)
    babbleChart(userId)

}

function barChart (userId) {
    d3.json("data/samples.json").then((samplesData) => {
        console.log(samplesData.samples)
        var filterData = samplesData.samples.filter(samples => samples.id == userId)
        var firstSample = filterData[0]
        console.log(firstSample)
    var xaxis = firstSample.sample_values.slice(0,10).reverse()
    var yaxis = firstSample.otu_ids.map(row => `OTU ID ${row}`).slice(0,10).reverse()
    var text = firstSample.otu_labels.slice(0,10).reverse()

    // Trace1 for the sample_values data
    var trace1 = {
        x: xaxis,
        y: yaxis,
        text: text,
        type: "bar", 
        orientation: "h"
    };

    // data
    var chartData = [trace1];

    // Render the plot to the div tag with id "bar"
    Plotly.newPlot("bar", chartData);

})};


function babbleChart (userId) {
    d3.json("data/samples.json").then((samplesData) => {
        console.log(samplesData.samples)
        var filterData = samplesData.samples.filter(samples => samples.id == userId)
        var firstSample = filterData[0]
        console.log(firstSample)
    var sampleValues = firstSample.sample_values
    var otuIds = firstSample.otu_ids
    var otuLabels = firstSample.otu_labels
    
    // Babble chart
    var trace2 = {
        x: otuIds,
        y: sampleValues,
        text: otuLabels,
        mode: "markers",
        marker: {
            color: otuIds,
            size: sampleValues
        }
    };

    var bubbleData = [trace2];

    var layout = {
        xaxis: {
            title: "OTU ID"    
        },
      };

    // Render the plot to the div tag with id "bubble"
    Plotly.newPlot("bubble", bubbleData, layout);

})};
    