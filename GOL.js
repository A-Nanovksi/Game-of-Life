window.onload = function () {
	function Initcells() {
		var p_cells=[];
		for(var i = 0 ; i <Mcell.X; i++ ) {
			p_cells[i] = [0];
				for( var j = 0 ; j <Mcell.Y; j++ ){
					p_cells[i][j]=0;
				}
		}
	return p_cells;
	}


	function CELL(row,column) {
		this.row=row;
		this.column=column;
	}


	Mcell= {};
	Mcell.X = 480;
	Mcell.Y = 480;
	Mcell.cellSize = 12 ;
	Mcell.ALIVE = 1;
	Mcell.DEAD = 0;
	Mcell.WIDTH = Mcell.X / Mcell.cellSize;
	Mcell.HEIGHT = Mcell.Y / Mcell.cellSize;
	Mcell.minimum=2;
	Mcell.maximum=3;
	Mcell.spawn=3;
	Mcell.web=Initcells();
	Mcell.colorDead="#ffffff";
	Mcell.colorAlive="#000000";
	Mcell.intervalVal;


	var wholeWeb = document.getElementById("web");
	var context = wholeWeb.getContext('2d');
	var offset = Mcell.cellSize;

	for (var i = 0; i <= Mcell.X; i += Mcell.cellSize) {
		context.moveTo(0.5 + i, 0);
		context.lineTo(0.5 + i, Mcell.Y);
	}
	for (var j = 0; j <= Mcell.Y; j += Mcell.cellSize) {
		context.moveTo(0, 0.5 + j);
		context.lineTo(Mcell.X, 0.5 + j);
	}
	context.strokeStyle = "#6495ed";
	context.stroke();


	function createNewWeb() {
		for (var i = 0; i < Mcell.HEIGHT; i++) {
			for (var j = 0; j < Mcell.WIDTH; j++) {
				if (Mcell.web[i][j] === Mcell.ALIVE) {
					context.fillStyle = Mcell.colorAlive;
				} else {
					context.fillStyle = Mcell.colorDead;
				}
				context.fillRect( j * Mcell.cellSize +1, i * Mcell.cellSize +1, Mcell.cellSize -1, Mcell.cellSize -1);
			}
		}
	}


	Mcell.takeState = function() {
		var n8bors;
		var nextGen = Initcells();
		for (var i = 0; i < Mcell.HEIGHT; i++) {
			for (var j = 0; j < Mcell.WIDTH; j++) {
				n8bors = Mcell.calcN8bors(i, j);
				if (Mcell.web[i][j] !== Mcell.DEAD) {
					if ((n8bors >= Mcell.minimum) && (n8bors <= Mcell.maximum)) {
						nextGen[i][j] = Mcell.ALIVE;
					}
				} else {
					if (n8bors === Mcell.spawn) {
						nextGen[i][j] = Mcell.ALIVE;
					}
				}
			}
		}
		Mcell.copyWep(nextGen,Mcell.web);
	};


	Mcell.calcN8bors = function(y, x) {
		var n8bors;
		if(Mcell.web[y][x] !== Mcell.DEAD) {
			n8bors = -1;
		} else {
			n8bors = 0;
		}
		for (var i = -1; i <= 1; i++) {
			for (var j = -1; j <= 1; j++) {
				if (Mcell.web[(Mcell.HEIGHT + (y + i)) % Mcell.HEIGHT][(Mcell.WIDTH + (x + j)) % Mcell.WIDTH] !== Mcell.DEAD) {
				n8bors++;
				}
			}
		}
	return n8bors;
	};

	function update() {
		Mcell.takeState();
		createNewWeb();
	}

	Mcell.copyWep = function(newer, old) {
		for (var i = 0; i < Mcell.HEIGHT; i++) {
			for (var j = 0; j < Mcell.WIDTH; j++) {
				old[i][j] = newer[i][j];
			}
		}
	};

	var startbut=document.getElementById("startbut");
	startbut.onclick = function() {
		if(startbut.id=='startbut') {
			startbut.value='Stop';
			startbut.setAttribute('ID','stopbut');
			Mcell.intervalVal=setInterval(function() {
				update();
			},100);
		} else {
			startbut.value='Start';
			clearInterval(Mcell.intervalVal);
			startbut.setAttribute('ID','startbut');
		}
		
	};

	var clearbut=document.getElementById("clearbut");
	clearbut.onclick=function() {
		Mcell.web=Initcells();
		clearInterval(Mcell.intervalVal);
		createNewWeb();
	};
		function webOnClicled(event) {
			var cell = getCursorPosition(event);
			var state ;
			if(Mcell.web[cell.row][cell.column] == Mcell.ALIVE) {
				state = Mcell.DEAD 
			} else {state = Mcell.ALIVE;}
			Mcell.web[cell.row][cell.column] = state;
			createNewWeb();
		}

		function getCursorPosition(event) {
			var x;
			var y;
			if (event.pageX || event.pageY) {
				x = event.pageX;
				y = event.pageY;
			} else {
				x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
				y = event.clientY + document.body.scrollTop	+ document.documentElement.scrollTop;
			}

			x -= wholeWeb.offsetLeft;
			y -= wholeWeb.offsetTop;

			var cell = new CELL(Math.floor((y - 4) / Mcell.cellSize),Math.floor((x - 2) / Mcell.cellSize));
			return cell;
		}
		wholeWeb.addEventListener("click", webOnClicled, false);
};


/*
	function main () {
		var ul=document.createElement('ul');
		for(var i = 0;i < 5 ;i++) {
			vat li=document.createElement('li');
			li.onlick= function() {
				showInedx(i);
			};
			ul.appendChild(li);
		}
		document.body.appendChild()
	}

 */ 