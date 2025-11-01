let button = document.querySelectorAll('button')


function gotoLocation() {

    button[1].addEventListener('click', () => {
        window.location.href = `bitta.html`
    })

}

button[0].addEventListener('click', () => {
    const tgUsername = 'userN_1HACCKER3';
    const openChatLink = `https://t.me/${tgUsername}`; 

    const text = encodeURIComponent('Salom! Mars IT School tadbiriga qiziqaman.'); 
    const shareWithTextLink = `https://t.me/share/url?url=&text=${text}`;

    window.open(openChatLink, '_blank');
  
})    

gotoLocation()














