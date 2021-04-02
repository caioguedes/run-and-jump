let context = document.querySelector('#game').getContext('2d');
let game = {
    width: window.innerWidth,
    height: window.innerHeight
};

context.canvas.width = game.width;
context.canvas.height = game.height;

let physics = {
    speed: 7.0,
    friction: 0.5,
    gravity: 1.5,
    jump: 25,
    jump_friction: 0.9
};

let player = {
    w: 32,
    h: 32,
    j: true,
    xv: 0,
    yv: 0,
    x: 0,
    y: 0,
    setup() {
        this.x = game.width / 2 - this.w / 2;
    },
    render(context) {
        context.fillStyle = '#0f0';
        context.fillRect(player.x, player.y, player.w, player.h);

        context.fillStyle = '#fff';
        context.font = "12px";

        let l = 1;
        context.fillText(`player.xv: ${this.xv}`, 10, 10 * l++);
        context.fillText(`player.yv: ${this.yv}`, 10, 10 * l++);
        context.fillText(`player.x: ${this.x}`, 10, 10 * l++);
        context.fillText(`player.y: ${this.y}`, 10, 10 * l++);

    },
    update() {
        if (controller.left) {
            player.xv -= physics.speed;
        }
    
        if (controller.right) {
            player.xv += physics.speed;
        }

        if (controller.up && player.j == false) {
            player.j = true;
            player.yv -= physics.jump;
        }
    
        player.yv += physics.gravity;
        player.x += player.xv;
        player.y += player.yv;
        player.xv *= physics.friction;
        player.yv *= physics.jump_friction;

        // if (player.xp + player.w >= game.width) {
        //     playedar.xv = 0;
        //     player.xp = game.width - player.w;
        // }

        // if (player.xp < 0) {
        //     player.xp = 0;
        //     player.xv = 0;
        // }

        if (player.x > game.width) {
            player.x = -player.w;
        }

        if (player.x < -player.w) {
            player.x = game.width;
        }

        if (player.y > game.height - player.h) {
            player.y = game.height - player.h;
            player.yv = 0;
            player.j = false;
        }
    }
}



let controller = {
    right: false,
    left: false,
    up: false,
    handler(event) {
        let isPressed = event.type == 'keydown' ? true : false;
        
        switch (event.code) {
            case 'KeyD':
            case 'ArrowRight':
                controller.right = isPressed;
                break;
            case 'KeyA':
            case 'ArrowLeft':
                controller.left = isPressed;       
                break;
            case 'KeyW':
            case 'ArrowUp':
            case 'Space':
                controller.up = isPressed
                break;
        }
    }
}

function update() {
    player.update();
}

function render(context) {
    context.fillStyle = '#000';
    context.fillRect(0, 0, game.width, game.height);
    player.render(context);
}

function loop() {
    update();
    render(context);
    requestAnimationFrame(loop);
}

player.setup();
addEventListener('keydown', controller.handler);
addEventListener('keyup', controller.handler);
window.onresize = () => {
    game.width = window.innerWidth;
    game.height = window.innerHeight;
    context.canvas.width = game.width;
    context.canvas.height = game.height;
};
requestAnimationFrame(loop);