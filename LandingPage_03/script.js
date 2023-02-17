var Split = function() {
  this.$t = $(".split");
  this.gridX = 20;
  this.gridY = 14;
  this.w = this.$t.width();
  this.h = this.$t.height();
  this.img = $("img", this.$t).attr("src");
  this.delay = 0.05;

  this.create = function() {
    $("div", this.$t).remove();

    for (x = 0; x < this.gridX; x++) {
      for (y = 0; y < this.gridY; y++) {
        var width = this.w / this.gridX * 101 / this.w + "%",
            height = this.h / this.gridY * 101 / this.h + "%",
            top = this.h / this.gridY * y * 100 / this.h + "%",
            left = this.w / this.gridX * x * 100 / this.w + "%",
            bgPosX = -(this.w / this.gridX * x) + "px",
            bgPosY = -(this.h / this.gridY * y) + "px";

        $("<div />")
          .css({
          top: top,
          left: left,
          width: width,
          height: height,
          backgroundImage: "url(" + this.img + ")",
          backgroundPosition: bgPosX + " " + bgPosY,
          backgroundSize: this.w + "px",
          transitionDelay: x * this.delay + y * this.delay + "s"
        })
          .appendTo(this.$t);
      }
    }
  };

  this.create();

  this.$t
    .on("click", function() {
    $(this).toggleClass("active");
  })
    .click();
};

window.onload = function() {
  var split = new Split();
  var gui = (function datgui() {
    // var gui = new dat.GUI();
    gui.add(split, "gridX", 1, 20).step(1).onChange(function(newValue) {
      split.create();
    });
    gui.add(split, "gridY", 1, 20).step(1).onChange(function(newValue) {
      split.create();
    });
    gui.add(split, "delay", 0, 0.3).step(0.01).onChange(function(newValue) {
      split.create();
    });
    return gui;
  })();
};