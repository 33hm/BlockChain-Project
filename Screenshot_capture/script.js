const srcElement=document.querySelector('body');
btns=document.querySelectorAll('button');

btns.forEach(btn => {
    btn.addEventListener('click',()=>{
        // creating canvas
        html2canvas(srcElement).then(canvas=>{
            // adding canvas to body
            if(btn.id==='ss')
                return document.body.appendChild(canvas);
            // downloading canvas
            const a=document.createElement("a");
            const dataURL=canvas.toDataURL();
            console.log(dataURL);
            a.href=dataURL;
            a.download="screenshot.jpg";
            a.click();
        })
    })
});