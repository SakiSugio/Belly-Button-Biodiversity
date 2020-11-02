// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("data/samples.json").then((importedData) => {
    console.log(importedData);
    // var data = importedData;
  


// Sort the sample_values
// var sortedSamples = sample_values.sort((a, b) => b.sample_values - a.sample_values);