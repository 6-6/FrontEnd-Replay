class People {
  constructor(name, age){
    this.name = name
    this.age = age
  }

  eat(){
    console.log('People eat...'+ this.name + this.age);
  }
}

class Student extends People {
  constructor(name, age){
    super(name, age)
  }

  // 因为继承了`People` 类的方法，再次声明 `eat` 并改动了此方法，所以不符合LSP原则
  eat(){
    console.log('Student ...'+ this.name + this.age);
  }
}

const people = new People('lei', 10) 
const student = new Student('mei', 11) 
student.eat()