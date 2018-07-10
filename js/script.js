$(function(){

    // Acknowledgments to Blaine L. Pardoe for the inspiration
    // https://blainepardoe.wordpress.com/2016/04/05/office-humor-funny-job-titles/

    var silly = [
        'General Smart Guy',
        'Pixel Coloring Expert',
        'Thinker of Deep Thoughts',
        'Organizer of Randomness',
        'Cyber Ninja',
        'Human-Google Interface',
        'Digital Sorcerer',
        'Chief Abstraction Officer',
        'Concept Alchemist',
        'Source Code Overlord',
        'Oracle of Inspiration',
    ]

    var personal = [
        'Hearthstone Player',
        'Sci-Fi / Fantasy Reader',
        'Neurofunk Addict',
        'Ergonomics Enthusiast',
        'Cat Person',
        'Self-Designated Grammar Nazi',
    ]

    var serious = [
        'Full-Stack Developer',
        'Java Developer',
        'C++ Developer',
        'Node.JS Developer',
        'Python Developer',
        'Data Scientist',
        'Researcher',
    ]

    var tags =
        silly[Math.floor(Math.random() * silly.length)] + '|' +
        personal[Math.floor(Math.random() * personal.length)] + '|' +
        serious[Math.floor(Math.random() * serious.length)] + '|' +
        'Software Engineer'

    var flips = 3

    var intervals = $('.wodry').html(tags).wodry({
        animation: 'rotateX',
        delay: 1000,
        animationDuration: 800,
        callback: function() {
            if (!--flips) {
                clearInterval(intervals[0])
            }
        }
    })


    // background animation
    // shamelessly "repurposed" from https://tympanus.net/codrops/2014/09/23/animated-background-headers/

    var width, height, hh, canvas, ctx, points;
    var leash = 30
    var spread = 15
    var density = 4

    // Main

    resize()
    initAnimation()

    function initBG() {
        canvas = document.getElementById('bg')
        ctx = canvas.getContext('2d')

        // create points
        points = []
        var step_x = width / spread
        var step_y = height / spread
        for(var x = -step_x; x < width + step_x; x += step_x) {
            for(var y = -step_y; y < height + step_y; y += step_y) {
                var px = x + Math.random() * step_x
                var py = y + Math.random() * step_y
                var p = {x: px, originX: px, y: py, originY: py }
                points.push(p)
            }
        }

        // for each point find the closest points
        for(var i = 0; i < points.length; i++) {
            var closest = []
            var p1 = points[i]
            for(var j = 0; j < points.length; j++) {
                var p2 = points[j]
                if(!(p1 == p2)) {
                    var placed = false
                    for(var k = 0; k < density; k++) {
                        if(!placed) {
                            if(closest[k] == undefined) {
                                closest[k] = p2
                                placed = true
                            }
                        }
                    }

                    for(var k = 0; k < density; k++) {
                        if(!placed) {
                            if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                closest[k] = p2
                                placed = true
                            }
                        }
                    }
                }
            }
            p1.closest = closest
        }

        // assign a circle to each point
        for(var i in points) {
            var c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)')
            points[i].circle = c
        }
    }    

    // animation
    function initAnimation() {
        animate()
        for(var i in points) {
            shiftPoint(i)
        }
    }

    function animate() {
        ctx.clearRect(0,0,width,height)
        for(var i in points) {
            var dist = Math.abs((points[i].y - hh) / hh)
            points[i].active = 0.02 + 0.1 * dist * dist
            points[i].circle.active = 0.02 + 0.1 * dist * dist
            drawLines(points[i])
            points[i].circle.draw()
        }
        requestAnimationFrame(animate)
    }

    function shiftPoint(i) {
        TweenLite.to(
            points[i],
            4 + 4 * Math.random(),
            {
                x:points[i].originX - leash + Math.random() * 2 * leash,
                y: points[i].originY - leash + Math.random() * 2 * leash,
                ease:Quad.easeInOut,
                onComplete: function() {
                    shiftPoint(i)
                }
            }
        )
    }

    // Canvas manipulation
    function drawLines(p) {
        if(!p.active) return
        for(var i in p.closest) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p.closest[i].x, p.closest[i].y)
            ctx.strokeStyle = 'rgba(0,0,0,'+ p.active+')'
            ctx.stroke()
        }
    }

    function Circle(pos,rad,color) {
        var _this = this;

        // constructor
        (function() {
            _this.pos = pos || null
            _this.radius = rad || null
            _this.color = color || null
        })();

        this.draw = function() {
            if(!_this.active) return
            ctx.beginPath()
            ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false)
            ctx.fillStyle = 'rgba(0,0,0,'+ _this.active+')'
            ctx.fill()
        }
    }

    function getDistance(p1, p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
    }

    function resize() {
        width = window.innerWidth
        height = window.innerHeight
        hh = height / 2
        initBG()
        canvas.width = width
        canvas.height = height
    }

    $(window).on('resize', resize)



    // CV menu

    $('#cv').on('click', function() {
        $('.cv-version').toggleClass('open')
    })
    
})
