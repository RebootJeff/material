/**
 * @ngdoc module
 * @name material.components.circularProgress
 * @description Circular Progress module!
 */
angular.module('material.components.circularProgress', [
  'material.animations',
  'material.services.aria'
])
  .directive('materialCircularProgress', [
    '$$rAF',
    '$materialEffects',
    MaterialCircularProgressDirective
  ]);

/**
 * @ngdoc directive
 * @name materialCircularProgress
 * @module material.components.circularProgress
 * @restrict E
 */
function MaterialCircularProgressDirective($$rAF, $materialEffects) {
  var fillRotations = new Array(101),
    fixRotations = new Array(101);

  for (var i = 0; i < 101; i++) {
    var percent = i / 100;
    var rotation = Math.floor(percent * 180);

    fillRotations[i] = 'rotate(' + rotation.toString() + 'deg)';
    fixRotations[i] = 'rotate(' + (rotation * 2).toString() + 'deg)';
  }

  return {
    restrict: 'E',
    template: 
      '<div class="circle">' +
        '<div class="mask full">' +
          '<div class="fill"></div>' +
        '</div>' +
        '<div class="mask half">' +
          '<div class="fill"></div>' +
          '<div class="fill fix"></div>' +
        '</div>' +
        '<div class="shadow"></div>' +
      '</div>' +
      '<div class="inset"></div>',
    compile: compile
  };

  function compile(tElement, tAttrs, transclude) {
    tElement.attr('aria-valuemin', 0);
    tElement.attr('aria-valuemax', 100);
    tElement.attr('role', 'progressbar');

    return postLink;
  }

  function postLink(scope, element, attr) {
    var circle = element[0],
      fill = circle.querySelectorAll('.fill, .mask.full'),
      fix = circle.querySelectorAll('.fill.fix'),
      i, clamped, fillRotation, fixRotation;

    var diameter = attr.diameter || 100;
    var scale = diameter/100;

    circle.style[$materialEffects.TRANSFORM] = 'scale(' + scale.toString() + ')';

    attr.$observe('value', function(value) {
      clamped = clamp(value);
      fillRotation = fillRotations[clamped];
      fixRotation = fixRotations[clamped];

      element.attr('aria-valuenow', clamped);

      for (i = 0; i < fill.length; i++) {
        fill[i].style[$materialEffects.TRANSFORM] = fillRotation;
      }

      for (i = 0; i < fix.length; i++) {
        fix[i].style[$materialEffects.TRANSFORM] = fixRotation;
      }
    });
  }

  function clamp(value) {
    if (value > 100) {
      return 100;
    }

    if (value < 0) {
      return 0;
    }

    return Math.ceil(value || 0);
  }
}