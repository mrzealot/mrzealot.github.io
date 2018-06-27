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
    });
})
