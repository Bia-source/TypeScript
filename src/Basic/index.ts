var teste:number[]=[
    1,2,3,4
];

//teste.forEach(res=> console.log(res));

interface Car{
    nome: string;
    placa: string;
    ipva: boolean;
}

// var carroNovo: Car = {
//     nome: 'new fiesta',
//     placa: 'hdy1234',
//     ipva: true
// }
//console.log(carroNovo);

// varios estados para uma Variável 
enum EstadoCivil {
    cs = 'Casado',
    st = 'Solteiro',
    dv = 'Divorciado',
    vv = 'Viúvo'
}

function testeStat(estado:string){
   if(estado === EstadoCivil.cs){
       console.log(EstadoCivil.cs);
   }else if(estado === EstadoCivil.dv){
       console.log(EstadoCivil.dv);
   }else if(estado === EstadoCivil.vv){
    console.log(EstadoCivil.vv);
   }else if(estado === EstadoCivil.st){
    console.log(EstadoCivil.st);
   }
}
//testeStat("Casado");

class Car{
    constructor(public name: string,
         public color: string,
         public power: number
     ){}
     printCar():void{
         console.log(this.color, this.name, this.power);
     }
}

var camaro = new Car("Camaro", "Amarelo", 45);
//camaro.printCar();

// Nova Classe
class Car2{
    private _name: string;
    private _color: string;
    private _power: number;
    public static list: Array<string>= [];
    constructor(newName: string, newColor: string, newPower: number){
        this._name = newName;
        this._color = newColor;
        this._power = newPower;
        Car2.list.push(newName);
    }
    getName(): string{
        return this._name;
    }

    setName(value: string){
        this._name = value;
    }

    getColor(): string{
        return this._color;
    }

    setColor(value: string){
        this._color = value;
    }

    getPower(): number{
        return this._power;
    }

    setPower(value: number){
        this._power = value;
    }
};

var ferrari = new Car2("Ferrari", "Vermelho", 50);
var fiesta = new Car2("Fiesta", "prata", 60);
console.log(ferrari);
console.log(Car2.list);

// alterando nome do carro
ferrari.setName("Uno");
console.log(ferrari);

// alterando nome do carro dentro da lista
Car2.list[0]= "Uno"
console.log(Car2.list);

   
