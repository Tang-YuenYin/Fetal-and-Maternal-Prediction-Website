//import { PageFlip } from 'page-flip';

//const pageFlip = new PageFlip(htmlParentElement, settings);

document.addEventListener("DOMContentLoaded", () => {
    const pageFlip = new St.PageFlip(document.getElementById('last-page').parentNode, {
        width: 500, // required parameter - base page width
        height: 650, // required parameter - base page height
        showCover: true, // enable the cover page
    });

    
    const div = document.querySelectorAll('.my-page');
    console.log(div);
    pageFlip.loadFromHTML(document.querySelectorAll('.my-page'));


    pageFlip.on('flip', (e) => {
        // callback code
        console.log(`Current page number: ${e.data}`);
    });

    
});