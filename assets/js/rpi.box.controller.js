(function() {
  'use strict';

  angular
    .module('gladys')
    .controller('rpiboxCtrl', rpiboxCtrl);

  rpiboxCtrl.$inject = ['$http', '$scope', '$rootScope', '$translate'];

  function rpiboxCtrl($http, $scope, $rootScope, $translate) {
    var vm = this;
    vm.remoteIsBusy = false;

    vm.tempCpuGauge;
    vm.voltageCpuGauge;
    vm.ramGauge;
    vm.chargeCpuGauge;



    vm.init = init;

    function init(id) {
      vm.remoteIsBusy = true;
      $rootScope.$on('$translateChangeSuccess', function() {
        createGauge();
        waitForNewValue();
      });

      return
    }

    function createGauge() {
      vm.tempCpuGauge = new JustGage({
        id: "tempCpuGauge",
        value: getRandomInt(0, 85),
        min: 0,
        max: 85,
        decimals: 1,
        title: $translate.instant('BOX_TEMPERATURE_CPU'),
        label: "°C",
        levelColorsGradient: false,
        pointer: true,
        pointerOptions: {
          toplength: -15,
          bottomlength: 5,
          bottomwidth: 6,
          color: '#8e8e93',
          stroke: '#ffffff',
          stroke_width: 3,
          stroke_linecap: 'round'
        },
        customSectors: [{
          color: "#50bbed",
          lo: 0,
          hi: 40
        }, {
          color: "#11a85c",
          lo: 40,
          hi: 50
        }, {
          color: "#e89f14",
          lo: 50,
          hi: 70
        }, {
          color: "#d34d3d",
          lo: 70,
          hi: 85
        }],
        gaugeWidthScale: 0.8,
        relativeGaugeSize: true,
        counter: true
      });

      vm.voltageCpuGauge = new JustGage({
        id: "voltageCpuGauge",
        value: getRandomInt(0.8, 1.4),
        min: 0.8,
        max: 1.4,
        decimals: 1,
        title: $translate.instant('BOX_VOLTAGE_CPU'),
        label: "V",
        levelColorsGradient: false,
        pointer: true,
        pointerOptions: {
          toplength: -15,
          bottomlength: 5,
          bottomwidth: 6,
          color: '#8e8e93',
          stroke: '#ffffff',
          stroke_width: 3,
          stroke_linecap: 'round'
        },
        customSectors: [{
          color: "#50bbed",
          lo: 0.8,
          hi: 0.9
        }, {
          color: "#11a85c",
          lo: 0.9,
          hi: 1.2
        }, {
          color: "#e89f14",
          lo: 1.2,
          hi: 1.3
        }, {
          color: "#d34d3d",
          lo: 1.3,
          hi: 1.4
        }],
        gaugeWidthScale: 0.8,
        relativeGaugeSize: true,
        counter: true
      });

      vm.chargeCpuGauge = new JustGage({
        id: "chargeCpuGauge",
        value: getRandomInt(66, 100),
        min: 0,
        max: 100,
        title: $translate.instant('BOX_CHARGE_CPU'),
        label: "%",
        levelColorsGradient: false,
        pointer: true,
        pointerOptions: {
          toplength: -15,
          bottomlength: 5,
          bottomwidth: 6,
          color: '#8e8e93',
          stroke: '#ffffff',
          stroke_width: 3,
          stroke_linecap: 'round'
        },
        customSectors: [{
          color: "#50bbed",
          lo: 0,
          hi: 20
        }, {
          color: "#11a85c",
          lo: 20,
          hi: 40
        }, {
          color: "#e89f14",
          lo: 40,
          hi: 80
        }, {
          color: "#d34d3d",
          lo: 80,
          hi: 100
        }],
        gaugeWidthScale: 0.8,
        relativeGaugeSize: true,
        counter: true
      });


      vm.ramGauge = new JustGage({
        id: "ramGauge",
        value: getRandomInt(0, 100),
        min: 0,
        max: 100,
        title: $translate.instant('BOX_RAM_FREE'),
        label: "%",
        levelColorsGradient: false,
        pointer: true,
        pointerOptions: {
          toplength: -15,
          bottomlength: 5,
          bottomwidth: 6,
          color: '#8e8e93',
          stroke: '#ffffff',
          stroke_width: 3,
          stroke_linecap: 'round'
        },
        gaugeWidthScale: 0.8,
        relativeGaugeSize: true,
        counter: true
      });
    }


    // waiting for websocket message
    function waitForNewValue() {
      io.socket.on('CPU_STAT', function(deviceState) {
        vm.tempCpuGauge.refresh(deviceState.temperature)
        vm.voltageCpuGauge.refresh(deviceState.voltage)
        vm.chargeCpuGauge.refresh(deviceState.usage)
        vm.ramGauge.refresh(deviceState.ram)
        vm.remoteIsBusy = false;
      });
    }
  }
})();