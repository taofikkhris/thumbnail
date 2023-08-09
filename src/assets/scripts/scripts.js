import domtoimage from 'dom-to-image';

// Create Element
const functionCreateElement = (tag, options) => {
    let element = document.createElement(tag);
    for (var attributes in options) {
        if (attributes == 'class') {
            element.classList.add.apply(element.classList, options[attributes]);
        } else if (attributes == 'content') {
            element.innerHTML = options[attributes];
        } else {
            element[attributes] = options[attributes];
        }
    }

    return element;
};

const formKeyUp = (selector, target, type) => {
    document.querySelector(selector).addEventListener('keyup', (event) => {
        if (type == 'background') {
            document.querySelector(target).style.backgroundColor = event.target.value
        } else if (type == 'text') {
            document.querySelector(target).style.color = event.target.value
        } else if (type == 'innerHTML') {
            document.querySelector(target).innerHTML = event.target.value
        }
    })
};

// Background Color
const containerBackgroundColor = document.querySelector('.container_background_color');
const inputBackgroundColor = document.getElementById('input_background_color');
inputBackgroundColor.addEventListener('change', (event) => {
    if (event.target.value == 'custom') {
        containerBackgroundColor.classList.remove('hidden');
        containerBackgroundColor.classList.add('grid');

        formKeyUp('#input_hex_background_color', '.thumbnail_container', 'background');
        formKeyUp('#input_hex_text_color', '.thumbnail_container', 'text');

        formKeyUp('#input_hex_background_color', '.input_hex_background_color_preview', 'background');
        formKeyUp('#input_hex_text_color', '.input_hex_text_color_preview', 'background');
        formKeyUp('#input_hex_text_color', '.post_label_ornament', 'background');
    } else {
        containerBackgroundColor.classList.add('hidden');
        containerBackgroundColor.classList.remove('grid');

        document.querySelector('.thumbnail_container').style.backgroundColor = event.target.value;
        document.querySelector('.thumbnail_container').style.color = '#ffffff';
        document.querySelector('.post_label_ornament').style.backgroundColor = '#ffffff';

        document.querySelector('#input_hex_background_color').value = event.target.value
        document.querySelector('#input_hex_text_color').value = '#ffffff'

        document.querySelector('.input_hex_background_color_preview').style.backgroundColor = event.target.value
        document.querySelector('.input_hex_text_color_preview').style.backgroundColor = '#ffffff'
    }
});


// Background Image
const images = [
    './src/assets/images/patterns/1.png',
    './src/assets/images/patterns/2.png',
    './src/assets/images/patterns/3.png',
    './src/assets/images/patterns/4.png',
    './src/assets/images/patterns/5.png',
    './src/assets/images/patterns/6.png',
    './src/assets/images/patterns/7.png',
    './src/assets/images/patterns/8.png',
    './src/assets/images/patterns/9.png',
    './src/assets/images/patterns/10.png',
];
const inputBackgroundImage = document.getElementById('input_background_image');

for (let index = 0; index < images.length; index++) {
    const element = images[index];

    inputBackgroundImage.innerHTML += `
    <option value='${element}'>Background Image ${index}</option>
    `
}

inputBackgroundImage.addEventListener('change', (event) => {
    if (event.target.value != 'none') {
        document.querySelector('.background_image').classList.remove('hidden');
        document.querySelector('.input_background_image_advanced').classList.remove('hidden');
        document.querySelector('.input_background_image_advanced').classList.add('grid');

        document.querySelector('.background_image').style.backgroundImage = `url(${event.target.value})`
    } else {
        document.querySelector('.background_image').classList.add('hidden');
        document.querySelector('.input_background_image_advanced').classList.add('hidden');
        document.querySelector('.input_background_image_advanced').classList.remove('grid');
    }

    console.log(event.target.value)
})

// Invert Background Image
document.querySelector('#image_invert').addEventListener('change', (event) => {
    if (event.target.checked) {
        document.querySelector('.background_image').style.filter = event.target.value;
        document.querySelector('.background_image').style.opacity = '0.15';
    } else {
        document.querySelector('.background_image').style.filter = '';
        document.querySelector('.background_image').style.opacity = '0.25';
    }
});

// Post Label
formKeyUp('#input_post_label', '#post_label', 'innerHTML');
// Post Title
formKeyUp('#input_post_title', '#post_title', 'innerHTML');
// Post Author
formKeyUp('#input_post_author', '#post_author', 'innerHTML');
// Blog Title
formKeyUp('#input_blog_title', '#blog_title', 'innerHTML');

// Generate Thumbnail
const containerThumbnail = document.querySelector('.thumbnail_container');
document.getElementById('button_download_image').addEventListener('click', () => {
    var scale = 1.5;
    domtoimage.toJpeg(containerThumbnail, {
        width: containerThumbnail.clientWidth * scale,
        height: containerThumbnail.clientHeight * scale,
        style: {
            transform: 'scale(' + scale + ')',
            transformOrigin: 'top left'
        }
    }).then(function (dataUrl) {
        const element = functionCreateElement('a', {
            href: dataUrl,
            download: 'elcreative_thumbnail_' + Math.round(Math.random() * 9999) + 1,
        });
        element.click();

    }).catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
})