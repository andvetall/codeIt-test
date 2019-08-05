//creating custom for Company Partners box
class CustomElementNew extends HTMLElement {
    constructor() {
        super()
        this.wrapper = document.createElement('div')
        this.wrapper.className = 'wrapper'
        this.nameHolder = document.createElement('div')
        this.nameHolder.className = 'name-holder'
        this.nameContent = document.createElement('p')
        this.nameContent.className = 'name-content'
        this.line = document.createElement('div')
        this.line.className = 'line'
        this.circle = document.createElement('div')
        this.circle.className = 'circle'
        this.circleContent = document.createElement('p')
        this.circleContent.className = 'circle-content'
        this.shadow = this.attachShadow({mode: 'open'})
        let style = document.createElement('style')
        style.textContent = `
        .wrapper{
            position: relative;
            margin: 0 10px;
        }
        .name-holder{
            border: solid 1px gainsboro;
            width: 80px;
            height: 160px;
        }
        .name-content{
            -webkit-transform: rotate(-90deg);
            margin: 70px 0 0px 0px;
            font-size: 24px;
        }
        .line{
            width: 10px;
            height: 70px;
            border: solid 1px gainsboro;
            position: absolute;
            top: -70px;
            left: 35px;
        }
        .circle{
            width: 70px;
            height: 70px;
            border: solid 1px gainsboro;
            position: absolute;
            top: -141px;
            left: 6px;
            border-radius: 50%;
        }
        .circle-content{
            text-align: center;
            margin: 27px auto;
        }
        `
        this.circle.appendChild(this.circleContent)
        this.wrapper.appendChild(this.circle)
        this.wrapper.appendChild(this.line)
        this.nameHolder.appendChild(this.nameContent)
        this.wrapper.appendChild(this.nameHolder)
        this.shadow.appendChild(style)
        this.shadow.appendChild(this.wrapper)
    }
}
customElements.define('new-element', CustomElementNew)
//getting data from data base to create list of companies and fill total amoutn of companies circle
fetch("http://codeit.ai/codeitCandidates/serverFrontendTest/company/getList").then(
	response => response.json()
).then(
    response => {
        document.querySelector('.total-companies-amount').textContent = response.list.length
        for(let item of response.list){
            let elem = document.querySelector('.list-of-companies-box')
                .appendChild(document.createElement('li'))
            elem.className = 'list-item'
            elem.textContent = `${item.name}`
            elem.onclick = function(e){
                let fullListItems = document.querySelector('.list-of-companies-box').children
                for(let item of fullListItems){
                    item.className = "list-item"
                }
                elem.className = 'list-item active'
                let boxToClean = document.querySelector('.company-partners-box')
                while(boxToClean.firstChild){
                    boxToClean.removeChild(boxToClean.firstChild)
                }
                document.querySelector('.main-content-box.company-partners')
                    .style.display = "block"
                for(let partner of item.partners){
                    let newElem = document.createElement('new-element')
                    newElem.className = 'new-element'
                    newElem.nameContent.textContent = `${partner.name}`
                    newElem.circleContent.textContent = `${partner.value} %`
                    document.querySelector('.company-partners-box')
                        .appendChild(newElem)
                }
            } 
        } 
    }
)
//creating loader to all blocks
let loader = function(){
    let loaderBoxes = document.querySelectorAll('.main-content-box')
    loaderBoxes.forEach(item => {
        let loaderImg = document.createElement('img')
        item.appendChild(loaderImg)
        loaderImg.className = 'class-img-box'
        loaderImg.src = 'http://jabra-ukraine.com/resources/jabra/img/loading.gif'
        loaderImg.style.zIndex = '9999'
    })
    
}
loader()
//removing all loaders with completed load
window.onload = function(){
    let imgToRemove = document.querySelectorAll('.class-img-box')
    imgToRemove.forEach(item => item.remove())
}
//function to sort companies by persent
let sortItemsByPercent = function(){
    let x = document.querySelectorAll('.new-element')
    let resArray = []
    x.forEach(item => resArray.push(item))
    let sortAr = resArray.sort (
        function ( x, y ) {
            return y.circleContent.textContent.slice(0, 2) - x.circleContent.textContent.slice(0, 2)
        }
    )
    sortAr.forEach(item => document.querySelector('.company-partners-box').appendChild(item))
}
//function to sort companies by name
let sortItemsByName = function(){
    let x = document.querySelectorAll('.new-element')
    let resArray = []
    x.forEach(item => resArray.push(item))
    let sortAr = resArray.sort (
        function ( x, y ) {
            return x.nameContent.textContent.charCodeAt(0) - y.nameContent.textContent.charCodeAt(0)
        }
    )
    sortAr.forEach(item => document.querySelector('.company-partners-box').appendChild(item))
}
//adding event to sort by percent button + active class
document.querySelector('#sort-by-percent').onclick = e => {
    let fullListSort = document.querySelectorAll('.sort-by')
    for(let item of fullListSort){
        item.className = "sort-by"
    }
    e.target.className = 'sort-by active'
    sortItemsByPercent()
}
//adding event to sort by name button + active class
document.querySelector('#sort-by-name').onclick = e => {
    let fullListSort = document.querySelectorAll('.sort-by')
    for(let item of fullListSort){
        item.className = "sort-by"
    }
    e.target.className = 'sort-by active'
    sortItemsByName()
}
//button to close Company Partners block
document.querySelector('.close-partners').onclick = e => document.querySelector('.main-content-box.company-partners').style.display = "none"
//getting data to create slider for News block
fetch("http://codeit.ai/codeitCandidates/serverFrontendTest/news/getList").then(
	response => response.json()
).then(
    response => {
        response.list.forEach(item => {
            let slickBox = document.querySelector('.slick-slider')
            let slickBoxWrapper = document.createElement('div')
            slickBoxWrapper.style = `display: flex; margin: 5px auto; position: relative;`
            slickBox.appendChild(slickBoxWrapper)

            let slickBoxLeft = document.createElement('div')
            slickBoxLeft.style = `display: block; width: 70%;`
            slickBoxWrapper.appendChild(slickBoxLeft)

            let slickBoxLeftImg = document.createElement('img')
            slickBoxLeftImg.src = `${item.img}`
            slickBoxLeft.appendChild(slickBoxLeftImg)
            let slickBoxLeftAuthor = document.createElement('p')
            slickBoxLeftAuthor.textContent = `Author: ${item.author}`
            slickBoxLeft.appendChild(slickBoxLeftAuthor)
            let slickBoxLeftPublic = document.createElement('p')
            slickBoxLeftPublic.textContent = `Public: ${item.date}`
            slickBoxLeft.appendChild(slickBoxLeftPublic)

            let slickBoxRight = document.createElement('div')
            slickBoxRight.style = `display: block; width: 100%; max-height: 225px; overflow-y: auto;`
            slickBoxWrapper.appendChild(slickBoxRight)

            let slickBoxRightTitle = document.createElement("h2")
            slickBoxRightTitle.textContent = `${item.link}`
            let slickBoxRightContent = document.createElement('p')
            slickBoxRightContent.textContent = `${item.description}`
            slickBoxRight.appendChild(slickBoxRightTitle)
            slickBoxRight.appendChild(slickBoxRightContent)

        })
        //running slick-slider
        $('.slick-slider').slick({
            dots: true,
            arrows: false,
             infinite: true,
             autoplay: true,
             autoplaySpeed: 3000
        });
    }
)