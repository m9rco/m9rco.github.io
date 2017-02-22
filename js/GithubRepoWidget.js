/*!
	GitHub-Repo-Widget.js - Not depend on jQuery or Other Framework.
	License:  MIT
*/
(function() {
	var rendered = 'github-widget-rendered',
		cssStr = '.path-divider{margin:0 .25em}.github-box *{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;}.github-box{font-family:helvetica,arial,sans-serif;font-size:13px;line-height:18px;background:#fafafa;border:1px solid #ddd;color:#666;border-radius:3px}.github-box a{color:#4183c4;border:0;text-decoration:none}.github-box .github-box-title{position:relative;border-bottom:1px solid #ddd;border-radius:3px 3px 0 0;background:#fcfcfc;background:-moz-linear-gradient(#fcfcfc,#ebebeb);background:-webkit-linear-gradient(#fcfcfc,#ebebeb);}.github-box .github-box-title h3{word-wrap:break-word;font-family:helvetica,arial,sans-serif;font-weight:normal;font-size:16px;color:gray;margin:0;padding:10px 10px 10px 30px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAXBAMAAAD0LQLXAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAASUExURQAAAL29vc3NzcLCwsjIyNbW1pvTNOEAAAABdFJOUwBA5thmAAAATElEQVQI12MIFoQAEQZFYwcGEGBkUDRUQLCcsYjRXhbqKkEGZQYGqJgSnKXCwGgsAGYpqyobG4WGhioyhBhDgClI3EQAqpaZwQBEAQARmA4G2o55nQAAAABJRU5ErkJggg==) 7px center no-repeat; width: auto;}.github-box .github-box-title h3 .repo{font-weight:bold}.github-box .github-box-title .github-stats{float:right;position:absolute;top:8px;right:10px;font-size:11px;font-weight:bold;line-height:21px;height:auto;min-height:21px}.github-box .github-box-title .github-stats a{display:inline-block;height:21px;color:#666;border:1px solid #ddd;border-radius:3px;padding:0 5px 0 18px;background: white url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAqBAMAAABB12bjAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAYUExURf///5mZmdbW1u/v7/r6+rGxscXFxaSkpHLccIMAAABsSURBVBjTY2CgBmBODTOAsFgSi9TFHMBMc1Fmk8BiEItJUMhQWFFQAZXJoC7q7FJYhNBmgG7YQAIWMYTvEExXIbh8oAJWQQe4IGsIlKmowAZVwaKowgxlMgkKmwtCjRAUYBSEqnVkYBAm39EALMwNXwql3eYAAAAASUVORK5CYII=) no-repeat}.github-box .github-box-title .github-stats .watchers{border-right:1px solid #ddd}.github-box .github-box-title .github-stats .forks{background-position:-4px -21px;padding-left:15px}.github-box .github-box-content{padding:10px;font-weight:300}.github-box .github-box-content p{margin:0}.github-box .github-box-content .link{font-weight:bold}.github-box .github-box-download{position:relative;border-top:1px solid #ddd;background:white;border-radius:0 0 3px 3px;padding:10px;height:auto;min-height:24px;}.github-box .github-box-download .updated{word-wrap:break-word;margin:0;font-size:11px;color:#666;line-height:24px;font-weight:300;width:auto}.github-box .github-box-download .updated strong{font-weight:bold;color:#000}.github-box .github-box-download .download{float:right;position:absolute;top:10px;right:10px;height:24px;line-height:24px;font-size:12px;color:#666;font-weight:bold;text-shadow:0 1px 0 rgba(255,255,255,0.9);padding:0 10px;border:1px solid #ddd;border-bottom-color:#bbb;border-radius:3px;background:#f5f5f5;background:-moz-linear-gradient(#f5f5f5,#e5e5e5);background:-webkit-linear-gradient(#f5f5f5,#e5e5e5);}.github-box .github-box-download .download:hover{color:#527894;border-color:#cfe3ed;border-bottom-color:#9fc7db;background:#f1f7fa;background:-moz-linear-gradient(#f1f7fa,#dbeaf1);background:-webkit-linear-gradient(#f1f7fa,#dbeaf1);}@media (max-width: 767px) {.github-box .github-box-title{height:auto;min-height:60px}.github-box .github-box-title h3 .repo{display:block}.github-box .github-box-title .github-stats a{display:block;clear:right;float:right;}.github-box .github-box-download{height:auto;min-height:46px;}.github-box .github-box-download .download{top:32px;}}';
	function _getAttribute(node, name, defaultValue) {
		return node.getAttribute(name) || defaultValue;
	}
	function _querySelector(dom, sel) {
		return dom.querySelector(sel);
	}
	function _setHtml(dom, h) {
		dom.innerHTML = h;
	}
	function _appendCss() {
		var x = document.createElement('div');
		x.innerHTML = 'x<style>'+cssStr+'</style>';
		document.getElementsByTagName('head')[0].appendChild(x.lastChild);
	}
	function _renderGitHubWidget(repoEle, repo) {
		repo = JSON.parse(repo);
		_setHtml(_querySelector(repoEle, '.watchers'), repo.watchers);
		_setHtml(_querySelector(repoEle, '.forks'), repo.forks);
		_setHtml(_querySelector(repoEle, '.description span'), repo.description);
		_setHtml(_querySelector(repoEle, '.updated'), 'Latest commit to the <strong>' + repo.default_branch+ '</strong> branch on <strong>' + repo.pushed_at.substring(0, 10) + '</strong>');

		if(repo.homepage !== null) {
			_setHtml(_querySelector(repoEle, '.link'), '<a href="'+ repo.homepage +'">'+ repo.homepage +'</a>');
		}
		repoEle.setAttribute(rendered, '1');
	}
	function _ajaxReq(repoEle, repo) {
		var xmlhttp;
		if (window.XMLHttpRequest) {
			//code for IE7,firefox chrome and above
			xmlhttp = new XMLHttpRequest();
		} else {
			//code for Internet Explorer
			xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
		}
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				_renderGitHubWidget(repoEle, xmlhttp.responseText);
			} else {
			}
		};
		xmlhttp.open('GET', 'https://api.github.com/repos/' + repo, true);
		xmlhttp.send();
	}
	function _init() {
		var github_eles = document.querySelectorAll('.github-widget'), repoEle, repo, vendorName, repoName, vendorUrl, repoUrl, widget;
		for (var i = 0; i < github_eles.length; i++) {
			repoEle = github_eles[i];
			if (! _getAttribute(repoEle, rendered, '')) {
				repo = _getAttribute(repoEle, 'data-repo', ''),
				vendorName = repo.split('/')[0],
				repoName = repo.split('/')[1],
				vendorUrl = 'http://github.com/' + vendorName,
				repoUrl = 'http://github.com/' + vendorName + '/' + repoName;

				widget = '<div class="github-box repo">'+
					'<div class="github-box-title">'+
					'<h3>'+
					'<a class="owner" href="' + vendorUrl + '" title="' + vendorUrl + '">' + vendorName + '</a>'+
					'<span class="path-divider">/</span>'+
					'<a class="repo" href="' + repoUrl + '" title="' + repoUrl + '">' + repoName + '</a>'+
					'</h3>'+
					'<div class="github-stats">'+
					'<span class="github-text">Star </span>'+
					'<a class="watchers" href="' + repoUrl + '/watchers" title="See watchers">?</a>'+
					'<span class="github-text">　Fork </span>'+
					'<a class="forks" href="' + repoUrl + '/network/members" title="See forkers">?</a>'+
					'</div>'+
					'</div>'+
					'<div class="github-box-content">'+
					'<p class="description"><span></span> &mdash; <a href="' + repoUrl + '#readme">Read More</a></p>'+
					'<p class="link"></p>'+
					'</div>'+
					'<div class="github-box-download">'+
					'<div class="updated"></div>'+
					'<a class="download" href="' + repoUrl + '/zipball/master" title="Get repository">Download as zip</a>'+
					'</div>'+
					'</div>';
				_setHtml(repoEle, widget);
				_ajaxReq(repoEle, repo);
			}
		}
	}
	_appendCss();
	_init();
	window.GithubRepoWidget = {
		init: _init
	};

	var timer;
	$('.footer-right').hover(function(){
		clearInterval(timer); 
	}, function(){ 
		timer = setInterval(function(){
			$(".footer-right span").fadeOut("slow",function(){
				$(this).text(_network[Math.floor((Math.random()*_network.length))]);
				$(this).fadeIn('slow');
			});
		}, 8000) ;
	}).trigger('mouseleave'); 

	var _network = [
		'学会习惯一个人，不要总是要人陪',
		'不到万不得已，不要向别人求助，欠下太多的人情不太好',
		'不要总是说别人的坏话，不然没人会喜欢你',
		'要多学点知识，将来的日子需要你好好过，还有你的父母将来要依靠你',
		'不要以貌取人，外貌并不重要，重要的是人品与气质',
		'不要总是懦弱，要学会应对与解决困境',
		'每周打一个电话回家，问候一下家人，家人是世界上永远都不会抛弃你的人，永远包容你的人',
		'对每个人不要轻易地发脾气，不然很多人都会烦你',
		'要懂得感恩，对每个对自己好的人要怀着感恩的心，认真对待他们',
		'机会是留给有准备的人，不要总是等待，不做好准备',
		'要慢慢地胆大，学会在公众面前讲话',
		'要学会独立，不要事事想着依赖家人',
		'作为一个人，多读一点书，增加自己的涵养与知识',
		'今日事，今日做，不要像以前一样拖拉做事要果断，不要犹豫不决',
		'要学会节约，要知道金钱来之不易，不要浪费',
		'要对自己该做的事情负责任，不要推脱，努力做好',
		'要尽自己最大的力量帮助别人，因为你也曾受到别人的帮助',
		'要珍惜时间与机会，错过就不会回来',
		'如果讨厌一个人，不要挂在嘴边，自会让自己更心烦而已',
		'不要与别人攀比，体谅父母，不要增加家庭负担',
		'要坚持心中的梦想，要有目标的生活喜欢做一件事，就要坚持下去',
		'不要轻言放弃，要自信，告诉自己就是最好的',
		'不要经常上网，不要经常看小说，不要经常熬夜，这些都对身体不太好',
		'要虚心接受别人的批评，要敢于承认自己的错误',
		'要学会合作，不要单打独斗，与朋友搞好关系学习更多做人做事的经验',
	];

})();