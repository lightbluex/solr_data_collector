# A small tool for collecting data from solr
This tool contributed for ["Rakuten Data Share"](http://rit.rakuten.co.jp/opendata.html) project.

## Usage
Collect data from solr api, and output all the data into /results/

## How to

### Preparation
1. Install Node js.

2. Clone this repository

3. Change the start date in ```util.js``` from
```
start_date : "2014-07",
```
to the date you need.

4. Change the data format in ```util.js``` to the style you need.


### Execution

```
cd /your_project_folder
npm i
node collect_data.js
```
