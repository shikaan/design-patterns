// #===
// Define participants

class Command {
    /**
     * @param {Receiver} receiver 
     */
    constructor(receiver) {
        this.receiver = receiver
    }
    
    execute() {
        throw new Error('Subclass must override execute')
    }
}

// Concrete Commands
class OpenAlertCommand extends Command {
    execute() {
        this.receiver.alert('Gotcha!')
    }
}

class AggregateCommand extends Command {
    constructor(...commands) {
        super()
        this.commands = commands
    }

    execute() {
        this.commands.forEach(command => command.execute())
    }
}

// Receiver
class Window {
    /**
     * @param {string} message 
     */
    alert(message) {
        window.alert(message)
    }
}

// Receiver
class Console {
    /**
     * @param {string} message 
     * @param {Node} node 
     */
    alert(message) {
        console.log('ALERT', message)
    }
}

// Invoker
class Button {
    /**
     * @param {string} label 
     * @param {Command} command 
     */
    constructor(label, command) {
        this.label = label
        this.command = command
        this.node = document.createElement('button')
        
        this.build()
    }
    
    build() {
        this.node.innerText = this.label
        this.node.onclick = () => this.onClickHandler()
    }
    
    onClickHandler() {
        this.command.execute()
    }
}

// Client
class Application {
    /**
     * @param {Node} node 
     */
    constructor(node) {
        this.node = node
    }
    
    init() {
        const windowReceiver = new Window()
        const consoleReceiver = new Console()

        const windowAlertCommand = new OpenAlertCommand(windowReceiver)
        const consoleAlertCommand = new OpenAlertCommand(consoleReceiver)

        const buttons = [
            new Button('Window', windowAlertCommand),
            new Button('Console', consoleAlertCommand),
            new Button('Why choose?', new AggregateCommand(windowAlertCommand, consoleAlertCommand))
        ]

        buttons.forEach((button) => this.node.appendChild(button.node))
    }
}

// #===
// Execute commands
const appNode = document.getElementById('app')
const application = new Application(appNode)

application.init()