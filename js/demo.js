$(function(){
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
        list:[
            {
                name: "xxx",
                age: "12",
                gender: "male",
                addr: "hangzhou"
            },{
                name: "xxx",
                age: "12",
                gender: "male",
                addr: "hangzhou"
            }, {
                name: "xxx",
                age: "12",
                gender: "male",
                addr: "hangzhou"
            },{
                name: "xxx",
                age: "12",
                gender: "male",
                addr: "hangzhou"
            }, {
                name: "xxx",
                age: "12",
                gender: "male",
                addr: "hangzhou"
            },{
                name: "xxx",
                age: "12",
                gender: "male",
                addr: "hangzhou"
            },{
                name: "xxx",
                age: "12",
                gender: "male",
                addr: "hangzhou"
            },{
                name: "xxx",
                age: "12",
                gender: "male",
                addr: "hangzhou"
            }
        ]
    });
});