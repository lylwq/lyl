var Event = {
    bind : function(){
        if( !this.o ){
            this.o = $({});
        }
        this.o.bind.apply(this.o,arguments);
    },
    trigger : function(){
        if( !this.o ){
            this.o = $({});
        }
        this.o.trigger.apply(this.o , arguments);
    }
}

var StateMachine = function(){};
StateMachine.fn = StateMachine.prototype;

$.extend(StateMachine.fn , Event);
StateMachine.fn.add = function(controller){
    this.bind("change",function(e , current){
        if(controller == current){
            controller.activate();
        }else{
            controller.deactivate();
        }
    });

    controller.active = $.proxy(function(){
        this.trigger("change",controller);
    },this);
}

var con1 = {
    activate : function(){
        console.log("con1 activate");
    },
    deactivate : function(){
        console.log("con1 deactivate");
    }
}

var con2 = {
    activate : function(){
        console.log("con2 activate");
    },
    deactivate : function(){
        console.log("con2 deactivate");
    }
}

var sm = new StateMachine;
sm.add(con1);
sm.add(con2);

con1.active();






















