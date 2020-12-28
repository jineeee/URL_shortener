const model = require('../model/result');

// URL 단축
exports.postUrl = async (req, res) => {
    try {
        const origin = req.body.originUrl;
        const readUrlResult = await model.readUrl(origin);

        // DB에 이미 존재하는 URL인 경우
        if (readUrlResult.length > 0) {
            await model.updateCount(origin);
            const urlList = await model.readUrls();
            return res.render("result", {
                shortUrl: readUrlResult[0].keyword,
                shortUrls: urlList
            });
        } 
        // 최초로 검색된 URL인 경우
        else {
            const idx = await model.postOriginUrl(origin);
            const short = decToBase62(idx);
            await model.updateShortUrl(short, idx);
            const urlList = await model.readUrls();
            return res.render("result", {
                shortUrl: short,
                shortUrls: urlList
            });
        }
    } catch (err) {
        console.log("POST URL ERR : ", err.message);
        return res.status(404).render("error", {
            message: err.message,
            url: req.url
        });
    }
}

// URL 단축 결과 제공
exports.displayShortUrl = async (req, res) => {
    try {
        const result = await model.readUrls(req);
        res.render("result", {
            shortUrls: result
        });
    } catch (err) {
        console.log("DISPLAY URL ERR : ", err.message);
        return res.status(404).render("error", {
            message: err.message,
            url: req.url
        });
    }
}

// 단축된 URL를 통해 원본 페이지로 이동
exports.redirectUrl = async (req, res) => {
    try {
        const result = await model.readOriginUrl(req.params.shortUrl);
        if (result == null) throw 'NOT EXIST URL';
        res.redirect(result[0].origin_url);
    } catch (err) {
        console.log("REDIRECT URL ERR : ", err.message);
        return res.status(404).render("error", {
            message: "err.message",
            url: req.url
        });
    }
};

function decToBase62(num) {
    if (num === 0) return '0';
    var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var s = '';
    while (num > 0) {
        s = chars[num % 62] + s;
        num = Math.floor(num / 62);
    }
    return s;
}