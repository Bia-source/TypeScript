var teste = [
    1, 2, 3, 4
];
// var carroNovo: Car = {
//     nome: 'new fiesta',
//     placa: 'hdy1234',
//     ipva: true
// }
//console.log(carroNovo);
// varios estados para uma Variável 
var EstadoCivil;
(function (EstadoCivil) {
    EstadoCivil["cs"] = "Casado";
    EstadoCivil["st"] = "Solteiro";
    EstadoCivil["dv"] = "Divorciado";
    EstadoCivil["vv"] = "Vi\u00FAvo";
})(EstadoCivil || (EstadoCivil = {}));
function testeStat(estado) {
    if (estado === EstadoCivil.cs) {
        console.log(EstadoCivil.cs);
    }
    else if (estado === EstadoCivil.dv) {
        console.log(EstadoCivil.dv);
    }
    else if (estado === EstadoCivil.vv) {
        console.log(EstadoCivil.vv);
    }
    else if (estado === EstadoCivil.st) {
        console.log(EstadoCivil.st);
    }
}
//testeStat("Casado");
var Car = /** @class */ (function () {
    function Car(name, color, power) {
        this.name = name;
        this.color = color;
        this.power = power;
    }
    Car.prototype.printCar = function () {
        console.log(this.color, this.name, this.power);
    };
    return Car;
}());
var camaro = new Car("Camaro", "Amarelo", 45);
//camaro.printCar();
// Nova Classe
var Car2 = /** @class */ (function () {
    function Car2(newName, newColor, newPower) {
        this._name = newName;
        this._color = newColor;
        this._power = newPower;
        Car2.list.push(newName);
    }
    Car2.prototype.getName = function () {
        return this._name;
    };
    Car2.prototype.setName = function (value) {
        this._name = value;
    };
    Car2.prototype.getColor = function () {
        return this._color;
    };
    Car2.prototype.setColor = function (value) {
        this._color = value;
    };
    Car2.prototype.getPower = function () {
        return this._power;
    };
    Car2.prototype.setPower = function (value) {
        this._power = value;
    };
    Car2.list = [];
    return Car2;
}());
;
var ferrari = new Car2("Ferrari", "Vermelho", 50);
var fiesta = new Car2("Fiesta", "prata", 60);
console.log(ferrari);
console.log(Car2.list);
// alterando nome do carro
ferrari.setName("Uno");
console.log(ferrari);
// alterando nome do carro dentro da lista
Car2.list[0] = "Uno";
console.log(Car2.list);
