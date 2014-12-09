(function($){
    function Grid(element,options){
        this.options = $.extend({},$.fn.grid.defaults,options);
        this.$element = $(element);
        this.$btable = $("<table class='tboder'>");
        this.$bhead = $("<thead>");
        this.$bbody = $("<tbody>");
        this.list = this.options.list;
        this._init();
    }
    Grid.prototype = {
        constructor: Grid,
        _init: function(){
            this.$btable.css({
                width: this.options.width,
                height: this.options.height
            });
            this.$btable.append(this.$bhead);
            this.$btable.append(this.$bbody);
            this.$element.append(this.$btable);
            this._initPager();
            this._addEvent();
            this._generateTablehead(this.options.columns);
            this._generateRow(this.options.list,this.options.columns);
        },
        //生成表格头
        _generateTablehead:function(columns){
            var $tr = $("<tr class='ui-head'>");
            $.each(columns,function(index,value){
                $tr.append($("<th class='ui-th'>").text(this.field).css({"width":this.width}).attr("field",this.field));
            });
            $tr.css({
                height: this.options.headHeight
            });
            $tr.find("th:first").append($("<input type='checkbox'>"));
            this.$bhead.append($tr);
        },
        //生成表格行
        _generateRow: function(list,columns){
            var $bbody = this.$bbody; 
            $bbody.append($("<tr class='ui-tr'>").append($("<td class='ui-td'>")
                .attr("colspan",columns.length).append($("<div class='ui-overflow-table'>"))));
            var $tableDiv = $(".ui-overflow-table");
            var $table = $("<table class='data-table'>");
            var $bbody = $("<tbody>");
            $.each(list,function(index,value){
                var that = this;
                var $tr = $("<tr class='ui-data-tr'>");
                var $thead = $(".ui-th");
                $tr.append($("<td class='ui-data-td'>").append($("<input type='checkbox'>")));
                $thead.each(function(index,ele){
                    if ($(this).attr("field") in that) {
                        $tr.append($("<td class='ui-data-td'>").css({"width":$(this).width()}).text(that[$(this).attr("field")]));
                    }
                });
                $bbody.append($tr);
            });
             $table.append($bbody);
             $tableDiv.append($table);
        },
        _addSelected : function($tr){
			this.options.selectOnCheck && $tr.addClass('tb-row-selected');
		},
        _removeSelected : function($tr){
            this.options.selectOnCheck && $tr.removeClass('tb-row-selected');
        },
        _addEvent: function() {
            var _this = this;
            this.$btable.on("change","div input[type='checkbox']",function(e){
                e.stopPropagation();
                var $cb = $(this);
                var $tr = $cb.closest("tr");
                if ($cb.is(":checked")) {
                    _this._addSelected($tr);    
                }else {
                    _this._removeSelected($tr);   
                }
            });
            //表头的checkbox
            this.$btable.on("change",".ui-th input[type='checkbox']",function(e) {
                var $cb = $(this);
                var $trs = $cb.closest("table").find(".data-table tr");
                if ($cb.is(":checked")) {
                    _this._addSelected($trs);
                    $trs.find(":checkbox").prop("checked",true);
                }else {
                    _this._removeSelected($trs);
                    $trs.find(":checkbox").prop("checked",false);
                }
            });
        },
        _initPager: function() {
            this.pageSize = this.options.pageSize;
            this.currentPage = this.options.currentPage || 1;
            this.totalSize = 1;
            var pager = this.$pager = $("<div class='tb-pager'>");
            pager.append("<div class='tb-page-select'>"
                        +"<select><option value='5'>5</option><option value='10' selected>10</option><option value='15'>15</option><option value='20'>20</option><option value='50'>50</option><option value='100'>100</option>"
                        +"</select></div>");
            pager.append("<div class='tb-pg-sptr'>");
            pager.append("<div class='tb-pg-page'>"
                        +"<span>第</span><span><input type='text' class='page-number'></span><span>页</span>"
                        +"<span>/共</span><span class='tb-total-size'>1</span><span>页</span>");
            pager.append("<div class='tb-pg-sptr'>");
            pager.append("<div class='tb-pg-btn'><a class='tb-pg-fst'></a><a class='tb-pg-pre' href='#'></a><a class='tb-pg-next'></a><a class='tb-pg-last'></a>");
            pager.append("<div class='tb-pg-sptr'>");
            pager.append('<div class="tb-tlt-num">共<span>0</span>条记录</div>');
            this.$currentPage = pager.find(".page-number");
            this.$pageSize = pager.find("select");
            this.$totalNum = pager.find(".tb-tlt-num>span");
            this.$totalSize = pager.find(".tb-total-size");
            this.$btable.after(this.$pager);
            this._refreshPager();
        },
        _refreshPager: function(){
        	var _this = this;
        	function init() {
        		if (_this.options.pagination) {
					_this.total = _this.list.length;
					_this.totalSize = Math.ceil(_this.total/_this.pageSize);
					_this.currentPage = 1;
					_this.$totalSize.text(_this.totalSize||1);
					_this.$totalNum.text(_this.total);
					_this.$currentPage.val(_this.currentPage);
        		}
        	}
        	init();
			_this.$pageSize.on("change",function(e){
				_this.pageSize = $(this).val();
				$(".tboder").find("tbody").eq(0).empty();
				_this._generateRow(_this.list.slice(0,_this.pageSize),_this.options.columns);
				init();
			});
			_this._refreshPagerBtn();
        },
        //前进，后退按钮事件
        _refreshPagerBtn: function() {
        	var _this = this;
        	this.$pager.on("click",".tb-pg-fst",function(e){
        		e.preventDefault();
				_this.currentPage = 1;
				_this._clickBtn();
        	});
        	this.$pager.on("click",".tb-pg-pre",function(e){
        		e.preventDefault();
        		if (_this.currentPage == 1) {
        			return;
        		}
        		_this.currentPage--;
        		_this._clickBtn();
        		console.log(_this.currentPage);
        	});
        	this.$pager.on("click",".tb-pg-next",function(e){
        		e.preventDefault();
        		if (_this.currentPage == _this.totalSize) {
        			return;
        		}
        		_this.currentPage++;
        		_this._clickBtn();
        	});
        	this.$pager.on("click",".tb-pg-last",function(e){
        		e.preventDefault();
        		_this.currentPage = _this.totalSize;
        		_this._clickBtn();
        	});
        },
        _clickBtn: function() {
        	var _this = this;
        	$(".tboder").find("tbody").eq(0).empty();
			_this._generateRow(_this.list.slice((_this.currentPage-1)*_this.pageSize,(_this.currentPage)*_this.pageSize),_this.options.columns);
			_this.$currentPage.val(_this.currentPage);
        }
    };
    $.fn.grid = function(opts){
        return this.each(function(){
            var $this = $(this);
            var data = $this.data("grid");
            if (!data) {
                $this.data("grid",(data = new Grid(this,opts)));
            }
        });
    };
    $.fn.grid.defaults = {
        width:"200",
        columns:[],
        pageSize: 10,
        selectOnCheck: true,
        pagination: true
    };
})(jQuery);