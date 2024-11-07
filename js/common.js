let onePlay = false;
window.onload = function(){
    const _conWrapper = document.querySelector(".content-wrapper");
    const _con9 = document.querySelector(".content-area.con9 .innerWrapper");
    const _popMovie = document.querySelector(".modal-pop.movie");
    const _popImg = document.querySelector(".modal-pop.img");
    const _popCloseBtMovie = _popMovie.querySelector(".clsoe-button");
    const _popCloseBtImg = _popImg.querySelector(".clsoe-button");
    const _rnbMenu = document.querySelector("#rnbMenu");
    const _rnb = document.querySelector("#rnb");
    const _rnbClose = document.querySelector(".rnb-close-btn");
    const _modalOpenBt = document.querySelector(".web-modal-open");
    const _modalImg = document.querySelector(".modal-pop-img");
    let popupChecked = true;
    let delayTime = false;
    let delayTimer = null;
    let checkedNum = 0;
    let checkedEvent = false;
    let touchChecked = 0;
    let touchImg = 0;

    setTimeout(()=>{
        _popMovie.classList.add("open");
        setTimeout(()=>{
            document.querySelector(".modal-video").play();
            document.querySelector(".modal-video").addEventListener("ended",()=>{
                console.log("popupChecked : ",popupChecked)
                setTimeout(()=>{
                    if(popupChecked){
                        _popMovie.classList.remove("open");
                        _popImg.classList.add("open");
                    }
                },500)
            })
        },3000)
    },500)

    
    _modalImg.addEventListener("touchstart",(ev)=>{
        ev.preventDefault();
        touchImg = ev.changedTouches[0].screenY;
    })
    _modalImg.addEventListener("touchend",(ev)=>{
        ev.preventDefault();
        const checked = touchImg - ev.changedTouches[0].screenY;
        console.log("ev.target : ",ev.target.tagName)
        let classChecked = ""
        for(let i=0;i<3; i++){
            const cl = "p" + i;
            if(_modalImg.classList.contains(cl)){
                classChecked = cl;
                break;
            }
        }
        alert(ev.target.tagName,":",checked)
        if(checked < 0){
            if(classChecked == "p0"){
                _modalImg.classList.add("p1");
                _modalImg.classList.remove("p0");
                _modalImg.classList.remove("p2");
            }else if(classChecked == "p1"){
                _modalImg.classList.add("p2");
                _modalImg.classList.remove("p1");
                _modalImg.classList.remove("p0");
            }
        }else if(checked > 0){
            if(classChecked == "p1"){
                _modalImg.classList.add("p0");
                _modalImg.classList.remove("p1");
                _modalImg.classList.remove("p2");
            }else if(classChecked == "p2"){
                _modalImg.classList.add("p1");
                _modalImg.classList.remove("p0");
                _modalImg.classList.remove("p2");
            }
        }else if(ev.target.tagName === "AREA"){
            alert("link")
            document.querySelector(".rnb-inner .rnb-list > li:nth-child(4) a").click();
        }
    })

    _modalOpenBt.addEventListener("click",()=>{
        _popMovie.classList.add("open");
        document.querySelector(".modal-video").play();
    })

    _rnbMenu.addEventListener("click",()=>{
        _rnb.classList.add("open");
    })
    _rnbClose.addEventListener("click",()=>{
        _rnb.classList.remove("open");

    })

    _popCloseBtMovie.addEventListener("click",()=>{
        _popMovie.classList.remove("open");
        document.querySelector(".modal-video").pause();
        popupChecked = false;
    })
    _popCloseBtMovie.addEventListener("click",()=>{
        _popMovie.classList.remove("open");
        document.querySelector(".modal-video").pause();
        _popImg.classList.add("open");
    })
    _popCloseBtImg.addEventListener("click",()=>{
        _popImg.classList.remove("open");
    })
    const scrollEv = (ev)=>{
        // ev.preventDefault();
        const scrollTop = ev.currentTarget.scrollTop;
        const _firstBooks = _conWrapper.querySelector(".con9 .book-box-wrapper.book1 .book-box");
        const _books = _conWrapper.querySelectorAll(".con9 .book-box-wrapper.book2 .book-box, .con9 .book-box-wrapper.book3 .book-box");
        const _texts = _conWrapper.querySelectorAll(".con9 .book-box-wrapper.book2 .book-text-con, .con9 .book-box-wrapper.book3 .book-text-con");
        const _video = _conWrapper.querySelector(".con9 .beyond-centum-video");
        const _both = _conWrapper.querySelector(".con9 .beyond-centum-bottom-text");
        const _bothLogo = _conWrapper.querySelector(".con9 .beyond-centum-bottom-logo");
        const wt = window.innerHeight;
        const firstBookTop = _firstBooks.getBoundingClientRect().top;
        const bothTop = _both.getBoundingClientRect().top;
        _rnb.classList.remove("open");
        if(bothTop - wt <= -50){
            _both.querySelector(".beyond-centum-bottom-text-wrapper").classList.add("active")
            _bothLogo.classList.add("active")
        }
        if(firstBookTop - wt <= -110){
            _firstBooks.parentNode.classList.add("active")
        }
        _books.forEach((b,i)=>{
            const t = b.getBoundingClientRect().top;
            if(i === 0 && t - wt <= -110){
                b.parentNode.classList.add("active");
                _texts[i].classList.add("active");
            }
        })
        _texts.forEach((target,idx)=>{
            const t = target.getBoundingClientRect().top;
            if(idx === 1 && t - wt <= -110){
                setTimeout(()=>{
                    target.classList.add("active");
                    _books[idx].parentNode.classList.add("active");
                },500)
            }
        })
        const videoTop = _video.getBoundingClientRect().top;
        if(wt - videoTop >= 150){
            onePlay = true;
            document.querySelector(".beyond-centum-video video").play()
        }
    }
    _con9.addEventListener("scroll",(ev)=>{
        scrollEv(ev);
    })
    const controllEv = (ev)=>{
        _rnb.classList.remove("open");
        if(delayTime || checkedNum > 1){
            return;
        }
        delayTime = true;
        checkedNum += 1;
        const dy = (ev.deltaY)?ev.deltaY:touchChecked - ev.changedTouches[0].screenY;
        const checked = getCheckedCurrentPosition();
        checkedEvent = true;
        touchChecked = 0;
        if(dy > 0){
            if(checked !== "w10") event.preventDefault();
            if(checked == null){
                setCon1();
                // if(!ev.deltaY) setCon2();
            }else if(checked == "w1"){
                setCon2();
            }else if(checked == "w2"){
                setCon3();
            }else if(checked == "w3"){
                setCon4();
            }else if(checked == "w4"){
                setCon5();
            }else if(checked == "w5"){
                setCon6();
            }else if(checked == "w6" || checked == "w7"){
                setCon8();
            }else if(checked == "w8"){
                setCon9();
            }else if(checked == "w9"){
                setCon10();
            }else{
                checkedEvent = false;
                delayTime = false;
                checkedNum = 0;
            }
        }else if(dy < 0){
            if(checked !== "w10" || _con9.scrollTop <= 0){
                event.preventDefault();
            }
            if(checked == "w1"){
                _conWrapper.classList.remove("w1");
                resetCon1();
            }else if(checked == "w2"){
                resetCon2();
                // if(!ev.deltaY) resetCon1();
            }else if(checked == "w3"){
                resetCon3();
            }else if(checked == "w4"){
                resetCon4();
            }else if(checked == "w5"){
                resetCon5();
            }else if(checked == "w6"){
                resetCon6();
            }else if(checked == "w7"){
                resetCon6();
                resetCon7();
            }else if(checked == "w8"){
                resetCon8();
            }else if(checked == "w9"){
                resetCon9();
            }else if(checked == "w10" && _con9.scrollTop <= 0){
                resetCon10();
            }else{
                checkedEvent = false;
                delayTime = false;
                checkedNum = 0;
            }
        }
        if(!checkedEvent) return;
        if(delayTimer) clearInterval(delayTimer)
        delayTimer = setTimeout(()=>{
            delayTime = false;
            checkedNum = 0;
        },1500);
    }
    _conWrapper.addEventListener("touchstart",(ev)=>{
        if(ev.target === _modalOpenBt){
            ev.target.click();
            console.log("ev.target : ",ev.target)
        }
        const cl = getCheckedCurrentPosition();
        if(cl !== "w10") ev.preventDefault();
        touchChecked = ev.changedTouches[0].screenY;
    })
    _conWrapper.addEventListener("touchend",(ev)=>{
        const cl = getCheckedCurrentPosition();
        if(cl !== "w10") ev.preventDefault();
        controllEv(ev);
    })
    _conWrapper.addEventListener("wheel",(ev)=>{
        controllEv(ev);
    })

    document.querySelectorAll(".top-bottom").forEach((b,i)=>{
        b.addEventListener("click",()=>{
            resetCon1();
            resetCon2();
            resetCon3();
            resetCon4();
            resetCon5();
            resetCon6();
            resetCon7();
            resetCon8();
            resetCon9();
            resetCon10();
            delayTime = false;
            checkedNum = 0;
        })
    })
}



const getCheckedCurrentPosition = ()=>{
    const _conWrapper = document.querySelector(".content-wrapper");
    const max = 20;
    let temp = null;
    for(let i=max; i>0; i--){
        const checkedClass = "w"+i;
        if(_conWrapper.classList.contains(checkedClass)){
            temp = checkedClass;   
            break;
        }
    }
    return temp;
}


const setCon1 = ()=>{
    const _conWrapper = document.querySelector(".content-wrapper");
    _conWrapper.classList.add("w1");
}
const resetCon1 = ()=>{
    const _conWrapper = document.querySelector(".content-wrapper");
    _conWrapper.classList.remove("w1");
}
const setCon2 = ()=>{
    const _conWrapper = document.querySelector(".content-wrapper");
    _conWrapper.classList.add("w2");
    const _small_texts = _conWrapper.querySelectorAll(".con2 .s .txtWrapper");
    const _big_texts = _conWrapper.querySelectorAll(".con2 .b .txtWrapper");
    setTimeout(()=>{
        _small_texts.forEach((t,i)=>{
            const delay = i * 400;
            setTimeout(()=>{
                t.classList.add("active");
                if(i > 0){
                    const idx = i - 1;
                    _big_texts[idx].classList.add("active");
                }
            },delay)
        })
    },800)
}
const resetCon2 = ()=>{
    const _conWrapper = document.querySelector(".content-wrapper");
    _conWrapper.classList.remove("w2");
    const _small_texts = _conWrapper.querySelectorAll(".con2 .s .txtWrapper");
    const _big_texts = _conWrapper.querySelectorAll(".con2 .b .txtWrapper");
    setTimeout(()=>{
        _small_texts.forEach((t,i)=>{
            t.classList.remove("active");
            if(i > 0){
                const idx = i - 1;
                _big_texts[idx].classList.remove("active");
            }
        })
    },800)
}
const setCon3 = ()=>{
    const _conWrapper = document.querySelector(".content-wrapper");
    _conWrapper.classList.add("w3");
    const _texts = [..._conWrapper.querySelector(".con3 .innerWrapper .txt").children];
    const _imgs = _conWrapper.querySelectorAll(".con3 .img-wrapper");
    setTimeout(()=>{
        _texts.forEach((t,i)=>{
            const delay = i * 300;
            setTimeout(()=>{
                t.classList.add("active");
            },delay)
        })
        _imgs.forEach((t,i)=>{
            const delay = i * 300;
            setTimeout(()=>{
                t.classList.add("active");
                if(i === 2){
                    setTimeout(()=>{
                        _imgs.forEach((img,idx)=>{
                            img.classList.add("ani");
                        });
                    },3000)
                }
            },delay)
        })
    },800)
}
const resetCon3 = ()=>{
    const _conWrapper = document.querySelector(".content-wrapper");
    _conWrapper.classList.remove("w3");
    const _texts = [..._conWrapper.querySelector(".con3 .innerWrapper .txt").children];
    const _imgs = _conWrapper.querySelectorAll(".con3 .img-wrapper");
    setTimeout(()=>{
        _texts.forEach((t,i)=>{
            t.classList.remove("active");
        })
        _imgs.forEach((t,i)=>{
            t.classList.remove("active");
            t.classList.remove("ani")
        })
    },800)
}

const setCon4 = ()=>{
    const _conWrapper = document.querySelector(".content-wrapper");
    _conWrapper.classList.add("w4");
    const _txt = _conWrapper.querySelectorAll(".con4 .text-positon-box-view");
    const _bg = _conWrapper.querySelector(".con4 .bg");
    _txt.forEach((t,i)=>{
        const delay = 500 * i;
        setTimeout(()=>{
            if(i === 1) _bg.classList.add("active");
            t.classList.add("active");
        },delay)
    })
    setTimeout(()=>{
        _bg.classList.add("ani");
    },3000)
}

const resetCon4 = ()=>{
    const _conWrapper = document.querySelector(".content-wrapper");
    _conWrapper.classList.remove("w4");
    const _txt = _conWrapper.querySelectorAll(".con4 .text-positon-box-view");
    const _bg = _conWrapper.querySelector(".con4 .bg");
    setTimeout(()=>{
        _txt.forEach((t,i)=>{
            t.classList.remove("active");
            _bg.classList.remove("active");
            _bg.classList.remove("ani");
        })
    },800)
}


const setCon5 = ()=>{
    const _conWrapper = document.querySelector(".content-wrapper");
    _conWrapper.classList.add("w5");
    const _texts = [..._conWrapper.querySelector(".con5 .innerWrapper .txt").children];
    const _imgs = _conWrapper.querySelectorAll(".con5 .img-wrapper");
    setTimeout(()=>{
        _texts.forEach((t,i)=>{
            const delay = i * 300;
            setTimeout(()=>{
                t.classList.add("active");
            },delay)
        })
        _imgs.forEach((t,i)=>{
            const delay = i * 300;
            setTimeout(()=>{
                t.classList.add("active");
                if(i === 2){
                    setTimeout(()=>{
                        _imgs[0].classList.add("ani");
                        _imgs[1].classList.add("ani");
                        _imgs[2].classList.add("ani");
                    },2000)
                }
            },delay)
        })
    },800)
}
const resetCon5 = ()=>{
    const _conWrapper = document.querySelector(".content-wrapper");
    _conWrapper.classList.remove("w5");
    const _texts = [..._conWrapper.querySelector(".con5 .innerWrapper .txt").children];
    const _imgs = _conWrapper.querySelectorAll(".con5 .img-wrapper");
    setTimeout(()=>{
        _texts.forEach((t,i)=>{
            t.classList.remove("active");
        })
        _imgs.forEach((t,i)=>{
            t.classList.remove("active");
            t.classList.remove("ani");
        })
    },800)
}


const setCon6 = ()=>{
    const _conWrapper = document.querySelector(".content-wrapper");
    _conWrapper.classList.add("w6");
    setTimeout(()=>{
        setCon7();
    },1500)
}
const resetCon6 = ()=>{
    const _conWrapper = document.querySelector(".content-wrapper");
    _conWrapper.classList.remove("w6");
}

const setCon7 = ()=>{
    const _conWrapper = document.querySelector(".content-wrapper");
    _conWrapper.classList.add("w7");
    const _con = _conWrapper.querySelector(".con6 .innerWrapper");
    _con.classList.add("active");
}
const resetCon7 = ()=>{
    const _conWrapper = document.querySelector(".content-wrapper");
    _conWrapper.classList.remove("w7");
    const _con = _conWrapper.querySelector(".con6 .innerWrapper");
    _con.classList.remove("active");
}

const setCon8 = ()=>{
    const _conWrapper = document.querySelector(".content-wrapper");
    const _polygon = _conWrapper.querySelector(".con7 .polygon-box");
    const _leftText = _conWrapper.querySelector(".content-area.con7 > .innerWrapperv .text-left");
    const _rightText = _conWrapper.querySelector(".content-area.con7 > .innerWrapperv .text-right");

    _conWrapper.classList.add("w8");
    _polygon.classList.add("active");
    setTimeout(()=>{
        _leftText.classList.add("active");
        _rightText.classList.add("active");
    },1000)
}
const resetCon8 = ()=>{
    const _conWrapper = document.querySelector(".content-wrapper");
    const _polygon = _conWrapper.querySelector(".con7 .polygon-box");
    const _leftText = _conWrapper.querySelector(".content-area.con7 > .innerWrapperv .text-left");
    const _rightText = _conWrapper.querySelector(".content-area.con7 > .innerWrapperv .text-right");
    _conWrapper.classList.remove("w8");
    setTimeout(()=>{
        _polygon.classList.remove("active");
        _leftText.classList.remove("active");
        _rightText.classList.remove("active");
    },800)
}
const setCon9 = ()=>{
    const _conWrapper = document.querySelector(".content-wrapper");
    _conWrapper.classList.add("w9");
    const _left = _conWrapper.querySelectorAll(".con8 .left-area .left-area-img, .con8 .left-area .txt");
    const _right = _conWrapper.querySelectorAll(".con8 .right-area .alphabet-box > ul > li, .con8 .right-area .tit");
    setTimeout(()=>{
        _left.forEach((target,idx)=>{
            target.classList.add("active");
        })
        _right.forEach((target,idx)=>{
            target.classList.add("active");
        })
        setTimeout(()=>{
            _left.forEach((left,idx)=>{
                if(idx < 2) left.classList.add("ani");
            })
        },3000)
    },500)
}
const resetCon9 = ()=>{
    const _conWrapper = document.querySelector(".content-wrapper");
    _conWrapper.classList.remove("w9");
    const _left = _conWrapper.querySelectorAll(".con8 .left-area .left-area-img, .con8 .left-area .txt");
    const _right = _conWrapper.querySelectorAll(".con8 .right-area .alphabet-box > ul > li, .con8 .right-area .tit");
    setTimeout(()=>{
        _left.forEach((target,idx)=>{
            target.classList.remove("active");
            target.classList.remove("ani");
        })
        _right.forEach((target,idx)=>{
            target.classList.remove("active");
        })
    },800)
}
const setCon10 = ()=>{
    const _conWrapper = document.querySelector(".content-wrapper");
    _conWrapper.classList.add("w10");
    const _movieWrapper = _conWrapper.querySelector(".con9 .movie-box");
    const _con9 = document.querySelector(".content-area.con9 .innerWrapper");
    setTimeout(()=>{
        // _movieWrapper.classList.add("active");
        _movieWrapper.querySelector("video").play();
        const ev = document.createEvent("HTMLEvents");
        ev.initEvent("scroll",true,true);
        _con9.dispatchEvent(ev);
    },1500)
}
const resetCon10 = ()=>{
    const _conWrapper = document.querySelector(".content-wrapper");
    _conWrapper.classList.remove("w10");
    const _movieWrapper = _conWrapper.querySelector(".con9 .movie-box");
    setTimeout(()=>{
        _movieWrapper.classList.remove("active");
        _movieWrapper.querySelector("video").pause();
    },800)
    const _books = _conWrapper.querySelectorAll(".con9 .book-box-wrapper");
    const _texts = _conWrapper.querySelectorAll(".con9 .book-box-wrapper .book-text-con");
    const _con9 = document.querySelector(".content-area.con9 .innerWrapper");


    const _both = _conWrapper.querySelector(".con9 .beyond-centum-bottom-text");
    const _bothLogo = _conWrapper.querySelector(".con9 .beyond-centum-bottom-logo");

    setTimeout(()=>{
        _books.forEach((_b,idx)=>{
            _b.classList.remove("active");
        })
        _texts.forEach((_b,idx)=>{
            _b.classList.remove("active");
        })
        _con9.scrollTop = 0;
        onePlay = false;
        document.querySelector(".beyond-centum-bottom-text-wrapper").classList.remove("active");
        _both.classList.remove("active");
        _bothLogo.classList.remove("active");
    },800)
    document.querySelector(".beyond-centum-video video").pause();
}
const setCon11 = ()=>{
    const _conWrapper = document.querySelector(".content-wrapper");
    _conWrapper.classList.add("w11");
    const _books = _conWrapper.querySelectorAll(".con10 .book-box-wrapper");
    setTimeout(()=>{
        _books[0].classList.add("active");
    },500)
}
const resetCon11 = ()=>{
    const _conWrapper = document.querySelector(".content-wrapper");
    _conWrapper.classList.remove("w11");
    const _books = _conWrapper.querySelectorAll(".con10 .book-box-wrapper");
    const _texts = _conWrapper.querySelectorAll(".con10 .book-box-wrapper .book-text-con");
    const _con9 = document.querySelector(".content-area.con10 .innerWrapper");
    setTimeout(()=>{
        _books.forEach((_b,idx)=>{
            _b.classList.remove("active");
        })
        _texts.forEach((_b,idx)=>{
            _b.classList.remove("active");
        })
        _con9.scrollTop = 0;
        onePlay = false;
        _con9.querySelector("video").pause();
    },800)
}


const randomNum = (e)=>{
    let temp = [];
    for(let i=0; i<e; i++){
        temp.push(i);
    }
    for(let i=0; i<100; i++){
        const num1 = Math.floor(Math.random() * temp.length);
        const num2 = Math.floor(Math.random() * temp.length);
        const dummy = temp[num1];
        if(num1 !== num2){
            temp[num1] = temp[num2];
            temp[num2] = dummy
        }
    }
    return temp;
}