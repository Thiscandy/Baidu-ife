
function Jigsaw(img) {
	return new Jigsaw.prototype.init(img);
}
Jigsaw.prototype = {
	prefix:'layout',
	init:function (img) {
		var that = this;
		this.wrap = img.wrap;
		this.imgList = img.imgList;

		this.wrap.className +='Jigsaw';
		this.wrap.style.width = this.width = img.width || '960px';
		this.wrap.style.height = this.height = img.height || '400px';

		this.imgPop = document.querySelector('#Jigsaw-pop') || null;
		if (!this.imgPop) {
			this.imgPop = document.createElement('div');
			this.imgPop.id = 'Jigsaw-pop';
			document.body.appendChild(this.imgPop);
		}
		this.imgPop.addEventListener('click',function(event) {
			event = event || window.event;
			if (event.target.id === 'Jigsaw-pop') {
				that.imgPop.className = that.imgPop.className.replace('show','');
			}
		},false);
		document.body.appendChild(this.imgPop);

		this.layout();
	},
	layout:function(){
		var divList = [],
			that = this,
			width = parseInt(this.width,10),
			height = parseInt(this.height,10),
			count = this.imgList.length;

		for (var i = 0; i < count; i++) {
			var div = document.createElement('div');

			div.className = 'imgCover';
			div.style.backgroundImage = 'url('+this.imgList[i].src+')';
			div.dataset.src = this.imgList[i].src;
			div.dataset.alt = this.imgList[i].alt || '';

			divList.push(div);
		}

		divList.forEach(function (item){
			item.addEventListener('click',function(){
				var img = document.createElement('img');

				that.imgPop.className +='show';
				that.imgPop.innerHTML = '';
				img.src = item.dataset.src;

				that.imgPop.appendChild(img);
			});
		});

		switch(count){
			case 1:
				this.wrap.className += ' '+ this.prefix +'-1';
				divList.forEach(function(item){
					that.wrap.appendChild(item);
				});
				break;
			case 2:
				this.wrap.className += ' ' + this.prefix + '-2';
				divList.forEach(function(item){
					if (!('clip-path' in document.body.style)) {
						item.style.width = width / 2 + 'px';
					}
					that.wrap.appendChild(item);
				});
				break;
			case 3:
				this.wrap.className += ' ' + this.prefix + '-3';
				i = 0;
				divList.forEach(function(item){
					switch(i++){
						case 0:
							item.style.width = width - (height / 2)+ 'px';
							break;
						case 1:
							item.style.width = item.style.height = height / 2 +'px';
							break;
						case 2:
							item.style.width = item.style.height = height / 2 + 'px';
							break;
					}
					that.wrap.appendChild(item);
				});
				break;
			case 4:
			    this.wrap.className +=  ' ' + this.prefix + '-4';
			    divList.forEach(function(item) {
			        that.wrap.appendChild(item);
			    });
			    break;
			case 5:
			    this.wrap.className +=  ' ' + this.prefix + '-5';
			    i = 0;
			    divList.forEach(function(item) {
			        switch (i++) {
			            case 0:
			                item.style.height = height * 2 / 3  + 'px';
			                item.style.width = width * 2 / 3 + 'px';
			                break;
			            case 1:
			                item.style.height = width / 3 + 'px';
			                item.style.width = width / 3 + 'px';
			                break;
			            case 2:
			                item.style.height = height - width / 3 + 'px';
			                item.style.width = width / 3 + 'px';
			                break;
			            case 3:
			            case 4:
			                item.style.height =  height / 3 + 'px';
			                item.style.width = width / 3 + 'px';
			                break;
			        }
			        that.wrap.appendChild(item);
			    });
			    break;
			case 6:
			    this.wrap.className +=  ' ' + this.prefix + '-6';
			    i = 0;
			    divList.forEach(function(item) {
			        switch (i++) {
			            case 0:
			                item.style.height = height * 2 / 3  + 'px';
			                item.style.width = width * 2 / 3 + 'px';
			                break;
			            case 1:
			            case 2:
			            case 3:
			            case 4:
			            case 5:
			                item.style.height =  height / 3 + 'px';
			                item.style.width = width / 3 + 'px';
			                break;
			        }
			        that.wrap.appendChild(item);
			    });
			    break;
			default: console.warn('Doesn\'t support.'); break;
		}
	}
}
Jigsaw.prototype.init.prototype = Jigsaw.prototype;
window.Jigsaw = Jigsaw;

var p1 = Jigsaw({
	wrap:document.getElementById('pic-1'),
	imgList:[{
		src:'images/img-1.jpg',
		alt:'Image Alt'
	}]
});
var p2 = Jigsaw({
    wrap: document.getElementById('pic-2'),
    height: '400px',
    imgList: [{
        src: 'images/img-1.jpg',
        alt: 'Image Alt'
    }, {
        src: 'images/img-2.jpg',
        alt: 'Image Alt'
    }]
});
var p3 = Jigsaw({
    wrap: document.getElementById('pic-3'),
    height: '400px',
    imgList: [{
        src: 'images/img-1.jpg',
        alt: 'Image Alt'
    }, {
        src: 'images/img-2.jpg',
        alt: 'Image Alt'
    }, {
        src: 'images/img-3.jpg',
        alt: 'Image Alt'
    }]
});
var p4 = Jigsaw({
    wrap: document.getElementById('pic-4'),
    height: '400px',
    imgList: [{
        src: 'images/img-1.jpg',
        alt: 'Image Alt'
    }, {
        src: 'images/img-2.jpg',
        alt: 'Image Alt'
    }, {
        src: 'images/img-3.jpg',
        alt: 'Image Alt'
    }, {
        src: 'images/img-4.jpg',
        alt: 'Image Alt'
    }]
});
var p5 = Jigsaw({
    wrap: document.getElementById('pic-5'),
    height: '600px',
    imgList: [{
        src: 'images/img-1.jpg',
        alt: 'Image Alt'
    }, {
        src: 'images/img-2.jpg',
        alt: 'Image Alt'
    }, {
        src: 'images/img-3.jpg',
        alt: 'Image Alt'
    }, {
        src: 'images/img-4.jpg',
        alt: 'Image Alt'
    }, {
        src: 'images/img-5.jpg',
        alt: 'Image Alt'
    }]
});
var p6 = Jigsaw({
    wrap: document.getElementById('pic-6'),
    height: '600px',
    imgList: [{
        src: 'images/img-1.jpg',
        alt: 'Image Alt'
    }, {
        src: 'images/img-2.jpg',
        alt: 'Image Alt'
    }, {
        src: 'images/img-3.jpg',
        alt: 'Image Alt'
    }, {
        src: 'images/img-4.jpg',
        alt: 'Image Alt'
    }, {
        src: 'images/img-5.jpg',
        alt: 'Image Alt'
    }, {
        src: 'images/img-6.jpg',
        alt: 'Image Alt'
    }]
});