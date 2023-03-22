class DefaultUrl{

    constructor(text){
        this.text = text
        this.site = "Text without space"
        this.icon = "images/url-icon.svg"
        
        this.normalizeUrl()
        this.url  =  this.getUrl()
    }
    template(){
        return {
            site: this.site,
            url: this.url,
            icon: this.icon
        }
    }

    normalizeUrl(){    
        this.text = replaceAll(this.text, " ", '')
        this.text = replaceAll(this.text, "(", '')
        this.text = replaceAll(this.text, ")", '')
    }

    getUrl(){
        return `${ (( ! this.text.startsWith("http"))  ? 'https://': '') + this.text}`
    }
}


class PixivUser extends DefaultUrl{
    
    constructor(text){
        super(text)
        this.site = "Pixiv User"
        this.icon = "images/pixiv.svg"
    }
    
    getUrl(){
        return `https://pixiv.net/users/${onlyNumber(this.text)}`
    }
    
}

class PixivArtwork extends DefaultUrl{

    constructor(text){
        super(text)
        this.site = "Pixiv Artwork"
        this.icon = "images/pixiv.svg"
    }
    
    getUrl(){
        return `https://pixiv.net/artworks/${onlyNumber(this.text)}`
    }
}

class Nhentai extends DefaultUrl{
    constructor(text){
        super(text)
        this.site = "Nhentai"
        this.icon = "images/nhentai.svg"
    }

    getUrl(){
        return `https://nhentai.net/g/${onlyNumber(this.text)}`
    }
}

class Twitter extends DefaultUrl{
    constructor(text){
        super(text)
        this.site = "Twitter"
        this.icon = "images/twitter.svg"
    }

    getUrl(){
        return `https://twitter.com/${this.text}`
    }
}

function onlyNumber(text){
    try {
        return text.match(/\d+/g).join('')    
    } catch (error) {
        return ""
    }
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function findLinks() {
    let links = []
    let text_or_link = $("#text_or_link").val()
    try {
        if( text_or_link ){
            links.push(new DefaultUrl(text_or_link).template())
            links.push(new PixivUser(text_or_link).template())
            links.push(new PixivArtwork(text_or_link).template())
            links.push(new Nhentai(text_or_link).template())
            links.push(new Twitter(text_or_link).template())
        }else{
            
            const toastLiveExample = document.getElementById('liveToast')
            const toast = new bootstrap.Toast(toastLiveExample)
            $("#liveToastBody").html("Provade Text or Link")
            toast.show()
        }    
    } catch (error) {
        const toastLiveExample = document.getElementById('liveToast')
        $("#liveToastBody").html(error.message)
        const toast = new bootstrap.Toast(toastLiveExample)
        toast.show()
    }
    
    

    $("#listLinks").html("")

    links.forEach(element => {
        $("#listLinks").append(`
            <a href="${element.url}" class="list-group-item list-group-item-action" target="_blank">
                <img src="${element.icon}" class="img-thumbnail" alt="${element.site}" heigth='100px' width='100px'>
                ${element.site}
            </a>
        `)
    });
}
