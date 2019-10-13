;
(function (c, d) {
  var b = {
    getRandom: function (e, a) {
      return Math.floor(Math.random() * (a - e + 1)) + e
    }
  };
  c.Tools = b
})(window, undefined);
(function (g, i) {
  var e = "absolute";
  var h = [];

  function j(a) {
    a = a || {};
    this.x = a.x || 0;
    this.y = a.y || 0;
    this.width = a.width || 20;
    this.height = a.height || 20;
    this.color = a.color || "skyblue"
  }
  j.prototype.render = function (b) {
    f();
    this.x = Tools.getRandom(0, b.offsetWidth / this.width - 1) * this.width;
    this.y = Tools.getRandom(0, b.offsetHeight / this.height - 1) * this.height;
    var a = document.createElement("div");
    b.appendChild(a);
    h.push(a);
    a.style.position = e;
    a.style.left = this.x + "px";
    a.style.top = this.y + "px";
    a.style.width = this.width + "px";
    a.style.height = this.height + "px";
    a.style.backgroundColor = this.color
  };

  function f() {
    for (var a = h.length - 1; a >= 0; a--) {
      h[a].parentNode.removeChild(h[a]);
      h.splice(a, 1)
    }
  }
  g.Food = j
})(window, undefined);
(function (g, i) {
  var e = "absolute";
  var h = [];

  function j(a) {
    a = a || {};
    this.width = a.width || 20;
    this.height = a.height || 20;
    this.direction = a.direction || "right";
    this.body = [{
      x: 3,
      y: 2,
      color: "red"
    }, {
      x: 2,
      y: 2,
      color: "blue"
    }, {
      x: 1,
      y: 2,
      color: "blue"
    }]
  }
  j.prototype.render = function (b) {
    f();
    for (var c = 0, k = this.body.length; c < k; c++) {
      var d = this.body[c];
      var a = document.createElement("div");
      b.appendChild(a);
      h.push(a);
      a.style.position = e;
      a.style.width = this.width + "px";
      a.style.height = this.height + "px";
      a.style.left = d.x * this.width + "px";
      a.style.top = d.y * this.height + "px";
      a.style.backgroundColor = d.color
    }
  };

  function f() {
    for (var a = h.length - 1; a >= 0; a--) {
      h[a].parentNode.removeChild(h[a]);
      h.splice(a, 1)
    }
  }
  j.prototype.move = function (b, c) {
    for (var m = this.body.length - 1; m > 0; m--) {
      this.body[m].x = this.body[m - 1].x;
      this.body[m].y = this.body[m - 1].y
    }
    var n = this.body[0];
    switch (this.direction) {
      case "right":
        n.x += 1;
        break;
      case "left":
        n.x -= 1;
        break;
      case "top":
        n.y -= 1;
        break;
      case "bottom":
        n.y += 1;
        break
    }
    var o = n.x * this.width;
    var a = n.y * this.height;
    if (o === b.x && a === b.y) {
      var d = this.body[this.body.length - 1];
      this.body.push({
        x: d.x,
        y: d.y,
        color: d.color
      });
      b.render(c)
    }
  };
  g.Snake = j
})(window, undefined);
(function (g, i) {
  var e;

  function h(a) {
    this.food = new Food();
    this.snake = new Snake();
    this.map = a;
    e = this
  }
  h.prototype.start = function () {
    this.food.render(this.map);
    this.snake.render(this.map);
    f();
    j()
  };

  function j() {
    document.addEventListener("keydown", function (a) {
      switch (a.keyCode) {
        case 37:
          this.snake.direction = "left";
          break;
        case 38:
          this.snake.direction = "top";
          break;
        case 39:
          this.snake.direction = "right";
          break;
        case 40:
          this.snake.direction = "bottom";
          break
      }
    }.bind(e), false)
  }

  function f() {
    var a = setInterval(function () {
      this.snake.move(this.food, this.map);
      this.snake.render(this.map);
      var c = this.map.offsetWidth / this.snake.width;
      var d = this.map.offsetHeight / this.snake.height;
      var k = this.snake.body[0].x;
      var b = this.snake.body[0].y;
      if (k < 0 || k >= c) {
        alert("凉凉");
        clearInterval(a)
      }
      if (b < 0 || b >= d) {
        alert("凉凉");
        clearInterval(a)
      }
    }.bind(e), 150)
  }
  g.Game = h
})(window, undefined);
(function (e, f) {
  var c = document.getElementById("map");
  var d = new Game(c);
  d.start()
})(window, undefined);