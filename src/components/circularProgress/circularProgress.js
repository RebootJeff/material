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

  return {
    restrict: 'E',
    template: '<div class="container">' +
      '</div>',
    compile: compile
  };
  
  function compile(tElement, tAttrs, transclude) {
    return postLink;
  }

  function postLink(scope, element, attr) {

  }
}