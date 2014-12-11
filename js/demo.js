$(function(){
   var data = Mock.mock({
       'list|101': [{
           'name|1': ['rxh','rxh1','rxh2','rxh3','rxh4','rxh5','rxh6'],
           'age|1': ['10','11','12','13','14','15','16','17'],
           'gender|1': ['male','female'],
           'addr|1': ['xx.','xx..','xx...','xx....','xx.....','xx......','xx........']
       }]
   });
   $(".grid").grid({
        width: "100%",
        headHeight: "30",
        columns:[
            {
                width: "7%",
                field: ""
                },
            {
                field: "name"
            },{
                field: "age"
            },{
                field: "gender"
            },{
                field: "addr"
            }
        ],
        list:data.list
    });
});