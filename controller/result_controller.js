const shortUrl = require('../model/shortUrl');
const model = require('../model/result');
const pool = require('../modules/pool');

exports.postUrl = async (req, res) => {
    try {
        const origin = req.body.originUrl;
        const result1 = await model.readUrl(origin);
        const result2 = await model.updateCount(origin);
        var urlList = await model.readUrls();

        if (result1.length > 0) {
            return res.render("result", {
                shortUrl: result1[0].keyword,
                shortUrls: urlList
            });
        } else {
            const idx = await model.postOriginUrl(origin);
            const short = dec_to_base62(idx);
            await model.updateShortUrl(short, idx);
            urlList = await model.readUrls();
            return res.render("result", {
                shortUrl: short,
                shortUrls: urlList
            });
        }
    } catch (err) {
        throw err;
    }
}

exports.displayShortUrl = async (req, res) => {
    const result = await model.readUrls(req);
    res.render('result', {
        shortUrls: result
    });
}

exports.redirectUrl = async (req, res) => {
    const result = await model.readOriginUrl(req.params.shortUrl);
    if(result == null) return res.sendStatus(404);
    res.redirect(result[0].origin_url);
};

function dec_to_base62(num) {
    if (num === 0) return '0';
    var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var s = '';
    while (num > 0) {
        s = chars[num % 62] + s;
        num = Math.floor(num / 62);
    }
    return s;
}