module.exports = {
  solr_domain : "http://sample.solr.domain",

  start_date : "2014-07",

  purpose : {
    "2001" : "ビジネス",
    "2002" : "レジャー",
    "2003" : "その他"
  },

  together_with : {
    "2101" : "一人",
    "2102" : "家族",
    "2103" : "恋人",
    "2104" : "友達",
    "2105" : "仕事仲間",
    "2106" : "その他"
  },

  review_type : {
    "1" : "感想・情報",
    "3" : "苦情",
    "0" : "感想・情報・苦情"
  },

  rate_format : [
    "投稿番号",
    "投稿日時",
    "ニックネーム",
    "目的",
    "同伴者",
    "参考になった数",
    "参考にならなかった数",
    "評価1(立地)",
    "評価2(部屋)",
    "評価3(食事)",
    "評価4(風呂)",
    "評価5(サービス)",
    "評価6(設備・アメニティ)",
    "評価7(総合評価)"
  ],

  review_format : [
    "施設番号",
    "投稿日時",
    "ユーザー投稿本文",
    "投稿番号",
    "分類",
    "プランID",
    "プランタイトル",
    "部屋種類",
    "部屋名前",
    "施設回答本文"
  ],

  validate : function(str){
    if(str){
      str = str.replace(/\r/g," ");
      str = str.replace(/\t/g," ");
      str = str.replace(/\n/g," ");
    }
    return str;
  },

  dateValidate : function(str){
    var array = str.split("T");
    array[0]=array[0].replace(/-/g,"/");
    array[1]=array[1].replace("Z","");
    return array.join(" ");
  }
};
