var util        = require('./util'),
    fs          = require('fs'),
    request     = require("request"),
    dateFormat  = require('dateformat');

var startRow = 0;
var stepRow = 2000;
var startMonth = new Date(util.start_date);
var endMonth = new Date();

var review_folder = './results/customer_review/';
var rate_folder = './results/customer_ratings/';

var readSolr = function(row, obj){
  var url = util.solr_domain+'/select/?q=m_post:'+ obj.startMonthStr +'&version=2.2&start=' + row + '&rows=' + stepRow + '&indent=on&wt=json&charset=utf-8';
  request({
    url: url,
    json : true
  }, function(error, response, body) {
    var totalNumber = body.response.numFound;
    // var totalNumber = 2000;
    console.log( obj.startMonthStr + " Current row:" + row);
    body.response.docs.map(function(item){
      fs.appendFileSync(obj.reviewFile, getReviewData(item), "utf8");
      fs.appendFileSync(obj.rateFile, getRateData(item), "utf8");
    });
    if(row + stepRow < totalNumber){
      readSolr(row + stepRow, obj);
      return false;
    }
    var currentMonth = new Date(obj.startMonth.getTime());
    currentMonth.setMonth(obj.startMonth.getMonth() + 1);
    if(currentMonth.getTime() < endMonth.getTime()){
      readSolr(startRow, initialize(currentMonth));
    }
  });
};

var initialize = function(currentMonth){
  var startMonthStr = dateFormat(currentMonth, "yyyymm");

  var reviewFile = review_folder + startMonthStr + ".tsv";
  var rateFile = rate_folder + startMonthStr + ".tsv";

  fs.writeFileSync(reviewFile, util.review_format.join("\t") + "\n", "utf8");
  fs.writeFileSync(rateFile, util.rate_format.join("\t") + "\n", "utf8");

  var obj = {
    startMonth    : currentMonth,
    startMonthStr : startMonthStr,
    reviewFile    : reviewFile,
    rateFile      : rateFile
  };

  return obj;
};

var getRateData = function(item){
  var rate_data = [];
  rate_data.push(util.validate(item.no_review));
  rate_data.push(util.dateValidate(item.dt_post));
  rate_data.push(util.validate(item.n_nickname));
  rate_data.push(util.purpose[item.nc_purpose]);
  rate_data.push(util.together_with[item.nc_together_with]);
  rate_data.push(item.su_good);
  rate_data.push(item.su_bad);
  rate_data.push(item.su_hotel_location);
  rate_data.push(item.su_hotel_room);
  rate_data.push(item.su_hotel_meal);
  rate_data.push(item.su_hotel_bath);
  rate_data.push(item.su_hotel_service);
  rate_data.push(item.su_hotel_equipment);
  rate_data.push(item.su_hotel_rate);
  var line = rate_data.join("\t");
  return line+"\n";
};

var getReviewData = function(item){
  var review_data = [];
  review_data.push(item.no_hotel);
  review_data.push(util.dateValidate(item.dt_post));
  review_data.push(util.validate(item.w_text));
  review_data.push(util.validate(item.no_review));
  review_data.push(util.review_type[item.nc_type]);
  review_data.push(item.no_plan);
  review_data.push(util.validate(item.n_plan));
  review_data.push(util.validate(item.cd_room));
  review_data.push(util.validate(item.n_room));
  review_data.push(util.validate(item.w_re_text));
  var line = review_data.join("\t");
  return line+"\n";
};

readSolr(startRow, initialize(startMonth));
