// Реализовать класс Futures

function Futures(executor) {

    this.resolveHandlers = [];
    this.rejectHandlers = [];
    this.state = "pending";

    let _state = "pending"; //resolved, rejected
    let _value;

    setState = state => {
        _state = state;
        this.state = state;
    }

    setValue = value => {
        _value = value;
        this.value = value;
    }

    handle = isResolved => {
        if (isResolved) {
            this.resolveHandlers.forEach(handler => {
                handler(this.value);
            });
        } else {
            this.rejectHandlers.forEach(handler => {
                handler(this.value);
            });
        }
    }


    const resolving = value => {
        if (_state === "pending") {
            setState("resolved");
            setValue(value);
            handle(true);
        }
    }

    const rejecting = value => {
        if (_state === "pending") {
            setState("rejected");
            setValue(value);
            handle(false);
        }
    }

    executor(resolving, rejecting);

}

Futures.prototype.then = function (resolved, rejected) {

    switch(this.state) {
        case "pending":
            this.resolveHandlers.push(resolved);
            this.rejectHandlers.push(rejected);
            break;
        case "resolved":
            resolved(this.value);
            break;
        case "rejected": 
            rejected(this.value);
            break;
    }
};



// Тест #1
var foo = new Futures(function (resolve, reject) {
    resolve(123);
});

foo.then(function (val) {
    console.log("foo.resolved:", val === 123);
}, function () {
    console.log("foo.resolved: fail");
});


// Тест #2
var bar = new Futures(function (resolve, reject) {
    setTimeout(resolve.bind(null, "fail"), 300);
    setTimeout(reject.bind(null, "ok"), 200);
});

bar.then(function () {
    console.log("bar.rejected: fail");
}, function (val) {
    console.log("bar.rejected:", val === "ok");
});
