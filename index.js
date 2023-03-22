class DefaultUrl{

    template(text){
        return {
            site: "Text without space",
            url: this.getUrl(text),
            icon: "images/url-icon.svg"
        }
    }

    getUrl(text){
        text = replaceAll(text, " ", '')
        text = replaceAll(text, "(", '')
        text = replaceAll(text, ")", '')

        return `${ (( ! text.startsWith("http"))  ? 'https://': '') + text}`
    }
}


class PixivUser{

    template(text){
        return {
            site: "Pixiv User",
            url: this.getUrl(text),
            icon: "images/pixiv.svg"
        }
    }

    getUrl(text){
        text = text.replace(" ", "")
        return `https://pixiv.net/users/${onlyNumber(text)}`
    }
    
}

class PixivArtwork{

    template(text){
        return {
            site: "Pixiv Artwork",
            url: this.getUrl(text),
            icon: "images/pixiv.svg"
        }
    }

    getUrl(text){
        text = text.replace(" ", "")
        return `https://pixiv.net/artworks/${onlyNumber(text)}`
    }
}

class Nhentai{
    template(text){
        return {
            site: "Nhentai",
            url: this.getUrl(text),
            icon: "images/nhentai.svg"
        }
    }

    getUrl(text){
        text = text.replace(" ", "")
        return `https://nhentai.net/g/${onlyNumber(text)}`
    }
}

function onlyNumber(text){
    return text.match(/\d+/g).join('')
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

    links.push(new DefaultUrl().template(text_or_link))
    links.push(new PixivUser().template(text_or_link))
    links.push(new PixivArtwork().template(text_or_link))
    links.push(new Nhentai().template(text_or_link))

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
